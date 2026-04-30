import express from "express";
import { 
    crearRiesgo,
    listarRiesgos,
    obtenerRiesgoid,
    actualizarRiesgo,
    eliminarRiesgo,
 } from "../controllers/riesgoController.js";
import { validarObjectId } from "../middlewares/validateObjectId.js";

const router = express.Router();

router.post('/riesgos', crearRiesgo);
router.get('/riesgos', listarRiesgos);
router.get('/riesgos/:id', validarObjectId, obtenerRiesgoid);
router.put('/riesgos/:id', validarObjectId, actualizarRiesgo);
router.delete('/riesgos/:id', validarObjectId, eliminarRiesgo);

export default router;
