import mongoose from "mongoose";
import { generarNumero } from "../utils/generarNumero.js";

const protocoloSchema = new mongoose.Schema({
    numero: {
        type: Number,
        unique: true
    },
    tipoEmergencia: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    accionInmediata: {
        type: String,
        required: true,
        trim: true
    },
    responsable: {
        type: String,
        required: true,
        trim: true
    },
    medioComunicacion: {
        type: String,
        required: true,
        trim: true
    },
    estado: {
        type: Boolean,
        required: true
    }
},{
    timestamps: true
});

protocoloSchema.pre("save", async function(next){

    if (!this.numero) {
        this.numero =
        await generarNumero("Protocolo");
    }
});

export default mongoose.model("Protocolo", protocoloSchema);