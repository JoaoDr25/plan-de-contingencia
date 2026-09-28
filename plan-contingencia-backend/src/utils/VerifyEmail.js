import nodemailer from "nodemailer";
import "dotenv/config";


const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: process.env.SMTP_SECURE === "true",

    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD
    }
});


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

        const resultado =
            await transporter.sendMail({
                from: process.env.SMTP_FROM,
                to: destinatarios,
                subject: asunto,
                text: texto,
                html
            });

        return resultado;

    } catch (error) {

        console.error(
            "Error enviando código de verificación:",
            error
        );

        const emailError =
            new Error(
                "No fue posible enviar el código de verificación"
            );

        emailError.statusCode = 500;

        throw emailError;
    }
};


const verificarConexionEmail = async () => {

    try {

        await transporter.verify();

        console.log(
            "Servidor SMTP conectado correctamente"
        );

        return true;

    } catch (error) {

        console.error(
            "No fue posible conectar con el servidor SMTP:",
            error
        );

        return false;
    }
};


export {
    enviarCodigoVerificacion,
    verificarConexionEmail
};