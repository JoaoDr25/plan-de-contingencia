import usuarioService from "../services/usuarioService.js";

export const crearUsuario = async (req, res, next) => {
    try {
        const nuevoUsuario = await usuarioService.create(req.body);

         res.status(201).json({
            mensaje: "Usuario creado correctamente",
            usuario: nuevoUsuario
        });
    } catch (error) {
        next(error);
    }
}


export const listarUsuario = async (req, res, next) => {
    try {
        const listar = await usuarioService.getAll();

         res.status(200).json({
            mensaje: "Usuarios obtenidos exitosamente",
            usuarios: listar
        });
    } catch (error) {
         next(error);
    }
}


export const obtenerUsuarioId = async (req, res, next) => {
    try {
        const obtenerId = await usuarioService.getById(req.params.id);

          res.status(200).json({
            mensaje: "Usuario obtenido exitosamente",
            usuario: obtenerId
        });
    } catch (error) {
        next(error);
    }
}


export const actualizarUsuarioId = async (req, res, next) => {
    try {
        const actualizar = await usuarioService.updateById(req.params.id, req.body);

         res.status(200).json({
            mensaje: "Usuario actualizado correctamente",
            usuario: actualizar
        });
    } catch (error) {
        next(error);
    }
}


export const eliminarUsuarioId = async (req, res, next) => {
    try {
        const eliminar = await usuarioService.deleteById(req.params.id);

        res.status(200).json({
            mensaje: "Usuario eliminado exitosamente",
            usuario: eliminar
        });
    } catch (error) {
         next(error);
    }
}
