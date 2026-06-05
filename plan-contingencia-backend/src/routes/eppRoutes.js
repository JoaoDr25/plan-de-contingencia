import express from 'express';

import {
    crearEpp,
    listarEpp,
    obtenerEppId,
    actualizarEppId,
    cambiarEstadoEppId,
    eliminarEppId
} from '../controllers/eppController.js';

import { validarObjectId } from '../middlewares/validateObjectId.js';

const router = express.Router();


router.post('/epp', crearEpp);
router.get('/epp', listarEpp);
router.get('/epp/:id', validarObjectId, obtenerEppId);
router.put('/epp/:id', validarObjectId, actualizarEppId);
router.patch('/epp/:id/estado', validarObjectId, cambiarEstadoEppId);
router.delete('/epp/:id', validarObjectId, eliminarEppId);

export default router;