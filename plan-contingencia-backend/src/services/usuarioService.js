import { createCrudService } from "./baseCrudService.js";
import usuarioModel from "../models/usuarioModel.js";

const crud = createCrudService(usuarioModel);

const normalizarEstado = (estado) => {
    if (estado === true) return "Activo";
    if (estado === false) return "Inactivo";
    return estado;
}

const normalizarRol = (rol) => {
    if (!rol) return rol;

    const roles = {
        administrador: "ADMINISTRADOR",
        instructor: "CONSULTOR",
        usuario: "CONSULTOR",
        consultor: "CONSULTOR",
        pedagogia: "PEDAGOGIA",
        sst: "SST",
        coordinacion: "COORDINACION",
        Administrador: "ADMINISTRADOR",
        Instructor: "CONSULTOR",
        Usuario: "CONSULTOR",
        Consultor: "CONSULTOR",
        Pedagogía: "PEDAGOGIA",
        Pedagogia: "PEDAGOGIA",
        Coordinación: "COORDINACION",
        Coordinacion: "COORDINACION"
    };

    return roles[rol] ?? String(rol).trim().toUpperCase();
}

const normalizarDatosUsuario = (data) => {
    data.correo = data.correo ?? data.correoInstitucional;
    data.centro = data.centro ?? data.centroFormacion;
    data.rol = normalizarRol(data.rol ?? data.rolAsignado);
    data.estado = normalizarEstado(data.estado);
}

const create = async (data) => {

    normalizarDatosUsuario(data);

    const { documento, correo } = data;

    const usuarioExistente = await usuarioModel.findOne({
        documento
    });

    if (usuarioExistente) {
        const error = 
        new Error(
            "No se pudo crear el usuario: ya existe un registro con ese número de documento"
        );

        error.statusCode = 400;

        throw error;
    }

    const correoExistente = await usuarioModel.findOne({
        correo
    });

    if (correoExistente) {
        const error =
        new Error(
            "No se puede crear el usuario: Ya existe un usuario con este correo institucional"
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

    if (Object.hasOwn(normalizedFilter, "rol")) {
        normalizedFilter.rol = normalizarRol(normalizedFilter.rol);
    }

    if (Object.hasOwn(normalizedFilter, "rolAsignado")) {
        normalizedFilter.rol = normalizarRol(normalizedFilter.rolAsignado);
        delete normalizedFilter.rolAsignado;
    }

    return await crud.getAll(normalizedFilter);
}



const getById = async (id) => {

    const obtenerUsuarioId = await crud.getById(id);

    if (!obtenerUsuarioId) {
        const error =
        new Error(
            "No se encontró el usuario"
        );

        error.statusCode = 404;

        throw error;
    }

    return obtenerUsuarioId;
}



const updateById = async (id, data) => {

    normalizarDatosUsuario(data);

    const { documento, correo } = data;

    const usuarioExistente = documento
        ? await usuarioModel.findOne({
            documento,
            _id: { $ne: id }
        })
        : null;

    if (usuarioExistente) {
        const error =
        new Error(
            "No se puede actualizar: ya existe otro usuario con ese número de documento"
        );

        error.statusCode = 400;

        throw error;
    }

    const correoExistente = correo
        ? await usuarioModel.findOne({
            correo,
            _id: { $ne: id }
        })
        : null;

    if (correoExistente) {
        const error =
        new Error(
            "No se puede actualizar: Ya existe un usuario con ese correo institucional"
        );

        error.statusCode = 400;

        throw error;
    }

    const actualizarUsuarioId = await crud.update(
        id,
        data
    );

    if (!actualizarUsuarioId) {
        const error =
        new Error(
            "Usuario no encontrado"
        );

        error.statusCode = 404;

        throw error;
    }

    return actualizarUsuarioId;
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



const deleteById = async (id)  => {

    const eliminarUsuarioId = await crud.delete(id);

    if (!eliminarUsuarioId) {
        const error =
        new Error(
            "Usuario no encontrado"
        );

        error.statusCode = 404;

        throw error;
    }

    return eliminarUsuarioId;
}

export default { ...crud, create, getAll, getById, updateById, cambiarEstadoId, deleteById };


