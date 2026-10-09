import puppeteer from 'puppeteer';
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import { normalizarContactosAdicionales } from "./contactosAdicionales.js";

const _filename = fileURLToPath(import.meta.url);
const _dirname = path.dirname(_filename);

const SIN_REGISTRO = "No registra";
const ZONA_HORARIA = "America/Bogota";

const TIPOS_DOCUMENTO = {
    "CC": "CC",
    "CÉDULA DE CIUDADANÍA": "CC",
    "TI": "TI",
    "TARJETA DE IDENTIDAD": "TI",
    "CE": "CE",
    "CÉDULA DE EXTRANJERÍA": "CE",
    "PA": "PA",
    "PASAPORTE": "PA"
};

const REVISORES = [
    { campo: "pedagogia", rotulo: "Nombre de Pedagogía" },
    { campo: "sst", rotulo: "Nombre responsable SST" },
    { campo: "coordinacion", rotulo: "Nombre del Coordinador" }
];

const ESTADOS_REVISION = {
    "aprobado": "Aprobado",
    "no aprobado": "No aprobado",
    "pendiente": "Pendiente"
};


const escaparHtml = (valor) => String(valor)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

const texto = (valor, alternativo = SIN_REGISTRO) => {
    const limpio = String(valor ?? "").trim();

    return escaparHtml(limpio || alternativo);
};

/** Primera letra en mayúscula y el resto en minúscula ("NO ESPECIFICA" → "No especifica"). */
const capitalizar = (valor) => {
    const limpio = String(valor ?? "").trim().toLocaleLowerCase("es");

    return limpio.charAt(0).toLocaleUpperCase("es") + limpio.slice(1);
};

const obtenerId = (valor) => String(valor?._id ?? valor ?? "");

const comoObjetos = (lista) => (Array.isArray(lista) ? lista : [])
    .filter((elemento) => elemento && typeof elemento === "object");

const esUrlSegura = (valor) => {
    try {
        const url = new URL(valor);

        return ["http:", "https:"].includes(url.protocol);
    } catch {
        return false;
    }
};

const enlace = (valor) => {
    const url = String(valor ?? "").trim();

    if (!esUrlSegura(url)) {
        return texto(url);
    }

    const urlSegura = escaparHtml(url);

    return `<a href="${urlSegura}">${urlSegura}</a>`;
};

const formatearFecha = (valor, zonaHoraria = ZONA_HORARIA) => {
    if (!valor) {
        return "";
    }

    const fecha = new Date(valor);

    if (Number.isNaN(fecha.getTime())) {
        return "";
    }

    return fecha.toLocaleDateString("es-CO", {
        day: "numeric",
        month: "long",
        year: "numeric",
        timeZone: zonaHoraria
    });
};

const abreviarTipoDocumento = (tipo) => {
    const valor = String(tipo ?? "").trim();

    return TIPOS_DOCUMENTO[valor.toUpperCase()] || valor;
};

const esImagenFirma = (valor) => {
    const firma = String(valor ?? "").trim();

    return /^data:image\/(png|jpe?g|gif|webp);base64,[a-z0-9+/=\s]+$/i.test(firma) ||
        esUrlSegura(firma);
};


// La plantilla dibuja la casilla; aquí solo se indica si va marcada.
const casilla = (seleccionado) => seleccionado ? "X" : "";


const obtenerClasificacion = (plan) => {

    return {
        publica: casilla(plan.clasificacionInformacion === "publica"),
        clasificada: casilla(plan.clasificacionInformacion === "clasificada"),
        reservada: casilla(plan.clasificacionInformacion === "reservada")
    };
}


const obtenerTransporte = (plan) => {

    return {
        sena: casilla(plan.tipoTransporte === "SENA"),
        externo: casilla(plan.tipoTransporte === "EXTERNO"),
        aprendiz: casilla(plan.tipoTransporte === "APRENDIZ")
    };
}


