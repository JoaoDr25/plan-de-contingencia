import { createCrudService } from "./baseCrudService.js";
import usuarioModel from "../models/usuarioModel.js";

const crud = createCrudService(usuarioModel);

const create = async (data) => {

    const { documento, correoInstitucional } = data;

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

    const correoExistente = await usuarioModel.findOne({
        correoInstitucional
    });

    if (correoExistente) {
        const error =
        new Error(
            "No se puede crear el usuario: Ya existe un usuario con este correo institucional"
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

    const { documento, correoInstitucional } = data;

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

    const correoExistente = await usuarioModel.findOne({
        correoInstitucional
    });

    if (correoExistente) {
        const error =
        new Error(
            "No se puede actualizar: Ya existe un usuario con ese correo institucional"
        )
    }

    return actualizarUsuarioId;
}



const cambiarEstadoId = async (id, estado) => {

        if (typeof estado !== "boolean") {
            const error =
            new Error(
                "El campo 'estado' es obligatorio y debe ser un valor booleano"
            );

            error.statusCode = 400;

            throw error;
        }

        const cambiarEstado = await crud.update(
            id,
            { estado }
        );

        if (!cambiarEstado) {
            const error =
            new Error(
                "No se puede cambiar el estado"
            );

            error.statusCode = 404;

            throw error;
        }

        return cambiarEstado;
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

export default { ...crud, create, getById, updateById, cambiarEstadoId, deleteById };


