import express from "express";
import { 
    crearRiesgo,
    listarRiesgos,
    obtenerRiesgoid,
    actualizarRiesgoId,
    eliminarRiesgoId,
 } from "../controllers/riesgoController.js"

import { validarObjectId } from "../middlewares/validateObjectId.js";

const router = express.Router();

router.post('/riesgos', crearRiesgo);
router.get('/riesgos', listarRiesgos);
router.get('/riesgos/:id', validarObjectId, obtenerRiesgoid);
router.put('/riesgos/:id', validarObjectId, actualizarRiesgoId);
router.delete('/riesgos/:id', validarObjectId, eliminarRiesgoId);

export default router;
