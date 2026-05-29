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

router.post('/usuario', crearUsuario);
router.get('usuario', listarUsuario);
router.get('/usuario/:id', validarObjectId, obtenerUsuarioId);
router.put('/usuario/:id', validarObjectId, actualizarUsuarioId);
router.delete('/usuario/:id', validarObjectId, eliminarUsuarioId);

export default router;