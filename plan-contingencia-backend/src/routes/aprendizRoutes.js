import express from "express";
import { 
    crearAprendiz,
    listarAprendiz,
    obtenerAprendizId,
    actualizarAprendizId,
    eliminarAprendizId,
 } from "../controllers/aprendizController.js";

import { validarObjectId } from "../middlewares/validateObjectId.js";

const router = express.Router();

router.post('/aprendiz', crearAprendiz);
router.get('aprendiz', listarAprendiz);
router.get('/aprendiz/:id', validarObjectId, obtenerAprendizId);
router.put('/aprendiz/:id', validarObjectId, actualizarAprendizId);
router.delete('/aprendiz/:id', validarObjectId, eliminarAprendizId);

export default router;