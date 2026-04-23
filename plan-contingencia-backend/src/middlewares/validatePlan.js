import mongoose from "mongoose";
import PlanContingencia from "../models/planContingenciaModels.js";

export const validarCuerpoNoVacio = (req, res, next) => {

    if (!req.body || Object.keys(req.body).length === 0) {
        return res.status(400).json({ mensaje: "El cuerpo de la petición no puede estar vacío" });
    }

    next();
};

export const validarEstadoPlan = async (req, res, next) => {
    const { id } = req.params;
    const { estado: nuevoEstado } = req.body;
    const estadosValidos = ["borrador", "aprobado", "ejecutado"];

    if (nuevoEstado && !estadosValidos.includes(nuevoEstado)) {
        return res.status(400).json({ mensaje: `El estado '${nuevoEstado}' no es válido. Estados permitidos: ${estadosValidos.join(", ")}` })
    }

    const planExistente = await PlanContingencia.findById(id);

    if (!planExistente) {
        return res.status(404).json({ mensaje: "Plan de contingencia no encontrado para validar la transición de estado" })
    }

    const estadoActual = planExistente.estado;

    if (nuevoEstado === "aprobado" && estadoActual !== "aprobado") {
        const camposFaltantes = [];

        if (!planExistente.clasificacionInformacion) camposFaltantes.push("clasificacionInformacion");
        if (!planExistente.programaFormacionId) camposFaltantes.push("programaFormacionId");
        if (!planExistente.actividadId) camposFaltantes.push("actividadId");
        if (!planExistente.instructorId) camposFaltantes.push("instructorId");
        if (!planExistente.fecha) camposFaltantes.push("fecha");
        if (!planExistente.lugar) camposFaltantes.push("lugar");


        if (planExistente.contextoAcademico) {
            if (!planExistente.contextoAcademico.objetivoSoporteLink) camposFaltantes.push("contextoAcademico.objetivoSoporteLink");
            if (!planExistente.contextoAcademico.actasComportamientoLink) camposFaltantes.push("contextoAcademico.actasComportamientoLink");
            if (planExistente.contextoAcademico.consentimientoMenores && !planExistente.contextoAcademico.consentimientoLink) {
                camposFaltantes.push("contextoAcademico.consentimientoLink");
            }
        }


        if (planExistente.seguridadVial?.aplica && planExistente.seguridadVial?.items?.length > 0) {
            planExistente.seguridadVial.items.forEach((item, index) => {
                if (item.aplica && !item.soporteLink) {
                    camposFaltantes.push(`Seguridad Vial: Soporte link en ítem ${index + 1}`);
                }
            });
        }

        if (camposFaltantes.length > 0) {
            return res.status(400).json({
                mensaje: "No se puede aprobar el plan, faltan campos o información obligatoria",
                campos: camposFaltantes
            });
        }
    }

    
    if (estadoActual === "aprobado" && nuevoEstado === "borrador") {
        return res.status(400).json({ mensaje: "No se permite cambiar de estado 'aprobado' a 'borrador'" });
    }

    if (estadoActual === "ejecutado" && (nuevoEstado === "aprobado" || nuevoEstado === "borrador")) {
        return res.status(400).json({ mensaje: "No se permite cambiar de estado 'ejecutado' a 'aprobado' o 'borrador'" });
    }

    next();
};
