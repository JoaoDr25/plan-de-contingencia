import { createCrudService } from '../services/baseCrudService.js'
import { calcularCamposFaltantes } from "../utils/planValidation.js"
import planContingenciaModel from '../models/planContingenciaModel.js'
import riesgoModel from '../models/riesgoModel.js'
import aprendizModel from '../models/aprendizModel.js'
import programaFormacionModel from '../models/programaFormacionModel.js'
import actividadModel from '../models/actividadModel.js'
import usuarioModel from '../models/usuarioModel.js'
import contactosEmergenciaModel from '../models/contactoEmergenciaModel.js'
import elementosProteccionPersonalModel from '../models/eppModel.js'
import { SEGURIDAD_VIAL_ITEMS } from '../constants/seguridadVialItems.js'
import { generarDocumentoPdf } from '../utils/pdfGenerator.js'
import path from 'path'

const crud = createCrudService(planContingenciaModel);


const obtenerPlanFunction = async (id) => {

    const plan = await crud.getById(id);

    if (!plan) {
        const error =
            new Error(
                "Plan de contingencia no encontrado"
            );

        error.statusCode = 404;

        throw error;
    }

    return plan;
}



const regresarABorradorSiAplica = async (plan) => {

    if (
        plan.estado === "ejecutado" ||
        plan.estado === "cancelado"
    ) {
        const error =
            new Error(
                "No se puede modificar un plan ejecutado o cancelado"
            );

        error.statusCode = 400;

        throw error;
    }

    if (
        plan.estado === "aprobado" ||
        plan.estado === "en revision"
    ) {
        plan.estado = "borrador";

        await plan.save();
    }
}



const create = async (data) => {

    const {
        programaFormacionId,
        actividadId,
        usuarioId
    } = data;

    const programa = await programaFormacionModel.findById(programaFormacionId);

    if (!programa) {
        const error =
            new Error(
                "Programa de formación no encontrado"
            );

        error.statusCode = 404;

        throw error;
    }

    data.programaFormacionNombre = programa.nombre;

    const actividad = await actividadModel.findById(actividadId);

    if (!actividad) {
        const error =
            new Error(
                "Actividad no encontrada"
            );

        error.statusCode = 404;

        throw error;
    }

    const usuario = await usuarioModel.findById(usuarioId);

    if (!usuario) {
        const error =
            new Error(
                "Usuario no encontrado"
            );

        error.statusCode = 404;

        throw error;
    }

    if (!usuario.estado) {
        const error =
            new Error(
                "No se puede crear el plan porque el usuario se encuentra inactivo"
            )

        error.statusCode = 400;

        throw error;
    }

    data.usuarioNombre = usuario.nombre;

    return await crud.create(data);
}



const getAll = async () => {

    const listarPlanesId = await crud.getAll()
        .populate("programaFormacionId", "nombre ficha")
        .populate("actividadId", "nombre categoria")
        .populate("riesgosId");

    return listarPlanesId;
}



const getById = async (id) => {

    const obtenerPlanId = await crud.getById(id)
        .populate("programaFormacionId", "nombre ficha")
        .populate("actividadId", "nombre tipoActividad")
        .populate("riesgosId");

    if (!obtenerPlanId) {
        const error =
            new Error(
                "No se encontró el plan de contingencia"
            );

        error.statusCode = 404;

        throw error;
    }

    return obtenerPlanId;
}



const updateById = async (id, data) => {

    const plan = await obtenerPlanFunction(id);

    await regresarABorradorSiAplica(plan)

    const {
        programaFormacionId,
        actividadId,
        usuarioId
    } = data;

    if (programaFormacionId) {

        const programa = await programaFormacionModel.findById(programaFormacionId);

        if (!programa) {
            const error =
                new Error(
                    "Programa de formación no encontrado"
                );

            error.statusCode = 404;

            throw error;
        }

        data.programaFormacionNombre = programa.nombre;

    }

    if (actividadId) {

        const actividad = await actividadModel.findById(actividadId);

        if (!actividad) {
            const error =
                new Error(
                    "Actividad no encontrada"
                );

            error.statusCode = 404;

            throw error;
        }

    }

    if (usuarioId) {

        const usuario = await usuarioModel.findById(usuarioId);

        if (!usuario) {
            const error =
                new Error(
                    "Usuario no encontrado"
                );

            error.statusCode = 404;

            throw error;
        }

        if (!usuario.estado) {
            const error =
                new Error(
                    "No se puede actualizar el plan porque el usuario se encuentra inactivo"
                )

            error.statusCode = 400;

            throw error;
        }

        data.usuarioNombre = usuario.nombre;

    }

    const actualizarPlanId = await crud.update(
        id,
        data
    );

    if (!actualizarPlanId) {
        const error =
            new Error(
                "Plan de contingencia no encontrado"
            );

        error.statusCode = 404;

        throw error;
    }

    return actualizarPlanId;
}