const obtenerContactosEmergencia = (plan) => {

    const contactosBase = comoObjetos(plan.contactosEmergencia?.contactosBase);
    const contactosAdicionales = normalizarContactosAdicionales(plan.contactosEmergencia?.otro);

    if (!contactosBase.length && !contactosAdicionales.length) {
        return SIN_REGISTRO;
    }

    let html = `
    <table class="table">
            <colgroup>
                <col style="width: 34%">
                <col style="width: 22%">
                <col style="width: 22%">
                <col style="width: 22%">
            </colgroup>
            <thead><tr>
                <th>Entidad</th>
                <th>Tipo</th>
                <th>Teléfono</th>
                <th>Ciudad</th>
            </tr></thead>
   `;

    for (const contacto of contactosBase) {

        html += `
   <tr>
    <td>${texto(contacto.nombre || contacto.nombreEntidad)}</td>
    <td>${texto(contacto.tipo || contacto.tipoContacto)}</td>
    <td>${texto(contacto.telefono || contacto.telefonoPrincipal)}</td>
    <td>${texto(contacto.ciudad)}</td>
   </tr>
   `;
    }

    for (const otro of contactosAdicionales) {

        html += `
   <tr>
    <td>${texto(otro.nombreEntidad)}</td>
    <td>${texto(otro.descripcion, "Contacto adicional")}</td>
    <td>${texto(otro.telefono)}</td>
    <td>${texto(otro.ciudad)}</td>
   </tr>
   `;
    }

    html += `
    </table>
    `;

    return html;
}


const obtenerArticulacion = (plan) => {

    const articulacion = plan.articulacionFormativa ?? {};

    const textoOtro = String(articulacion.otro ?? "").trim();
    const otro = articulacion.otroSeleccionado && textoOtro && textoOtro !== "false"
        ? textoOtro
        : "";

    return {
        proyectoFormativo: casilla(articulacion.proyectoFormativo),
        visitaEmpresa: casilla(articulacion.visitaEmpresa),
        investigacion: casilla(articulacion.investigacion),
        otroArticulacion: casilla(otro),
        otroArticulacionTexto: otro ? `<div class="option-detail">${escaparHtml(otro)}</div>` : ""
    };
}


const obtenerSoportes = (plan) => {

    const contexto = plan.contextoAcademico ?? {};

    return {
        soportesAcademicos: `
    PLANEACIÓN PEDAGÓGICA: ${enlace(contexto.planeacionPedagogicaLink)}<br>
    GUÍA DE APRENDIZAJE: ${enlace(contexto.guiaAprendizajeLink)}<br>
    OTROS SOPORTES: ${enlace(contexto.otrosSoportesLink)}
    `,
        actasComportamiento: enlace(contexto.actasComportamientoLink),
        consentimiento: contexto.consentimientoMenores
            ? enlace(contexto.consentimientoLink)
            : "No aplica"
    };
}


const obtenerPlanTrabajo = (plan) => {

    const actividades = comoObjetos(plan.planTrabajo);

    if (!actividades.length) {
        return SIN_REGISTRO;
    }

    let html = `
         <table class="table">
            <colgroup>
                <col style="width: 9%">
                <col style="width: 9%">
                <col style="width: 9%">
                <col style="width: 21%">
                <col style="width: 33%">
                <col style="width: 19%">
            </colgroup>
            <thead><tr>
                <th>Hora inicio</th>
                <th>Hora fin</th>
                <th>Duración</th>
                <th>Actividad</th>
                <th>Descripción</th>
                <th>Lugar</th>
            </tr></thead>
        `;

    actividades.forEach((actividad) => {

        html += `
         <tr>
   <td class="cell-center">${texto(actividad.horaInicio)}</td>
   <td class="cell-center">${texto(actividad.horaFin)}</td>
   <td class="cell-center">${texto(actividad.duracion)}</td>
   <td>${texto(actividad.actividad)}</td>
   <td>${texto(actividad.descripcion)}</td>
   <td>${texto(actividad.lugar)}</td>
   </tr>
        `;
    });

    html += `
        </table>
        `;

    return html;
}


