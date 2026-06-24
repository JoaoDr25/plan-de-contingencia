import { createCrudService } from "./baseCrudService.js";
import aprendizModel from "../models/aprendizModel.js";
import programaFormacionModel from "../models/programaFormacionModel.js";

const crud = createCrudService(aprendizModel);

const create = async (data) => {

    const { documento } = data;

    const aprendizExistente = await aprendizModel.findOne({
        documento
    });

    if (aprendizExistente) {
        const error =
        new Error(
            "No se puede crear el aprendiz: ya existe un registro con ese documento"
        );

        error.statusCode= 400;

        throw error;
    }

    const programa = await programaFormacionModel.findById(data.ficha);

    if (!programa) {
        const error =
        new Error(
            "Programa de formación no encontrado"
        );

        error.statusCode = 404;

        throw error;
    }

    data.programaFormacion = programa.nombre;

    return await crud.create(data);
}



const getById = async (id) => {

    const obtenerAprendizId = await crud.getById(id);

    if (!obtenerAprendizId) {
        const error =
        new Error(
            "No se encontró el aprendiz"
        );

        error.statusCode = 404;

        throw error;
    }

    return obtenerAprendizId;
}



const updateById = async (id, data) => {

    const { documento } = data;

    const aprendizExistente = await aprendizModel.findOne({
        documento,
        _id: { $ne: id }
    });

    if (aprendizExistente) {
        const error =
        new Error(
            "No se puede actualizar: ya existe otro aprendiz con ese número de documento"
        );

        error.statusCode = 400;

        throw error;
    }

    const programa = await programaFormacionModel.findById(data.ficha);

    if (!programa) {
        const error =
        new Error(
            "Programa de formación no encontrado"
        );

        error.statusCode = 404;

        throw error;
    }

    data.programaFormacion = programa.nombre;

    const actualizarAprendizId = await crud.update(
        id,
        data
    );

    if (!actualizarAprendizId) {
        const error =
        new Error(
            "Aprendiz no encontrado"
        );

        error.statusCode = 404;

        throw error;
    }

    return actualizarAprendizId;
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



const deleteById = async (id) => {

    const eliminarAprendizId = await crud.delete(id);

    if (!eliminarAprendizId) {
        const error = 
        new Error(
            "Aprendiz no encontrado"
        );

        error.statusCode = 404;

        throw error;
    }

    return eliminarAprendizId;
}


export default { ...crud, create, getById, updateById, cambiarEstadoId, deleteById };



