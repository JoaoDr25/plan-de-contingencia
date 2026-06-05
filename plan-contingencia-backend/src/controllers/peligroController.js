import peligroService from '../services/peligroService.js';

export const crearPeligro = async (req, res) => {
    try {
        const nuevoPeligro = await peligroService.create(req.body);

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
        const listar = await peligroService.getAll();

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


export const obtenerPeligroId = async (req, res) => {
    try {
        const obtenerId = await peligroService.getById(req.params.id)

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


export const actualizarPeligroId = async (req, res) => {
    try {
        const actualizar = await peligroService.updateById(req.params.id, req.body);

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


export const eliminarPeligroId = async (req, res) => {
    try {
        const eliminar = await peligroService.deleteById(req.params.id);

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


export const obtenerAsociacionRiesgoPeligro = async (req, res) => {
    try {
        const obtenerAsociacion = await peligroService.obtenerRiesgoPeligro(req.params.id);

        return res.status(200).json({
            mensaje: `Riesgos asociados obtenidos exitosamente`,
            asociar: obtenerAsociacion
        });
    } catch (error) {
        return res.status(500).json({
            mensaje: "Error al obtener los riesgos asociados",
            error: error.message
        });
    }
};