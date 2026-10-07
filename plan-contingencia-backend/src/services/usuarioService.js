import { createCrudService } from "./baseCrudService.js";
// import { obtenerUsuariosRepfora } from "./repforaService.js"
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
        subdireccion: "SUBDIRECCION",
        "subdirección": "SUBDIRECCION",
        bienestar: "BIENESTAR",
        Administrador: "ADMINISTRADOR",
        Instructor: "CONSULTOR",
        Usuario: "CONSULTOR",
        Consultor: "CONSULTOR",
        Pedagogía: "PEDAGOGIA",
        Pedagogia: "PEDAGOGIA",
        Coordinación: "COORDINACION",
        Coordinacion: "COORDINACION",
        Subdirección: "SUBDIRECCION",
        Subdireccion: "SUBDIRECCION",
        Bienestar: "BIENESTAR"
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


const sincronizar = async () => {

    /* Implementar la API y la normalización de usuarios REPFORA.
    
    const usuariosRepfora =
        await obtenerUsuariosRepfora();

    const usuariosNormalizados =
        usuariosRepfora.map(
            normalizarUsuarioRepfora
        );

    for (const usuarioRepfora of usuariosNormalizados) {

        const usuarioExistente =
            await usuarioModel.findOne({
                documento: usuarioRepfora.documento
            });

        if (!usuarioExistente) {

            await usuarioModel.create({
                ...usuarioRepfora,

                // Valores locales
                rol: null,
                estado: "Activo",

                firma: null,
                firmaNombre: null,
                firmaActualizada: null,

                acceso: null
            });

            continue;
        }

        await usuarioModel.updateOne(
            { _id: usuarioExistente._id },
            {
                $set: {
                    // Solo datos provenientes de REPFORA
                }
            }
        );
    }
    return ...;
    */

    const error = new Error("La sincronización con REPFORA aún no está disponible");
    error.statusCode = 501;
    throw error;
};


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


const getRevisores = async () => {
    const revisores = await usuarioModel.find({
        estado: "Activo",
        rol: {
            $in: [
                "PEDAGOGIA",
                "SST",
                "COORDINACION"
            ]
        }
    }).sort({
        apellido: 1,
        nombre: 1
    });

    return {
        pedagogia: revisores.filter(
            usuario => usuario.rol === "PEDAGOGIA"
        ),
        sst: revisores.filter(
            usuario => usuario.rol === "SST"
        ),
        coordinacion: revisores.filter(
            usuario => usuario.rol === "COORDINACION"
        )
    };
};


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


const cambiarRolId = async (id, rol) => {

    const rolNormalizado = normalizarRol(rol);

    const rolesPermitidos = [
        "ADMINISTRADOR",
        "CONSULTOR",
        "PEDAGOGIA",
        "SST",
        "COORDINACION",
        "SUBDIRECCION",
        "BIENESTAR",
        null
    ];

    if (!rolesPermitidos.includes(rolNormalizado)) {
        const error = new Error(
            "El rol proporcionado no es válido"
        );

        error.statusCode = 400;

        throw error;
    }

    const usuario = await crud.update(
        id,
        { rol: rolNormalizado }
    );

    if (!usuario) {
        const error = new Error(
            "Usuario no encontrado"
        );

        error.statusCode = 404;

        throw error;
    }

    return usuario;
};


const registrarAcceso = async (id) => {

    const registrarAccesoId = await crud.update(
        id,
        { acceso: new Date() }
    );

    if (!registrarAccesoId) {
        const error =
            new Error(
                "Usuario no encontrado"
            );

        error.statusCode = 404;

        throw error;
    }

    return registrarAccesoId;
}


const actualizarFirma = async (
    id,
    usuarioAutenticadoId,
    firma,
    firmaNombre
) => {

    if (id !== usuarioAutenticadoId.toString()) {
        const error = new Error(
            "No tienes permisos para administrar la firma de este usuario"
        );
        error.statusCode = 403;

        throw error;
    }

    if (
        firma !== null &&
        firma !== undefined &&
        typeof firma !== "string"
    ) {
        const error = new Error(
            "El campo 'firma' debe ser una cadena de texto o null"
        );
        error.statusCode = 400;

        throw error;
    }

    if (
        firmaNombre !== null &&
        firmaNombre !== undefined &&
        typeof firmaNombre !== "string"
    ) {
        const error = new Error(
            "El campo 'firmaNombre' debe ser una cadena de texto o null"
        );
        error.statusCode = 400;

        throw error;
    }

    const usuario = await usuarioModel.findById(id);

    if (!usuario) {
        const error = new Error(
            "Usuario no encontrado"
        );
        error.statusCode = 404;

        throw error;
    }

    const tieneFirma =
        firma !== null &&
        firma !== undefined &&
        firma.trim() !== "";

    usuario.firma = tieneFirma
        ? firma
        : null;

    usuario.firmaNombre = tieneFirma
        ? (firmaNombre?.trim() || null)
        : null;

    usuario.firmaActualizada = tieneFirma
        ? new Date()
        : null;

    await usuario.save();

    return usuario;
};


const deleteById = async (id) => {

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

export default { ...crud, create, sincronizar, getAll, getById, updateById, cambiarEstadoId, cambiarRolId, registrarAcceso, actualizarFirma, getRevisores, deleteById };


