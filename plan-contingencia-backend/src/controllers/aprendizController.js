import aprendizService from "../services/aprendizService.js";

export const crearAprendiz = async (req, res, next) => {
    try {
        const nuevoAprendiz = await aprendizService.create(req.body);

        res.status(201).json({
            mensaje: "Aprendiz creado correctamente",
            aprendiz: nuevoAprendiz
        });
    } catch (error) {
       next(error);
    }
};


export const listarAprendiz = async (req, res, next) => {
    try {
        const listar = await aprendizService.getAll({ estado: true }); //Actualmente solo activos, pendiente crear filtros

        res.status(200).json({
            mensaje: "Aprendices activos obtenidos exitosamente",
            aprendiz: listar
        });
    } catch (error) {
       next(error);
    }
};


export const obtenerAprendizId = async (req, res, next) => {
    try {
        const obtenerId = await aprendizService.getById( req.params.id );

        res.status(200).json({
            mensaje: "Aprendiz obtenido exitosamente",
            aprendiz: obtenerId
        });
    } catch (error) {
       next(error);
    }
};


export const actualizarAprendizId = async (req, res, next) => {
    try {
        const actualizar = await aprendizService.updateById( req.params.id, req.body );

        res.status(200).json({
            mensaje: "Aprendiz actualizado correctamente",
            aprendiz: actualizar
        });
    } catch (error) {
        next(error);
    }
};


export const cambiarEstadoAprendizId = async (req, res, next) => {
    try {
        const { estado } = req.body;

        const cambiarEstado = await aprendizService.cambiarEstadoId( req.params.id, estado );

        res.status(200).json({
            mensaje: `Aprendiz ${estado ? "activado" : "desactivado"} exitosamente`,
            aprendiz: cambiarEstado
        });
    } catch (error) {
        next(error);
    }
};


export const eliminarAprendizId = async (req, res, next) => {
    try {
        const eliminar = await aprendizService.deleteById( req.params.id );

        res.status(200).json({
            mensaje: "Aprendiz eliminado exitosamente",
            aprendiz: eliminar
        });
    } catch (error) {
        next(error);
    }
};
