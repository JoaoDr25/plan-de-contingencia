import ProgramaFormacion from "../models/programaFormacionModel.js";

export const crearPrograma = async (req, res) => {
    try {
        const nuevoPrograma = await ProgramaFormacion(req.body);
        await nuevoPrograma.save();
        res.status(201).json(nuevoPrograma);
    } catch (error) {
        return res.status(500).json({
            mensaje: "Error al crear el programa de formación",
            error: error.message
        });
    }
};

export const listarProgramas = async (req, res) => {
    try {
        const listar = await ProgramaFormacion.find();
        res.status(201).json(listar);
    } catch (error) {
        return res.status(500).json({
            mensaje: "Error al listar los programas de formación",
            error: error.message
        });
    }
};

export const obtenerProgramaId = async (req, res) => {
    try {
        const obtenerId = await ProgramaFormacion.findById(req.params.id);
        res.status(201).json(obtenerId);
    } catch (error) {
        return res.status(500).json({
            mensaje: "Error al obtener el programa de formación",
            error: error.message
        });
    }
};

export const actualizarPrograma = async (req, res) => {
    try {
        const actualizar = await ProgramaFormacion.findByIdAndUpdate(req.params.id);
        res.status(201).json(actualizar);
    } catch (error) {
        return res.status(500).json({
            mensaje: "Error al actualizar el programa de formación",
            error: error.message
        });
    }
};

export const eliminarPrograma = async (req, res) => {
    try {
        const eliminar = await ProgramaFormacion.findByIdAndDelete(req.params.id);
        res.status(201).json(eliminar);
    } catch (error) {
        return res.status(500).json({
            mensaje: "Error al eliminar un programa de formación",
            error: error.message
        });
    }
};