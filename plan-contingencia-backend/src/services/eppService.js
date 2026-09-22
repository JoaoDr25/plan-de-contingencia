import { createCrudService } from "./baseCrudService.js";
import eppModel from "../models/eppModel.js"

const crud = createCrudService(eppModel);

const normalizarEstado = (estado) => {
    if (estado === true) return "Activo";
    if (estado === false) return "Inactivo";
    return estado;
}

const normalizarNivel = (nivel) => {
    if (!nivel) return nivel;

    const niveles = {
        BAJO: "Bajo",
        MEDIO: "Medio",
        ALTO: "Alto"
    };

    return niveles[nivel] ?? nivel;
}

const normalizarDatosEpp = (data) => {
    data.nombre = data.nombre ?? data.nombreEPP;
    data.nivel = normalizarNivel(data.nivel ?? data.nivelProteccion);
    data.estado = normalizarEstado(data.estado);
}

const create = async (data) => {

    normalizarDatosEpp(data);

    const { nombre } = data;

    const eppExistente = await eppModel.findOne({
        nombre
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

    normalizarDatosEpp(data);

    const { nombre } = data;

    const eppExistente = await eppModel.findOne({
        nombre,
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

export default { ...crud, create, getAll, getById, updateById, cambiarEstadoId, deleteById };