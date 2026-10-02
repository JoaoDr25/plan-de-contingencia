import crypto from "crypto";
import jwt from "jsonwebtoken";

import usuarioModel from "../models/usuarioModel.js";
import codigoVerificacionModel from "../models/codigoVerificacionModel.js";

import { enviarCodigoVerificacion } from "../utils/VerifyEmail.js"

const generarCodigo = () => {
    return crypto
        .randomInt(100000, 1000000)
        .toString();
};


const generarCodigoHash = (codigo) => {

    const secret = process.env.VERIFICATION_CODE_SECRET;

    if (!secret) {
        throw new Error(
            "VERIFICATION_CODE_SECRET no está configurado"
        );
    }

    return crypto
        .createHmac("sha256", secret)
        .update(codigo)
        .digest("hex");
};


const generarToken = (usuario) => {

    const secret = process.env.JWT_SECRET;

    if (!secret) {
        throw new Error(
            "JWT_SECRET no está configurado"
        );
    }

    return jwt.sign(
        {
            usuarioId: usuario._id.toString(),
            rol: usuario.rol
        },
        secret,
        {
            expiresIn: process.env.JWT_EXPIRES_IN || "8h"
        }
    );
};


const validarCredenciales = async (documento, correoInstitucional) => {

    if (!documento || !correoInstitucional) {

        const error = new Error(
            "El documento y el correo institucional son obligatorios"
        );

        error.statusCode = 400;

        throw error;
    }

    const correoNormalizado =
        correoInstitucional.trim().toLowerCase();

    const usuario = await usuarioModel.findOne({
        documento: documento.trim(),
        correo: correoNormalizado
    });

    if (!usuario) {

        const error = new Error(
            "Las credenciales proporcionadas no son válidas"
        );

        error.statusCode = 401;

        throw error;
    }

    if (usuario.estado !== "Activo") {

        const error = new Error(
            "El usuario se encuentra inactivo"
        );

        error.statusCode = 403;

        throw error;
    }

    return usuario;
};


const login = async (documento, correoInstitucional) => {

    const usuario = await validarCredenciales(documento, correoInstitucional);

    await codigoVerificacionModel.deleteMany({
        usuarioId: usuario._id,
        usado: false
    });

    const codigo = generarCodigo();

    const modoPruebas =
        process.env.NODE_ENV === "development" &&
        process.env.AUTH_EMAIL_TEST_MODE === "true"; // Para pruebas con correos falsos

    const codigoHash = generarCodigoHash(codigo);

    const minutosExpiracion =
        Number(
            process.env.VERIFICATION_CODE_EXPIRES_MINUTES || 10
        );

    const fechaExpiracion =
        new Date(
            Date.now() +
            minutosExpiracion * 60 * 1000
        );

    await codigoVerificacionModel.create({
        usuarioId: usuario._id,
        codigoHash,
        fechaExpiracion
    });


    const destinatarios = [
        usuario.correo
    ];

    if (
        usuario.correoPersonal &&
        usuario.correoPersonal !== usuario.correo
    ) {
        destinatarios.push(
            usuario.correoPersonal
        );
    }


    // Descomentar al terminar pruebas.
    /*
    await enviarCodigoVerificacion({
        destinatarios,
        nombre: `${usuario.nombre} ${usuario.apellido}`,
        codigo,
        minutosExpiracion
    });
    */ 

    if (modoPruebas) {
        console.warn(
            `[AUTH: SOLO PRUEBAS LOCALES] Código de verificación: ${codigo}`
        );
    } else {
        await enviarCodigoVerificacion({
            destinatarios,
            nombre: `${usuario.nombre} ${usuario.apellido}`,
            codigo,
            minutosExpiracion
        });
    } // Genera código en la terminal, comentar al terminar pruebas.

    return {
        requiereVerificacion: true,
        usuarioId: usuario._id,
        correoInstitucional: usuario.correo,
        tieneCorreoPersonal: Boolean(
            usuario.correoPersonal
        ),
        mensaje:
            "Se ha enviado un código de verificación a los correos registrados"
    };
};


const verificarCodigo = async (usuarioId, codigo) => {

    if (!usuarioId || !codigo) {

        const error = new Error(
            "El usuario y el código de verificación son obligatorios"
        );

        error.statusCode = 400;

        throw error;
    }

    const registro =
        await codigoVerificacionModel
            .findOne({
                usuarioId,
                usado: false
            })
            .sort({
                createdAt: -1
            });

    if (!registro) {

        const error = new Error(
            "No existe un código de verificación válido"
        );

        error.statusCode = 401;

        throw error;
    }

    if (
        new Date() >
        registro.fechaExpiracion
    ) {

        const error = new Error(
            "El código de verificación ha expirado"
        );

        error.statusCode = 401;

        throw error;
    }

    if (
        registro.intentos >=
        registro.maxIntentos
    ) {

        const error = new Error(
            "Se ha superado el número máximo de intentos"
        );

        error.statusCode = 401;

        throw error;
    }

    const codigoHash =
        generarCodigoHash(
            codigo.trim()
        );

    const codigoValido =
        crypto.timingSafeEqual(
            Buffer.from(registro.codigoHash),
            Buffer.from(codigoHash)
        );

    if (!codigoValido) {

        registro.intentos += 1;

        await registro.save();

        const intentosRestantes =
            Math.max(
                registro.maxIntentos -
                registro.intentos,
                0
            );

        const error = new Error(
            "El código de verificación no es válido"
        );

        error.statusCode = 401;

        error.intentosRestantes =
            intentosRestantes;

        throw error;
    }

    registro.usado = true;
    registro.fechaVerificacion = new Date();

    await registro.save();

    const usuario =
        await usuarioModel.findById(usuarioId);

    if (!usuario) {

        const error = new Error(
            "Usuario no encontrado"
        );

        error.statusCode = 404;

        throw error;
    }

    if (usuario.estado !== "Activo") {

        const error = new Error(
            "El usuario se encuentra inactivo"
        );

        error.statusCode = 403;

        throw error;
    }

    usuario.acceso = new Date();

    await usuario.save();

    const token =
        generarToken(usuario);

    return {
        token,
        usuario: {
            id: usuario._id,
            numero: usuario.numero,
            nombre: usuario.nombre,
            apellido: usuario.apellido,
            correo: usuario.correo,
            rol: usuario.rol,
            estado: usuario.estado,
            firma: usuario.firma
        }
    };
};


const obtenerUsuarioAutenticado = async (usuarioId) => {

    const usuario =
        await usuarioModel
            .findById(usuarioId)
            .select("-__v");

    if (!usuario) {

        const error = new Error(
            "Usuario autenticado no encontrado"
        );

        error.statusCode = 404;

        throw error;
    }

    if (usuario.estado !== "Activo") {

        const error = new Error(
            "El usuario se encuentra inactivo"
        );

        error.statusCode = 403;

        throw error;
    }

    return usuario;
};


const logout = async () => {

    return {
        mensaje: "Sesión cerrada correctamente"
    };
};


export default {
    validarCredenciales,
    login,
    verificarCodigo,
    obtenerUsuarioAutenticado,
    logout
};