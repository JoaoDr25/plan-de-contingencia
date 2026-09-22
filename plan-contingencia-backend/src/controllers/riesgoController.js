import riesgoService from "../services/riesgoService.js";
import { sendSuccess } from "../utils/apiResponse.js";

export const crearRiesgo = async (req, res, next) => {
    try {
        const nuevoRiesgo = await riesgoService.create(req.body);

        return sendSuccess(res, {
            statusCode: 201,
            message: "Riesgo creado exitosamente",
            data: nuevoRiesgo
        });
    } catch (error) {
      next(error);
    }
};


export const listarRiesgos = async (req, res, next) => {
    try {
        const listar = await riesgoService.getAll(req.query);

        return sendSuccess(res, {
            message: "Lista de riesgos obtenidos exitosamente",
            data: listar
        });
    } catch (error) {
        next(error);
    }
};


export const obtenerRiesgoid = async (req, res, next) => {
    try {
        const obtenerId = await riesgoService.getById(req.params.id)

        return sendSuccess(res, {
            message: "Riesgo obtenido exitosamente",
            data: obtenerId
        });
    } catch (error) {
       next(error);
    }
};


export const actualizarRiesgoId = async (req, res, next) => {
    try {
        const actualizar = await riesgoService.updateById(req.params.id, req.body);

        return sendSuccess(res, {
            message: "Riesgo actualizado exitosamente",
            data: actualizar
        });

    } catch (error) {
       next(error);
    }
};


export const eliminarRiesgoId = async (req, res, next) => {
    try {
        const eliminar = await riesgoService.deleteById(req.params.id);

        return sendSuccess(res, {
            message: "Riesgo eliminado exitosamente",
            data: eliminar
        });

    } catch (error) {
        next(error);
    }
};