const obtenerEpp = (plan) => {

    const elementos = comoObjetos(plan.epp);

    if (!elementos.length) {
        return SIN_REGISTRO;
    }

    let html = `
         <table class="table">
            <colgroup>
                <col style="width: 22%">
                <col style="width: 22%">
                <col style="width: 14%">
                <col style="width: 42%">
            </colgroup>
            <thead><tr>
                <th>Elemento</th>
                <th>Categoría</th>
                <th>Nivel de protección</th>
                <th>Descripción</th>
            </tr></thead>
        `;

    for (const elemento of elementos) {

        html += `
         <tr>
   <td>${texto(elemento.nombre || elemento.nombreEPP)}</td>
   <td>${texto(elemento.categoria)}</td>
   <td class="cell-center">${texto(elemento.nivel || elemento.nivelProteccion)}</td>
   <td>${texto(elemento.descripcion)}</td>
   </tr>
        `;
    }

    html += `
        </table>
        `;

    return html;
}


const obtenerContactoEmergenciaAprendiz = (aprendiz) => {

    const nombre = String(aprendiz.contacto ?? "").trim();
    const parentesco = String(aprendiz.parentesco ?? "").trim();
    const telefono = String(aprendiz.telefono ?? "").trim();

    const responsable = [nombre, parentesco ? `(${parentesco})` : ""]
        .filter(Boolean)
        .join(" ");

    return texto([responsable, telefono].filter(Boolean).join(" - "));
}


const obtenerAprendices = (plan) => {

    const aprendices = comoObjetos(plan.aprendicesId);

    if (!aprendices.length) {
        return SIN_REGISTRO;
    }

    let html = `
         <table class="table">
            <colgroup>
                <col style="width: 7%">
                <col style="width: 11%">
                <col style="width: 18%">
                <col style="width: 12%">
                <col style="width: 6%">
                <col style="width: 23%">
                <col style="width: 23%">
            </colgroup>
            <thead><tr>
                <th>Tipo doc.</th>
                <th>Documento</th>
                <th>Aprendiz</th>
                <th>EPS</th>
                <th>RH</th>
                <th>Contacto de emergencia</th>
                <th>Condiciones médicas</th>
            </tr></thead>
        `;

    aprendices.forEach((aprendiz) => {

        const nombreCompleto = [aprendiz.nombre, aprendiz.apellido]
            .map((valor) => String(valor ?? "").trim())
            .filter(Boolean)
            .join(" ");

        html += `
     <tr>
     <td class="cell-center">${texto(abreviarTipoDocumento(aprendiz.tipo))}</td>
     <td>${texto(aprendiz.documento)}</td>
     <td>${texto(nombreCompleto)}</td>
     <td>${texto(aprendiz.eps)}</td>
     <td class="cell-center">${texto(aprendiz.tipoSangre)}</td>
     <td>${obtenerContactoEmergenciaAprendiz(aprendiz)}</td>
     <td>${texto(aprendiz.condicionesMedicas, "Ninguna")}</td>
     </tr>
    `;
    });

    html += `
    </table>
    `;

    return html;
}


// Se priorizan los peligros de la actividad del plan; si ninguno coincide se muestran los del riesgo.
const obtenerPeligrosDelPlan = (plan, riesgo) => {

    const peligros = (Array.isArray(riesgo.peligroId) ? riesgo.peligroId : [riesgo.peligroId])
        .filter((peligro) => peligro && typeof peligro === "object");

    const peligrosActividad = new Set(
        (Array.isArray(plan.actividadId?.peligros) ? plan.actividadId.peligros : [])
            .map(obtenerId)
    );

    const coincidentes = peligros.filter((peligro) => peligrosActividad.has(obtenerId(peligro)));

    return coincidentes.length ? coincidentes : peligros;
}


