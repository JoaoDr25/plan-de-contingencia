import configuracionPeligroService from "../services/configuracionPeligroService.js";

export const configurarPeligrosActividad = async (req, res) => {
    try {
        const nuevaConfiguracion = await configuracionPeligroService.create(req.body);

        res.status(201).json({
            mensaje: "Configuración creada correctamente",
            configuracion: nuevaConfiguracion
        });
    } catch (error) {
        if (error.name === "ValidationError") {
            return res.status(400).json({
                mensaje: "Error de validación al crear la configuración",
                error: error.message
            });
        }
        return res.status(500).json({
            mensaje: "Error al crear la configuración",
            error: error.message
        });
    }
}


export const listarPeligrosActividad = async (req, res) => {
    try {
        const listar = await configuracionPeligroService.getAll()

        res.status(200).json({
            mensaje: "Configuraciones obtenidas exitosamente",
            configuracion: listar
        });
    } catch (error) {
         return res.status(500).json({
            mensaje: "Error al obtener las configuraciones",
            error: error.message
        });
    }
}


export const obtenerPeligrosActividadId = async (req, res) => {
    try {
        const obtenerId = await configuracionPeligroService.getById(req.params.id);

        res.status(200).json({
            mensaje: "Configuración obtenida exitosamente",
            configuracion: obtenerId
        });
    } catch (error) {
          return res.status(500).json({
            mensaje: "Error al obtener la configuración",
            error: error.message
        });
    }
}


export const obtenerPeligrosPorActividad = async (req, res) => {
    try {
        const obtenerPorActividad = await configuracionPeligroService.getByActividad(req.query.actividadId);

        res.status(200).json({
            mensaje: "Peligros asociados obtenidos exitosamente",
            configuracion: obtenerPorActividad
        });
    } catch (error) {
         return res.status(500).json({
            mensaje: "Error al obtener los peligros asociados",
            error: error.message
        });
    }
}


export const actualizarPeligrosActividadId = async (req, res) => {
    try {
        const actualizar = await configuracionPeligroService.updateById(req.params.id, req.body);

        res.status(200).json({
            mensaje: "Configuración actualizada correctamente",
            configuracion: actualizar
        });
    } catch (error) {
        if (error.name === "ValidationError") {
            return res.status(400).json({
                mensaje: "Los datos proporcionados no son válidos",
                error: error.message
            });
        }
        return res.status(500).json({
            mensaje: "Error al actualizar la configuración",
            error: error.message
        });
    }
}


export const eliminarPeligrosActividadId = async (req, res) => {
    try {
        const eliminar = await configuracionPeligroService.deleteById(req.params.id);

        res.status(200).json({
            mensaje: "Configuración eliminada exitosamente",
            configuracion: eliminar
        });
    } catch (error) {
         return res.status(500).json({
            mensaje: "Error al eliminar la configuración",
            error: error.message
        });
    }
}