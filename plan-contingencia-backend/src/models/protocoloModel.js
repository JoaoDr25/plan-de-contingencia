import mongoose from "mongoose";
import { generarNumero } from "../utils/generarNumero.js";

const protocoloSchema = new mongoose.Schema({
    numero: {
        type: Number,
        unique: true,
        alias: "codigo"
    },
    tipo: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        alias: "tipoEmergencia"
    },
    accion: {
        type: String,
        required: true,
        trim: true,
        alias: "accionInmediata"
    },
    responsable: {
        type: String,
        required: true,
        trim: true
    },
    medio: {
        type: String,
        required: true,
        trim: true,
        alias: "medioComunicacion"
    },
    estado: {
        type: String,
        enum: ["Activo", "Inactivo"],
        default: "Activo"
    }
},{
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

protocoloSchema.pre("save", async function(next){

    if (!this.numero) {
        this.numero =
        await generarNumero("Protocolo");
    }
});

export default mongoose.model("Protocolo", protocoloSchema);