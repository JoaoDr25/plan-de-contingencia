import express from 'express';

import {
    configurarPeligrosActividad,
    listarPeligrosActividad,
    obtenerPeligrosActividadId,
    obtenerPeligrosPorActividad,
    actualizarPeligrosActividadId,
    eliminarPeligrosActividadId
} from '../controllers/configuracionPeligroController.js';

import { validarObjectId } from '../middlewares/validateObjectId.js';

const router = express.Router();

router.post('/config/peligros', configurarPeligrosActividad);
router.get('/config/peligros', listarPeligrosActividad);
router.get('/config/peligros/:id', validarObjectId, obtenerPeligrosActividadId);
router.get('/config/peligros/actividad/:actividadId', validarObjectId, obtenerPeligrosPorActividad);
router.put('/config/peligros/:id', validarObjectId, actualizarPeligrosActividadId);
router.delete('/config/peligros/:id', validarObjectId, eliminarPeligrosActividadId);

export default router;