const obtenerRiesgos = (plan) => {

    const riesgos = comoObjetos(plan.riesgosId);

    if (!riesgos.length) {
        return SIN_REGISTRO;
    }

    let html = `
        <table class="table">
            <colgroup>
                <col style="width: 15%">
                <col style="width: 11%">
                <col style="width: 15%">
                <col style="width: 7%">
                <col style="width: 24%">
                <col style="width: 28%">
            </colgroup>
            <thead><tr>
                <th>Peligro</th>
                <th>Categoría</th>
                <th>Riesgo</th>
                <th>Nivel</th>
                <th>Consecuencia</th>
                <th>Prevención</th>
            </tr></thead>
        `;

    riesgos.forEach((riesgo) => {

        const peligros = obtenerPeligrosDelPlan(plan, riesgo);

        html += `
     <tr>
     <td>${texto(peligros.map((peligro) => peligro.nombre).filter(Boolean).join(", "))}</td>
     <td>${texto([...new Set(peligros.map((peligro) => peligro.categoria).filter(Boolean))].join(", "))}</td>
     <td>${texto(riesgo.riesgo || riesgo.nombre)}</td>
     <td class="cell-center">${texto(riesgo.nivel || riesgo.nivelRiesgo)}</td>
     <td>${texto(riesgo.consecuencia)}</td>
     <td>${texto(riesgo.prevencion || riesgo.medidasPrevencion)}</td>
     </tr>
            `;
    });

    html += `
     </table>
    `;

    return html;
}


const obtenerProtocolos = (plan) => {

    const protocolosMostrados = new Set();
    const filas = [];

    for (const riesgo of comoObjetos(plan.riesgosId)) {

        for (const protocolo of comoObjetos(riesgo.protocolos)) {

            const id = obtenerId(protocolo);

            if (protocolosMostrados.has(id)) {
                continue;
            }

            protocolosMostrados.add(id);

            filas.push(`
                   <tr>
                    <td>${texto(protocolo.tipo || protocolo.tipoEmergencia)}</td>
                    <td>${texto(protocolo.accion || protocolo.accionInmediata)}</td>
                    <td>${texto(protocolo.responsable)}</td>
                    <td>${texto(protocolo.medio || protocolo.medioComunicacion)}</td>
                </tr>
                `);
        }
    }

    if (!filas.length) {
        return SIN_REGISTRO;
    }

    return `
        <table class="table">
            <colgroup>
                <col style="width: 20%">
                <col style="width: 40%">
                <col style="width: 20%">
                <col style="width: 20%">
            </colgroup>
            <thead><tr>
                <th>Emergencia</th>
                <th>Acción inmediata</th>
                <th>Responsable</th>
                <th>Comunicación</th>
            </tr></thead>
            ${filas.join("")}
        </table>
    `;
}


const obtenerSeguridadVial = (plan) => {

    if (!plan.seguridadVial?.aplica) {
        return "No aplica";
    }

    const items = comoObjetos(plan.seguridadVial.items);

    if (!items.length) {
        return SIN_REGISTRO;
    }

    let html = `
            <table class="table road-safety">
            <colgroup>
                <col style="width: 43%">
                <col style="width: 14%">
                <col style="width: 43%">
            </colgroup>
            <thead><tr>
                <th>Ítem</th>
                <th>¿Aplica? (si/no)</th>
                <th>Soportes/Observaciones</th>
            </tr></thead>
    `;

    for (const item of items) {

        const soporte = item.cumple ? enlace(item.soporte) : "No aplica";
        const observacion = texto(capitalizar(item.observacion), "No especifica");

        html += `
            <tr>
                <td>${texto(item.nombre)}</td>
                <td class="cell-center">${item.cumple ? "Sí" : "No"}</td>
                <td>${soporte} - ${observacion}</td>
            </tr>
        `;
    }

    html += `
    </table>
    `;

    return html;
}


