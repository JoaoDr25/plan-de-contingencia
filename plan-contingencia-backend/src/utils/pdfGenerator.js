import puppeteer from 'puppeteer';
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const _filename = fileURLToPath(import.meta.url);
const _dirname = path.dirname(_filename);

const obtenerClasificacion = (plan) => {

    return {
        publica: plan.clasificacionInformacion === "publica" ? "☒" : "☐",

        clasificada: plan.clasificacionInformacion === "clasificada"
            ? "☒"
            : "☐",

        reservada: plan.clasificacionInformacion === "reservada"
            ? "☒"
            : "☐"
    };
}


const obtenerTransporte = (plan) => {

    return {
        sena: plan.tipoTransporte === "SENA" ? "☒" : "☐",

        externo: plan.tipoTransporte === "EXTERNO"
            ? "☒"
            : "☐",

        aprendiz: plan.tipoTransporte === "APRENDIZ"
            ? "☒"
            : "☐"
    };
}


const obtenerContactosEmergencia = (plan) => {

    let html = `
    <table class="table">
            <tr>
                <th>Entidad</th>
                <th>Tipo</th>
                <th>Teléfono</th>
                <th>Ciudad</th>
            </tr>
   `;

    for (const contacto of plan.contactosEmergencia.contactosBase) {

        html += `
   <tr>
   <td>${contacto.nombreEntidad}</td>
   <td>${contacto.tipoContacto}</td>
   <td>${contacto.telefonoPrincipal}</td>
   <td>${contacto.ciudad}</td>
   </tr>
   `;
    }

    const otro = plan.contactosEmergencia.otro;

    if (otro?.nombreEntidad) {

        html += `
   <tr>
   <td>${otro.nombreEntidad}</td>
   <td>Contacto adicional</td>
   <td>${otro.telefono}</td>
   <td>${otro.ciudad}</td>
   </tr>
   `;
    }

    html += `
    </table>
    `;

    return html;
}


const obtenerArticulacion = (plan) => {

    const articulacion = plan.articulacionFormativa;

    if (!articulacion) {
        return "No registra";
    }

    const otro = articulacion.otro &&
        articulacion.otro !== "false"
        ? articulacion.otro
        : "";

    return `
   ${articulacion.proyectoFormativo ? "☒" : "☐"} Proyecto Formativo
   ${articulacion.visitaEmpresa ? "☒" : "☐"} Visita Empresarial
   ${articulacion.investigacion ? "☒" : "☐"} Investigación
   ${otro ? "☒" : "☐"} Otro
   ${otro ? `: ${otro}` : ""}
   `;
}


const obtenerSoportes = (plan) => {

    const contexto = plan.contextoAcademico;

    if (!contexto) {
        return "No registra";
    }

    let html = "";

    html += `
    <b>Planeación pedagógica:</b><br>
    ${contexto.objetivoSoporteLink || "No registra"}<br><br>
    `;

    html += `
    <b>Actas de buen comportamiento:</b><br>
    ${contexto.actasComportamientoLink || "No registra"}<br><br>
    `;

    if (contexto.consentimientoMenores) {

        html += `
        <b>Consentimiento Informado:</b><br>
        ${contexto.consentimientoLink || "No registra"}
        `;
    } else {

        html += `
         <b>Consentimiento Informado:</b><br>
         No aplica
        `;
    }

    return html;
}


const obtenerPlanTrabajo = (plan) => {

    const actividades = plan.planTrabajo;

    if (!actividades) {
        "No registra";
    }

    let html = `
         <table class="table">
            <tr>
                <th>#</th>
                <th>Hora Inicio</th>
                <th>Hora Fin</th>
                <th>Actividad</th>
                <th>Descripción</th>
                <th>Lugar</th>
            </tr>
        `;

    for (const actividad of actividades)

        html += `
         <tr>
   <td>${actividad.numero}</td>
   <td>${actividad.horaInicio}</td>
   <td>${actividad.horaFin}</td>
   <td>${actividad.actividad}</td>
   <td>${actividad.descripcion}</td>
   <td>${actividad.lugar}</td>
   </tr>
        `;

    html += `
        </table>
        `;

    return html;
}


const obtenerEpp = (plan) => {

    const elementos = plan.epp;

    if (!elementos?.length) {
        "No registra";
    }

    let html = `
         <table class="table">
            <tr>
                <th>Elementos</th>
                <th>Categoría</th>
                <th>Nivel de protección</th>
                <th>Descripción</th>
            </tr>
        `;

    for (const elemento of elementos)

        html += `
         <tr>
   <td>${elemento.nombreEPP}</td>
   <td>${elemento.categoria}</td>
   <td>${elemento.nivelProteccion}</td>
   <td>${elemento.descripcion}</td>
   </tr>
        `;

    html += `
        </table>
        `;

    return html;
}


const obtenerAprendices = (plan) => {

    const aprendices = plan.aprendicesId;

    if (!aprendices) {
        return "No registra";
    }

    let html = `
         <table class="table">
            <tr>
                <th>#</th>
                <th>Aprendiz</th>
                <th>Documento</th>
                <th>EPS</th>
                <th>Contacto de emergencia</th>
                <th>Condiciones médicas</th>
            </tr>
        `;

    let numero = 1;

    for (const aprendiz of aprendices) {

        html += `
                 <tr>
     <td>${numero++}</td>
     <td>${aprendiz.nombre} ${aprendiz.apellido}</td>
     <td>${aprendiz.documento}</td>
     <td>${aprendiz.eps}</td>
     <td>${aprendiz.contactoEmergencia}</td>
     <td>${aprendiz.condicionesMedicas || "Ninguna"}</td>
      </tr>
    `;
    }

    html += `
    </table>
    `;

    return html;
}


