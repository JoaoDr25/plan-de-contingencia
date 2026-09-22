import eppService from "../services/eppService.js";
import { sendSuccess } from "../utils/apiResponse.js";

export const crearEpp = async (req, res, next) => {
    try {
        const nuevoEPP = await eppService.create(req.body);

            sendSuccess(res, {
                statusCode: 201,
                message: "Elemento de protección personal (EPP) creado correctamente",
                data: nuevoEPP
        });
    } catch (error) {
        next(error);
    }
};


export const listarEpp = async (req, res, next) => {
    try {
        const listar = await eppService.getAll(req.query);

        sendSuccess(res, {
            message: "Lista de elementos de protección personal (EPP) obtenidos exitosamente",
            data: listar
        });
    } catch (error) {  
        next(error);
    }
};


export const obtenerEppId = async (req, res, next) => {
    try {
        const obtenerId = await eppService.getById(req.params.id);

        sendSuccess(res, {
            message: "Elemento de protección personal (EPP) obtenido exitosamente",
            data: obtenerId
        });
    } catch (error) {
        next(error);
    }
};


export const actualizarEppId = async (req, res, next) => {
    try {
        const actualizar = await eppService.updateById(req.params.id, req.body);

        sendSuccess(res, {
            message: "Elemento de protección personal (EPP) actualizado correctamente",
            data: actualizar
        });
    } catch (error) {
          next(error);
    }
};


export const cambiarEstadoEppId = async (req, res, next) => {
    try {
        const { estado } = req.body;
        const cambiarEstado = await eppService.cambiarEstadoId(req.params.id, estado);

        sendSuccess(res, {
            message: `Elemento de protección personal (EPP) ${cambiarEstado.estado === "Activo" ? "activado" : "desactivado"} exitosamente`,
            data: cambiarEstado
        });
    } catch (error) {
        next(error);
    }
};


export const eliminarEppId = async (req, res, next) => {
    try {
        const eliminar = await eppService.deleteById(req.params.id);

        sendSuccess(res, {
            message: "Elemento de protección personal (EPP) eliminado exitosamente",
            data: eliminar
        });
    } catch (error) {
        next(error);
    }
}