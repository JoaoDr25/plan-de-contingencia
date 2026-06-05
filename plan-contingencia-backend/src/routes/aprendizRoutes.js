import express from "express";
import { 
    crearAprendiz,
    listarAprendiz,
    obtenerAprendizId,
    actualizarAprendizId,
    cambiarEstadoAprendizId,
    eliminarAprendizId,
 } from "../controllers/aprendizController.js";

import { validarObjectId } from "../middlewares/validateObjectId.js";

const router = express.Router();

router.post('/aprendices', crearAprendiz);
router.get('/aprendices', listarAprendiz);
router.get('/aprendices/:id', validarObjectId, obtenerAprendizId);
router.put('/aprendices/:id', validarObjectId, actualizarAprendizId);
router.patch('/aprendices/:id/estado', validarObjectId, cambiarEstadoAprendizId);
router.delete('/aprendices/:id', validarObjectId, eliminarAprendizId);

export default router;