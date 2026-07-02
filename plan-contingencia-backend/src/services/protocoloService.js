import { createCrudService } from "./baseCrudService.js";
import protocoloModel from "../models/protocoloModel.js";
import riesgoModel from "../models/riesgoModel.js";

const crud = createCrudService(protocoloModel);

const create = async (data) => {

    const { tipoEmergencia } = data;

    const protocoloExistente = await protocoloModel.findOne({
        tipoEmergencia
    });

    if (protocoloExistente) {
        const error =
            new Error(
                "No se puede crear el protocolo: ya existe un registro con ese nombre de tipo de emergencia"
            );

        error.statusCode = 400;

        throw error;
    }

    return await crud.create(data);
}



const getById = async (id) => {

    const obtenerProtocoloId = await crud.getById(id);

    if (!obtenerProtocoloId) {
        const error =
            new Error(
                "No se encontró el protocolo"
            );

        error.statusCode = 404;

        throw error;
    }

    return obtenerProtocoloId;
}



const updateById = async (id, data) => {

    const { tipoEmergencia } = data;

    const protocoloExistente = await protocoloModel.findOne({
        tipoEmergencia,
        _id
            : { $ne: id }
    });

    if (protocoloExistente) {
        const error =
            new Error(
                "No se puede actualizar, ya existe otro protocolo con ese nombre de tipo de emergencia"
            );

        error.statusCode = 400;

        throw error;
    }

    const actualizarProtocoloId = await crud.update(
        id,
        data
    );

    if (!actualizarProtocoloId) {
        const error =
            new Error(
                "Protocolo no encontrado"
            );

        error.statusCode = 404;

        throw error;
    }

    return actualizarProtocoloId;
}



const deleteById = async (id) => {

    const eliminarProtocoloId = await crud.delete(id);

    if (!eliminarProtocoloId) {
        const error =
            new Error(
                "Protocolo no encontrado"
            );

        error.statusCode = 404;

        throw error;
    }

    return eliminarProtocoloId;
}



// const obtenerRiesgoProtocolo = async (id) => {

//     const protocolo = await crud.getById(id)

//     if (!protocolo) {
//         const error =
//             new Error(
//                 "Protocolo no encontrado"
//             );

//         error.statusCode = 404;

//         throw error;
//     }

//     return await riesgoModel.find({
//         protocolos: id
//     }).populate("protocolos");
// }

export default { ...crud, create, getById, updateById, deleteById }


