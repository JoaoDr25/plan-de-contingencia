import protocoloService from "../services/protocoloService.js";
import { sendSuccess } from "../utils/apiResponse.js";

export const crearProtocolo = async (req, res, next) => {
    try {
        const nuevoProtocolo = await protocoloService.create(req.body);

        return sendSuccess(res, {
            statusCode: 201,
            message: "Protocolo creado exitosamente",
            data: nuevoProtocolo
        });
    } catch (error) {
       next(error);
    }
}


export const listarProtocolos = async (req, res, next) => {
    try {
        const listar = await protocoloService.getAll(req.query);

        return sendSuccess(res, {
            message: "Lista de protocolos obtenidos exitosamente",
            data: listar
        });
    } catch (error) {
      next(error);
    }
}


export const obtenerProtocoloId = async (req, res, next) => {
    try {
        const obtenerId = await protocoloService.getById(req.params.id);

        return sendSuccess(res, {
            message: "Protocolo obtenido exitosamente",
            data: obtenerId
        });
    } catch (error) {
        next(error);
    }
}


export const actualizarProtocoloId = async (req, res, next) => {
    try {
        const actualizar = await protocoloService.updateById(req.params.id, req.body);

        return sendSuccess(res, {
            message: "Protocolo actualizado exitosamente",
            data: actualizar
        });
    } catch (error) {
       next(error);
    }
}


export const eliminarProtocoloId = async (req, res, next) => {
    try {
        const eliminar = await protocoloService.deleteById(req.params.id);

        return sendSuccess(res, {
            message: "Protocolo eliminado exitosamente",
            data: eliminar
        });
    } catch (error) {
        next(error);
    }
}


export const cambiarEstadoProtocoloId = async (req, res, next) => {
    try {
        const { estado } = req.body;

        const cambiarEstado = await protocoloService.cambiarEstadoId(req.params.id, estado);

        return sendSuccess(res, {
            message: `Protocolo ${cambiarEstado.estado === "Activo" ? "activado" : "desactivado"} exitosamente`,
            data: cambiarEstado
        });
    } catch (error) {
        next(error);
    }
}

