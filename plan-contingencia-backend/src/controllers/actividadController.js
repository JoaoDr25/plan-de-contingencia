import actividadService from "../services/actividadService.js";

export const crearActividad = async (req, res) => {
    try {
        const nuevaActividad = await actividadService.create(req.body);
       
        res.status(201).json({
            mensaje: "Actividad creada exitosamente",
            actividad: nuevaActividad
        });
    } catch (error) {
        if (error.name === "ValidationError") {
            return res.status(400).json({
                mensaje: "Error de validación al crear la actividad",
                error: error.message
            });
        }
        return res.status(500).json({
            mensaje: "Error al crear la actividad",
            error: error.message
        });
    }
};


export const listarActividades = async (req, res) => {
    try {
        const listar = await actividadService.getAll();
        
        return res.status(200).json({
            mensaje: "Lista de actividades obtenidas exitosamente",
            actividades: listar
        });
    } catch (error) {
        return res.status(500).json({
            mensaje: "Error al listar actividades",
            error: error.message
        });
    }
};


export const obtenerActividadId = async (req, res) => {
    try {
        const obtenerId = await actividadService.getById(req.params.id);
        
        return res.status(200).json({ 
            mensaje: "Actividad obtenida exitosamente",
            actividad: obtenerId
        });
    } catch (error) {
        return res.status(500).json({
            mensaje: "Error al obtener la actividad",
            error: error.message
        });
    }
};


export const actualizarActividadId = async (req, res) => {
    try {
        const actualizar = await actividadService.updateById(req.params.id, req.body);
      
        return res.status(200).json({
            mensaje: "Actividad actualizada exitosamente",
            actividad: actualizar
        });
    } catch (error) {
        if (error.name === "ValidationError") {
            return res.status(400).json({
                mensaje: "Los datos proporcionados no son válidos",
                error: error.message
            });
        }
        return res.status(500).json({
            mensaje: "Error al actualizar la actividad",
            error: error.message
        });
    }
};


export const eliminarActividadId = async (req, res) => {
    try {   
        const eliminar = await actividadService.deleteById(req.params.id);

        return res.status(200).json({
            mensaje: "Actividad eliminada exitosamente",
            actividad: eliminar
        });
    } catch (error) {
        return res.status(500).json({
            mensaje: "Error al eliminar la actividad",
            error: error.message
        });
    }
};