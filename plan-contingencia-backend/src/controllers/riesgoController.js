import Riesgo from '../models/riesgoModel.js';
import Actividad from '../models/actividadModel.js';

export const crearRiesgo = async (req, res) => {
    try {
        const nuevoRiesgo = new Riesgo(req.body);
        await nuevoRiesgo.save();

        return res.status(201).json({
            mensaje: "Riesgo creado exitosamente",
            riesgo: nuevoRiesgo
        });
    } catch (error) {
        if (error.name === "ValidationError") {
            return res.status(400).json({
                mensaje: "Error en la validación de los datos"
            })
        }
        return res.status(500).json({
            mensaje: "Error al crear el riesgo",
            error: error.message
        });
    }
};

export const listarRiesgos = async (req, res) => {
    try {
        const listar = await Riesgo.find().populate("peligroId");

        return res.status(200).json({
            mensaje: "Lista de riesgos obtenidos exitosamente",
            riesgos: listar
        });
    } catch (error) {
        return res.status(500).json({
            mensaje: "Error al listar los riesgos",
            error: error.message
        });
    }
};

export const obtenerRiesgoid = async (req, res) => {
    try {
        const obtenerId = await Riesgo.findById(req.params.id).populate("peligroId");
        if (!obtenerId) {
            return res.status(404).json({ mensaje: "No se encontró el riesgo" })
        }
        return res.status(200).json({
            mensaje: "Riesgo obtenido exitosamente",
            riesgo: obtenerId
        });
    } catch (error) {
        return res.status(500).json({
            mensaje: "Error al obtener el riesgo",
            error: error.message
        });
    }
};

export const actualizarRiesgo = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre, descripcion } = req.body;

        if (nombre) {
            const riesgoExistente = await Riesgo.findOne({
                nombre,
                _id: { $ne: id }
            });

            if (riesgoExistente) {
                return res.status(400).json({
                    mensaje: "No se pudo actualizar: ya existe otro riesgo con ese nombre"
                });
            }
        }

        const actualizar = await Riesgo.findByIdAndUpdate(
            id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!actualizar) {
            return res.status(404).json({ mensaje: "Riesgo no encontrado" });
        }
        return res.status(200).json({
            mensaje: "Riesgo actualizado exitosamente",
            riesgo: actualizar
        });

    } catch (error) {
        if (error.name === "ValidationError") {
            return res.status(400).json({ mensaje: "Los datos proporcionados no son válidos"});
        }
        return res.status(500).json({
            mensaje: "Error al actualizar el riesgo",
            error: error.message
        });
    }
};

export const eliminarRiesgo = async (req, res) => {
    try {
        const { id } = req.params;

        // const protocolosAsociados = await Protocolo.findOne({ riesgoId: id });

        const eliminar = await Riesgo.findByIdAndDelete(id);
        if (!eliminar) {
            return res.status(404).json({ mensaje: "Riesgo no encontrado"});
        }
        return res.status(200).json({
            mensaje: "Riesgo eliminado exitosamente",
            riesgo: eliminar
        });
        
    } catch (error) {
        return res.status(500).json({
            mensaje: "Error al eliminar el riesgo",
            error: error.message
        });
    }
};
