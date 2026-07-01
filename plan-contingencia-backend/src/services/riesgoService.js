import { createCrudService } from "./baseCrudService.js";
import protocoloModel from "../models/protocoloModel.js";
import riesgoModel from "../models/riesgoModel.js";
import peligroModel from '../models/peligroModel.js';

const crud = createCrudService(riesgoModel);

const validarRelaciones = async (data) => {

    const {
        peligroId,
        protocolos
    } = data;

    if (peligroId) {

        const peligro =
            await peligroModel.findById(peligroId);

        if (!peligro) {
            const error =
                new Error(
                    "El peligro seleccionado no existe"
                );

            error.statusCode = 404;

            throw error;
        }
    }

    if (protocolos?.length) {

        data.protocolos = [...new Set(protocolos)];

        const protocolosEncontrados =
            await protocoloModel.find({
                _id: {
                    $in: data.protocolos
                }
            });

        if (
            protocolosEncontrados.length !==
            data.protocolos.length
        ) {
            const error =
                new Error(
                    "Uno o más protocolos seleccionados no existen."
                );

            error.statusCode = 404;

            throw error;
        }
    }
}



const create = async (data) => {

    const {
        nombre,
        peligroId,
        protocolos = []
    } = data;

    const riesgoExistente = await riesgoModel.findOne({
        nombre
    });

    if (riesgoExistente) {
        const error =
            new Error(
                "No se puede crear el riesgo: ya existe un registro con ese nombre de riesgo"
            );

        error.statusCode = 400;

        throw error;
    }

    const peligro = await peligroModel.findById(peligroId);

    if (!peligro) {
        const error =
            new Error(
                "No se encontró el peligro asociado"
            );

        error.statusCode = 404;

        throw error;
    }

    await validarRelaciones(data);

    return await crud.create(data);
}



const getAll = async () => {
    return await crud.getAll().populate("protocolos");
}



const getById = async (id) => {

    const obtenerRiesgoId = await crud.getById(id)
    .populate("protocolos");

    if (!obtenerRiesgoId) {
        const error =
            new Error(
                "No se encontró el riesgo"
            );

        error.statusCode = 404;

        throw error;
    }

    return obtenerRiesgoId;
}



const updateById = async (id, data) => {

    const {
        nombre,
        peligroId,
        protocolos = []
    } = data;

    const riesgoExistente = await riesgoModel.findOne({
        nombre,
        _id: { $ne: id }
    });

    if (riesgoExistente) {
        const error =
            new Error(
                "No se puede actualizar: ya existe otro riesgo con ese nombre"
            );

        error.statusCode = 400;

        throw error;
    }

    await validarRelaciones(data);

    const actualizarRiesgoId = await crud.update(
        id,
        data
    );

    if (!actualizarRiesgoId) {
        const error =
            new Error(
                "Riesgo no encontrado"
            );

        error.statusCode = 404;

        throw error;
    }

    return actualizarRiesgoId;
}



const deleteById = async (id) => {

    const eliminarRiesgoId = await crud.delete(id);

    if (!eliminarRiesgoId) {
        const error =
            new Error(
                "Riesgo no encontrado"
            );

        error.statusCode = 404;

        throw error;
    }

    return eliminarRiesgoId;
}



// const asociarProtocoloRiesgo = async (id, protocoloId) => {

//     const riesgoId = await crud.getById(id);

//     if (!riesgoId) {
//         const error =
//             new Error(
//                 "Riesgo no encontrado"
//             );

//         error.statusCode = 404;

//         throw error;
//     }

//     return await riesgoModel.findByIdAndUpdate(
//         id,
//         {
//             $addToSet: {
//                 protocolos: {
//                     $each: protocolos
//                 }
//             }
//         },
//         {
//             new: true
//         }
//     ).populate("protocolos");
// };



// const obtenerProtocoloRiesgo = async (id) => {

//     const riesgoId = await riesgoModel.findById(id)
//         .populate("protocolos");

//     if (!riesgoId) {
//         const error =
//             new Error(
//                 "Riesgo no encontrado"
//             );

//         error.statusCode = 404;

//         throw error;
//     }

//     return riesgoId.protocolos;
// }



// const eliminarProtocoloRiesgo = async (id, protocoloId) => {

//     const riesgoId = await crud.getById(id);

//     if (!riesgoId) {
//         const error =
//             new Error(
//                 "Riesgo no encontrado"
//             );

//         error.statusCode = 404;

//         throw error;
//     }

//     const protocolo = await protocoloModel.findById(protocoloId);

//     if (!protocolo) {
//         const error =
//             new Error(
//                 "Protocolo no encontrado"
//             );

//         error.statusCode = 404;

//         throw error;
//     }

//     const asociado = riesgoId.protocolos.some(
//         protocolo =>
//             protocolo.toString() === protocoloId
//     );

//     if (!asociado) {
//         const error =
//             new Error(
//                 "El protocolo no está asociado al riesgo"
//             );

//         error.statusCode = 400;

//         throw error;
//     }

//     return await riesgoModel.findByIdAndUpdate(
//         id,
//         {
//             $pull: {
//                 protocolos:
//                     protocoloId
//             }
//         },
//         {
//             new: true
//         }
//     ).populate("protocolos");
// }

export default { ...crud, create, getAll, getById, updateById, deleteById };