import mongoose from "mongoose";
import { generarNumero } from "../utils/generarNumero.js";

const riesgosSchema = new mongoose.Schema({
    numero: {
        type: Number,
        unique: true,
        alias: "codigo"
    },
    riesgo: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        alias: "nombre"
    },
    nivel: {
        type: String,
        required: true,
        alias: "nivelRiesgo",
        enum: ["Bajo", "Medio", "Alto", "BAJO", "MEDIO", "ALTO"]
    },
    descripcion: {
        type: String,
        trim: true
    },
    consecuencia: {
        type: String,
        required: true,
        trim: true
    },
    prevencion: {
        type: String,
        trim: true,
        alias: "medidasPrevencion"
    },
    peligroId: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Peligro"
        }
    ],
    protocolos: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Protocolo'
        }
    ]
}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

riesgosSchema.pre("save", async function(next){

    if (!this.numero) {
        this.numero =
        await generarNumero("Riesgo");
    }
});

export default mongoose.model("Riesgo", riesgosSchema);