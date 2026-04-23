import express from "express";
import {
    crearPlan,
    listarPlanes,
    obtenerPlanId,
    actualizarPlan,
    cambiarEstadoPlan,
    validarPlan,
    generarPlan
} from '../controllers/planContingenciaController.js'


const router = express.Router();


router.get('/planes', listarPlanes);
router.post('/planes', crearPlan);
router.get('/planes/:id', obtenerPlanId);
router.put('/planes/:id', actualizarPlan);
router.patch('/planes/:id/estado', cambiarEstadoPlan);
router.post('/planes/:id/validar', validarPlan);
router.post('/planes/:id/generar', generarPlan);

export default router;