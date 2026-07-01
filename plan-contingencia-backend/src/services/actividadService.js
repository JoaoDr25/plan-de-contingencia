import { createCrudService } from "./baseCrudService.js";
import actividadModel from "../models/actividadModel.js";
import peligroModel from "../models/peligroModel.js";

const crud = createCrudService(actividadModel);

const validarPeligros = async (peligros) => {

    if (!peligros?.length) {
        return;
    }

    const encontrados = await peligroModel.find({
        _id: { $in: peligros }
    });

    if (encontrados.length !== peligros.length) {

        const error =
            new Error(
                "Uno o varios peligros no existen"
            );

        error.statusCode = 400;

        throw error;
    }
}



const create = async (data) => {

    const {
        nombre,
        peligros = []
    } = data;

    const actividadExistente = await actividadModel.findOne({
        nombre
    });

    if (actividadExistente) {
        const error =
            new Error(
                "No se puede crear la actividad: ya existe un registro con ese nombre de actividad"
            );

        error.statusCode = 400;

        throw error;
    }

    await validarPeligros(peligros);

    return await crud.create(data);
}



const getAll = async () => {
    return await crud.getAll().populate("peligros");
}



const getById = async (id) => {

    const obtenerActividadId = await crud.getById(id)
        .populate("peligros");

    if (!obtenerActividadId) {
        const error =
            new Error(
                "No se encontró la actividad"
            );

        error.statusCode = 404;

        throw error;
    }

    return obtenerActividadId;
}



const updateById = async (id, data) => {

    const {
        nombre,
        peligros = []
    } = data;

    const actividadExistente = await actividadModel.findOne({
        nombre,
        _id: { $ne: id }
    });

    if (actividadExistente) {
        const error =
            new Error(
                "No se puede actualizar: ya existe otra actividad con ese nombre"
            );

        error.statusCode = 400;

        throw error;
    }

    const actualizarActividadId = await crud.update(
        id,
        data
    );

    if (!actualizarActividadId) {
        const error =
            new Error(
                "Actividad no encontrada"
            );

        error.statusCode = 404;

        throw error;
    }

    await validarPeligros(peligros);

    return actualizarActividadId;
}



const deleteById = async (id) => {

    const eliminarActividadId = await crud.delete(id);

    if (!eliminarActividadId) {
        const error =
            new Error(
                "Actividad no encontrada"
            );

        error.statusCode = 404;

        throw error;
    }

    return eliminarActividadId;
}

export default { ...crud, create, getAll, getById, updateById, deleteById };

