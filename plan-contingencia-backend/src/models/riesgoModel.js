import mongoose from "mongoose";
import { generarNumero } from "../utils/generarNumero.js";

const riesgosSchema = new mongoose.Schema({
    numero: {
        type: Number,
        unique: true
    },
    nombre: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    nivelRiesgo: {
        type: String,
        required: true,
        enum: ['BAJO', 'MEDIO', 'ALTO']
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
    medidasPrevencion: {
        type: String,
        required: true,
        trim: true
    },
    peligroId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Peligro",
        required: true
    },
    protocolos: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Protocolo'
        }
    ]
}, {
    timestamps: true
});

riesgosSchema.pre("save", async function(next){

    if (!this.numero) {
        this.numero =
        await generarNumero("Riesgo");
    }

    next();
});

export default mongoose.model("Riesgo", riesgosSchema);