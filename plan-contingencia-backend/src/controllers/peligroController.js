import peligroService from '../services/peligroService.js';
import { sendSuccess } from '../utils/apiResponse.js';

export const crearPeligro = async (req, res, next) => {
    try {
        const nuevoPeligro = await peligroService.create(req.body);

        return sendSuccess(res, {
            statusCode: 201,
            message: "Peligro creado exitosamente",
            data: nuevoPeligro
        });
    } catch (error) {
       next(error);
    }
};


export const listarPeligros = async (req, res, next) => {
    try {
        const listar = await peligroService.getAll(req.query);

        return sendSuccess(res, {
            message: "Lista de peligros obtenidos exitosamente",
            data: listar
        });
    } catch (error) {
        next(error);
    }
};


export const obtenerPeligroId = async (req, res, next) => {
    try {
        const obtenerId = await peligroService.getById(req.params.id)

        return sendSuccess(res, {
            message: "Peligro obtenido exitosamente",
            data: obtenerId
        });
    } catch (error) {
        next(error);
    }
};


export const actualizarPeligroId = async (req, res, next) => {
    try {
        const actualizar = await peligroService.updateById(req.params.id, req.body);

        return sendSuccess(res, {
            message: "Peligro actualizado exitosamente",
            data: actualizar
        });
    } catch (error) {
        next(error);
    }
};


export const eliminarPeligroId = async (req, res, next) => {
    try {
        const eliminar = await peligroService.deleteById(req.params.id);

        return sendSuccess(res, {
            message: "Peligro eliminado exitosamente",
            data: eliminar
        });
    } catch (error) {
        next(error);
    }
};