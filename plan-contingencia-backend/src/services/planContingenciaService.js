import { createCrudService } from '../services/baseCrudService.js'
import { calcularCamposFaltantes } from "../utils/planValidation.js"
import { generarDocumentoPdf } from '../utils/pdfGenerator.js'

import { SEGURIDAD_VIAL_ITEMS } from '../constants/seguridadVialItems.js'

import planContingenciaModel from '../models/planContingenciaModel.js'
import riesgoModel from '../models/riesgoModel.js'
import aprendizModel from '../models/aprendizModel.js'
import programaFormacionModel from '../models/programaFormacionModel.js'
import actividadModel from '../models/actividadModel.js'
import usuarioModel from '../models/usuarioModel.js'
import contactosEmergenciaModel from '../models/contactoEmergenciaModel.js'
import elementosProteccionPersonalModel from '../models/eppModel.js'

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
    data.programaFormacionNivel = programa.nivel ?? programa.nivelFormacion;
    data.ficha = programa.ficha;

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

    if (usuario.estado !== "Activo") {
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



const populatePlanQuery = (query) => query
    .populate("programaFormacionId", "nombre ficha nivel nivelFormacion")
    .populate("actividadId", "nombre tipo categoria")
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
    });


const construirFiltroVisibilidad = (usuario, filter = {}) => {

    if (usuario.rol === "CONSULTOR") {
        return {
            ...filter,
            usuarioId: usuario.usuarioId
        };
    }
    return filter;
};


const getAll = async (filter = {}, usuario) => {

    const filtro =
        construirFiltroVisibilidad(usuario, filter);

    const listarPlanesId =
        await populatePlanQuery(
            crud.getAll(filtro)
        );

    return listarPlanesId;
};



const getById = async (id, usuario) => {

    const filtro =
        construirFiltroVisibilidad(
            usuario,
            { _id: id }
        );

    const obtenerPlanId =
        await populatePlanQuery(
            planContingenciaModel.findOne(filtro)
        );

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

    if (!plan) {
        const error = new Error(
            "Plan de contingencia no encontrado"
        );

        error.statusCode = 404;

        throw error;
    }

    const camposEditables = [
        "clasificacionInformacion",
        "programaFormacionId",
        "actividadId",
        "descripcionActividad",
        "fecha",
        "horaSalida",
        "horaRegreso",
        "tipoTransporte",
        "lugarSalida",
        "lugarDestino",
        "contactoLugar",
        "observaciones"
    ];

    const datosActualizados = {};

    for (const campo of camposEditables) {

        if (data[campo] !== undefined) {
            datosActualizados[campo] = data[campo];
        }
    }

    if (data.programaFormacionId) {

        const programa =
            await programaFormacionModel.findById(
                data.programaFormacionId
            );

        if (!programa) {
            const error = new Error(
                "Programa de formación no encontrado"
            );

            error.statusCode = 404;

            throw error;
        }

        datosActualizados.programaFormacionNombre =
            programa.nombre;

        datosActualizados.programaFormacionNivel =
            programa.nivel ??
            programa.nivelFormacion;

        datosActualizados.ficha =
            programa.ficha;
    }

    if (data.actividadId) {

        const actividad =
            await actividadModel.findById(
                data.actividadId
            );

        if (!actividad) {
            const error = new Error(
                "Actividad no encontrada"
            );

            error.statusCode = 404;

            throw error;
        }
    }

    const actualizarPlanId = await crud.update(
        id,
        datosActualizados
    );

    if (!actualizarPlanId) {
        const error = new Error(
            "Plan de contingencia no encontrado"
        );

        error.statusCode = 404;

        throw error;
    }
    return actualizarPlanId;
};



