import { createCrudService } from './baseCrudService.js'
import configuracionPeligroModel from '../models/configuracionPeligroModel.js'
import actividadModel from '../models/actividadModel.js'
import peligroModel from '../models/peligroModel.js'

const crud = createCrudService(configuracionPeligroModel);

const create = async (data) => {

    const { actividadId, peligroId } = data;

    const actividadExistente = await actividadModel.findById(actividadId);

    if (!actividadExistente) {
        const error = 
        new Error(
            "Actividad no encontrada"
        );

        error.statusCode = 404;

        throw error;
    }

    const peligroExistente = await peligroModel.findById(peligroId);

    if (!peligroExistente) {
        const error =
        new Error(
            "Peligro no encontrado"
        );

        error.statusCode = 404;

        throw error;
    }

    const configuracionExistenteId = await configuracionPeligroModel.findOne({
        actividadId,
        peligroId
    });

    if (configuracionExistenteId) {
        const error = 
        new Error(
            "Este peligro ya se encuentra asociado a la actividad"
        );

        error.statusCode = 400;

        throw error;
    }

    return await crud.create(data);
}



const getAll = async () => {

        return await configuracionPeligroModel
        .find()
        .populate("actividadId")
        .populate("peligroId");
};



const getById = async (id) => {

    const obtenerConfiguracionId = await configuracionPeligroModel
    .findById(id)
    .populate("actividadId")
    .populate("peligroId");

    if (!obtenerConfiguracionId) {
        const error =
        new Error(
            "Configuración no encontrada"
        );

        error.statusCode = 404;

        throw error;
    }

    return obtenerConfiguracionId
}



const getByActividad = async (actividadId) => {

    const obtenerConfiguracionActividadId = await actividadModel.findById(actividadId);

    if (!obtenerConfiguracionActividadId) {
        const error =
        new Error(
            "Actividad no encontrada"
        );

        error.statusCode = 404;

        throw error;
    }

    return await configuracionPeligroModel
    .find({ actividadId })
    .populate("actividadId")
    .populate("peligroId");
}



const updateById = async (id, data) => {

        const { actividadId, peligroId } = data;

        const configuracionDuplicada = await configuracionPeligroModel.findOne({
            actividadId,
            peligroId,
            _id: { $ne: id }
        });

        if (configuracionDuplicada) {
            const error =
            new Error(
                "Configuración duplicada: ya existe una configuración con esa actividad y peligro"
            );

            error.statusCode = 400;

            throw error;
        }

        const actualizarConfiguracionId = await crud.update(id, data);

        if (!actualizarConfiguracionId) {
            const error = 
            new Error(
                "Configuración no encontrada"
            );

            error.statusCode = 404;

            throw error;
        }

        return actualizarConfiguracionId;
}



const deleteById = async (id) => {

        const eliminarConfiguracionId = await crud.delete(id);

        if (!eliminarConfiguracionId) {
            const error =
            new Error(
                "Configuración no encontrada"
            );

            error.statusCode = 404;

            throw error;
        }

        return eliminarConfiguracionId;
}

export default { ...crud, create, getAll, getById, getByActividad, updateById, deleteById };