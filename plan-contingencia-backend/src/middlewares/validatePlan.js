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
