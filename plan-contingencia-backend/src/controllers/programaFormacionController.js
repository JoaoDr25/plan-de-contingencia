import programaFormacionService from "../services/programaFormacionService.js";

export const crearPrograma = async (req, res, next) => {
    try {
        const nuevoPrograma = await programaFormacionService.create(req.body);

        res.status(201).json({
            mensaje: "Programa de formación creado correctamente",
            programa: nuevoPrograma
        });
    } catch (error) {
      next(error);
    }
};


export const listarProgramas = async (req, res, next) => {
    try {
        const listar = await programaFormacionService.getAll({ estado: true }); //Actualmente solo activos, pendiente crear filtros

        res.status(200).json({
            mensaje: "Lista de programas activos obtenidos exitosamente",
            programas: listar
        });
    } catch (error) {
       next(error);
    }
};


export const obtenerProgramaId = async (req, res, next) => {
    try {
        const obtenerId = await programaFormacionService.getById( req.params.id );

        res.status(200).json({
            mensaje: "Programa de formación obtenido exitosamente",
            programa: obtenerId
        });
    } catch (error) {
        next(error);
    }
};


export const actualizarProgramaId = async (req, res, next) => {
    try {
        const actualizar = await programaFormacionService.updateById( req.params.id, req.body );

        res.status(200).json({
            mensaje: "Programa de formación actualizado correctamente",
            programa: actualizar
        });
    } catch (error) {
        next(error);
    }
};


export const cambiarEstadoProgramaId = async (req, res, next) => {
    try {
        const { estado } = req.body;
        const cambiarEstado = await programaFormacionService.cambiarEstadoId( req.params.id, estado );
   
        res.status(200).json({
            mensaje: `Programa de formación ${estado ? "activado" : "desactivado"} exitosamente`,
            programa: cambiarEstado
        });
    } catch (error) {
        next(error);
    }
}


export const eliminarProgramaId = async (req, res, next) => {
    try {
        const eliminar = await programaFormacionService.deleteById( req.params.id );
      
        res.status(200).json({
            mensaje: "Programa de formación eliminado exitosamente",
            programa: eliminar
        });
    } catch (error) {
       next(error);
    }
};
