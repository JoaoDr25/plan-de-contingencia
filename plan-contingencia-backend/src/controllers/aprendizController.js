import aprendizService from "../services/aprendizService.js";

export const crearAprendiz = async (req, res) => {
    try {
        const nuevoAprendiz = await aprendizService.create(req.body);

        res.status(201).json({
            mensaje: "Aprendiz creado correctamente",
            aprendiz: nuevoAprendiz
        });
    } catch (error) {
        if (error.name === "ValidationError") {
            return res.status(400).json({
                mensaje: "Error de validación al crear el aprendiz",
                error: error.message
            });
        }
        return res.status(500).json({
            mensaje: "Error al crear el aprendiz",
            error: error.message
        });
    }
};


export const listarAprendiz = async (req, res) => {
    try {
        const listar = await aprendizService.getAll({ estado: true }); //Actualmente solo activos, pendiente crear filtros

        res.status(200).json({
            mensaje: "Aprendices activos obtenidos exitosamente",
            aprendiz: listar
        });
    } catch (error) {
        return res.status(500).json({
            mensaje: "Error al obtener los aprendices",
            error: error.message
        });
    }
};


export const obtenerAprendizId = async (req, res) => {
    try {
        const obtenerId = await aprendizService.getById( req.params.id );

        res.status(200).json({
            mensaje: "Aprendiz obtenido exitosamente",
            aprendiz: obtenerId
        });
    } catch (error) {
        return res.status(500).json({
            mensaje: "Error al obtener el aprendiz",
            error: error.message
        });
    }
};


export const actualizarAprendizId = async (req, res) => {
    try {
        const actualizar = await aprendizService.updateById( req.params.id, req.body );

        res.status(200).json({
            mensaje: "Aprendiz actualizado correctamente",
            aprendiz: actualizar
        });
    } catch (error) {
        if (error.name === "ValidationError") {
            return res.status(400).json({
                mensaje: "Los datos proporcionados no son válidos",
                error: error.message
            });
        }
        return res.status(500).json({
            mensaje: "Error al actualizar el aprendiz",
            error: error.message
        });
    }
};


export const cambiarEstadoAprendizId = async (req, res) => {
    try {
        const { estado } = req.body;

        const cambiarEstado = await aprendizService.cambiarEstadoId( req.params.id, estado );

        res.status(200).json({
            mensaje: `Aprendiz ${estado ? "activado" : "desactivado"} exitosamente`,
            aprendiz: cambiarEstado
        });
    } catch (error) {
        return res.status(500).json({
            mensaje: "Error al cambiar de estado del aprendiz",
            error: error.message
        });
    }
};


export const eliminarAprendizId = async (req, res) => {
    try {
        const eliminar = await aprendizService.deleteById( req.params.id );

        res.status(200).json({
            mensaje: "Aprendiz eliminado exitosamente",
            aprendiz: eliminar
        });
    } catch (error) {
        return res.status(500).json({
            mensaje: "Error al eliminar el aprendiz",
            error: error.message
        });
    }
};
