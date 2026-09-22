import { createCrudService } from "./baseCrudService.js";
import programaFormacionModel from "../models/programaFormacionModel.js";

const crud = createCrudService(programaFormacionModel);

const normalizarEstado = (estado) => {
    if (estado === true) return "Activo";
    if (estado === false) return "Inactivo";
    return estado;
}

const normalizarDatosPrograma = (data) => {
    data.nivel = data.nivel ?? data.nivelFormacion;
    data.centro = data.centro ?? data.centroFormacion;
    data.estado = normalizarEstado(data.estado);
}


const create = async (data) => {

    normalizarDatosPrograma(data);

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

    normalizarDatosPrograma(data);

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


export default { ...crud, create, getAll, getById, updateById, cambiarEstadoId, deleteById };

