import { createCrudService } from "./baseCrudService.js";
import protocoloModel from "../models/protocoloModel.js";
import riesgoModel from "../models/riesgoModel.js";

const crud = createCrudService(protocoloModel);

const normalizarEstado = (estado) => {
    if (estado === true) return "Activo";
    if (estado === false) return "Inactivo";
    return estado;
}

const normalizarDatosProtocolo = (data) => {
    data.tipo = data.tipo ?? data.tipoEmergencia;
    data.accion = data.accion ?? data.accionInmediata;
    data.medio = data.medio ?? data.medioComunicacion;
    data.estado = normalizarEstado(data.estado);
}

const create = async (data) => {

    normalizarDatosProtocolo(data);

    const { tipo } = data;

    const protocoloExistente = await protocoloModel.findOne({
        tipo
    });

    if (protocoloExistente) {
        const error =
            new Error(
                "No se puede crear el protocolo: ya existe un registro con ese nombre de tipo de emergencia"
            );

        error.statusCode = 400;

        throw error;
    }

    return await crud.create(data);
}



const getAll = async (filter = {}) => {

    const normalizedFilter = {
        ...filter
    };

    if (Object.hasOwn(normalizedFilter, "estado")) {
        normalizedFilter.estado = normalizarEstado(normalizedFilter.estado);
    }

    return await crud.getAll(normalizedFilter);
}



const getById = async (id) => {

    const obtenerProtocoloId = await crud.getById(id);

    if (!obtenerProtocoloId) {
        const error =
            new Error(
                "No se encontró el protocolo"
            );

        error.statusCode = 404;

        throw error;
    }

    return obtenerProtocoloId;
}



const updateById = async (id, data) => {

    normalizarDatosProtocolo(data);

    const { tipo } = data;

    const protocoloExistente = tipo
        ? await protocoloModel.findOne({
            tipo,
            _id: { $ne: id }
        })
        : null;

    if (protocoloExistente) {
        const error =
            new Error(
                "No se puede actualizar, ya existe otro protocolo con ese nombre de tipo de emergencia"
            );

        error.statusCode = 400;

        throw error;
    }

    const actualizarProtocoloId = await crud.update(
        id,
        data
    );

    if (!actualizarProtocoloId) {
        const error =
            new Error(
                "Protocolo no encontrado"
            );

        error.statusCode = 404;

        throw error;
    }

    return actualizarProtocoloId;
}



const deleteById = async (id) => {

    const eliminarProtocoloId = await crud.delete(id);

    if (!eliminarProtocoloId) {
        const error =
            new Error(
                "Protocolo no encontrado"
            );

        error.statusCode = 404;

        throw error;
    }

    return eliminarProtocoloId;
}



// const obtenerRiesgoProtocolo = async (id) => {

//     const protocolo = await crud.getById(id)

//     if (!protocolo) {
//         const error =
//             new Error(
//                 "Protocolo no encontrado"
//             );

//         error.statusCode = 404;

//         throw error;
//     }

//     return await riesgoModel.find({
//         protocolos: id
//     }).populate("protocolos");
// }

const cambiarEstadoId = async (id, estado) => {

    const estadoNormalizado = normalizarEstado(estado);

    if (!["Activo", "Inactivo"].includes(estadoNormalizado)) {
        const error =
            new Error(
                "El campo 'estado' es obligatorio y debe ser Activo o Inactivo"
            );

        error.statusCode = 400;

        throw error;
    }

    const cambiarEstado = await crud.update(
        id,
        { estado: estadoNormalizado }
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

export default { ...crud, create, getAll, getById, updateById, cambiarEstadoId, deleteById }


