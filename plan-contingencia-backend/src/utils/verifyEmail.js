import { Resend } from "resend";
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

    const apiKey = process.env.RESEND_API_KEY?.trim();
    const remitente = process.env.RESEND_FROM?.trim();

    if (!apiKey || !remitente) {
        const error = new Error(
            "RESEND_API_KEY y RESEND_FROM deben estar configurados para enviar el código de verificación"
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

        const resend = new Resend(apiKey);

        const { data, error } = await resend.emails.send({
            from: remitente,
            to: destinatarios,
            subject: asunto,
            text: texto,
            html
        });

        if (error) {
            throw new Error(error.message);
        }

        if (!data?.id) {
            throw new Error(
                "Resend no confirmó la aceptación del correo"
            );
        }

        return data;

    } catch (error) {

        console.error(
            "Error enviando código de verificación:",
            error
        );

        const emailError = new Error(
            "No fue posible enviar el código de verificación"
        );

        console.log("RESEND_API_KEY configurada:", Boolean(apiKey));
        console.log("RESEND_FROM configurado:", Boolean(remitente));

        emailError.statusCode = 500;

        throw emailError;
    }
};
export {
    enviarCodigoVerificacion
};