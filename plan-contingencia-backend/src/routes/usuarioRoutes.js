import express from "express";
import { 
    crearUsuario,
    listarUsuario,
    obtenerUsuarioId,
    actualizarUsuarioId,
    eliminarUsuarioId,
 } from "../controllers/usuarioController.js";

import { validarObjectId } from "../middlewares/validateObjectId.js";

const router = express.Router();

router.post('/usuarios', crearUsuario);
router.get('/usuarios', listarUsuario);
router.get('/usuarios/:id', validarObjectId, obtenerUsuarioId);
router.put('/usuarios/:id', validarObjectId, actualizarUsuarioId);
router.delete('/usuarios/:id', validarObjectId, eliminarUsuarioId);

export default router;
