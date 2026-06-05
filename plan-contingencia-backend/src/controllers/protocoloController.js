import protocoloService from "../services/protocoloService.js";

export const crearProtocolo = async (req, res) => {
    try {
        const nuevoProtocolo = await protocoloService.create(req.body);

        return res.status(201).json({
            mensaje: "Protocolo creado exitosamente",
            protocolo: nuevoProtocolo
        });
    } catch (error) {
        if (error.name === "ValidationError") {
            return res.status(400).json({
                mensaje: "Error en la validación de los datos"
            })
        }
        return res.status(500).json({
            mensaje: "Error al crear el protocolo",
            error: error.message
        });
    }
}


export const listarProtocolos = async (req, res) => {
    try {
        const listar = await protocoloService.getAll();

        return res.status(200).json({
            mensaje: "Lista de protocolos obtenidos exitosamente",
            protocolo: listar
        });
    } catch (error) {
        return res.status(500).json({
            mensaje: "Error al listar los protocolos",
            error: error.message
        });
    }
}


export const obtenerProtocoloId = async (req, res) => {
    try {
        const obtenerId = await protocoloService.getById(req.params.id);

        return res.status(200).json({
            mensaje: "Lista de protocolos obtenidos exitosamente",
            protocolo: obtenerId
        });
    } catch (error) {
        return res.status(500).json({
            mensaje: "Error al obtener el protocolo",
            error: error.message
        });
    }
}


export const actualizarProtocoloId = async (req, res) => {
    try {
        const actualizar = await protocoloService.updateById(req.params.id, req.body);

        return res.status(200).json({
            mensaje: "Protocolo actualizado exitosamente",
            protocolo: actualizar
        });
    } catch (error) {
        if (error.name === "ValidationError") {
            return res.status(400).json({ mensaje: "Los datos proporcionados no son válidos" });
        }
        return res.status(500).json({
            mensaje: "Error al actualizar el protocolo",
            error: error.message
        });
    }
}


export const eliminarProtocoloId = async (req, res) => {
    try {
        const eliminar = await protocoloService.deleteById(req.params.id);

        return res.status(200).json({
            mensaje: "Protocolo eliminado exitosamente",
            protocolo: eliminar
        });
    } catch (error) {
        return res.status(500).json({
            mensaje: "Error al eliminar el protocolo",
            error: error.message
        });
    }
}


export const obtenerRiesgosProtocolo = async (req, res) => {
    try {
        const obtenerAsociacion = await protocoloService.obtenerRiesgoProtocolo(req.params.id);

        return res.status(200).json({
            mensaje: "Protocolos asociados obtenidos exitosamente",
            asociar: obtenerAsociacion
        });
    } catch (error) {
        return res.status(500).json({
            mensaje: "Error al obtener el protocolo asociado al riesgo",
            error: error.message
        });
    }
}