const cambiarEstadoId = async (id, estado) => {

    const plan = await obtenerPlanFunction(id);

    const transicionesPermitidas = {
        "borrador": [
            "en revision",
            "cancelado"
        ],
        "en revision": [
            "aprobado",
            "cancelado",
        ],
        "aprobado": [
            "ejecutado",
            "cancelado",
            "borrador"
        ],
        "ejecutado": [],
        "cancelado": [],
    }

    const estadoActual = plan.estado;

    if (!transicionesPermitidas[estadoActual].includes(estado)) {
        const error =
            new Error(
                `No se permite cambiar de '${estadoActual}' a '${estado}'`
            );

        error.statusCode = 400;

        throw error;
    }

    plan.estado = estado;

    await plan.save();

    return plan;
}



const generarPlanId = async (id) => {

    const plan = await planContingenciaModel.findById(id)
        .populate("programaFormacionId")
        .populate("actividadId")
        .populate("riesgosId")
        .populate("aprendicesId")

    if (!plan) {
        const error =
            new Error(
                "Plan de contingencia no encontrado"
            );

        error.statusCode = 404;

        throw error;
    }

    if (plan.estado !== "borrador") {
        const error =
            new Error(
                "Solo los planes en borrador pueden enviarse a revisión"
            );

        error.statusCode = 400;

        throw error;
    }

    const camposFaltantes = calcularCamposFaltantes(plan);

    if (camposFaltantes.length > 0) {
        const error =
            new Error(
                "El plan no puede enviarse a revisión porque tiene información pendiente"
            );

        error.statusCode = 400;

        error.camposFaltantes = camposFaltantes;

        throw error;
    }

    plan.estado = "en revision";

    await plan.save();

    return plan;
}



const generarPdfId = async (id) => {

    const plan = await planContingenciaModel.findById(id)
        .populate("programaFormacionId")
        .populate("actividadId")
        .populate("aprendicesId")
        .populate("epp")
        .populate("contactosEmergencia.contactosBase")
        .populate({
            path: "riesgosId",
            populate: [
                {
                    path: "peligroId"
                },
                {
                    path: "protocolos"
                }
            ]
        })

    if (!plan) {
        const error =
            new Error(
                "Plan de contingencia no encontrado"
            );

        error.statusCode = 400;

        throw error;
    }

    if (plan.estado === "borrador" || plan.estado === "en revision") {
        const error =
            new Error(
                "Solo se puede generar PDF de un plan en estado 'Aprobado' o 'Ejecutado"
            );

        error.statusCode = 400;

        throw error;
    }

    const camposFaltantes = calcularCamposFaltantes(plan);

    if (camposFaltantes.length > 0) {
        const error =
            new Error(
                "El plan tiene infomación pendiente"
            );

        error.statusCode = 400;
        error.camposFaltantes = camposFaltantes;

        throw error;
    }

    const pdfBuffer = await generarDocumentoPdf(plan);

    return pdfBuffer;
}



const asociarRiesgosId = async (id, riesgosId) => {

    const plan = await obtenerPlanFunction(id);

    if (!Array.isArray(riesgosId) || riesgosId.length === 0) {
        const error =
        new Error(
            "Debe enviar al menos un riesgo"
        );

        error.statusCode = 400;

        throw error;
    }

    const riesgos= await riesgoModel.find({
        _id: { $in: riesgosId }
    });

    if (riesgos.length !== riesgosId.length) {
        const error =
            new Error(
                "Uno o mas riesgos no existen"
            );

        error.statusCode = 404;

        throw error;
    }

    const riesgosAsociados = plan.riesgosId.map( id => id.toString());

    const nuevosRiesgos = riesgosId.filter(
        id => ! riesgosAsociados.includes(id)
    );

    if (nuevosRiesgos.length === 0) {
        const error =
            new Error(
                "Todos los riesgos ya se encuentran asociados al plan"
            );

        error.statusCode = 400;

        throw error;
    }

    await regresarABorradorSiAplica(plan);

    plan.riesgosId.push(...nuevosRiesgos);

    await plan.save();

    return await plan.populate({
        path: "riesgosId",
        populate: [
            {
                path: "peligroId"
            },
            {
                path: "protocolos"
            }
        ]
    });
}



const obtenerAsociacionRiesgoId = async (id) => {

    const plan = await planContingenciaModel.findById(id)
        .populate("riesgosId");

    if (!plan) {
        const error =
            new Error(
                "No se encontró el plan de contingencia"
            );

        error.statusCode = 404;

        throw error;
    }

    return plan.riesgosId;
}



