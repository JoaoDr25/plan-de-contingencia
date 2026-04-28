import ProgramaFormacion from "../models/programaFormacionModel.js";

export const crearPrograma = async (req, res) => {
    try {
        const nuevoPrograma = new ProgramaFormacion(req.body);
        await nuevoPrograma.save();
        res.status(201).json({
            mensaje: "Programa de formación creado correctamente",
            programa: nuevoPrograma
        });
    } catch (error) {
        if (error.name === "ValidationError") {
            return res.status(400).json({
                mensaje: "Error de validación al crear el programa de formación",
                error: error.message
            });
        }
        return res.status(500).json({
            mensaje: "Error al crear el programa de formación",
            error: error.message
        });
    }
};

export const listarProgramas = async (req, res) => {
    try {
        const listar = await ProgramaFormacion.find();
        res.status(200).json({
            mensaje: "Programas de formación Listados exitosamente",
            programas: listar
        });
    } catch (error) {
        return res.status(500).json({
            mensaje: "Error al obtener los programas de formación",
            error: error.message
        });
    }
};

export const obtenerProgramaId = async (req, res) => {
    try {
        const obtenerId = await ProgramaFormacion.findById(req.params.id);
        if (!obtenerId) {
            return res.status(404).json({mensaje: "No se encontro el programa de formación"})
        }
        res.status(200).json({
            mensaje: "Programa de formación obtenido exitosamente",
            programa: obtenerId
        });
    } catch (error) {
        return res.status(500).json({
            mensaje: "Error al obtener el programa de formación",
            error: error.message
        });
    }
};

export const actualizarPrograma = async (req, res) => {
    try {
        const { id } = req.params
        const actualizar = await ProgramaFormacion.findByIdAndUpdate(
            id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!actualizar) {
            return res.status(404).json({mensaje: "Programa no encontrado"})
        }
        res.status(200).json({
            mensaje: "Programa de formación actualizado correctamente",
            programa: actualizar
        });
    } catch (error) {
        if (error.name === "ValidationError") {
            return res.status(400).json({
                mensaje: "Los datos proporcionados no son válidos",
                error: error.message
            });
        }
        return res.status(500).json({
            mensaje: "Error al actualizar el programa de formación",
            error: error.message
        });
    }
};

export const eliminarPrograma = async (req, res) => {
    try {
        const eliminar = await ProgramaFormacion.findByIdAndDelete(req.params.id);
        if (!eliminar) {
            return res.status(404).json({ mensaje: "Programa no encontrado" });
        }
        res.status(200).json({
            mensaje: "Programa de formación eliminado correctamente",
            programa: eliminar
        });
    } catch (error) {
        return res.status(500).json({
            mensaje: "Error al eliminar un programa de formación",
            error: error.message
        });
    }
};