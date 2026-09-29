import express from "express";
import {
    crearUsuario,
    sincronizarUsuarios,
    listarUsuario,
    listarRevisores,
    obtenerUsuarioId,
    actualizarUsuarioId,
    cambiarEstadoUsuarioId,
    cambiarRolUsuarioId,
    registrarAccesoUsuarioId,
    actualizarFirmaUsuarioId,
    eliminarUsuarioId,
} from "../controllers/usuarioController.js";

import { validarObjectId } from "../middlewares/validateObjectId.js";

const router = express.Router();

router.post('/usuarios', crearUsuario); //Internamente

router.post('/usuarios/sincronizar', sincronizarUsuarios)
router.get('/usuarios', listarUsuario);
router.get('/usuarios/revisores', listarRevisores);
router.get('/usuarios/:id', validarObjectId, obtenerUsuarioId);
router.put('/usuarios/:id', validarObjectId, actualizarUsuarioId);
router.patch('/usuarios/:id/estado', validarObjectId, cambiarEstadoUsuarioId);
router.patch('/usuarios/:id/rol', validarObjectId, cambiarRolUsuarioId); //Establecer rol ADMINISTRADOR internamente
router.patch('/usuarios/:id/acceso', validarObjectId, registrarAccesoUsuarioId);
router.put('/usuarios/:id/firma', validarObjectId, actualizarFirmaUsuarioId);

router.delete('/usuarios/:id', validarObjectId, eliminarUsuarioId); //Internamente

export default router;