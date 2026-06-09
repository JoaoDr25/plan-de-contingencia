import actividadService from "../services/actividadService.js";

export const crearActividad = async (req, res, next) => {
    try {
        const nuevaActividad = await actividadService.create(req.body);

        res.status(201).json({
            mensaje: "Actividad creada exitosamente",
            actividad: nuevaActividad
        });
    } catch (error) {
        next(error);
    }
};


export const listarActividades = async (req, res, next) => {
    try {
        const listar = await actividadService.getAll();

        return res.status(200).json({
            mensaje: "Lista de actividades obtenidas exitosamente",
            actividades: listar
        });
    } catch (error) {
        next(error);
    }
};


export const obtenerActividadId = async (req, res, next) => {
    try {
        const obtenerId = await actividadService.getById(req.params.id);

        return res.status(200).json({
            mensaje: "Actividad obtenida exitosamente",
            actividad: obtenerId
        });
    } catch (error) {
        next(error);
    }
};


export const actualizarActividadId = async (req, res, next) => {
    try {
        const actualizar = await actividadService.updateById(req.params.id, req.body);

        return res.status(200).json({
            mensaje: "Actividad actualizada exitosamente",
            actividad: actualizar
        });
    } catch (error) {
        next(error);
    }
};


export const eliminarActividadId = async (req, res, next) => {
    try {
        const eliminar = await actividadService.deleteById(req.params.id);

        return res.status(200).json({
            mensaje: "Actividad eliminada exitosamente",
            actividad: eliminar
        });
    } catch (error) {
        next(error);
    }
};