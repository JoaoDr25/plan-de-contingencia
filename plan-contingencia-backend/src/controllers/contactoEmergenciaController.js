import contactoEmergenciaService from "../services/contactoEmergenciaService.js";

export const crearContactoEmergencia = async (req, res, next) => {
    try {
        const nuevoContacto = await contactoEmergenciaService.create(req.body);

        res.status(201).json({
            mensaje: "Contacto de emergencia creado correctamente",
            contacto: nuevoContacto
        });
    } catch (error) {
        next(error);
    }
}


export const listarContactosEmergencia = async (req,res, next) => {
    try {
        const listar = await contactoEmergenciaService.getAll({ estado: true });

         res.status(200).json({
            mensaje: "Contactos de emergencia activos obtenidos exitosamente",
            contactos: listar
        });
    } catch (error) {
        next(error);
    }
}


export const obtenerContactoEmergenciaId = async (req, res, next) => {
    try {
        const obtenerId = await contactoEmergenciaService.getById(req.params.id);

         res.status(200).json({
            mensaje: "Contacto de emergencia obtenido exitosamente",
            contacto: obtenerId
        });
    } catch (error) {
       next(error);
    }
}


export const actualizarContactoEmergenciaId = async (req, res, next) => {
    try {
        const actualizar = await contactoEmergenciaService.updateById(req.params.id, req.body);

        res.status(200).json({
            mensaje: "Contacto de emergencia actualizado correctamente",
            contacto: actualizar
        });
    } catch (error) {
       next(error);
    }
}


export const cambiarEstadoContactoEmergenciaId = async (req, res, next) => {
    try {
        const { estado } = req.body;

        const cambiarEstado = await contactoEmergenciaService.cambiarEstadoId(req.params.id, estado);

        res.status(200).json({
            mensaje: `Contacto de emergencia ${estado ? "activado" : "desactivado"} exitosamente`,
            contacto: cambiarEstado
        });
    } catch (error) {
        next(error);
    }
}


export const eliminarContactoEmergenciaId = async (req, res, next) => {
    try {
        const eliminar = await contactoEmergenciaService.deleteById(req.params.id);

        res.status(200).json({
            mensaje: "Contacto de emergencia eliminado exitosamente",
            contacto: eliminar
        });
    } catch (error) {
        next(error);
    }
}
