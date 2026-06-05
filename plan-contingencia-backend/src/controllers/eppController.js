import eppService from "../services/eppService.js";

export const crearEpp = async (req, res) => {
    try {
        const nuevoEPP = await eppService.create(req.body);

         res.status(201).json({
            mensaje: "Elemento de protección personal (EPP) creado correctamente",
            elemento: nuevoEPP
        });
    } catch (error) {
        if (error.name === "ValidationError") {
            return res.status(400).json({
                mensaje: "Error de validación al crear el elemento de protección personal (EPP)",
                error: error.message
            });
        }
        return res.status(500).json({
            mensaje: "Error al crear el elemento de protección personal (EPP)",
            error: error.message
        });
    }
};


export const listarEpp = async (req, res) => {
    try {
        const listar = await eppService.getAll({ estado: true });

        res.status(200).json({
            mensaje: "Lista de elementos de protección personal (EPP) activos obtenidos exitosamente",
            elementos: listar
        });
    } catch (error) {
        return res.status(500).json({
            mensaje: "Error al obtener los elementos de protección personal (EPP)",
            error: error.message
        });
    }
};


export const obtenerEppId = async (req, res) => {
    try {
        const obtenerId = await eppService.getById(req.params.id);

        res.status(200).json({
            mensaje: "Elemento de protección personal (EPP) obtenido exitosamente",
            elemento: obtenerId
        });
    } catch (error) {
        return res.status(500).json({
            mensaje: "Error al obtener el elemento de protección personal (EPP)",
            error: error.message
        });
    }
};


export const actualizarEppId = async (req, res) => {
    try {
        const actualizar = await eppService.updateById(req.params.id, req.body);

        res.status(200).json({
            mensaje: "Elemento de protección personal (EPP) actualizado correctamente",
            elemento: actualizar
        });
    } catch (error) {
           if (error.name === "ValidationError") {
            return res.status(400).json({
                mensaje: "Los datos proporcionados no son válidos",
                error: error.message
            });
        }
        return res.status(500).json({
            mensaje: "Error al actualizar el elemento de protección personal (EPP)",
            error: error.message
        });
    }
};


export const cambiarEstadoEppId = async (req, res) => {
    try {
        const { estado } = req.body;
        const cambiarEstado = await eppService.cambiarEstadoId(req.params.id, estado);

        res.status(200).json({
            mensaje: `Elemento de protección personal (EPP) ${estado ? "activado" : "desactivado"} exitosamente`,
            elemento: cambiarEstado
        });
    } catch (error) {
        return res.status(500).json({
            mensaje: "Error al cambiar de estado del elemento de protección personal (EPP)",
            error: error.message
        });
    }
};


export const eliminarEppId = async (req, res) => {
    try {
        const eliminar = await eppService.deleteById(req.params.id);

        res.status(200).json({
            mensaje: "Elemento de protección personal (EPP) eliminado exitosamente",
            elemento: eliminar
        });
    } catch (error) {
        return res.status(500).json({
            mensaje: "Error al eliminar el elemento de protección personal (EPP)",
            error: error.message
        });
    }
}