const eliminarAsociacionRiesgoId = async (id, riesgoId) => {

    const plan = await obtenerPlanFunction(id);

    await regresarABorradorSiAplica(plan);

    const riesgoAsociado =
        plan.riesgosId.some(
            r => r.toString() === riesgoId
        );

    if (!riesgoAsociado) {
        const error =
            new Error(
                "El riesgo no está asociado al plan"
            );

        error.statusCode = 404;

        throw error;
    }

    plan.riesgosId =
        plan.riesgosId.filter(
            r => r.toString() !== riesgoId
        );

    await plan.save();

    return plan;
}



const asociarAprendicesId = async (id, aprendicesId) => {

    const plan = await obtenerPlanFunction(id);

    if (!Array.isArray(aprendicesId) || aprendicesId.length === 0) {
        const error =
        new Error(
            "Debe enviar al menos un aprendiz"
        );

        error.statusCode = 400;

        throw error;
    }

    const aprendices = await aprendizModel.find({
        _id: { $in: aprendicesId }
    });

    if (aprendices.length !== aprendicesId.length) {
        const error =
            new Error(
                "Uno o mas aprendices no existen"
            );

        error.statusCode = 404;

        throw error;
    }

    const aprendicesAsociados = plan.aprendicesId.map( id => id.toString());

    const nuevosAprendices = aprendicesId.filter(
        id => ! aprendicesAsociados.includes(id)
    );

    if (nuevosAprendices.length === 0) {
        const error =
            new Error(
                "Todos los aprendices ya se encuentran asociados al plan"
            );

        error.statusCode = 400;

        throw error;
    }

    await regresarABorradorSiAplica(plan);

    plan.aprendicesId.push(...nuevosAprendices);

    await plan.save();

    return await plan.populate("aprendicesId");
}



const obtenerAsociacionAprendicesId = async (id) => {

    const plan = await planContingenciaModel.findById(id)
        .populate("aprendicesId");

    if (!plan) {
        const error =
            new Error(
                "No se encontró el plan de contingencia"
            );

        error.statusCode = 404;

        throw error;
    }

    return plan.aprendicesId;
}



const eliminarAsociacionAprendicesId = async (id, aprendizId) => {

    const plan = await obtenerPlanFunction(id);

    await regresarABorradorSiAplica(plan);

    const aprendizAsociado =
        plan.aprendicesId.some(
            a => a.toString() === aprendizId
        );

    if (!aprendizAsociado) {
        const error =
            new Error(
                "El aprendiz no está asociado al plan"
            );

        error.statusCode = 404;

        throw error;
    }

    plan.aprendicesId =
        plan.aprendicesId.filter(
            r => r.toString() !== aprendizId
        );

    await plan.save();

    return plan;
}



const guardarContactosEmergenciaId = async (id, contactosEmergencia) => {

    const plan = await obtenerPlanFunction(id);

    await regresarABorradorSiAplica(plan);

    if (
        !contactosEmergencia.contactosEmergencia.contactosBase?.length &&
        !contactosEmergencia.contactosEmergencia.otro?.nombreEntidad
    ) {
        const error =
            new Error(
                "Debe seleccionar al menos un contacto de emergencia"
            );

        error.statusCode = 400;

        throw error;
    }

    const contactos =
        contactosEmergencia.contactosEmergencia.contactosBase;

    const duplicados =
        new Set(contactos).size !== contactos.length;

    if (duplicados) {
        const error =
            new Error(
                "No se permiten contactos de emergencia duplicados"
            );

        error.statusCode = 400;

        throw error;
    }

    const otro = contactosEmergencia.contactosEmergencia.otro;

    if (otro?.nombreEntidad && !otro.telefono?.trim()) {

        const error =
            new Error(
                "Debe registrar el teléfono del contacto adicional"
            );

        error.statusCode = 400;

        throw error;
    }

    for (const contactoId of contactos) {

        const contacto = await contactosEmergenciaModel.findById(contactoId);

        if (!contacto) {

            const error = new Error(
                `Contacto de emergencia no encontrado: ${contactoId}`
            );

            error.statusCode = 404;

            throw error;
        }
    }

    return await crud.update(id, {
        contactosEmergencia:
            contactosEmergencia.contactosEmergencia
    });
}



const seleccionarEppId = async (id, epp) => {

    const plan = await obtenerPlanFunction(id);

    await regresarABorradorSiAplica(plan);

    if (!Array.isArray(epp.epp)) {
        const error =
            new Error(
                "Los elementos de protección personal deben enviarse en un arreglo"
            );

        error.statusCode = 400;

        throw error;
    }

    const duplicados = new Set(epp.epp).size !== epp.epp.length;

    if (duplicados) {
        const error =
            new Error(
                "No se permiten elementos de protección personal duplicados"
            );

        error.statusCode = 400;

        throw error;
    }

    for (const eppId of epp.epp) {

        const elemento = await elementosProteccionPersonalModel.findById(eppId);

        if (!elemento) {
            const error =
                new Error(
                    `Elemento de protección personal no encontrado: ${eppId}`
                );

            error.statusCode = 404;

            throw error;
        }

        if (!elemento.estado) {
            const error =
                new Error(
                    `El elemento ${elemento.nombre} se encuentra inactivo`
                );

            error.statusCode = 400;

            throw error;
        }
    }

    return await crud.update(id, {
        epp: epp.epp
    });
}



