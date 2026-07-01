import { createCrudService } from "./baseCrudService.js";
import peligroModel from "../models/peligroModel.js";
import riesgoModel from "../models/riesgoModel.js";

const crud = createCrudService(peligroModel);

const create = async (data) => {

    const {
        nombre,
        riesgos = []
    } = data;

    const peligroExistente = await peligroModel.findOne({
        nombre
    });

    if (peligroExistente) {
        const error =
            new Error(
                "No se puede crear el peligro: ya existe un registro con ese nombre de peligro"
            );

        error.statusCode = 400;

        throw error;
    }

    return await crud.create(data);
}



const getAll = async () => {

    return await crud.getAll().populate("riesgos");
}



const getById = async (id) => {

    const obtenerPeligroId = await crud.getById(id)
    .populate("riesgos");

    if (!obtenerPeligroId) {
        const error =
            new Error(
                "No se encontró el peligro"
            );

        error.statusCode = 404;

        throw error;
    }

    return obtenerPeligroId;
}



const updateById = async (id, data) => {

    const {
        nombre,
        riesgos = []
    } = data;

    const peligroExistente = await peligroModel.findOne({
        nombre,
        _id: { $ne: id }
    });

    if (peligroExistente) {
        const error =
            new Error(
                "No se puede actualizar: ya existe otro peligro con ese nombre"
            );

        error.statusCode = 400;

        throw error;
    }

    const actualizarPeligroId = await crud.update(
        id,
        data
    );

    if (!actualizarPeligroId) {
        const error =
            new Error(
                "Peligro no encontrado"
            );

        error.statusCode = 404;

        throw error;
    }

    return actualizarPeligroId;
}



const deleteById = async (id) => {

    const riesgosAsociados = await riesgoModel.findOne({
        peligroId: id
    });

    if (riesgosAsociados) {
        const error =
            new Error(
                "No se puede eliminar el peligro porque tiene riesgos asociados"
            );

        error.statusCode = 400;

        throw error;
    }

    const eliminarPeligroId = await crud.delete(id);

    if (!eliminarPeligroId) {
        const error =
            new Error(
                "Peligro no encontrado"
            );

        error.statusCode = 404;

        throw error;
    }

    return eliminarPeligroId;
}



// const obtenerRiesgoPeligro = async (id) => {

//     const obtenerAsociacionRiesgoPeligroId = await crud.getById(id);

//     if (!obtenerAsociacionRiesgoPeligroId) {
//         const error = 
//         new Error(
//             "Peligro no encontrado"
//         );

//         error.statusCode = 404;

//         throw error;
//     }

//     return await riesgoModel.find({
//         peligroId: id
//     });
// }

export default { ...crud, create, getAll, getById, updateById, deleteById };
