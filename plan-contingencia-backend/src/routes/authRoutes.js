import express from "express";

import {
    validarCredenciales,
    login,
    verificarCodigo,
    obtenerUsuarioAutenticado,
    logout
} from "../controllers/authController.js";

import { autenticarToken } from "../middlewares/authMiddleware.js";
import { autorizarRoles } from "../middlewares/roleMiddleware.js";

const router = express.Router();


router.post("/auth/validar-credenciales", validarCredenciales);
router.post("/auth/login", login);
router.post("/auth/verificar-codigo", verificarCodigo);
router.get("/auth/me", autenticarToken, obtenerUsuarioAutenticado);
router.post("/auth/logout", autenticarToken, logout);

export default router;