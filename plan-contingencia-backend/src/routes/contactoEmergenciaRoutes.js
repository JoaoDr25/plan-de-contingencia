import express from 'express';

import {
    crearContactoEmergencia,
    listarContactosEmergencia,
    obtenerContactoEmergenciaId,
    actualizarContactoEmergenciaId,
    cambiarEstadoContactoEmergenciaId,
    eliminarContactoEmergenciaId
} from '../controllers/contactoEmergenciaController.js'

import { validarObjectId } from '../middlewares/validateObjectId.js';

const router = express.Router();


router.post('/contactos-emergencia', crearContactoEmergencia);
router.get('/contactos-emergencia', listarContactosEmergencia);
router.get('/contactos-emergencia/:id', validarObjectId, obtenerContactoEmergenciaId);
router.put('/contactos-emergencia/:id', validarObjectId, actualizarContactoEmergenciaId);
router.patch('/contactos-emergencia/:id/estado', validarObjectId, cambiarEstadoContactoEmergenciaId);
router.delete('/contactos-emergencia/:id', validarObjectId, eliminarContactoEmergenciaId);

export default router;