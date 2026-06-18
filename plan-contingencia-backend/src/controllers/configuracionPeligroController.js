import configuracionPeligroService from "../services/configuracionPeligroService.js";

export const configurarPeligrosActividad = async (req, res, next) => {
    try {
        const nuevaConfiguracion = await configuracionPeligroService.create(req.body);

        res.status(201).json({
            mensaje: "Configuración creada correctamente",
            configuracion: nuevaConfiguracion
        });
    } catch (error) {
        next(error);
    }
}


export const listarPeligrosActividad = async (req, res, next) => {
    try {
        const listar = await configuracionPeligroService.getAll()

        res.status(200).json({
            mensaje: "Configuraciones obtenidas exitosamente",
            configuracion: listar
        });
    } catch (error) {
        next(error);
    }
}


export const obtenerPeligrosActividadId = async (req, res, next) => {
    try {
        const obtenerId = await configuracionPeligroService.getById(req.params.id);

        res.status(200).json({
            mensaje: "Configuración obtenida exitosamente",
            configuracion: obtenerId
        });
    } catch (error) {
        next(error);
    }
}


export const obtenerPeligrosPorActividad = async (req, res, next) => {
    try {
        const obtenerPorActividad = await configuracionPeligroService.getByActividad(req.params.actividadId);

        res.status(200).json({
            mensaje: "Peligros asociados obtenidos exitosamente",
            configuracion: obtenerPorActividad
        });
    } catch (error) {
        next(error);
    }
}


export const actualizarPeligrosActividadId = async (req, res, next) => {
    try {
        const actualizar = await configuracionPeligroService.updateById(req.params.id, req.body);

        res.status(200).json({
            mensaje: "Configuración actualizada correctamente",
            configuracion: actualizar
        });
    } catch (error) {
        next(error);
    }
}


export const eliminarPeligrosActividadId = async (req, res, next) => {
    try {
        const eliminar = await configuracionPeligroService.deleteById(req.params.id);

        res.status(200).json({
            mensaje: "Configuración eliminada exitosamente",
            configuracion: eliminar
        });
    } catch (error) {
        next(error);
    }
}