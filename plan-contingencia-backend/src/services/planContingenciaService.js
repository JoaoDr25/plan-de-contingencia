import { createCrudService } from '../services/baseCrudService.js'
import { calcularCamposFaltantes } from "../utils/planValidation.js";
import planContingenciaModel from '../models/planContingenciaModel.js'
import riesgoModels from '../models/riesgoModel.js'
import aprendizModel from '../models/aprendizModel.js'

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

    if (plan.estado === "aprobado" ||
        plan.estado === "en revision"
    ) {
        plan.estado = "borrador";

        await plan.save();
    }
}



const create = async (data) => {

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
        .populate("actividadId", "nombre categoria")
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



const generarPlan = async (id) => {

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
                "El plan no puede envioarse a revisión porque tiene información pendiente"
            );

        error.statusCode = 400;

        error.camposFaltantes = camposFaltantes;

        throw error;
    }

    plan.estado = "en revision";

    await plan.save();

    return plan;
}



const asociarRiesgosId = async (id, riesgoId) => {

    const plan = await obtenerPlanFunction(id);

    const riesgo = await riesgoModels.findById(riesgoId)

    if (!riesgo) {
        const error =
            new Error(
                "No se encontro el riesgo"
            );

        error.statusCode = 404;

        throw error;
    }

    const riesgoYaAsociado =
        plan.riesgosId.some(
            r => r.toString() === riesgoId
        );

    if (riesgoYaAsociado) {
        const error =
            new Error(
                "El riesgo ya esta asociado al plan"
            );

        error.statusCode = 400;

        throw error;
    }

    await regresarABorradorSiAplica(plan);

    plan.riesgosId.push(riesgoId);

    await plan.save();

    return plan;
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



const asociarAprendicesId = async (id, aprendizId) => {

    const plan = await obtenerPlanFunction(id);

    const aprendiz = await aprendizModel.findById(aprendizId);

    if (!aprendiz) {
        const error =
            new Error(
                "No se encontró el aprendiz"
            );

        error.statusCode = 404;

        throw error;
    }

    const aprendizYaAsociado =
        plan.aprendicesId.some(
            r => r.toString() === aprendizId
        );

    if (aprendizYaAsociado) {
        const error =
            new Error(
                "El aprendiz ya está asociado al plan"
            );

        error.statusCode = 400;

        throw error;
    }

    await regresarABorradorSiAplica(plan);

    plan.aprendicesId.push(aprendizId);

    await plan.save();

    return plan;
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

    return await crud.update(id, {
        contactosEmergencia: contactosEmergencia
    });
}



const seleccionarEppId = async (id, epp) => {

    const plan = await obtenerPlanFunction(id);

    await regresarABorradorSiAplica(plan);

    return await crud.update(id, {
        epp: epp
    });
}



const registrarSeguridadVialId = async (id, seguridadVial) => {

    const plan = await obtenerPlanFunction(id);

    await regresarABorradorSiAplica(plan);

    return await crud.update(id, {
        seguridadVial: seguridadVial
    });
}



const registrarContextoAcademicoId = async (id, contextoAcademico) => {

    const plan = await obtenerPlanFunction(id);

    await regresarABorradorSiAplica(plan);

    return await crud.update(id, {
        contextoAcademico: contextoAcademico
    });
}



const registrarArticulacionFormativaId = async (id, articulacionFormativa) => {

    const plan = await obtenerPlanFunction(id);

    await regresarABorradorSiAplica(plan);

    return await crud.update(id, {
        articulacionFormativa: articulacionFormativa
    });
}



const registrarPlanTrabajoId = async (id, planTrabajo) => {

    const plan = await obtenerPlanFunction(id);

    await regresarABorradorSiAplica(plan);

    return await crud.update(id, {
        planTrabajo: planTrabajo
    });
}

export default {
    ...crud,
    create,
    getAll,
    getById,
    updateById,
    cambiarEstadoId,
    generarPlan,
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