const obtenerObservaciones = (plan) => {

    const historial = comoObjetos(plan.historialObservaciones)
        .filter((observacion) => String(observacion.texto ?? "").trim());

    if (!historial.length) {
        return `<p>${texto(plan.observaciones, "Sin observaciones")}</p>`;
    }

    return historial.map((observacion) => `
        <p class="observation-item">
            ${texto(formatearFechaCorta(observacion.fecha))} ${escaparHtml(formatearHoraCorta(observacion.fecha))} - ${texto(capitalizar(observacion.rol), "Rol no registrado")}:
            ${texto(observacion.texto)}
        </p>
    `).join("");
}


const formatearFechaCorta = (valor) => {
    const fecha = valor ? new Date(valor) : null;

    if (!fecha || Number.isNaN(fecha.getTime())) {
        return "";
    }

    return fecha.toLocaleDateString("es-CO", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        timeZone: ZONA_HORARIA
    });
};

/** Hora en formato de 24 horas, por ejemplo "14:35". */
const formatearHoraCorta = (valor) => {
    const fecha = valor ? new Date(valor) : null;

    if (!fecha || Number.isNaN(fecha.getTime())) {
        return "";
    }

    return fecha.toLocaleTimeString("es-CO", {
        hour: "2-digit",
        minute: "2-digit",
        hourCycle: "h23",
        timeZone: ZONA_HORARIA
    });
};


const obtenerCeldaFirma = (firma) => {

    if (!esImagenFirma(firma)) {
        return `<span class="signature-empty">Sin firma registrada</span>`;
    }

    return `<img src="${escaparHtml(String(firma).trim())}" class="signature-image" alt="Firma">`;
}


const obtenerFirmas = (plan, instructor) => {

    const nombreInstructor = plan.usuarioNombre ||
        [instructor?.nombre, instructor?.apellido].filter(Boolean).join(" ");

    const firmantes = [
        {
            rotulo: "Nombre del Instructor",
            nombre: nombreInstructor,
            firma: instructor?.firma,
            estado: "Elaborado",
            fecha: plan.createdAt
        },
        ...REVISORES.map(({ campo, rotulo }) => {
            const revision = plan.revision?.[campo] ?? {};
            const estado = ESTADOS_REVISION[String(revision.estado ?? "pendiente").toLowerCase()] ||
                revision.estado;

            return {
                rotulo,
                nombre: revision.nombre,
                firma: revision.firma,
                estado,
                fecha: revision.fecha
            };
        })
    ];

    const celdas = firmantes.map((firmante) => {
        const fecha = formatearFechaCorta(firmante.fecha);
        const detalleFecha = [firmante.estado, fecha].filter(Boolean).map(escaparHtml).join(" ");

        return `
            <td>
                <div class="signature-row">
                    <span class="signature-label">${escaparHtml(firmante.rotulo)}:</span>
                    <span class="signature-value">${texto(firmante.nombre)}</span>
                </div>
                <div class="signature-row signature-row--firma">
                    <span class="signature-label">Firma:</span>
                    <span class="signature-value">${obtenerCeldaFirma(firmante.firma)}</span>
                </div>
                <div class="signature-row">
                    <span class="signature-label">Fecha:</span>
                    <span class="signature-value">${detalleFecha || "&nbsp;"}</span>
                </div>
            </td>
        `;
    }).join("");

    return `
        <table class="signatures">
            <tr>${celdas}</tr>
        </table>
    `;
}


