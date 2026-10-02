import assert from "node:assert/strict";
import crypto from "node:crypto";
import { afterEach, beforeEach, describe, it, mock } from "node:test";

import authService from "../src/services/authService.js";
import usuarioModel from "../src/models/usuarioModel.js";
import codigoVerificacionModel from "../src/models/codigoVerificacionModel.js";
import { enviarCodigoVerificacion } from "../src/utils/VerifyEmail.js";

const variables = [
    "NODE_ENV",
    "AUTH_EMAIL_TEST_MODE",
    "RESEND_API_KEY",
    "RESEND_FROM",
    "VERIFICATION_CODE_SECRET",
    "VERIFICATION_CODE_EXPIRES_MINUTES"
];

const solicitud = {
    destinatarios: ["usuario@example.invalid"],
    nombre: "Usuario de prueba",
    codigo: "123456",
    minutosExpiracion: 10
};

describe("Autenticacion y envio con Resend", () => {
    let entorno;
    let usuario;
    let fetchMock;
    let registros;
    let consultas;

    beforeEach(() => {
        entorno = Object.fromEntries(
            variables.map((variable) => [variable, process.env[variable]])
        );
        process.env.NODE_ENV = "development";
        process.env.AUTH_EMAIL_TEST_MODE = "false";
        process.env.RESEND_API_KEY = "re_clave_simulada";
        process.env.RESEND_FROM = "Sistema <acceso@example.invalid>";
        process.env.VERIFICATION_CODE_SECRET = "secreto-de-prueba";
        process.env.VERIFICATION_CODE_EXPIRES_MINUTES = "10";

        usuario = {
            _id: "507f1f77bcf86cd799439011",
            documento: "123456",
            correo: "usuario@example.invalid",
            correoPersonal: "personal@example.invalid",
            nombre: "Usuario",
            apellido: "Prueba",
            rol: "ADMIN",
            estado: "Activo"
        };
        registros = [];
        consultas = [];
        mock.method(usuarioModel, "findOne", async (consulta) => {
            consultas.push(consulta);
            return usuario;
        });
        mock.method(codigoVerificacionModel, "deleteMany", async () => ({}));
        mock.method(codigoVerificacionModel, "create", async (registro) => {
            registros.push(registro);
            return registro;
        });
        fetchMock = mock.method(globalThis, "fetch", async () => {
            throw new Error("No se permiten conexiones reales en estas pruebas");
        });
        mock.method(console, "error", () => {});
    });

    afterEach(() => {
        mock.restoreAll();
        for (const variable of variables) {
            if (entorno[variable] === undefined) {
                delete process.env[variable];
            } else {
                process.env[variable] = entorno[variable];
            }
        }
    });

    it("valida credenciales sin Resend ni envio de correo", async () => {
        delete process.env.RESEND_API_KEY;
        delete process.env.RESEND_FROM;
        const resultado = await authService.validarCredenciales(
            " 123456 ",
            " USUARIO@EXAMPLE.INVALID "
        );
        assert.equal(resultado, usuario);
        assert.deepEqual(consultas, [{
            documento: "123456",
            correo: usuario.correo
        }]);
        assert.equal(fetchMock.mock.callCount(), 0);
        assert.equal(registros.length, 0);
    });

    it("rechaza usuarios inexistentes e inactivos sin enviar", async () => {
        usuario.estado = "Inactivo";
        await assert.rejects(
            authService.login("123456", usuario.correo),
            { statusCode: 403 }
        );
        usuario = null;
        await assert.rejects(
            authService.login("123456", solicitud.destinatarios[0]),
            { statusCode: 401 }
        );
        assert.equal(fetchMock.mock.callCount(), 0);
        assert.equal(registros.length, 0);
    });

    it("envia con la clave y remitente de Resend a los correos del usuario", async () => {
        fetchMock.mock.mockImplementation(async (url, opciones) => {
            assert.equal(url, "https://api.resend.com/emails");
            assert.equal(
                new Headers(opciones.headers).get("authorization"),
                "Bearer re_clave_simulada"
            );
            const cuerpo = JSON.parse(opciones.body);
            assert.equal(cuerpo.from, process.env.RESEND_FROM);
            assert.deepEqual(cuerpo.to, [usuario.correo, usuario.correoPersonal]);
            assert.equal(cuerpo.subject, "Código de verificación - Plan de Contingencia");
            const codigo = cuerpo.text.match(/\b\d{6}\b/)[0];
            assert.ok(cuerpo.html.includes(codigo));
            assert.equal(
                registros[0].codigoHash,
                crypto.createHmac("sha256", process.env.VERIFICATION_CODE_SECRET)
                    .update(codigo).digest("hex")
            );
            return Response.json({ id: "correo-simulado" });
        });
        const resultado = await authService.login("123456", usuario.correo);
        assert.equal(resultado.requiereVerificacion, true);
        assert.equal(resultado.usuarioId, usuario._id);
        assert.equal(fetchMock.mock.callCount(), 1);
        assert.equal(registros.length, 1);
    });

    it("muestra el codigo solo en desarrollo con la bandera activa", async () => {
        process.env.AUTH_EMAIL_TEST_MODE = "true";
        delete process.env.RESEND_API_KEY;
        delete process.env.RESEND_FROM;
        const advertencias = mock.method(console, "warn", () => {});
        await authService.login("123456", usuario.correo);
        assert.equal(fetchMock.mock.callCount(), 0);
        assert.equal(advertencias.mock.callCount(), 1);
        const mensaje = advertencias.mock.calls[0].arguments[0];
        assert.match(mensaje, /\[AUTH: SOLO PRUEBAS LOCALES\]/);
        const codigo = mensaje.match(/\d{6}$/)[0];
        assert.equal(
            registros[0].codigoHash,
            crypto.createHmac("sha256", process.env.VERIFICATION_CODE_SECRET)
                .update(codigo).digest("hex")
        );
    });

    it("en produccion envia aunque la bandera de pruebas este activa", async () => {
        process.env.NODE_ENV = "production";
        process.env.AUTH_EMAIL_TEST_MODE = "true";
        const advertencias = mock.method(console, "warn", () => {});
        fetchMock.mock.mockImplementation(async () =>
            Response.json({ id: "correo-simulado" })
        );
        await authService.login("123456", usuario.correo);
        assert.equal(fetchMock.mock.callCount(), 1);
        assert.equal(advertencias.mock.callCount(), 0);
    });

    it("rechaza configuracion incompleta sin llamar al proveedor", async () => {
        for (const variable of ["RESEND_API_KEY", "RESEND_FROM"]) {
            const original = process.env[variable];
            process.env[variable] = " ";
            await assert.rejects(enviarCodigoVerificacion(solicitud), {
                statusCode: 500,
                message: /RESEND_API_KEY y RESEND_FROM/
            });
            process.env[variable] = original;
        }
        assert.equal(fetchMock.mock.callCount(), 0);
    });

    it("rechaza solicitudes sin destinatarios", async () => {
        await assert.rejects(
            enviarCodigoVerificacion({ ...solicitud, destinatarios: [] }),
            { statusCode: 400 }
        );
        assert.equal(fetchMock.mock.callCount(), 0);
    });

    it("propaga el rechazo de Resend sin devolver exito", async () => {
        fetchMock.mock.mockImplementation(async () => Response.json({
            name: "validation_error",
            message: "Remitente no permitido"
        }, { status: 403 }));
        await assert.rejects(authService.login("123456", usuario.correo), {
            statusCode: 500,
            message: "No fue posible enviar el código de verificación"
        });
        assert.equal(console.error.mock.calls.filter(
            (llamada) => llamada.arguments[0] === "Error enviando código de verificación:"
        ).length, 1);
    });

    it("rechaza respuestas sin confirmacion y fallos de conexion", async () => {
        fetchMock.mock.mockImplementation(async () => Response.json({}));
        await assert.rejects(enviarCodigoVerificacion(solicitud), {
            statusCode: 500
        });
        fetchMock.mock.mockImplementation(async () => {
            throw new Error("Conexion interrumpida");
        });
        await assert.rejects(enviarCodigoVerificacion(solicitud), {
            statusCode: 500
        });
        assert.equal(console.error.mock.calls.filter(
            (llamada) => llamada.arguments[0] === "Error enviando código de verificación:"
        ).length, 2);
    });
});
