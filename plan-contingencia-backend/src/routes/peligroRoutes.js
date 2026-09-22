import express from "express";

import {
    crearPeligro,
    listarPeligros,
    obtenerPeligroId,
    actualizarPeligroId,
    eliminarPeligroId,
} from "../controllers/peligroController.js";

import { validarObjectId } from "../middlewares/validateObjectId.js";

const router = express.Router();


router.post('/peligros', crearPeligro);
router.get('/peligros', listarPeligros);
router.get('/peligros/:id', validarObjectId, obtenerPeligroId);
router.put('/peligros/:id', validarObjectId, actualizarPeligroId);
router.delete('/peligros/:id', validarObjectId, eliminarPeligroId);

export default router;