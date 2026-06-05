import { createCrudService } from "./baseCrudService.js";
import eppModel from "../models/eppModel.js"

const crud = createCrudService(eppModel);

const create = async (data) => {

    const { nombreEPP } = data;

    const eppExistente = await eppModel.findOne({
        nombreEPP
    });

    if (eppExistente) {
        const error =
        new Error(
            "No se puede crear el elemento de proteccion personal (EPP): ya existe un registro con ese nombre"
        );

        error.statusCode = 400;

        throw error;
    }

    return await crud.create(data);
}



const getById = async (id) => {

        const obtenerEppId = await crud.getById(id);

        if (!obtenerEppId) {
            const error =
            new Error(
                "No se encontró el elemento de protección personal (EPP)"
            );

            error.statusCode = 404;

            throw error;
        }

        return obtenerEppId;
}



const updateById = async (id, data) => {

    const { nombreEPP } = data;

    const eppExistente = await eppModel.findOne({
        nombreEPP,
        _id: { $ne: id }
    });

    if (eppExistente) {
        const error =
        new Error(
            "No se puede actualizar: ya existe otro elemento de protección personal (epp) con ese nombre"
        );

        error.statusCode = 400;

        throw error;
    }

    const actualizarEppId = await crud.update(
        id,
        data
    );

    if (!actualizarEppId) {
        const error =
        new Error(
            "Elemento de protección personal (EPP) no encontrado"
        );

        error.statusCode = 404;

        throw error;
    }

    return actualizarEppId;
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
    
    const eliminarEppId = await crud.delete(id);

    if (!eliminarEppId) {
        const error = 
        new Error(
            "Elemento de protección personal (EPP) no encontrado"
        );

        error.statusCode = 404;

        throw error;
    }

    return eliminarEppId;
} 

export default { ...crud, create, getById, updateById, cambiarEstadoId, deleteById };