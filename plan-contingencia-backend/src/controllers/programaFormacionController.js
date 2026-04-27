import ProgramaFormacion from "../models/programaFormacionModel.js";

export const crearPrograma = async (req, res) => {
    try {
        
    } catch (error) {
        return res.status(500).json({
            mensaje: "Error al crear el programa de formación",
            error: error.message
        });
    }
};

export const listarProgramas = async (req, res) => {
    try {
        
    } catch (error) {
        return res.status(500).json({
            mensaje: "Error al listar los programas de formación",
            error: error.message
        });
    }
};

export const obtenerProgramaId = async (req, res) => {
    try {
        
    } catch (error) {
        return res.status(500).json({
            mensaje: "Error al obtener el programa de formación",
            error: error.message
        });
    }
};

export const actualizarPrograma = async (req, res) => {
    try {
        
    } catch (error) {
        return res.status(500).json({
            mensaje: "Error al actualizar el programa de formación",
            error: error.message
        });
    }
};

export const eliminarPrograma = async (req, res) => {
    try {
        
    } catch (error) {
        return res.status(500).json({
            mensaje: "Error al eliminar un programa de formación",
            error: error.message
        });
    }
};