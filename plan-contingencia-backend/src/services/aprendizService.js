import { createCrudService } from "./baseCrudService.js";
import aprendizModel from "../models/aprendizModel.js";
import programaFormacionModel from "../models/programaFormacionModel.js";

const crud = createCrudService(aprendizModel);

const normalizarEstado = (estado) => {
    if (estado === true) return "Activo";
    if (estado === false) return "Inactivo";
    return estado;
}

const resolverProgramaFormacion = async (data) => {
    const programa = data.programaFormacionId
        ? await programaFormacionModel.findById(data.programaFormacionId)
        : await programaFormacionModel.findOne({ ficha: data.ficha });

    if (!programa) {
        const error =
        new Error(
            "Programa de formación no encontrado"
        );

        error.statusCode = 404;

        throw error;
    }

    data.programaFormacionId = programa._id;
    data.programa = programa.nombre;
    data.ficha = programa.ficha;
}

const normalizarDatosAprendiz = async (data) => {
    data.estado = normalizarEstado(data.estado);

    if (data.programaFormacionId || data.ficha) {
        await resolverProgramaFormacion(data);
    }
}

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

    await normalizarDatosAprendiz(data);

    return await crud.create(data);
}



const getAll = async (filter = {}) => {

    const normalizedFilter = {
        ...filter
    };

    if (Object.hasOwn(normalizedFilter, "estado")) {
        normalizedFilter.estado = normalizarEstado(normalizedFilter.estado);
    }

    return await crud.getAll(normalizedFilter)
        .populate("programaFormacionId", "nombre ficha nivel nivelFormacion");
}



const getById = async (id) => {

    const obtenerAprendizId = await crud.getById(id)
        .populate("programaFormacionId", "nombre ficha nivel nivelFormacion");

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

    await normalizarDatosAprendiz(data);

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


export default { ...crud, create, getAll, getById, updateById, cambiarEstadoId, deleteById };



