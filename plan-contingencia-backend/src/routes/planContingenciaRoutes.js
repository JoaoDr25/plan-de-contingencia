import express from "express";
import {
    crearPlan,
    listarPlanes,
    obtenerPlanId,
    actualizarPlanId,
    eliminarPlanId,
    cambiarEstadoPlanId,
    generarPlan,
    generarPdf,
    asociarRiesgosPlan,
    obtenerRiesgosPlan,
    eliminarRiesgosPlan,
    guardarContactosEmergencia,
    seleccionarEpp,
    registrarSeguridadVial,
    registrarContextoAcademico,
    registrarArticulacionFormativa,
    registrarPlanTrabajo,
    asociarAprendices,
    obtenerAprendicesAsociados,
    eliminarAprendizAsociado,
    registrarRevisionPlan
} from '../controllers/planContingenciaController.js'

import { autenticarToken } from '../middlewares/authMiddleware.js'
import { validarObjectId } from "../middlewares/validateObjectId.js";
import { validarCuerpoNoVacio, validarEstadoPlan } from "../middlewares/validatePlan.js";
import { validarEdicionPlan } from "../middlewares/planAuthorization.js";
import { validarRevisionPlan } from "../middlewares/planRevision.js";
import { autorizarTransicionPlan } from "../middlewares/planWorkflow.js";

const router = express.Router();

router.use(autenticarToken);

router.get('/planes', listarPlanes);
router.post('/planes', validarCuerpoNoVacio, crearPlan);
router.get('/planes/:id', validarObjectId, obtenerPlanId);
router.put('/planes/:id', validarObjectId, validarCuerpoNoVacio, validarEdicionPlan, actualizarPlanId);
router.delete('/planes/:id', validarObjectId, eliminarPlanId);

router.patch('/planes/:id/estado', validarObjectId, validarCuerpoNoVacio, validarEstadoPlan, autorizarTransicionPlan, cambiarEstadoPlanId);
router.post('/planes/:id/generar', validarObjectId, validarEdicionPlan, generarPlan);
router.get('/planes/:id/generar-pdf', validarObjectId, generarPdf);

router.post('/planes/:id/aprendices', validarObjectId, validarEdicionPlan, asociarAprendices);
router.get('/planes/:id/aprendices', validarObjectId, obtenerAprendicesAsociados);
router.delete('/planes/:id/aprendices/:aprendizId', validarObjectId, validarEdicionPlan, eliminarAprendizAsociado);

router.post('/planes/:id/riesgos', validarObjectId, validarEdicionPlan, asociarRiesgosPlan);
router.get('/planes/:id/riesgos', validarObjectId, obtenerRiesgosPlan);
router.delete('/planes/:id/riesgos/:riesgoId', validarObjectId, validarEdicionPlan, eliminarRiesgosPlan);

router.put('/planes/:id/contactos-emergencia', validarObjectId, validarEdicionPlan, guardarContactosEmergencia);
router.put('/planes/:id/epp', validarObjectId, validarEdicionPlan, seleccionarEpp);
router.put('/planes/:id/seguridad-vial', validarObjectId, validarEdicionPlan, registrarSeguridadVial);
router.put('/planes/:id/contexto-academico', validarObjectId, validarEdicionPlan, registrarContextoAcademico);
router.put('/planes/:id/articulacion-formativa', validarObjectId, validarEdicionPlan, registrarArticulacionFormativa);
router.put('/planes/:id/plan-trabajo', validarObjectId, validarEdicionPlan, registrarPlanTrabajo);

router.patch('/planes/:id/revision', validarObjectId, validarCuerpoNoVacio, validarRevisionPlan, registrarRevisionPlan)

export default router;
