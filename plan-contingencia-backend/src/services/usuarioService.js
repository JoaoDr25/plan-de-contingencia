import { createCrudService } from "./baseCrudService.js";
import usuarioModel from "../models/usuarioModel.js";

const crud = createCrudService(usuarioModel);

const create = async (data) => {

    const { documento } = data;

    const usuarioExistente = await usuarioModel.findOne({
        documento
    });

    if (usuarioExistente) {
        const error = 
        new Error(
            "No se pudo crear el usuario: ya existe un registro con ese número de documento"
        );

        error.statusCode = 400;

        throw error;
    }

    return await crud.create(data);
}



const getById = async (id) => {

    const obtenerUsuarioId = await crud.getById(id);

    if (!obtenerUsuarioId) {
        const error =
        new Error(
            "No se encontró el usuario"
        );

        error.statusCode = 404;

        throw error;
    }

    return obtenerUsuarioId;
}



const updateById = async (id, data) => {

    const { documento } = data;

    const usuarioExistente = await usuarioModel.findOne({
        documento,
        _id: { $ne: id }
    });

    if (usuarioExistente) {
        const error =
        new Error(
            "No se puede actualizar: ya existe otro usuario con ese número de documento"
        );

        error.statusCode = 400;

        throw error;
    }

    const actualizarUsuarioId = await crud.update(
        id,
        data
    );

    if (!actualizarUsuarioId) {
        const error =
        new Error(
            "Usuario no encontrado"
        );

        error.statusCode = 404;

        throw error;
    }

    return actualizarUsuarioId;
}



const deleteById = async (id)  => {

    const eliminarUsuarioId = await crud.delete(id);

    if (!eliminarUsuarioId) {
        const error =
        new Error(
            "Usuario no encontrado"
        );

        error.statusCode = 404;

        throw error;
    }

    return eliminarUsuarioId;
}

export default { ...crud, create, getById, updateById, deleteById };


