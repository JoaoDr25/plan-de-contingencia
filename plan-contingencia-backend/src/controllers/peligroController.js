import Peligro from '../models/peligroModel.js'
import Riesgo from '../models/riesgoModel.js'

export const crearPeligro = async (req, res) => {
    try {
        const { nombre, tipo } = req.body;

        const peligroExistente = await Peligro.findOne({ nombre });

        if (peligroExistente) {
            return res.status(400).json({
                mensaje: "No se pudo crear el peligro: ya existe un peligro con el mismo nombre",
            });
        }
        const nuevoPeligro = new Peligro(req.body);
        await nuevoPeligro.save();

        return res.status(201).json({
            mensaje: "Peligro creado exitosamente",
            peligro: nuevoPeligro
        });
    } catch (error) {
        if (error.name === "ValidationError") {
            return res.status(400).json({
                mensaje: "Error de validación al crear el peligro",
                error: error.message
            });
        }
        return res.status(500).json({
            mensaje: "Error al crear peligro",
            error: error.message
        });
    }
};

export const listarPeligros = async (req, res) => {
    try {
        const listar = await Peligro.find().populate("riesgos");

        return res.status(200).json({
            mensaje: "Lista de peligros obtenidos exitosamente",
            peligros: listar
        });
    } catch (error) {
        return res.status(500).json({
            mensaje: "Error al listar los peligros",
            error: error.message
        });
    }
};

export const obtenerPeligro = async (req, res) => {
    try {
        const obtenerId = await Peligro.findById(req.params.id)
        .populate("riesgos");
        
        if (!obtenerId) {
            return res.status(404).json({ mensaje: "No se encontró el peligro" });
        }

        return res.status(200).json({
            mensaje: "Peligro obtenido exitosamente",
            peligro: obtenerId
        });
    } catch (error) {
        return res.status(500).json({
            mensaje: "Error al obtener el peligro",
            error: error.message
        });
    }
};

export const actualizarPeligro = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre, tipo } = req.body;

        if (nombre) {
            const peligroExistente = await Peligro.findOne({
                nombre,
                _id: { $ne: id }
            });
            if (peligroExistente) {
                return res.status(400).json({
                    mensaje: "No se pudo actualizar: ya existe otro peligro con este nombre"
                });
            }
        }

        const actualizar = await Peligro.findByIdAndUpdate(
            id,
            req.body,
            { new: true, runValidators: true }
        ).populate("riesgos");

        if (!actualizar) {
            return res.status(404).json({ mensaje: "Peligro no encontrado" });
        }

        return res.status(200).json({
            mensaje: "Peligro actualizado exitosamente",
            peligro: actualizar
        });
    } catch (error) {
        if (error.name === "ValidationError") {
            return res.status(400).json({
                mensaje: "Los datos proporcionados no son válidos",
                error: error.message
            });
        }
        return res.status(500).json({
            mensaje: "Error al actualizar el peligro",
            error: error.message
        });
    }
};

export const eliminarPeligro = async (req, res) => {
    try {
        const { id } = req.params;

        const riesgosAsociados = await Riesgo.findOne({ peligroId: id })
        if (riesgosAsociados) {
            return res.status(400).json({
                mensaje: "No se puede eliminar el peligro: existe riesgos asociados a este registro",
                sugerencia: "Elimine o reasigne los riesgos primero"
            });
        }

        const eliminar = await Peligro.findByIdAndDelete(id);
        if (!eliminar) {
            return res.status(404).json({ mensaje: "Peligro no encontrado" });
        }

        return res.status(200).json({
            mensaje: "Peligro eliminado exitosamente",
            peligro: eliminar
        });
    } catch (error) {
        return res.status(500).json({
            mensaje: "Error al eliminar el peligro",
            error: error.message
        });
    }
};

export const asociarRiesgosPeligro = async (req, res) => {
    try {
        const { id } = req.params;
        const { riesgos } = req.body;

        if (!Array.isArray(riesgos)) {
            return res.status(400).json({ mensaje: "El campo 'riesgos' debe ser un arreglo de IDs (ObjectIds)" });
        }

        const peligro = await Peligro.findById(id);
        if (!peligro) {
            return res.status(404).json({ mensaje: "Peligro no encontrado"});
        }

        await Riesgo.updateMany(
            { _id: { $in: riesgos } },
            { $set: { peligroId: id } }
        );

        return res.status(200).json({
            mensaje: `Se han asociado ${riesgos.length} riesgos al peligro exitosamente`
        });
    } catch (error) {
        return res.status(500).json({
            mensaje: "Error al procesar la asociación de riesgos",
            error: error.message
        });
    }
};