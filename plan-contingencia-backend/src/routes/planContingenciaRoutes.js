import express from "express";
import {
    crearPlan,
    listarPlanes,
    obtenerPlanId,
    actualizarPlanId,
    cambiarEstadoPlanId,
    generarPlan,
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
    eliminarAprendizAsociado
} from '../controllers/planContingenciaController.js'

import { validarObjectId } from "../middlewares/validateObjectId.js";
import { validarCuerpoNoVacio, validarEstadoPlan } from "../middlewares/validatePlan.js";

const router = express.Router();


router.get('/planes', listarPlanes);
router.post('/planes', validarCuerpoNoVacio, crearPlan);
router.get('/planes/:id', validarObjectId, obtenerPlanId);
router.put('/planes/:id', [validarObjectId, validarCuerpoNoVacio], actualizarPlanId);
router.patch('/planes/:id/estado', [validarObjectId, validarCuerpoNoVacio, validarEstadoPlan], cambiarEstadoPlanId);
router.post('/planes/:id/generar', validarObjectId, generarPlan);

router.post('/planes/:id/riesgos', validarObjectId, asociarRiesgosPlan);
router.get('/planes/:id/riesgos', validarObjectId, obtenerRiesgosPlan);
router.delete('/planes/:id/riesgos/:riesgoId', validarObjectId, eliminarRiesgosPlan);

router.post('/planes/:id/aprendices', validarObjectId, asociarAprendices);
router.get('/planes/:id/aprendices', validarObjectId, obtenerAprendicesAsociados);
router.delete('/planes/:id/aprendices/:aprendizId', validarObjectId, eliminarAprendizAsociado);

router.put('/planes/:id/contactos', validarObjectId, guardarContactosEmergencia);
router.put('/planes/:id/epp', validarObjectId, seleccionarEpp);
router.put('/planes/:id/seguridad-vial', validarObjectId, registrarSeguridadVial);
router.put('/planes/:id/contexto-academico', validarObjectId, registrarContextoAcademico);
router.put('/planes/:id/articulacion-formativa', validarObjectId, registrarArticulacionFormativa);
router.put('/planes/:id/plan-trabajo', validarObjectId, registrarPlanTrabajo);


export default router;