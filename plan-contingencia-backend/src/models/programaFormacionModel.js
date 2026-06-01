import mongoose from "mongoose";
import { generarNumero } from "../utils/generarNumero.js";

const programaFormacionSchema = new mongoose.Schema ({
    numero: {
        type: Number,
        unique: true
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
    nivelFormacion: {
        type: String,
        required: true,
        trim: true
    },
    centroFormacion: {
        type: String,
        required: true,
        trim: true
    },
    estado: {
        type: Boolean,
        default: true
    },
}, {
    timestamps: true
});

export default mongoose.model("ProgramaFormacion", programaFormacionSchema);


programaFormacionSchema.pre("save", async function(next){

    if (!this.numero) {
        this.numero =
        await generarNumero("ProgramaFormacion");
    }

    next();
});