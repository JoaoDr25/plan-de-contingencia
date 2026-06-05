import riesgoService from "../services/riesgoService.js";

export const crearRiesgo = async (req, res) => {
    try {
        const nuevoRiesgo = await riesgoService.create(req.body);

        return res.status(201).json({
            mensaje: "Riesgo creado exitosamente",
            riesgo: nuevoRiesgo
        });
    } catch (error) {
        if (error.name === "ValidationError") {
            return res.status(400).json({
                mensaje: "Error en la validación de los datos"
            })
        }
        return res.status(500).json({
            mensaje: "Error al crear el riesgo",
            error: error.message
        });
    }
};


export const listarRiesgos = async (req, res) => {
    try {
        const listar = await riesgoService.getAll();

        return res.status(200).json({
            mensaje: "Lista de riesgos obtenidos exitosamente",
            riesgos: listar
        });
    } catch (error) {
        return res.status(500).json({
            mensaje: "Error al listar los riesgos",
            error: error.message
        });
    }
};


export const obtenerRiesgoid = async (req, res) => {
    try {
        const obtenerId = await riesgoService.getById(req.params.id)

        return res.status(200).json({
            mensaje: "Riesgo obtenido exitosamente",
            riesgo: obtenerId
        });
    } catch (error) {
        return res.status(500).json({
            mensaje: "Error al obtener el riesgo",
            error: error.message
        });
    }
};


export const actualizarRiesgoId = async (req, res) => {
    try {
        const actualizar = await riesgoService.updateById(req.params.id, req.body);

        return res.status(200).json({
            mensaje: "Riesgo actualizado exitosamente",
            riesgo: actualizar
        });

    } catch (error) {
        if (error.name === "ValidationError") {
            return res.status(400).json({ mensaje: "Los datos proporcionados no son válidos" });
        }
        return res.status(500).json({
            mensaje: "Error al actualizar el riesgo",
            error: error.message
        });
    }
};


export const eliminarRiesgoId = async (req, res) => {
    try {
        const eliminar = await riesgoService.deleteById(req.params.id);

        return res.status(200).json({
            mensaje: "Riesgo eliminado exitosamente",
            riesgo: eliminar
        });

    } catch (error) {
        return res.status(500).json({
            mensaje: "Error al eliminar el riesgo",
            error: error.message
        });
    }
};


export const asociarProtocolosRiesgo = async (req, res) => {
    try {
        const { protocoloId } = req.body;

        const asociar = await riesgoService.asociarProtocoloRiesgo(req.params.id, protocoloId);

        return res.status(200).json({
            mensaje: "Protocolos asociados obtenidos exitosamente",
            asociar: asociar
        });
    } catch (error) {
        return res.status(500).json({
            mensaje: "Error al asociar el protocolo al riesgo",
            error: error.message
        });
    }
}


export const obtenerAsociacionProtocoloRiesgo = async (req, res) => {
    try {
        const obtenerAsociacion = await riesgoService.obtenerProtocoloRiesgo(req.params.id);

        return res.status(200).json({
            mensaje: "Protocolos asociados obtenidos exitosamente",
            asociar: obtenerAsociacion
        });
    } catch (error) {
        return res.status(500).json({
            mensaje: "Error al obtener el riesgo",
            error: error.message
        });
    }
}


export const eliminarAsociacionProtocoloRiesgo = async (req, res) => {
    try {
        const eliminarAsociacion = await riesgoService.eliminarProtocoloRiesgo(req.params.id, req.params.protocoloId);

        return res.status(200).json({
            mensaje: "Asociación de protocolo eliminado exitosamente",
            asociar: eliminarAsociacion
        });
    } catch (error) {
        return res.status(500).json({
            mensaje: "Error al eliminar la asociación",
            error: error.message
        });
    }
}
