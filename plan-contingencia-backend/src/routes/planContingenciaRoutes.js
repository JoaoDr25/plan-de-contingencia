import express from "express";
import {
    crearPlan,
    listarPlanes,
    obtenerPlanId,
    actualizarPlan,
    cambiarEstadoPlan,
    generarPlan
} from '../controllers/planContingenciaController.js';
import { validarObjectId } from "../middlewares/validateObjectId.js";
import { validarCuerpoNoVacio, validarEstadoPlan } from "../middlewares/validatePlan.js";

const router = express.Router();


router.get('/planes', listarPlanes);
router.post('/planes', validarCuerpoNoVacio, crearPlan);
router.get('/planes/:id', validarObjectId, obtenerPlanId);
router.put('/planes/:id', [validarObjectId, validarCuerpoNoVacio], actualizarPlan);
router.patch('/planes/:id/estado', [validarObjectId, validarCuerpoNoVacio, validarEstadoPlan], cambiarEstadoPlan);
router.post('/planes/:id/generar', validarObjectId, generarPlan);

export default router;
