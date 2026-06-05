import usuarioService from "../services/usuarioService.js";

export const crearUsuario = async (req, res) => {
    try {
        const nuevoUsuario = await usuarioService.create(req.body);

         res.status(201).json({
            mensaje: "Usuario creado correctamente",
            usuario: nuevoUsuario
        });
    } catch (error) {
        if (error.name === "ValidationError") {
            return res.status(400).json({
                mensaje: "Error de validación al crear el usuario",
                error: error.message
            });
        }
        return res.status(500).json({
            mensaje: "Error al crear el usuario",
            error: error.message
        });
    }
}


export const listarUsuario = async (req, res) => {
    try {
        const listar = await usuarioService.getAll();

         res.status(200).json({
            mensaje: "Usuarios obtenidos exitosamente",
            usuarios: listar
        });
    } catch (error) {
         return res.status(500).json({
            mensaje: "Error al obtener los usuarios",
            error: error.message
        });
    }
}


export const obtenerUsuarioId = async (req, res) => {
    try {
        const obtenerId = await usuarioService.getById(req.params.id);

          res.status(200).json({
            mensaje: "Usuario obtenido exitosamente",
            usuario: obtenerId
        });
    } catch (error) {
        return res.status(500).json({
            mensaje: "Error al obtener el usuario",
            error: error.message
        });
    }
}


export const actualizarUsuarioId = async (req, res) => {
    try {
        const actualizar = await usuarioService.updateById(req.params.id, req.body);

         res.status(200).json({
            mensaje: "Usuario actualizado correctamente",
            usuario: actualizar
        });
    } catch (error) {
          if (error.name === "ValidationError") {
            return res.status(400).json({
                mensaje: "Los datos proporcionados no son válidos",
                error: error.message
            });
        }
        return res.status(500).json({
            mensaje: "Error al actualizar el usuario",
            error: error.message
        });
    }
}


export const eliminarUsuarioId = async (req, res) => {
    try {
        const eliminar = await usuarioService.deleteById(req.params.id);

        res.status(200).json({
            mensaje: "Usuario eliminado exitosamente",
            usuario: eliminar
        });
    } catch (error) {
         return res.status(500).json({
            mensaje: "Error al eliminar el usuario",
            error: error.message
        });
    }
}
