import nodemailer from "nodemailer";
import "dotenv/config";

const enviarCodigoVerificacion = async ({
    destinatarios,
    nombre,
    codigo,
    minutosExpiracion
}) => {

    if (
        !Array.isArray(destinatarios) ||
        destinatarios.length === 0
    ) {
        const error = new Error(
            "No existen destinatarios para enviar el código de verificación"
        );

        error.statusCode = 400;

        throw error;
    }

    const host = process.env.SMTP_HOST?.trim();
    const port = Number(process.env.SMTP_PORT);
    const secure = process.env.SMTP_SECURE?.trim();
    const user = process.env.SMTP_USER?.trim();
    const pass = process.env.SMTP_PASSWORD;
    const remitente = process.env.SMTP_FROM?.trim();

    if (
        !host ||
        !user ||
        !pass?.trim() ||
        !remitente ||
        !Number.isInteger(port) ||
        port < 1 ||
        port > 65535 ||
        !["true", "false"].includes(secure)
    ) {
        const error = new Error(
            "Configura SMTP_HOST, SMTP_PORT (1-65535), SMTP_SECURE (true o false), SMTP_USER, SMTP_PASSWORD y SMTP_FROM para enviar el código de verificación"
        );

        error.statusCode = 500;

        throw error;
    }

    const asunto =
        "Código de verificación - Plan de Contingencia";

    const texto = `
Hola ${nombre},

Se ha solicitado el ingreso al sistema de Plan de Contingencia.

Tu código de verificación es:

${codigo}

Este código tiene una vigencia de ${minutosExpiracion} minutos.

Si no realizaste esta solicitud, puedes ignorar este mensaje.

Sistema de Plan de Contingencia
    `.trim();

    const html = `
        <div style="
            font-family: Arial, sans-serif;
            max-width: 600px;
            margin: 0 auto;
            padding: 30px;
            color: #333;
        ">

            <h2>
                Código de verificación
            </h2>

            <p>
                Hola <strong>${nombre}</strong>,
            </p>

            <p>
                Se ha solicitado el ingreso al sistema
                de Plan de Contingencia.
            </p>

            <p>
                Tu código de verificación es:
            </p>

            <div style="
                font-size: 32px;
                font-weight: bold;
                letter-spacing: 8px;
                text-align: center;
                margin: 30px 0;
            ">
                ${codigo}
            </div>

            <p>
                Este código tiene una vigencia de
                <strong>${minutosExpiracion} minutos</strong>.
            </p>

            <p>
                Si no realizaste esta solicitud,
                puedes ignorar este mensaje.
            </p>

            <hr>

            <p style="font-size: 12px; color: #777;">
                Sistema de Plan de Contingencia
            </p>

        </div>
    `;

    try {

        const transporter = nodemailer.createTransport({
            host,
            port,
            secure: secure === "true",
            auth: {
                user,
                pass
            }
        });

        const resultado = await transporter.sendMail({
            from: remitente,
            to: destinatarios,
            subject: asunto,
            text: texto,
            html
        });

        if (
            !resultado.accepted?.length ||
            resultado.rejected?.length
        ) {
            throw new Error(
                "El servidor SMTP no aceptó todos los destinatarios del código de verificación"
            );
        }

        return resultado;

    } catch (error) {

        console.error(
            "Error enviando código de verificación:",
            error
        );

        const emailError = new Error(
            "No fue posible enviar el código de verificación"
        );

        emailError.statusCode = 500;

        throw emailError;
    }
};
export {
    enviarCodigoVerificacion
};