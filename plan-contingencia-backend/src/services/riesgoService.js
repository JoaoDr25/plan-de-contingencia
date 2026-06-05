import { createCrudService } from "./baseCrudService.js";
import protocoloModel from "../models/protocoloModel.js";
import riesgoModel from "../models/riesgoModel.js";

const crud = createCrudService(riesgoModel);

const create = async (data) => {

    const { nombre } = data;

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

    return await crud.create(data);
}



const getById = async (id) => {

    const obtenerRiesgoId = await crud.getById(id);

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

    const { nombre } = data;

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



const asociarProtocoloRiesgo = async (id) => {

    const riesgoId = await crud.getById(id);

    if (riesgoId) {
        const error =
            new Error(
                "Riesgo no encontrado"
            );

        error.statusCode = 404;

        throw error;
    }

    return await riesgoModel.findByIdAndUpdate(
        id,
        {
            $addToSet: {
                protocolos:
                    protocoloId
            }
        },
        {
            new: true
        }
    ).populate("protocolos");
};



const obtenerProtocoloRiesgo = async (id) => {

    const riesgoId = await riesgoModel.findById(id)
        .populte("protocolos");

    if (!riesgoId) {
        const error =
            new Error(
                "Riesgo no encontrado"
            );

        error.statusCode = 404;

        throw error;
    }

    return riesgo.protocolos;
}



const eliminarProtocoloRiesgo = async (id) => {

    const riesgoId = await crud.getById(id);

    if (!riesgoId) {
        const error =
            new Error(
                "Riesgo no encontrado"
            );

        error.statusCode = 404;

        throw error;
    }

    return await riesgoModel.findByIdAndUpdate(
        id,
        {
            $pull: {
                protocolos: 
                protocoloId
            }
        },
        {
            const : true
        }
    ).populate("protocolos");
}

export default { ...crud, create, getById, updateById, deleteById, asociarProtocoloRiesgo, obtenerProtocoloRiesgo, eliminarProtocoloRiesgo };