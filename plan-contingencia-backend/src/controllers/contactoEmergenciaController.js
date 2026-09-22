import contactoEmergenciaService from "../services/contactoEmergenciaService.js";
import { sendSuccess } from "../utils/apiResponse.js";

export const crearContactoEmergencia = async (req, res, next) => {
    try {
        const nuevoContacto = await contactoEmergenciaService.create(req.body);

        sendSuccess(res, {
            statusCode: 201,
            message: "Contacto de emergencia creado correctamente",
            data: nuevoContacto
        });
    } catch (error) {
        next(error);
    }
}


export const listarContactosEmergencia = async (req,res, next) => {
    try {
        const listar = await contactoEmergenciaService.getAll(req.query);

         sendSuccess(res, {
            message: "Contactos de emergencia obtenidos exitosamente",
            data: listar
        });
    } catch (error) {
        next(error);
    }
}


export const obtenerContactoEmergenciaId = async (req, res, next) => {
    try {
        const obtenerId = await contactoEmergenciaService.getById(req.params.id);

            sendSuccess(res, {
                message: "Contacto de emergencia obtenido exitosamente",
                data: obtenerId
        });
    } catch (error) {
       next(error);
    }
}


export const actualizarContactoEmergenciaId = async (req, res, next) => {
    try {
        const actualizar = await contactoEmergenciaService.updateById(req.params.id, req.body);

        sendSuccess(res, {
            message: "Contacto de emergencia actualizado correctamente",
            data: actualizar
        });
    } catch (error) {
       next(error);
    }
}


export const cambiarEstadoContactoEmergenciaId = async (req, res, next) => {
    try {
        const { estado } = req.body;

        const cambiarEstado = await contactoEmergenciaService.cambiarEstadoId(req.params.id, estado);

        sendSuccess(res, {
            message: `Contacto de emergencia ${cambiarEstado.estado === "Activo" ? "activado" : "desactivado"} exitosamente`,
            data: cambiarEstado
        });
    } catch (error) {
        next(error);
    }
}


export const eliminarContactoEmergenciaId = async (req, res, next) => {
    try {
        const eliminar = await contactoEmergenciaService.deleteById(req.params.id);

        sendSuccess(res, {
            message: "Contacto de emergencia eliminado exitosamente",
            data: eliminar
        });
    } catch (error) {
        next(error);
    }
}
