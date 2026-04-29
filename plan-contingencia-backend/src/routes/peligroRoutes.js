import express from "express";

import {
    crearPeligro,
    listarPeligros,
    obtenerPeligro,
    actualizarPeligro,
    eliminarPeligro,
    asociarPeligrosRiesgos
} from "../controllers/peligroController.js";

import { validarObjectId } from "../middlewares/validateObjectId.js";

const router = express.Router();


router.post('/peligros', crearPeligro);
router.get('/peligros', listarPeligros);
router.get('/peligros/:id', validarObjectId, obtenerPeligro);
router.put('/peligros/:id', validarObjectId, actualizarPeligro);
router.delete('/peligros/:id', validarObjectId, eliminarPeligro);

router.post('/peligros/:id/riesgos', validarObjectId, asociarPeligrosRiesgos); 

export default router;