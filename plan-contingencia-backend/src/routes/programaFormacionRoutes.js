import express from "express";

import {
    crearPrograma,
    listarProgramas,
    obtenerProgramaIdId,
    actualizarProgramaId,
    cambiarEstadoProgramaId,
    eliminarProgramaId
} from '../../controllers/configuracion/programaFormacionController.js';

import { validarObjectId } from "../middlewares/validateObjectId.js";

const router = express.Router();


router.post("/programas", crearPrograma);
router.get("/programas", listarProgramas);
router.get("/programas/:id", validarObjectId, obtenerProgramaId);
router.put("/programas/:id", validarObjectId, actualizarProgramaId);
router.patch("/programas/:id/estado", validarObjectId, cambiarEstadoProgramaId);
router.delete("/programas/:id", validarObjectId, eliminarPrograma);

export default router;