import contactoEmergenciaService from "../services/contactoEmergenciaService.js";

export const crearContactoEmergencia = async (req, res) => {
    try {
        const nuevoContacto = await contactoEmergenciaService.create(req.body);

        res.status(201).json({
            mensaje: "Contacto de emergencia creado correctamente",
            contacto: nuevoContacto
        });
    } catch (error) {
        if (error.name === "ValidationError") {
            return res.status(400).json({
                mensaje: "Error de validación al crear el contacto de emergencia",
                error: error.message
            });
        }
        return res.status(500).json({
            mensaje: "Error al crear el contacto de emergencia",
            error: error.message
        });
    }
}


export const listarContactosEmergencia = async (req,res) => {
    try {
        const listar = await contactoEmergenciaService.getAll({ estado: true });

         res.status(200).json({
            mensaje: "Contactos de emergencia activos obtenidos exitosamente",
            contactos: listar
        });
    } catch (error) {
         return res.status(500).json({
            mensaje: "Error al obtener los contactos de emergencia",
            error: error.message
        });
    }
}


export const obtenerContactoEmergenciaId = async (req, res) => {
    try {
        const obtenerId = await contactoEmergenciaService.getById(req.params.id);

         res.status(200).json({
            mensaje: "Contacto de emergencia obtenido exitosamente",
            contacto: obtenerId
        });
    } catch (error) {
         return res.status(500).json({
            mensaje: "Error al obtener el contacto de emergencia",
            error: error.message
        });
    }
}


export const actualizarContactoEmergenciaId = async (req, res) => {
    try {
        const actualizar = await contactoEmergenciaService.updateById(req.params.id, req.body);

        res.status(200).json({
            mensaje: "Contacto de emergencia actualizado correctamente",
            contacto: actualizar
        });
    } catch (error) {
        if (error.name === "ValidationError") {
            return res.status(400).json({
                mensaje: "Los datos proporcionados no son válidos",
                error: error.message
            });
        }
        return res.status(500).json({
            mensaje: "Error al actualizar el contacto de emergencia",
            error: error.message
        });
    }
}


export const cambiarEstadoContactoEmergenciaId = async (req, res) => {
    try {
        const { estado } = req.body;

        const cambiarEstado = await contactoEmergenciaService.cambiarEstadoId(req.params.id, estado);

        res.status(200).json({
            mensaje: `Contacto de emergencia ${estado ? "activado" : "desactivado"} exitosamente`,
            contacto: cambiarEstado
        });
    } catch (error) {
        return res.status(500).json({
            mensaje: "Error al cambiar de estado del contacto de emergencia",
            error: error.message
        });
    }
}


export const eliminarContactoEmergenciaId = async (req, res) => {
    try {
        const eliminar = await contactoEmergenciaService.deleteById(req.params.id);

        res.status(200).json({
            mensaje: "Contacto de emergencia eliminado exitosamente",
            contacto: eliminar
        });
    } catch (error) {
         return res.status(500).json({
            mensaje: "Error al eliminar el contacto de emergencia",
            error: error.message
        });
    }
}
