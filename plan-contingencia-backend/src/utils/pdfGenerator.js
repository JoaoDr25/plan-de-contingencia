import puppeteer from 'puppeteer';
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const _filename = fileURLToPath(import.meta.url);
const _dirname = path.dirname(_filename);

const obtenerClasificacion = (plan) => {

}

const obtenerTransporte = (plan) => {

}

const obtenerContactosEmergencia = (plan) => {

}

const obtenerArticulacion = (plan) => {

    const articulacion = plan.articulacionFormativa;

    if (!articulacion) {
        return "";
    }

    const opciones = [];

    if (articulacion.proyectoFormativo) {
        opciones.push("Proyecto Formativo");
    }

    if (articulacion.visitaEmpresa) {
        opciones.push("Visita Empresarial");
    }

    if (articulacion.investigacion) {
        opciones.push("Investigación");
    }

    if (articulacion.otro?.trim()) {
        opciones.push(articulacion.otro);
    }

    if (opciones.length === 0) {
        return "No registra"
    }

    return opciones.join("<br>");
}

const obtenerSoportes = (plan) => {

}

const obtenerPlanTrabajo = (plan) => {

}

const obtenerEpp = (plan) => {

}

const obtenerAprendices = (plan) => {

}

const obtenerRiesgos = (plan) => {

}

const obtenerProtocolos = (plan) => {

}

const obtenerPlanAccion = (plan) => {

}

const obtenerSeguridadVial = (plan) => {

}

const llenarTemplate = (html, plan) => {

    let htmlFinal = html;

    const variables = {
        codigo: "GOR-F-036",
        numeroPlan: plan.numero,
        programa: plan.programaFormacionNombre,
        instructor: plan.usuarioNombre,
        ficha: plan.programaFormacionId?.ficha,
        cantidadAprendices: plan.aprendicesId?.length ?? 0,
        fechaSalida: plan.fecha,
        lugarSalida: plan.lugarSalida,
        lugarDestino: plan.lugarDestino,
        horaSalida: plan.horaSalida,
        horaRegreso: plan.horaRegreso,
        contactoLugar: plan.contactoLugar,
        descripcionActividad: plan.descripcionActividad,

        clasificacion: obtenerClasificacion(plan),
        transporte: obtenerTransporte(plan),
        salud: obtenerContactosEmergencia(plan).salud,
        policia: obtenerClasificacion(plan).policia,
        poliza: obtenerContactosEmergencia(plan).poliza,
        otro: obtenerContactosEmergencia(plan).otro,
        articulacion: obtenerArticulacion(plan),
        soportes: obtenerSoportes(plan),

        objetivo: plan.contextoAcademico.objetivo,
        competencia: plan.contextoAcademico.competencia,
        resultados: plan.contextoAcademico.resultadosAprendizaje,

       planTrabajo: obtenerPlanTrabajo(plan),
       epp: obtenerEpp(plan),
       aprendices: obtenerAprendices(plan),
       riesgos: obtenerRiesgos(plan),
       protocolos: obtenerProtocolos(plan),
       acciones: obtenerPlanAccion(plan),
       seguridad: obtenerSeguridadVial(plan)
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

    const htmlFinal = llenarTemplate(
        html,
        plan
    );

    console.log(htmlFinal);

    const browser = await puppeteer.launch({
        headless: true
    });

    const page = await browser.newPage();

    page.setContent(htmlFinal);

    await page.setContent(htmlFinal, {
        waitUntil: "networkidle0"
    });

    const pdf = await page.pdf({
        format: "A4",
        printBackground: true
    });

    await browser.close();

    return pdf;
}
