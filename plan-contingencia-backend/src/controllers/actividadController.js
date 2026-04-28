import Actividad from '../models/actividadModel.js'

export const crearActividad = async (req, res) => {
    try {
        const { nombre, descripcion, categoria } = req.body;

        const actividadExistente = await Actividad.findOne({ nombre });

        if (actividadExistente) {
            return res.status(400).json({ 
                mensaje: "No se pudo crear la actividad: ya existe una actividad con el mismo nombre"
            });
        }
        const nuevaActividad = new Actividad(req.body);
        await nuevaActividad.save();
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
        const listar = await Actividad.find();
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

export const obtenerActividad = async (req, res) => {
    try {
        const obtenerId = await Actividad.findById(req.params.id);
        if (!obtenerId) {
            return res.status(404).json({ mensaje: "No se encontró la actividad"});
        }
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

export const actualizarActividad = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre, descripcion, categoria } = req.body;


        if (nombre) {
            const actividadExistente = await Actividad.findOne({
                nombre,
                _id: { $ne: id } 
            });
            if (actividadExistente) {
                return res.status(400).json({
                    mensaje: "No se pudo actualizar: ya existe otra actividad con este nombre"
                });
            }
        }

        const actualizar = await Actividad.findByIdAndUpdate(
            id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!actualizar) {
            return res.status(404).json({ mensaje: "Actividad no encontrada"});
        }
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

export const eliminarActividad = async (req, res) => {
    try {
        const { id } = req.params;
        const eliminar = await Actividad.findByIdAndDelete(id);
        if (!eliminar) {
            return res.status(404).json({ mensaje: "Actividad no encontrada"});
        }
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