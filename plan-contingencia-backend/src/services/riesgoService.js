import { createCrudService } from "./baseCrudService.js";
import protocoloModel from "../models/protocoloModel.js";
import riesgoModel from "../models/riesgoModel.js";
import peligroModel from '../models/peligroModel.js';

const crud = createCrudService(riesgoModel);

const normalizarNivel = (nivel) => {
    if (!nivel) return nivel;

    const niveles = {
        BAJO: "Bajo",
        MEDIO: "Medio",
        ALTO: "Alto"
    };

    return niveles[nivel] ?? nivel;
}

const normalizarDatosRiesgo = (data) => {
    if (data.riesgo || data.nombre) {
        data.riesgo = data.riesgo ?? data.nombre;
    }

    if (data.nivel || data.nivelRiesgo) {
        data.nivel = normalizarNivel(data.nivel ?? data.nivelRiesgo);
    }

    if (data.prevencion || data.medidasPrevencion) {
        data.prevencion = data.prevencion ?? data.medidasPrevencion;
    }

    if (data.peligroId && !Array.isArray(data.peligroId)) {
        data.peligroId = [data.peligroId];
    }

    if (data.peligroId?.length) {
        data.peligroId = [...new Set(data.peligroId)];
    }
}

const validarRelaciones = async (data) => {

    const {
        peligroId,
        protocolos
    } = data;

    if (peligroId?.length) {

        const peligros =
            await peligroModel.find({
                _id: { $in: peligroId }
            });

        if (peligros.length !== peligroId.length) {
            const error =
                new Error(
                    "Uno o más peligros seleccionados no existen"
                );

            error.statusCode = 404;

            throw error;
        }
    }

    if (protocolos?.length) {

        data.protocolos = [...new Set(protocolos)];

        const protocolosEncontrados =
            await protocoloModel.find({
                _id: {
                    $in: data.protocolos
                }
            });

        if (
            protocolosEncontrados.length !==
            data.protocolos.length
        ) {
            const error =
                new Error(
                    "Uno o más protocolos seleccionados no existen."
                );

            error.statusCode = 404;

            throw error;
        }
    }
}


const sincronizarPeligros = async (riesgoId, nuevosPeligros = [], antiguosPeligros = []) => {

    const nuevos = nuevosPeligros.map(id => id.toString());
    const antiguos = antiguosPeligros.map(id => id.toString());

    const peligrosAEliminar = antiguos.filter(
        id => !nuevos.includes(id)
    );

    const peligrosAAgregar = nuevos.filter(
        id => !antiguos.includes(id)
    );

    if (peligrosAEliminar.length) {
        await peligroModel.updateMany(
            {
                _id: { $in: peligrosAEliminar }
            },
            {
                $pull: {
                    riesgos: riesgoId
                }
            }
        );
    }

    if (peligrosAAgregar.length) {
        await peligroModel.updateMany(
            {
                _id: { $in: peligrosAAgregar }
            },
            {
                $addToSet: {
                    riesgos: riesgoId
                }
            }
        );
    }
};



const create = async (data) => {

    normalizarDatosRiesgo(data);

    const {
        riesgo,
        peligroId = []
    } = data;

    const riesgoExistente = await riesgoModel.findOne({
        riesgo
    });

    if (riesgoExistente) {
        const error =
            new Error(
                "No se puede crear el riesgo: ya existe un registro con ese nombre de riesgo"
            );

        error.statusCode = 400;

        throw error;
    }

    await validarRelaciones(data);

    const nuevoRiesgo = await crud.create(data);

    await sincronizarPeligros(
        nuevoRiesgo._id,
        peligroId
    );

    return nuevoRiesgo;
}



const getAll = async (filter = {}) => {
    return await crud.getAll(filter)
        .populate("peligroId")
        .populate("protocolos");
}



const getById = async (id) => {

    const obtenerRiesgoId = await crud.getById(id)
        .populate("peligroId")
        .populate("protocolos");

    if (!obtenerRiesgoId) {
        const error =
            new Error(
                "No se encontró el riesgo"
            );

        error.statusCode = 404;

        throw error;
    }

    return obtenerRiesgoId;
}



const updateById = async (id, data) => {

    normalizarDatosRiesgo(data);

    const {
        riesgo
    } = data;

    const riesgoActual = await riesgoModel.findById(id);

    if (!riesgoActual) {
        const error =
            new Error(
                "Riesgo no encontrado"
            );

        error.statusCode = 404;

        throw error;
    }

    const riesgoExistente = riesgo
        ? await riesgoModel.findOne({
            riesgo,
            _id: { $ne: id }
        })
        : null;

    if (riesgoExistente) {
        const error =
            new Error(
                "No se puede actualizar: ya existe otro riesgo con ese nombre"
            );

        error.statusCode = 400;

        throw error;
    }

    await validarRelaciones(data);

    const actualizarRiesgoId = await crud.update(
        id,
        data
    );

    if (
        Object.prototype.hasOwnProperty.call(
            data,
            "peligroId"
        )
    ) {
        await sincronizarPeligros(
            id,
            data.peligroId ?? [],
            riesgoActual.peligroId ?? []
        );
    }

    return actualizarRiesgoId;
}



const deleteById = async (id) => {

    const riesgoActual = await riesgoModel.findById(id);

    if (!riesgoActual) {
        const error =
            new Error(
                "Riesgo no encontrado"
            );

        error.statusCode = 404;

        throw error;
    }

    const eliminarRiesgoId = await crud.delete(id);

    if (!eliminarRiesgoId) {
        const error =
            new Error(
                "Riesgo no encontrado"
            );

        error.statusCode = 404;

        throw error;
    }

    await sincronizarPeligros(
        id,
        [],
        riesgoActual.peligroId ?? []
    );

    return eliminarRiesgoId;
}

export default { ...crud, create, getAll, getById, updateById, deleteById };