import usuarioService from "../services/usuarioService.js";
import { sendSuccess } from "../utils/apiResponse.js";

export const crearUsuario = async (req, res, next) => {
    try {
        const nuevoUsuario = await usuarioService.create(req.body);

            sendSuccess(res, {
                statusCode: 201,
                message: "Usuario creado correctamente",
                data: nuevoUsuario
        });
    } catch (error) {
        next(error);
    }
}


export const listarUsuario = async (req, res, next) => {
    try {
        const listar = await usuarioService.getAll(req.query);

         sendSuccess(res, {
            message: "Usuarios obtenidos exitosamente",
            data: listar
        });
    } catch (error) {
         next(error);
    }
}


export const obtenerUsuarioId = async (req, res, next) => {
    try {
        const obtenerId = await usuarioService.getById(req.params.id);

                    sendSuccess(res, {
                        message: "Usuario obtenido exitosamente",
                        data: obtenerId
        });
    } catch (error) {
        next(error);
    }
}


export const actualizarUsuarioId = async (req, res, next) => {
    try {
        const actualizar = await usuarioService.updateById(req.params.id, req.body);

            sendSuccess(res, {
                message: "Usuario actualizado correctamente",
                data: actualizar
        });
    } catch (error) {
        next(error);
    }
}


export const cambiarEstadoUsuarioId = async (req, res, next) => {
    try {
        const { estado } = req.body;
        const cambiarEstado = await usuarioService.cambiarEstadoId(req.params.id, estado);

        sendSuccess(res, {
            message: `Usuario ${cambiarEstado.estado === "Activo" ? "activado" : "desactivado"} exitosamente`,
            data: cambiarEstado
        });
    } catch (error) {
        next(error);
    }
};


export const registrarAccesoUsuarioId = async (req, res, next) => {
    try {
        const registrarAcceso = await usuarioService.registrarAcceso(req.params.id);

        sendSuccess(res, {
            message: "Último acceso registrado exitosamente",
            data: registrarAcceso
        });
    } catch (error) {
        next(error);
    }
};


export const eliminarUsuarioId = async (req, res, next) => {
    try {
        const eliminar = await usuarioService.deleteById(req.params.id);

        sendSuccess(res, {
            message: "Usuario eliminado exitosamente",
            data: eliminar
        });
    } catch (error) {
         next(error);
    }
}
