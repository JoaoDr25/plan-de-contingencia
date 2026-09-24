import { createCrudService } from "./baseCrudService.js";
import peligroModel from "../models/peligroModel.js";
import riesgoModel from "../models/riesgoModel.js";

const crud = createCrudService(peligroModel);

const validarRiesgos = async (riesgos) => {

    if (!riesgos?.length) {
        return;
    }

    const encontrados = await riesgoModel.find({
        _id: { $in: riesgos }
    });

    if (encontrados.length !== riesgos.length) {
        const error =
            new Error(
                "Uno o varios riesgos no existen"
            );

        error.statusCode = 400;

        throw error;
    }
}



const sincronizarRiesgos = async (
    peligroId,
    nuevosRiesgos = [],
    antiguosRiesgos = []
) => {

    const nuevos = nuevosRiesgos.map(String);
    const antiguos = antiguosRiesgos.map(String);

    const riesgosAEliminar = antiguos.filter(
        (id) => !nuevos.includes(id)
    );

    const riesgosAAgregar = nuevos.filter(
        (id) => !antiguos.includes(id)
    );

    if (riesgosAEliminar.length) {
        await riesgoModel.updateMany(
            { _id: { $in: riesgosAEliminar } },
            { $pull: { peligroId: peligroId } }
        );
    }

    if (riesgosAAgregar.length) {
        await riesgoModel.updateMany(
            { _id: { $in: riesgosAAgregar } },
            { $addToSet: { peligroId: peligroId } }
        );
    }
};



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

    await validarRiesgos(riesgos);

    const nuevoPeligro = await crud.create(data);

    await sincronizarRiesgos(
        nuevoPeligro._id,
        riesgos
    );

    return nuevoPeligro;
}



const getAll = async (filter = {}) => {

    return await crud.getAll(filter).populate("riesgos");
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

    const peligroActual = await peligroModel.findById(id);

    if (!peligroActual) {
        const error =
            new Error(
                "Peligro no encontrado"
            );

        error.statusCode = 404;

        throw error;
    }

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

    if (
        Object.prototype.hasOwnProperty.call(
            data,
            "riesgos"
        )
    ) {
        await validarRiesgos(data.riesgos ?? []);
    }

    const actualizarPeligroId = await crud.update(
        id,
        data
    );

    if (
        Object.prototype.hasOwnProperty.call(
            data,
            "riesgos"
        )
    ) {
        await sincronizarRiesgos(
            id,
            data.riesgos ?? [],
            peligroActual.riesgos ?? []
        );
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

export default { ...crud, create, getAll, getById, updateById, deleteById };
