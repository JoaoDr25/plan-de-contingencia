import eppService from "../services/eppService.js";

export const crearEpp = async (req, res, next) => {
    try {
        const nuevoEPP = await eppService.create(req.body);

         res.status(201).json({
            mensaje: "Elemento de protección personal (EPP) creado correctamente",
            elemento: nuevoEPP
        });
    } catch (error) {
        next(error);
    }
};


export const listarEpp = async (req, res, next) => {
    try {
        const listar = await eppService.getAll({ estado: true });

        res.status(200).json({
            mensaje: "Lista de elementos de protección personal (EPP) activos obtenidos exitosamente",
            elementos: listar
        });
    } catch (error) {  
        next(error);
    }
};


export const obtenerEppId = async (req, res, next) => {
    try {
        const obtenerId = await eppService.getById(req.params.id);

        res.status(200).json({
            mensaje: "Elemento de protección personal (EPP) obtenido exitosamente",
            elemento: obtenerId
        });
    } catch (error) {
        next(error);
    }
};


export const actualizarEppId = async (req, res, next) => {
    try {
        const actualizar = await eppService.updateById(req.params.id, req.body);

        res.status(200).json({
            mensaje: "Elemento de protección personal (EPP) actualizado correctamente",
            elemento: actualizar
        });
    } catch (error) {
          next(error);
    }
};


export const cambiarEstadoEppId = async (req, res, next) => {
    try {
        const { estado } = req.body;
        const cambiarEstado = await eppService.cambiarEstadoId(req.params.id, estado);

        res.status(200).json({
            mensaje: `Elemento de protección personal (EPP) ${estado ? "activado" : "desactivado"} exitosamente`,
            elemento: cambiarEstado
        });
    } catch (error) {
        next(error);
    }
};


export const eliminarEppId = async (req, res, next) => {
    try {
        const eliminar = await eppService.deleteById(req.params.id);

        res.status(200).json({
            mensaje: "Elemento de protección personal (EPP) eliminado exitosamente",
            elemento: eliminar
        });
    } catch (error) {
        next(error);
    }
}