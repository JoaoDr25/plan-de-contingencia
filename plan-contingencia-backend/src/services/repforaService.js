const REPFORA_API_URL = process.env.REPFORA_API_URL;

export const obtenerUsuariosRepfora = async () => {

    if (!REPFORA_API_URL) {
        const error = new Error(
            "REPFORA_API_URL no está configurada"
        );

        error.statusCode = 500;

        throw error;
    }

    const response = await fetch(
        `${REPFORA_API_URL}/???????`
    );

    if (!response.ok) {
        const error = new Error(
            `Error al consultar la API de REPFORA: ${response.status}`
        );

        error.statusCode = 502;

        throw error;
    }

    const resultado = await response.json();

    return resultado;
};