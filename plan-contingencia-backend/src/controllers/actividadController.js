import actividadService from "../services/actividadService.js";
import { sendSuccess } from "../utils/apiResponse.js";

export const crearActividad = async (req, res, next) => {
    try {
        const nuevaActividad = await actividadService.create(req.body);

        sendSuccess(res, {
            statusCode: 201,
            message: "Actividad creada exitosamente",
            data: nuevaActividad
        });
    } catch (error) {
        next(error);
    }
};


export const listarActividades = async (req, res, next) => {
    try {
        const listar = await actividadService.getAll(req.query);

        return sendSuccess(res, {
            message: "Lista de actividades obtenidas exitosamente",
            data: listar
        });
    } catch (error) {
        next(error);
    }
};


export const obtenerActividadId = async (req, res, next) => {
    try {
        const obtenerId = await actividadService.getById(req.params.id);

        return sendSuccess(res, {
            message: "Actividad obtenida exitosamente",
            data: obtenerId
        });
    } catch (error) {
        next(error);
    }
};


export const actualizarActividadId = async (req, res, next) => {
    try {
        const actualizar = await actividadService.updateById(req.params.id, req.body);

        return sendSuccess(res, {
            message: "Actividad actualizada exitosamente",
            data: actualizar
        });
    } catch (error) {
        next(error);
    }
};


export const eliminarActividadId = async (req, res, next) => {
    try {
        const eliminar = await actividadService.deleteById(req.params.id);

        return sendSuccess(res, {
            message: "Actividad eliminada exitosamente",
            data: eliminar
        });
    } catch (error) {
        next(error);
    }
};