const cambiarEstadoId = async (id, nuevoEstado, usuario) => {

    const plan = await obtenerPlanFunction(id);

    if (!plan) {
        const error = new Error(
            "Plan de contingencia no encontrado"
        );

        error.statusCode = 404;

        throw error;
    }

    const usuarioActual = await usuarioModel.findById(
        usuario.usuarioId
    );

    if (!usuarioActual) {
        const error = new Error(
            "Usuario autenticado no encontrado"
        );

        error.statusCode = 404;

        throw error;
    }

    if (usuarioActual.estado !== "Activo") {
        const error = new Error(
            "El usuario se encuentra inactivo"
        );

        error.statusCode = 403;

        throw error;
    }

    const transicionesPermitidas = {
        "borrador": [],

        "en revision": [
            "aprobado",
            "borrador"
        ],

        "aprobado": [
            "ejecutado",
            "cancelado",
            "borrador"
        ],

        "ejecutado": [],

        "cancelado": []
    };

    const transiciones =
        transicionesPermitidas[plan.estado] || [];

    if (!transiciones.includes(nuevoEstado)) {

        const error = new Error(
            `No se permite cambiar un plan de ${plan.estado} a ${nuevoEstado}`
        );

        error.statusCode = 403;

        throw error;
    }

    if (
        plan.estado === "borrador" &&
        nuevoEstado === "en revision"
    ) {

        if (
            plan.usuarioId.toString() !==
            usuarioActual._id.toString()
        ) {

            const error = new Error(
                "Solo el usuario responsable del plan puede enviarlo a revisión"
            );

            error.statusCode = 403;

            throw error;
        }
    }

    if (
        plan.estado === "en revision" &&
        nuevoEstado === "aprobado"
    ) {

        const error = new Error(
            "El plan solo puede pasar a aprobado cuando las tres revisiones hayan sido aprobadas"
        );

        error.statusCode = 403;

        throw error;
    }

    if (
        plan.estado === "en revision" &&
        nuevoEstado === "borrador"
    ) {

        const error = new Error(
            "Un plan en revisión solo puede volver a borrador mediante el proceso de revisión"
        );

        error.statusCode = 403;

        throw error;
    }

    if (
        plan.estado === "aprobado" &&
        [
            "ejecutado",
            "cancelado",
            "borrador"
        ].includes(nuevoEstado)
    ) {

        if (usuarioActual.rol !== "COORDINACION") {

            const error = new Error(
                "Solo el rol de Coordinación puede realizar esta acción"
            );

            error.statusCode = 403;

            throw error;
        }
    }
    plan.estado = nuevoEstado;

    await plan.save();

    return plan;
};



const deleteById = async (id) => {

    const plan = await obtenerPlanFunction(id);

    if (plan.estado !== "borrador") {
        const error =
            new Error(
                "Solo se pueden eliminar planes en estado borrador"
            );
        error.statusCode = 400;

        throw error;
    }

    const eliminarPlanId = await crud.delete(id);

    if (!eliminarPlanId) {
        const error =
            new Error(
                "Plan de contingencia no encontrado"
            );

        error.statusCode = 404;

        throw error;
    }
    return eliminarPlanId;
}



