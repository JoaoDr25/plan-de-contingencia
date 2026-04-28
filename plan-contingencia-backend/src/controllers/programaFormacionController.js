import ProgramaFormacion from "../models/programaFormacionModel.js";

export const crearPrograma = async (req, res) => {
    try {
        const { nombre, ficha } = req.body;

        // Solo verificamos si la ficha ya existe
        const programaExistente = await ProgramaFormacion.findOne({ ficha });
        
        if (programaExistente) {
            return res.status(400).json({
                mensaje: "No se pudo crear el programa: ya existe un registro con este número de ficha"
            });
        }
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
        const listar = await ProgramaFormacion.find({ estado: true });
        res.status(200).json({
            mensaje: "Lista de programas activos obtenida exitosamente",
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
            return res.status(404).json({ mensaje: "No se encontro el programa de formación" })
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
        const { id } = req.params;
        const { nombre, ficha } = req.body;

        if (ficha) {
            const programaExistente = await ProgramaFormacion.findOne({ 
                ficha, 
                _id: { $ne: id } 
            });

            if (programaExistente) {
                return res.status(400).json({
                    mensaje: "No se pudo actualizar: ya existe otro programa con este número de ficha"
                });
            }
        }
        
        const actualizar = await ProgramaFormacion.findByIdAndUpdate(
            id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!actualizar) {
            return res.status(404).json({ mensaje: "Programa no encontrado" })
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

export const cambiarEstadoPrograma = async (req, res) => {
    try {
        const { id } = req.params;
        const { estado } = req.body;

        if (typeof estado !== "boolean") {
            return res.status(400).json({ mensaje: "El campo 'estado' es obligatorio y debe ser un valor booleano (true/false)" });
        }
        const cambiarEstado = await ProgramaFormacion.findByIdAndUpdate(id,
            { estado },
            { new: true, runValidators: true }
        );
        if (!cambiarEstado) {
            return res.status(404).json({ mensaje: "No se puede cambiar el estado: Programa de formación no existe" });
        }
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

export const eliminarPrograma = async (req, res) => {
    try {
        const { id } = req.params;
        const eliminar = await ProgramaFormacion.findByIdAndDelete(id);
        if (!eliminar) {
            return res.status(404).json({ mensaje: "Programa no encontrado" });
        }
        res.status(200).json({
            mensaje: "Programa de formación eliminado exitosamente",
            programa: eliminar
        });
    } catch (error) {
        return res.status(500).json({
            mensaje: "Error al eliminar un programa de formación",
            error: error.message
        });
    }
};