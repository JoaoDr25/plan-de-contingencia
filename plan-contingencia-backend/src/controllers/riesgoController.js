import riesgoService from "../services/riesgoService.js";

export const crearRiesgo = async (req, res, next) => {
    try {
        const nuevoRiesgo = await riesgoService.create(req.body);

        return res.status(201).json({
            mensaje: "Riesgo creado exitosamente",
            riesgo: nuevoRiesgo
        });
    } catch (error) {
      next(error);
    }
};


export const listarRiesgos = async (req, res, next) => {
    try {
        const listar = await riesgoService.getAll();

        return res.status(200).json({
            mensaje: "Lista de riesgos obtenidos exitosamente",
            riesgos: listar
        });
    } catch (error) {
        next(error);
    }
};


export const obtenerRiesgoid = async (req, res, next) => {
    try {
        const obtenerId = await riesgoService.getById(req.params.id)

        return res.status(200).json({
            mensaje: "Riesgo obtenido exitosamente",
            riesgo: obtenerId
        });
    } catch (error) {
       next(error);
    }
};


export const actualizarRiesgoId = async (req, res, next) => {
    try {
        const actualizar = await riesgoService.updateById(req.params.id, req.body);

        return res.status(200).json({
            mensaje: "Riesgo actualizado exitosamente",
            riesgo: actualizar
        });

    } catch (error) {
       next(error);
    }
};


export const eliminarRiesgoId = async (req, res, next) => {
    try {
        const eliminar = await riesgoService.deleteById(req.params.id);

        return res.status(200).json({
            mensaje: "Riesgo eliminado exitosamente",
            riesgo: eliminar
        });

    } catch (error) {
        next(error);
    }
};


// export const asociarProtocolosRiesgo = async (req, res, next) => {
//     try {
//         const { protocoloId } = req.body;

//         const asociar = await riesgoService.asociarProtocoloRiesgo(req.params.id, obtenerProtocoloRiesgo);

//         return res.status(200).json({
//             mensaje: "Protocolos asociados exitosamente",
//             asociar: asociar
//         });
//     } catch (error) {
//       next(error);
//     }
// }


// export const obtenerAsociacionProtocoloRiesgo = async (req, res, next) => {
//     try {
//         const obtenerAsociacion = await riesgoService.obtenerProtocoloRiesgo(req.params.id);

//         return res.status(200).json({
//             mensaje: "Protocolos asociados obtenidos exitosamente",
//             asociar: obtenerAsociacion
//         });
//     } catch (error) {
//         next(error);
//     }
// }


// export const eliminarAsociacionProtocoloRiesgo = async (req, res, next) => {
//     try {
//         const eliminarAsociacion = await riesgoService.eliminarProtocoloRiesgo(req.params.id, req.params.protocoloId);

//         return res.status(200).json({
//             mensaje: "Asociación de protocolo eliminado exitosamente",
//             asociar: eliminarAsociacion
//         });
//     } catch (error) {
//        next(error);
//     }
// }