const registrarSeguridadVialId = async (id, seguridadVial) => {

    const plan = await obtenerPlanFunction(id);

    await regresarABorradorSiAplica(plan);

    if (
        seguridadVial.seguridadVial.aplica &&
        !Array.isArray(seguridadVial.seguridadVial.items)
    ) {
        const error =
            new Error(
                "Los items de seguridad vial deben enviarse en un arreglo"
            );

        error.statusCode = 400;

        throw error;
    }

    for (const item of seguridadVial.seguridadVial.items) {

        const itemValido = SEGURIDAD_VIAL_ITEMS.some(
            catalogo => catalogo.itemId === item.itemId
        )

        if (!itemValido) {
            const error =
                new Error(
                    "Item de seguridad vial no encontrado"
                );

            error.statusCode = 404;

            throw error;
        }

        if (item.cumple === true && !item.soporte?.trim()) {
            const error =
                new Error(
                    `Debe adjuntar soporte para ${item.nombre}`
                );

            error.statusCode = 400;

            throw error;
        }
    }

    return await crud.update(id, {
        seguridadVial: seguridadVial.seguridadVial
    });
}



const registrarContextoAcademicoId = async (id, contextoAcademico) => {

    const plan = await obtenerPlanFunction(id);

    await regresarABorradorSiAplica(plan);

    if (
        contextoAcademico.consentimientoMenores === true &&
        !contextoAcademico.consentimientoLink?.trim()
    ) {
        const error =
            new Error(
                "Debe adjuntar el consentimiento cuando existan menores de edad"
            );

        error.statusCode = 400;

        throw error;
    }

    return await crud.update(id, {
        contextoAcademico: contextoAcademico
    });
}



const registrarArticulacionFormativaId = async (id, articulacionFormativa) => {

    const plan = await obtenerPlanFunction(id);

    await regresarABorradorSiAplica(plan);

    const {
        proyectoFormativo,
        visitaEmpresa,
        investigacion,
        otro
    } = articulacionFormativa;

    if (
        !proyectoFormativo &&
        !visitaEmpresa &&
        !investigacion &&
        !otro?.trim()
    ) {
        const error =
            new Error(
                "Debe seleccionar al menos una articulación formativa"
            );

        error.statusCode = 400;

        throw error;
    }

    return await crud.update(id, {
        articulacionFormativa: articulacionFormativa
    });
}



const registrarPlanTrabajoId = async (id, planTrabajo) => {

    const plan = await obtenerPlanFunction(id);

    await regresarABorradorSiAplica(plan);

    if (!Array.isArray(planTrabajo.planTrabajo)) {
        const error =
            new Error(
                "El plan de trabajo debe ser un arreglo"
            );

        error.statusCode = 400;

        throw error;
    }

    for (const actividad of planTrabajo.planTrabajo) {

        if (actividad.horaInicio && !actividad.horaFin) {
            const error =
                new Error(
                    "Debe especificar hora de fin"
                );

            error.statusCode = 400;

            throw error;
        }

        if (actividad.horaFin && !actividad.horaInicio) {
            const error =
                new Error(
                    "Debe especificar hora de fin"
                );

            error.statusCode = 400;

            throw error;
        }

        if (
            actividad.horaInicio &&
            actividad.horaFin &&
            actividad.horaFin <= actividad.horaInicio
        ) {
            const error =
                new Error(
                    "La hora de fin debe ser posterior a la hora de inicio"
                );

            error.statusCode = 400;

            throw error;
        }
    }

    return await crud.update(id, {
        planTrabajo: planTrabajo.planTrabajo
    });
}

export default {
    ...crud,
    create,
    getAll,
    getById,
    updateById,
    cambiarEstadoId,
    generarPlanId,
    generarPdfId,
    asociarRiesgosId,
    obtenerAsociacionRiesgoId,
    eliminarAsociacionRiesgoId,
    asociarAprendicesId,
    obtenerAsociacionAprendicesId,
    eliminarAsociacionAprendicesId,
    guardarContactosEmergenciaId,
    seleccionarEppId,
    registrarSeguridadVialId,
    registrarContextoAcademicoId,
    registrarArticulacionFormativaId,
    registrarPlanTrabajoId
};

