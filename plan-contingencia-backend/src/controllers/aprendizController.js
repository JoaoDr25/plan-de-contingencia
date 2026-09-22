import aprendizService from "../services/aprendizService.js";
import { sendSuccess } from "../utils/apiResponse.js";

export const crearAprendiz = async (req, res, next) => {
    try {
        const nuevoAprendiz = await aprendizService.create(req.body);

        sendSuccess(res, {
            statusCode: 201,
            message: "Aprendiz creado correctamente",
            data: nuevoAprendiz
        });
    } catch (error) {
       next(error);
    }
};


export const listarAprendiz = async (req, res, next) => {
    try {
        const listar = await aprendizService.getAll(req.query);

        sendSuccess(res, {
            message: "Aprendices obtenidos exitosamente",
            data: listar
        });
    } catch (error) {
       next(error);
    }
};


export const obtenerAprendizId = async (req, res, next) => {
    try {
        const obtenerId = await aprendizService.getById( req.params.id );

        sendSuccess(res, {
            message: "Aprendiz obtenido exitosamente",
            data: obtenerId
        });
    } catch (error) {
       next(error);
    }
};


export const actualizarAprendizId = async (req, res, next) => {
    try {
        const actualizar = await aprendizService.updateById( req.params.id, req.body );

        sendSuccess(res, {
            message: "Aprendiz actualizado correctamente",
            data: actualizar
        });
    } catch (error) {
        next(error);
    }
};


export const cambiarEstadoAprendizId = async (req, res, next) => {
    try {
        const { estado } = req.body;

        const cambiarEstado = await aprendizService.cambiarEstadoId( req.params.id, estado );

        sendSuccess(res, {
            message: `Aprendiz ${cambiarEstado.estado === "Activo" ? "activado" : "desactivado"} exitosamente`,
            data: cambiarEstado
        });
    } catch (error) {
        next(error);
    }
};


export const eliminarAprendizId = async (req, res, next) => {
    try {
        const eliminar = await aprendizService.deleteById( req.params.id );

        sendSuccess(res, {
            message: "Aprendiz eliminado exitosamente",
            data: eliminar
        });
    } catch (error) {
        next(error);
    }
};
