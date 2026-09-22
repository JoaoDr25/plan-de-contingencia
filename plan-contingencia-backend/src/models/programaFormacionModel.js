import mongoose from "mongoose";
import { generarNumero } from "../utils/generarNumero.js";

const programaFormacionSchema = new mongoose.Schema ({
    numero: {
        type: Number,
        unique: true,
        alias: "codigo"
    },
    nombre: {
        type: String,
        required: true,
        trim: true
    },
    ficha: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    jornada: {
        type: String,
        required: true,
        trim: true,
        enum: ["Mañana", "Tarde", "Noche"]
    },
    nivel: {
        type: String,
        required: true,
        trim: true,
        alias: "nivelFormacion"
    },
    centro: {
        type: String,
        required: true,
        trim: true,
        alias: "centroFormacion"
    },
    estado: {
        type: String,
        enum: ["Activo", "Inactivo"],
        default: "Activo"
    },
}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

programaFormacionSchema.pre("save", async function(next){

    if (!this.numero) {
        this.numero =
        await generarNumero("ProgramaFormacion");
    }
});

export default mongoose.model("ProgramaFormacion", programaFormacionSchema);