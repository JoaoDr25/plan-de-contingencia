import express from "express";

import {
    crearPeligro,
    listarPeligros,
    obtenerPeligroId,
    actualizarPeligroId,
    eliminarPeligroId,
    obtenerAsociacionRiesgoPeligro
} from "../controllers/peligroController.js";

import { validarObjectId } from "../middlewares/validateObjectId.js";

const router = express.Router();


router.post('/peligros', crearPeligro);
router.get('/peligros', listarPeligros);
router.get('/peligros/:id', validarObjectId, obtenerPeligroId);
router.put('/peligros/:id', validarObjectId, actualizarPeligroId);
router.delete('/peligros/:id', validarObjectId, eliminarPeligroId);

router.get('/peligros/:id/riesgos', validarObjectId, obtenerAsociacionRiesgoPeligro);

export default router;