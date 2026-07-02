import protocoloService from "../services/protocoloService.js";

export const crearProtocolo = async (req, res, next) => {
    try {
        const nuevoProtocolo = await protocoloService.create(req.body);

        return res.status(201).json({
            mensaje: "Protocolo creado exitosamente",
            protocolo: nuevoProtocolo
        });
    } catch (error) {
       next(error);
    }
}


export const listarProtocolos = async (req, res, next) => {
    try {
        const listar = await protocoloService.getAll();

        return res.status(200).json({
            mensaje: "Lista de protocolos obtenidos exitosamente",
            protocolo: listar
        });
    } catch (error) {
      next(error);
    }
}


export const obtenerProtocoloId = async (req, res, next) => {
    try {
        const obtenerId = await protocoloService.getById(req.params.id);

        return res.status(200).json({
            mensaje: "Lista de protocolos obtenidos exitosamente",
            protocolo: obtenerId
        });
    } catch (error) {
        next(error);
    }
}


export const actualizarProtocoloId = async (req, res, next) => {
    try {
        const actualizar = await protocoloService.updateById(req.params.id, req.body);

        return res.status(200).json({
            mensaje: "Protocolo actualizado exitosamente",
            protocolo: actualizar
        });
    } catch (error) {
       next(error);
    }
}


export const eliminarProtocoloId = async (req, res, next) => {
    try {
        const eliminar = await protocoloService.deleteById(req.params.id);

        return res.status(200).json({
            mensaje: "Protocolo eliminado exitosamente",
            protocolo: eliminar
        });
    } catch (error) {
        next(error);
    }
}


// export const obtenerRiesgosProtocolo = async (req, res, next) => {
//     try {
//         const obtenerAsociacion = await protocoloService.obtenerRiesgoProtocolo(req.params.id);

//         return res.status(200).json({
//             mensaje: "Riesgos asociados obtenidos exitosamente",
//             riesgo: obtenerAsociacion
//         });
//     } catch (error) {
//        next(error);
//     }
// }
