import express from "express";

import {
    login,
    verificarCodigo,
    obtenerUsuarioAutenticado,
    logout
} from "../controllers/authController.js";

import { autenticarToken } from "../middlewares/authMiddleware.js";

const router = express.Router();


router.post("/auth/login", login);
router.post("/auth/verificar-codigo", verificarCodigo);
router.get("/auth/me", autenticarToken, obtenerUsuarioAutenticado);
router.post("/auth/logout", autenticarToken, logout);


export default router;