import programaFormacionService from "../services/programaFormacionService.js";

export const crearPrograma = async (req, res) => {
    try {
        const nuevoPrograma = await programaFormacionService.create(req.body);

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
        const listar = await programaFormacionService.getAll({ estado: true }); //Actualmente solo activos, pendiente crear filtros

        res.status(200).json({
            mensaje: "Lista de programas activos obtenidos exitosamente",
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
        const obtenerId = await programaFormacionService.getById( req.params.id );

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


export const actualizarProgramaId = async (req, res) => {
    try {
        const actualizar = await programaFormacionService.updateById( req.params.id, req.body );

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


export const cambiarEstadoProgramaId = async (req, res) => {
    try {
        const { estado } = req.body;
        const cambiarEstado = await programaFormacionService.cambiarEstadoId( req.params.id, estado );
   
        res.status(200).json({
            mensaje: `Programa de formación ${estado ? "activado" : "desactivado"} exitosamente`,
            programa: cambiarEstado
        });
    } catch (error) {
        return res.status(500).json({
            mensaje: "Error al cambiar de estado del programa de formación",
            error: error.message
        });
    }
}


export const eliminarProgramaId = async (req, res) => {
    try {
        const eliminar = await programaFormacionService.deleteById( req.params.id );
      
        res.status(200).json({
            mensaje: "Programa de formación eliminado exitosamente",
            programa: eliminar
        });
    } catch (error) {
        return res.status(500).json({
            mensaje: "Error al eliminar el programa de formación",
            error: error.message
        });
    }
};
