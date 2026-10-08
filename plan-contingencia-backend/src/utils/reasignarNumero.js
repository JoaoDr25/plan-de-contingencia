import "dotenv/config";
import mongoose from "mongoose";

import { pathToFileURL } from "node:url";

import Counter from "../models/countermodel.js";
import actividad from "../models/actividadModel.js";
import aprendiz from "../models/aprendizModel.js";
import contactos from "../models/contactoEmergenciaModel.js";
import epp from "../models/eppModel.js";
import peligro from "../models/peligroModel.js";
// import plan from "../models/planContingenciaModel.js";
import programa from "../models/programaFormacionModel.js";
import protocolo from "../models/protocoloModel.js";
import riesgo from "../models/riesgoModel.js";
import usuario from "../models/usuarioModel.js";

const modelos = [actividad, aprendiz, contactos, epp, peligro, programa, protocolo, riesgo, usuario];

export function prepararRenumeracion(registros) {
    const numeros = new Set();
    for (const registro of registros) {
        if (!Number.isSafeInteger(registro.numero) || registro.numero <= 0) {
            throw new Error("Hay numeros ausentes o invalidos; revisa los registros antes de renumerar.");
        }
        if (numeros.has(registro.numero)) {
            throw new Error("Hay numeros duplicados; revisa los registros antes de renumerar.");
        }
        numeros.add(registro.numero);
    }

    return [...registros]
        .sort((a, b) => a.numero - b.numero)
        .map((registro, index) => ({
            _id: registro._id,
            numeroAnterior: registro.numero,
            numero: index + 1
        }));
}

function leerOpciones(args) {
    const opciones = new Map();
    for (const arg of args) {
        const coincidencia = arg.match(/^--(modulo|base)=(.+)$/);
        const clave = coincidencia?.[1] ?? arg;
        if (
            (!coincidencia && !["--aplicar", "--sin-escrituras", "--ayuda"].includes(arg)) ||
            opciones.has(clave)
        ) {
            throw new Error(`Opcion desconocida o repetida: ${arg}`);
        }
        opciones.set(clave, coincidencia?.[2] ?? true);
    }
    return opciones;
}

const leerRegistros = (modelo, session = null) => modelo.find({})
    .select("_id numero")
    .sort({ numero: 1, _id: 1 })
    .session(session)
    .lean();

async function main(args) {
    const opciones = leerOpciones(args);
    const modulo = opciones.get("modulo");
    const seleccionados = modulo === "todos"
        ? modelos
        : modelos.filter((modelo) => modelo.modelName === modulo);

    if (opciones.has("--ayuda")) {
        console.log("Vista previa: npm run numeros:renumerar -- --modulo=NOMBRE");
        console.log("Aplicar: agrega --aplicar --base=NOMBRE_BASE --sin-escrituras");
        console.log(`Modulos: ${modelos.map((modelo) => modelo.modelName).join(", ")}, todos`);
        return;
    }
    if (!seleccionados.length) {
        throw new Error("Indica --modulo con un nombre valido. Consulta --ayuda.");
    }
    const aplicar = opciones.has("--aplicar");
    const baseConfirmada = opciones.get("base");
    if (aplicar && (!baseConfirmada || !opciones.has("--sin-escrituras"))) {
        throw new Error("Antes de aplicar, respalda y detiene las escrituras; confirma --base=NOMBRE --sin-escrituras.");
    }
    if (!process.env.MONGO_URI) {
        throw new Error("Falta MONGO_URI en el entorno del backend.");
    }
    await mongoose.connect(process.env.MONGO_URI, { autoIndex: false });
    if (baseConfirmada && baseConfirmada !== mongoose.connection.name) {
        throw new Error("La base conectada no coincide con --base.");
    }
    console.log(`Base: ${mongoose.connection.name}`);

    const vistas = new Map();
    for (const modelo of seleccionados) {
        const cambios = prepararRenumeracion(await leerRegistros(modelo));
        vistas.set(modelo.modelName, cambios);
        const contador = await Counter.findOne({ nombreModelo: modelo.modelName }).lean();
        console.log(`${modelo.modelName}: ${cambios.length} registros. Contador: ${contador?.secuencia ?? "ausente"}`);
        console.table(cambios.map((cambio) => ({
            id: String(cambio._id),
            numeroActual: cambio.numeroAnterior,
            numeroNuevo: cambio.numero
        })));
    }
    if (!aplicar) {
        console.log("Vista previa: no se modificaron datos.");
        return;
    }

    const session = await mongoose.startSession();
    try {
        await session.withTransaction(async () => {
            for (const modelo of seleccionados) {
                const cambios = prepararRenumeracion(await leerRegistros(modelo, session));
                if (JSON.stringify(cambios) !== JSON.stringify(vistas.get(modelo.modelName))) {
                    throw new Error(`${modelo.modelName}: los registros cambiaron desde la vista previa.`);
                }
                const operaciones = cambios
                    .filter((cambio) => cambio.numeroAnterior !== cambio.numero)
                    .map((cambio) => ({
                        updateOne: {
                            filter: { _id: cambio._id, numero: cambio.numeroAnterior },
                            update: { $set: { numero: cambio.numero } },
                            timestamps: false
                        }
                    }));
                // En orden ascendente, cada destino queda libre sin numeros temporales.
                if (operaciones.length) {
                    const resultado = await modelo.bulkWrite(operaciones, { session, ordered: true });
                    if (resultado.matchedCount !== operaciones.length) {
                        throw new Error(`${modelo.modelName}: no se actualizaron todos los registros.`);
                    }
                }
                await Counter.updateOne(
                    { nombreModelo: modelo.modelName },
                    { $set: { secuencia: cambios.length } },
                    { session, upsert: true }
                );
                const verificados = await leerRegistros(modelo, session);
                const contador = await Counter.findOne({ nombreModelo: modelo.modelName })
                    .session(session).lean();
                if (
                    contador?.secuencia !== cambios.length ||
                    verificados.length !== cambios.length ||
                    verificados.some((registro, index) =>
                        registro.numero !== index + 1 ||
                        String(registro._id) !== String(cambios[index]._id)
                    )
                ) {
                    throw new Error(`${modelo.modelName}: fallo la verificacion de numeros, identificadores o contador.`);
                }
            }
        });
    } finally {
        await session.endSession();
    }
    for (const modelo of seleccionados) {
        console.log(`${modelo.modelName}: aplicado. Siguiente numero: ${vistas.get(modelo.modelName).length + 1}.`);
    }
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
    try {
        await main(process.argv.slice(2));
    } catch (error) {
        console.error(`No se pudo renumerar: ${error.message}`);
        process.exitCode = 1;
    } finally {
        await mongoose.disconnect();
    }
}