const llenarTemplate = async (html, plan, { instructor } = {}) => {

    const rutaLogo = path.join(
        _dirname,
        "../assets/logo-sena.png"
    );

    const logoBuffer = await fs.readFile(rutaLogo);

    const logoBase64 = logoBuffer.toString("base64");

    const logo = `data:image/png;base64,${logoBase64}`;

    const clasificacion = obtenerClasificacion(plan);
    const transporte = obtenerTransporte(plan);

    const programa = plan.programaFormacionId && typeof plan.programaFormacionId === "object"
        ? plan.programaFormacionId
        : {};

    const actividad = plan.actividadId && typeof plan.actividadId === "object"
        ? plan.actividadId
        : {};

    const variables = {
        logo,
        codigo: texto(plan.numero),
        programa: texto(plan.programaFormacionNombre || programa.nombre),
        nivelFormacion: texto(
            plan.programaFormacionNivel || programa.nivel || programa.nivelFormacion
        ),
        instructor: texto(plan.usuarioNombre),
        ficha: texto(plan.ficha || programa.ficha),
        cantidadAprendices: comoObjetos(plan.aprendicesId).length,
        actividad: texto(actividad.nombre),
        tipoActividad: texto(actividad.tipo || actividad.tipoActividad),
        fechaSalida: texto(formatearFecha(plan.fecha, "UTC")),
        lugarSalida: texto(plan.lugarSalida),
        lugarDestino: texto(plan.lugarDestino),
        horaSalida: texto(plan.horaSalida),
        horaRegreso: texto(plan.horaRegreso),
        contactoLugar: texto(plan.contactoLugar),
        descripcionActividad: texto(plan.descripcionActividad),
        objetivo: texto(plan.contextoAcademico?.objetivo),
        competencia: texto(plan.contextoAcademico?.competencia),
        resultados: texto(plan.contextoAcademico?.resultadoAprendizaje),

        publica: clasificacion.publica,
        clasificada: clasificacion.clasificada,
        reservada: clasificacion.reservada,

        sena: transporte.sena,
        externo: transporte.externo,
        aprendiz: transporte.aprendiz,

        ...obtenerArticulacion(plan),
        ...obtenerSoportes(plan),

        contactosEmergencia: obtenerContactosEmergencia(plan),
        planTrabajo: obtenerPlanTrabajo(plan),
        epp: obtenerEpp(plan),
        aprendices: obtenerAprendices(plan),
        riesgos: obtenerRiesgos(plan),
        protocolos: obtenerProtocolos(plan),
        seguridadVial: obtenerSeguridadVial(plan),
        observaciones: obtenerObservaciones(plan),
        firmas: obtenerFirmas(plan, instructor)
    };

    // El reemplazo se hace con una función para que patrones como "$&" en los datos no se interpreten.
    return html.replace(/\{\{(\w+)\}\}/g, (marcador, clave) =>
        Object.hasOwn(variables, clave) ? String(variables[clave] ?? "") : ""
    );
}


export const generarDocumentoPdf = async (plan, opciones = {}) => {

    const rutaTemplate = path.join(
        _dirname,
        "../templates/planContingenciaTemplate.html"
    );

    const html = await fs.readFile(
        rutaTemplate,
        "utf8"
    );

    const htmlFinal = await llenarTemplate(
        html,
        plan,
        opciones
    );

    const browser = await puppeteer.launch({
        headless: true,
        // Necesario en contenedores Linux (Render) donde Chrome no puede crear su sandbox
        args: ["--no-sandbox", "--disable-setuid-sandbox"]
    });

    try {
        const page = await browser.newPage();

        // Ancho útil de la hoja A4 (210mm - 2 × 15mm de margen) para medir como en la impresión
        await page.setViewport({ width: 680, height: 1000 });

        await page.setContent(htmlFinal, {
            waitUntil: "networkidle0"
        });

        await page.emulateMediaType("print");

        // Los nombres de las firmas van en un solo renglón: si no caben se reduce la letra en lugar de cortarlos
        await page.evaluate(() => {
            document.querySelectorAll(".signature-value").forEach((elemento) => {
                let tamano = parseFloat(getComputedStyle(elemento).fontSize);

                while (elemento.scrollWidth > elemento.clientWidth && tamano > 8) {
                    tamano -= 0.25;
                    elemento.style.fontSize = `${tamano}px`;
                }

                if (elemento.scrollWidth > elemento.clientWidth) {
                    elemento.style.whiteSpace = "normal";
                }
            });
        });

        const pdf = await page.pdf({
            format: "A4",
            printBackground: true,
            margin: {
                top: "18mm",
                right: "18mm",
                bottom: "18mm",
                left: "18mm"
            }
        });

        return Buffer.from(pdf);
    } finally {
        await browser.close();
    }
}
