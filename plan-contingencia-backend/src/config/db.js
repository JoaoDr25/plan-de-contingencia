import mongoose from "mongoose";

// Sincroniza los índices de cada modelo con su esquema actual, eliminando los
// obsoletos (p. ej. de campos renombrados a alias) que provocan errores de
// clave duplicada. Cada modelo se sincroniza de forma independiente para que
// un problema en una colección no impida el arranque del servidor.
const sincronizarIndices = async () => {
    for (const [nombre, model] of Object.entries(mongoose.models)) {
        try {
            await model.syncIndexes();
        } catch (error) {
            console.error(
                `No se pudieron sincronizar los índices de "${nombre}": ${error.message}`
            );
        }
    }
};

export const conectarDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Base de datos conectada");

        await sincronizarIndices();
    } catch (error) {
        console.error("Error al conectar la base de datos: ", error.message);
        process.exit(1);
    }
};