const obtenerRiesgos = (plan) => {

    const riesgos = plan.riesgosId;

    if (!riesgos?.length) {
        return "No registra";
    }

    let html = `
        <table class="table">
            <tr>
                <th>#</th>
                <th>Peligro</th>
                <th>Categoría</th>
                <th>Riesgo</th>
                <th>Nivel</th>
                <th>Consecuencia</th>
                <th>Prevención</th>
            </tr>
        `;

    let numero = 1;

    for (const riesgo of riesgos) {

        html += `
                         <tr>
     <td>${numero++}</td>
     <td>${riesgo.peligroId?.nombre ?? ""}</td>
     <td>${riesgo.peligroId?.categoria ?? ""}</td>
     <td>${riesgo.nombre}</td>
     <td>${riesgo.nivelRiesgo}</td>
     <td>${riesgo.consecuencia}</td>
     <td>${riesgo.medidasPrevencion}</td>
      </tr>
            `;
    }

    html += `
     </table>
    `;

    return html;
}


const obtenerProtocolos = (plan) => {

    const riesgos = plan.riesgosId;

    const protocolosMostrados = new Set();

    let html = `
        <table class="table">
            <tr>
                <th>#</th>
                <th>Emergencia</th>
                <th>Acción inmediata</th>
                <th>Responsable</th>
                <th>Comunicación</th>
            </tr>
        `;

    let numero = 1;

    for (const riesgo of riesgos) {

        for (const protocolo of riesgo.protocolos) {

            const id = protocolo._id.toString();

            if (protocolosMostrados.has(id)) {
                continue;
            }

            protocolosMostrados.add(id);

            html += `
                   <tr>
                    <td>${numero++}</td>
                    <td>${protocolo.tipoEmergencia}</td>
                    <td>${protocolo.accionInmediata}</td>
                    <td>${protocolo.responsable}</td>
                    <td>${protocolo.medioComunicacion}</td>
                </tr>
                `;
        }
    }

    html += `
    </table>
    `;

    return html;
}


const obtenerSeguridadVial = (plan) => {

    if (
        !plan.seguridadVial?.aplica ||
        !plan.seguridadVial.items?.length
    ) {
        return "No aplica";
    }

    let html = `
            <table class="table">
            <tr>
                <th>Ítem</th>
                <th>Cumple</th>
                <th>Observación</th>
            </tr>
    `;

    for (const item of plan.seguridadVial.items) {

        html += `
            <tr>
                <td>${item.nombre}</td>
                <td>${item.cumple ? "Sí" : "No"}</td>
                <td>${item.observacion || ""}</td>
            </tr>
        `;
    }

    html +=
        "</table>";

    return html;
}


const llenarTemplate = async (html, plan) => {

    let htmlFinal = html;

    const rutaLogo = path.join(
        _dirname,
        "../assets/logo-sena.png"
    );

    const logoBuffer = await fs.readFile(rutaLogo);

    const logoBase64 = logoBuffer.toString("base64");

    const logo = `data:image/png;base64,${logoBase64}`;

    const clasificacion = obtenerClasificacion(plan);
    const transporte = obtenerTransporte(plan);

    const variables = {
        logo,
        codigo: "Código Plan",
        numeroPlan: plan.numero,
        programa: plan.programaFormacionNombre,
        instructor: plan.usuarioNombre,
        ficha: plan.programaFormacionId?.ficha,
        cantidadAprendices: plan.aprendicesId?.length ?? 0,

        fechaSalida: new Date(plan.fecha)
            .toLocaleDateString("es-CO", {
                day: "numeric",
                month: "long",
                year: "numeric"
            }),

        lugarSalida: plan.lugarSalida,
        lugarDestino: plan.lugarDestino,
        horaSalida: plan.horaSalida,
        horaRegreso: plan.horaRegreso,
        contactoLugar: plan.contactoLugar,
        descripcionActividad: plan.descripcionActividad,

        objetivo: plan.contextoAcademico.objetivo,
        competencia: plan.contextoAcademico.competencia,
        resultados: plan.contextoAcademico.resultadoAprendizaje,

        publica: clasificacion.publica,
        clasificada: clasificacion.clasificada,
        reservada: clasificacion.reservada,

        sena: transporte.sena,
        externo: transporte.externo,
        aprendiz: transporte.aprendiz,

        contactosEmergencia: obtenerContactosEmergencia(plan),
        articulacion: obtenerArticulacion(plan),
        soportes: obtenerSoportes(plan),
        planTrabajo: obtenerPlanTrabajo(plan),
        epp: obtenerEpp(plan),
        aprendices: obtenerAprendices(plan),
        riesgos: obtenerRiesgos(plan),
        protocolos: obtenerProtocolos(plan),
        seguridadVial: obtenerSeguridadVial(plan),

        observaciones: plan.observaciones
    };

    for (const [clave, valor] of Object.entries(variables)) {

        htmlFinal = htmlFinal.replaceAll(
            `{{${clave}}}`,
            valor ?? ""
        );
    }

    return htmlFinal;
}


export const generarDocumentoPdf = async (plan) => {

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
        plan
    );

    const browser = await puppeteer.launch({
        headless: true
    });

    const page = await browser.newPage();

    await page.setContent(htmlFinal, {
        waitUntil: "networkidle0"
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

    await browser.close();

    return pdf;
}
