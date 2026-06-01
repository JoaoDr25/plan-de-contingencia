import mongoose from "mongoose";
import { generarNumero } from "../utils/generarNumero.js";

const elementosProteccionPersonalSchema = new mongoose.Schema ({
    numero: {
        type: Number,
        unique: true
    },
    nombreEPP: {
        type: String,
        required: true,
        trim: true
    },
    categoria: {
        type: String,  //Pendiente clasificar
        required: true,
        trim: true
    },
    nivelProteccion: {
        type: String,
        required: true,
        enum: ["BAJO", "MEDIO", "ALTO"]
    },
    descripcion: {
        type: String,
        required: true,
        trim: true
    },
    estado: {
        type: Boolean,
        required: true,
    },
}, {
    timestamps: true
});

export default mongoose.model("ElementosProteccionPersonal", elementosProteccionPersonalSchema);

elementosProteccionPersonalSchema.pre("save", async function(next){

    if (!this.numero) {
        this.numero =
        await generarNumero("ElementosProteccionPersonal");
    }

    next();
});