import { createCrudService } from "./baseCrudService.js";
import contactoEmergenciaModel from "../models/contactoEmergenciaModel.js";

const crud = createCrudService(contactoEmergenciaModel)

const create = async (data) => {

    const { nombreEntidad } = data;

    const contactoEmergenciaExistente = await contactoEmergenciaModel.findOne({
        nombreEntidad
    });

    if (contactoEmergenciaExistente) {
        const error = 
        new Error(
            "No se puede crear el contacto de emergencia: ya existe un registro con este nombre de entidad"
        );

        error.statusCode = 400;

        throw error;
    }

    return await crud.create(data);
}



const getById = async (id) => {

    const obtenerContactoEmergencia = await crud.getById(id);

    if (!obtenerContactoEmergencia) {
        const error =
        new Error(
            "No se encontró el programa de formación"
        );

        error.statusCode = 404;

        throw error;
    }

    return obtenerContactoEmergencia;
}



const updateById = async (id, data) => {
    
    const { nombreEntidad } = data;

    const contactoEmergenciaExistente = await contactoEmergenciaModel.findOne({
        nombreEntidad,
        _id: { $ne: id }
    });

    if (contactoEmergenciaExistente) {
        const error =
        new Error(
            "No se puede actualizar: ya existe otro contacto de emergencia con ese nombre"
        );

        error.statusCode = 400;

        throw error;
    }

    const actualizarContactoEmergenciaId = await crud.update(
        id,
        data
    );

    if (!actualizarContactoEmergenciaId) {
        const error =
        new Error(
            "Contacto de emergencia no encontrado"
        );

        error.statusCode = 404;

        throw error;
    }

    return actualizarContactoEmergenciaId;
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
        {estado}
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
    
    const eliminarContactoEmergenciaId = await crud.delete(id);

    if (!eliminarContactoEmergenciaId) {
        const error =
        new Error(
            "Contacto de emergencia no encontrado"
        );

        error.statusCode = 404;

        throw error;
    }

    return eliminarContactoEmergenciaId;
}

export default { ...crud, create, getById, updateById, cambiarEstadoId, deleteById };
