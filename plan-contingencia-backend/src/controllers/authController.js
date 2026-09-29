import authService from "../services/authService.js";
import { sendSuccess } from "../utils/apiResponse.js";

export const validarCredenciales = async (req, res, next) => {
    try {
        const { documento, correoInstitucional } = req.body;
        await authService.validarCredenciales(documento, correoInstitucional);
        sendSuccess(res, { message: "Credenciales válidas" });
    } catch (error) {
        next(error);
    }
};


export const login = async (req, res, next) => {
    try {

        const {
            documento,
            correoInstitucional
        } = req.body;

        const resultado = await authService.login(
            documento,
            correoInstitucional
        );

        sendSuccess(res, {
            message: resultado.mensaje,
            data: resultado
        });

    } catch (error) {
        next(error);
    }
};


export const verificarCodigo = async (req, res, next) => {
    try {

        const {
            usuarioId,
            codigo
        } = req.body;

        const resultado = await authService.verificarCodigo(
            usuarioId,
            codigo
        );

        sendSuccess(res, {
            message: "Código de verificación validado correctamente",
            data: resultado
        });

    } catch (error) {
        next(error);
    }
};


export const obtenerUsuarioAutenticado = async (req, res, next) => {
    try {

        const usuario = await authService.obtenerUsuarioAutenticado(
            req.usuario.usuarioId
        );

        sendSuccess(res, {
            message: "Usuario autenticado obtenido correctamente",
            data: usuario
        });

    } catch (error) {
        next(error);
    }
};


export const logout = async (req, res, next) => {
    try {

        const resultado = await authService.logout();

        sendSuccess(res, {
            message: resultado.mensaje,
            data: null
        });

    } catch (error) {
        next(error);
    }
};