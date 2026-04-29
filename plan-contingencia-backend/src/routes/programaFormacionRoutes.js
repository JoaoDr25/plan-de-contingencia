import express from "express";

import {
    crearPrograma,
    listarProgramas,
    obtenerProgramaId,
    actualizarPrograma,
    cambiarEstadoPrograma,
    eliminarPrograma
} from "../controllers/programaFormacionController.js";

import { validarObjectId } from "../middlewares/validateObjectId.js";

const router = express.Router();


router.post("/programas", crearPrograma);
router.get("/programas", listarProgramas);
router.get("/programas/:id", validarObjectId, obtenerProgramaId);
router.put("/programas/:id", validarObjectId, actualizarPrograma);
router.patch("/programas/:id/estado", validarObjectId, cambiarEstadoPrograma);
router.delete("/programas/:id", validarObjectId, eliminarPrograma);

export default router;