const generarPlanId = async (id) => {

    const plan = await planContingenciaModel.findById(id)
        .populate("programaFormacionId")
        .populate("actividadId")
        .populate("riesgosId")
        .populate("aprendicesId");

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

    plan.revision.pedagogia = {
        estado: "pendiente"
    };

    plan.revision.sst = {
        estado: "pendiente"
    };

    plan.revision.coordinacion = {
        estado: "pendiente"
    };

    plan.estado = "en revision";

    await plan.save();

    return plan;
};



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

    const riesgosUnicos = [...new Set(riesgosId.map(String))];

    const riesgos = await riesgoModel.find({
        _id: { $in: riesgosUnicos }
    });

    if (riesgos.length !== riesgosUnicos.length) {
        const error =
            new Error(
                "Uno o mas riesgos no existen"
            );
        error.statusCode = 404;

        throw error;
    }

    // La selección enviada reemplaza a la anterior para permitir editar el plan.
    plan.riesgosId = riesgosUnicos;

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

    const aprendicesUnicos = [...new Set(aprendicesId.map(String))];

    const aprendices = await aprendizModel.find({
        _id: { $in: aprendicesUnicos }
    });

    if (aprendices.length !== aprendicesUnicos.length) {
        const error =
            new Error(
                "Uno o mas aprendices no existen"
            );
        error.statusCode = 404;

        throw error;
    }

    // La selección enviada reemplaza a la anterior para permitir editar el plan.
    plan.aprendicesId = aprendicesUnicos;

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

        if (elemento.estado !== "Activo") {
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

    const aplica = plan.tipoTransporte !== "APRENDIZ";
    const items = seguridadVial.seguridadVial?.items ?? [];

    if (
        aplica &&
        !Array.isArray(items)
    ) {
        const error =
            new Error(
                "Los items de seguridad vial deben enviarse en un arreglo"
            );

        error.statusCode = 400;

        throw error;
    }

    for (const item of items) {

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
        seguridadVial: {
            aplica,
            items
        }
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
        otroSeleccionado,
        otro
    } = articulacionFormativa;

    if (
        !proyectoFormativo &&
        !visitaEmpresa &&
        !investigacion &&
        (!otroSeleccionado || !otro?.trim())
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



const registrarRevision = async (id, decision, usuario) => {

    const plan = await obtenerPlanFunction(id);

    if (plan.estado !== "en revision") {
        const error = new Error(
            "Solo se pueden registrar revisiones de planes en estado en revision"
        );

        error.statusCode = 400;

        throw error;
    }

    const rolesRevision = [
        "PEDAGOGIA",
        "SST",
        "COORDINACION"
    ];

    if (!rolesRevision.includes(usuario.rol)) {
        const error = new Error(
            "El usuario no tiene permisos para realizar revisiones"
        );

        error.statusCode = 403;

        throw error;
    }

    if (!["aprobado", "no aprobado"].includes(decision)) {
        const error = new Error(
            "La decisión de revisión no es válida"
        );

        error.statusCode = 400;

        throw error;
    }

    const usuarioActual = await usuarioModel.findById(
        usuario.usuarioId
    );

    if (!usuarioActual) {
        const error = new Error(
            "Usuario autenticado no encontrado"
        );

        error.statusCode = 404;

        throw error;
    }

    if (usuarioActual.estado !== "Activo") {
        const error = new Error(
            "El usuario se encuentra inactivo"
        );

        error.statusCode = 403;

        throw error;
    }

    const campoRevision = {
        PEDAGOGIA: "pedagogia",
        SST: "sst",
        COORDINACION: "coordinacion"
    }[usuario.rol];

    const revisionActual = plan.revision[campoRevision];

    if (revisionActual.estado !== "pendiente") {
        const error = new Error(
            `La revisión de ${campoRevision} ya fue registrada`
        );

        error.statusCode = 400;

        throw error;
    }

    plan.revision[campoRevision] = {
        usuarioId: usuarioActual._id,
        nombre: `${usuarioActual.nombre} ${usuarioActual.apellido}`,
        firma: usuarioActual.firma,
        estado: decision,
        fecha: new Date()
    };

    if (decision === "no aprobado") {

        plan.estado = "borrador";

        await plan.save();

        return plan;
    }

    const revisionesAprobadas =
        plan.revision.pedagogia.estado === "aprobado" &&
        plan.revision.sst.estado === "aprobado" &&
        plan.revision.coordinacion.estado === "aprobado";

    if (revisionesAprobadas) {
        plan.estado = "aprobado";
    }

    await plan.save();

    return plan;
};



const registrarRevisionPlanId = async (
    id,
    data,
    usuario,
    tipoRevision
) => {

    const plan = await obtenerPlanFunction(id);

    if (plan.estado !== "en revision") {

        const error = new Error(
            "Solo se pueden registrar revisiones de planes en estado en revision"
        );

        error.statusCode = 400;

        throw error;
    }

    const usuarioActual = await usuarioModel.findById(
        usuario.usuarioId
    );

    if (!usuarioActual) {

        const error = new Error(
            "Usuario autenticado no encontrado"
        );

        error.statusCode = 404;

        throw error;
    }

    if (usuarioActual.estado !== "Activo") {

        const error = new Error(
            "El usuario se encuentra inactivo"
        );

        error.statusCode = 403;

        throw error;
    }

    const { estado, observaciones } = data;

    const estadosPermitidos = [
        "aprobado",
        "no aprobado"
    ];

    if (!estadosPermitidos.includes(estado)) {

        const error = new Error(
            "El estado de revisión debe ser 'aprobado' o 'no aprobado'"
        );

        error.statusCode = 400;

        throw error;
    }

    const revisionActual = plan.revision?.[tipoRevision];

    if (!revisionActual) {

        const error = new Error(
            "La revisión correspondiente al rol no existe"
        );

        error.statusCode = 500;

        throw error;
    }

    if (
        revisionActual.estado === "aprobado" ||
        revisionActual.estado === "no aprobado"
    ) {
        const error = new Error(
            "El usuario ya registró la revisión correspondiente"
        );

        error.statusCode = 400;

        throw error;
    }

    revisionActual.usuarioId = usuarioActual._id;

    revisionActual.nombre =
        `${usuarioActual.nombre} ${usuarioActual.apellido}`;

    revisionActual.firma = usuarioActual.firma;

    revisionActual.estado = estado;

    revisionActual.fecha = new Date();

    if (observaciones) {
        plan.observaciones = observaciones;
    }

    if (estado === "no aprobado") {

        plan.estado = "borrador";

    } else {
        const todasAprobadas =
            plan.revision.sst?.estado === "aprobado" &&
            plan.revision.pedagogia?.estado === "aprobado" &&
            plan.revision.coordinacion?.estado === "aprobado";

        if (todasAprobadas) {
            plan.estado = "aprobado";
        }
    }
    await plan.save();

    return plan;
};

export default {
    ...crud,
    create,
    getAll,
    getById,
    updateById,
    cambiarEstadoId,
    deleteById,
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
    registrarPlanTrabajoId,
    registrarRevision,
    registrarRevisionPlanId
};

