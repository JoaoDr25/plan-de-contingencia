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


export const sincronizarUsuarios = async (req, res, next) => {
    try {

        const resultado =
            await usuarioService.sincronizar();

        sendSuccess(res, {
            message: "Usuarios sincronizados exitosamente",
            data: resultado
        });

    } catch (error) {
        next(error);
    }
};


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


export const listarRevisores = async (req, res, next) => {
    try {
        const revisores = await usuarioService.getRevisores();

        sendSuccess(res, {
            message: "Revisores obtenidos exitosamente",
            data: revisores
        });
    } catch (error) {
        next(error);
    }
};


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


export const cambiarRolUsuarioId = async (req, res, next) => {
    try {
        const { rol } = req.body;

        const cambiarRol = await usuarioService.cambiarRolId(
            req.params.id,
            rol
        );

        sendSuccess(res, {
            message: "Rol del usuario actualizado exitosamente",
            data: cambiarRol
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


export const actualizarFirmaUsuarioId = async (req, res, next) => {
    try {
        const { firma, firmaNombre } = req.body;

        const actualizarFirma =
            await usuarioService.actualizarFirma(
                req.params.id,
                req.usuario.usuarioId,
                firma,
                firmaNombre
            );

        sendSuccess(res, {
            message: "Firma del usuario actualizada exitosamente",
            data: actualizarFirma
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
