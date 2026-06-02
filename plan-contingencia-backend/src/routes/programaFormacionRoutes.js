import express from "express";

import {
    crearPrograma,
    listarProgramas,
    obtenerProgramaId,
    actualizarProgramaId,
    cambiarEstadoProgramaId,
    eliminarProgramaId
} from '../controllers/programaFormacionController.js';

import { validarObjectId } from "../middlewares/validateObjectId.js";

const router = express.Router();


router.post("/programas", crearPrograma);
router.get("/programas", listarProgramas);
router.get("/programas/:id", validarObjectId, obtenerProgramaId);
router.put("/programas/:id", validarObjectId, actualizarProgramaId);
router.patch("/programas/:id/estado", validarObjectId, cambiarEstadoProgramaId);
router.delete("/programas/:id", validarObjectId, eliminarProgramaId);

export default router;
