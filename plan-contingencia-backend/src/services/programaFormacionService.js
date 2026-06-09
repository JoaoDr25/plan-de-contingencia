import { createCrudService } from "./baseCrudService.js";
import programaFormacionModel from "../models/programaFormacionModel.js";

const crud = createCrudService(programaFormacionModel);


const create = async (data) => {

    const { ficha } = data;

    const programaExistente = await programaFormacionModel.findOne({
        ficha
    });

    if (programaExistente) {
        const error =
            new Error(
                "No se puede crear el programa: ya existe un registro con este número de ficha"
            );

        error.statusCode = 400;

        throw error;
    }

    return await crud.create(data);
}



const getById = async (id) => {

    const obtenerProgramaId = await crud.getById(id);

    if (!obtenerProgramaId) {
        const error =
            new Error(
                "No se encontró el programa de formación"
            );

        error.statusCode = 404;

        throw error;
    }

    return obtenerProgramaId;
}



const updateById = async (id, data) => {

    const { ficha } = data;

    const programaExistente = await programaFormacionModel.findOne({
        ficha,
        _id: { $ne: id }
    });

    if (programaExistente) {
        const error =
            new Error(
                "No se puede actualizar: ya existe otro programa con ese número de ficha"
            );

        error.statusCode = 400;

        throw error;
    }

    const actualizarProgramaId = await crud.update(
        id,
        data
    );

    if (!actualizarProgramaId) {
        const error =
            new Error(
                "Programa de formación no encontrado"
            );

        error.statusCode = 404;

        throw error;
    }

    return actualizarProgramaId;
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

    const eliminarProgramaFormacionId = await crud.delete(id);

    if (!eliminarProgramaFormacionId) {
        const error =
            new Error(
                "Programa de formación no encontrado"
            );

        error.statusCode = 404;

        throw error;
    }

    return eliminarProgramaFormacionId;
}


export default { ...crud, create, getById, updateById, cambiarEstadoId, deleteById };

