import mongoose from "mongoose";
import PlanContingencia from "../models/planContingenciaModels.js";

export const validarCuerpoNoVacio = (req, res, next) => {

    try {
        if (!req.body || Object.keys(req.body).length === 0) {
            return res.status(400).json({ mensaje: "El cuerpo de la petición no puede estar vacío" });
        }
        next();

    } catch (error) {
        return res.status(500).json({
            mensaje: "Error al validar el cuerpo de la petición",
            error: error.message
        });
    };
};


// Función Privada
const calcularCamposFaltantes = (plan) => {
    const camposFaltantes = [];

    if (!plan.clasificacionInformacion) camposFaltantes.push("clasificacionInformacion");
    if (!plan.programaFormacionId) camposFaltantes.push("programaFormacionId");
    if (!plan.actividadId) camposFaltantes.push("actividadId");
    if (!plan.instructorId) camposFaltantes.push("instructorId");
    if (!plan.instructorNombre) camposFaltantes.push("instructorNombre");
    if (!plan.fecha) camposFaltantes.push("fecha");
    if (!plan.lugar) camposFaltantes.push("lugar");
    if (!plan.contactoLugar) camposFaltantes.push("contactoLugar");

    const articulacion = plan?.articulacionFormativa;
    if (!articulacion || (!articulacion.proyectoFormativo && !articulacion.visitaEmpresa && !articulacion.investigacion && !articulacion.otro?.trim())) {
        camposFaltantes.push("articulacionFormativa (Debe seleccionar al menos una opción o especificar en 'otro')");
    }

    if (!plan?.contactosEmergencia?.centroSalud) camposFaltantes.push("contactosEmergencia.centroSalud");
    if (!plan?.contactosEmergencia?.policia) camposFaltantes.push("contactosEmergencia.policia");
    if (!plan?.contactosEmergencia?.poliza) camposFaltantes.push("contactosEmergencia.poliza");

    if (!plan?.planTrabajo?.length) {
        camposFaltantes.push("planTrabajo");
    }

    if (!plan?.contextoAcademico?.objetivoSoporteLink) camposFaltantes.push("contextoAcademico.objetivoSoporteLink");
    if (!plan?.contextoAcademico?.actasComportamientoLink) camposFaltantes.push("contextoAcademico.actasComportamientoLink");
    if (plan?.contextoAcademico?.consentimientoMenores && !plan?.contextoAcademico?.consentimientoLink) {
        camposFaltantes.push("contextoAcademico.consentimientoLink");
    }

    if (plan?.seguridadVial?.aplica && plan?.seguridadVial?.items?.length > 0) {
        plan.seguridadVial.items.forEach((item, index) => {
            if (item.aplica && !item.soporteLink) {
                camposFaltantes.push(`Seguridad Vial: Soporte link en ítem ${index + 1}`);
            }
        });
    }

    return camposFaltantes;
};


export const validarEstadoPlan = async (req, res, next) => {

    try {
        const { id } = req.params;
        const { estado: nuevoEstado } = req.body;
        const estadosValidos = ["borrador", "aprobado", "ejecutado"];

        if (!nuevoEstado) {
            return res.status(400).json({ mensaje: "Debe enviar el campo 'estado'" });
        }

        if (nuevoEstado && !estadosValidos.includes(nuevoEstado)) {
            return res.status(400).json({ mensaje: `El estado '${nuevoEstado}' no es válido. Estados permitidos: ${estadosValidos.join(", ")}` })
        }

        const planExistente = await PlanContingencia.findById(id);

        if (!planExistente) {
            return res.status(404).json({ mensaje: "Plan de contingencia no encontrado para validar la transición de estado" })
        }

        const estadoActual = planExistente.estado;

        if (nuevoEstado === "aprobado" && estadoActual !== "aprobado") {
            const camposFaltantes = calcularCamposFaltantes(planExistente);
            if (camposFaltantes.length > 0) {
                return res.status(400).json({
                    mensaje: "No se puede aprobar el plan: faltan requisitos obligatorios",
                    campos: camposFaltantes
                });
            }
        }

        if (estadoActual === "ejecutado" && (nuevoEstado === "aprobado" || nuevoEstado === "borrador")) {
            return res.status(400).json({ mensaje: "No se permite cambiar de estado 'ejecutado' a 'aprobado' o 'borrador'" });
        }

        next();

    } catch (error) {
        return res.status(500).json({
            mensaje: "Error al validar el estado del plan",
            error: error.message
        });
    }
};
