import {
    verificarConexionEmail,
    enviarCodigoVerificacion
} from "./src/utils/VerifyEmail.js";



const probarEmail = async () => {

    const conexion =
        await verificarConexionEmail();

    if (!conexion) {
        process.exit(1);
    }

    await enviarCodigoVerificacion({
        destinatarios: [
            process.env.SMTP_USER
        ],
        nombre: "Administrador",
        codigo: "583214",
        minutosExpiracion: 10
    });

    console.log(
        "Correo de prueba enviado correctamente"
    );
};


probarEmail();