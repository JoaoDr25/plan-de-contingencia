import PlanContingencia from "../models/planContingenciaModel.js";

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


export const calcularCamposFaltantes = (plan) => {
    const camposFaltantes = [];

    if (!plan.clasificacionInformacion) camposFaltantes.push("clasificacionInformacion");
    if (!plan.programaFormacionId) camposFaltantes.push("programaFormacionId");
    if (!plan.actividadId) camposFaltantes.push("actividadId");
    if (!plan.usuarioId) camposFaltantes.push("usuarioId");
    if (!plan.usuarioNombre) camposFaltantes.push("usuarioNombre");
    if (!plan.fecha) camposFaltantes.push("fecha");
    if (!plan.lugar) camposFaltantes.push("lugar");
    if (!plan.contactoLugar) camposFaltantes.push("contactoLugar");

    const articulacion = plan?.articulacionFormativa;
    if (!articulacion || (!articulacion.proyectoFormativo && !articulacion.visitaEmpresa && !articulacion.investigacion && !articulacion.otro?.trim())) {
        camposFaltantes.push("articulacionFormativa (Debe seleccionar al menos una opción o especificar en 'otro')");
    }

    if (!plan.contactosEmergencia?.contactosBase?.length && !plan.contactosEmergencia?.otro.nombreEntidad) {
        camposFaltantes.push("contactosEmergencia")
    };

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
            if (item.cumple && !item.soporte) {
                camposFaltantes.push(`Seguridad Vial.items [${index}]`
                );
            }
        });
    }

    if (!plan.epp?.length) {
        camposFaltantes.push("epp");
    }

    if (!plan.riesgosId?.length) {
        camposFaltantes.push("riesgosId");
    }

    if (!plan.aprendicesId?.length) {
        camposFaltantes.push("aprendicesId")
    }

    return camposFaltantes;
};


export const validarEstadoPlan = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { estado: nuevoEstado } = req.body;

        const estadosValidos = [
            "borrador", 
            "en revision", 
            "aprobado", 
            "cancelado", 
            "ejecutado"];

        if (!nuevoEstado) {
            return res.status(400).json({
                mensaje: "Debe enviar el campo 'estado'"
            });
        }

        if (nuevoEstado && !estadosValidos.includes(nuevoEstado)) {
            return res.status(400).json({
                mensaje: `El estado '${nuevoEstado}' no es válido. Estados permitidos: ${estadosValidos.join(", ")}`
            })
        }

        const planExistente = await PlanContingencia.findById(id);

        if (!planExistente) {
            return res.status(404).json({
                mensaje: "Plan de contingencia no encontrado para validar la transición de estado"
            })
        }

        const estadoActual = planExistente.estado;

        const transicionesPermitidas = {
            "borrador": [
                "en revision",
                "cancelado"
            ],
            "en revision": [
                "aprobado",
                "cancelado",
                "borrador"
            ],
            "aprobado": [
                "ejecutado",
                "cancelado",
                "borrador"
            ],
            "ejecutado": [],
            "cancelado": [],
        }

        if (!transicionesPermitidas[estadoActual].includes(nuevoEstado)
        ) {
            return res.status(400).json({
                mensaje:
                `No se permite cambiar de '${estadoActual}' a '${nuevoEstado}' `
            });
        }

        next();

    } catch (error) {
        next(error)

    }
};
