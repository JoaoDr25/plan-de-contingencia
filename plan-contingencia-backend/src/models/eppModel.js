import mongoose from "mongoose";
import { generarNumero } from "../utils/generarNumero.js";

const elementosProteccionPersonalSchema = new mongoose.Schema ({
    numero: {
        type: Number,
        unique: true,
        alias: "codigo"
    },
    nombre: {
        type: String,
        required: true,
        trim: true,
        alias: "nombreEPP"
    },
    categoria: {
        type: String,  //Pendiente clasificar
        required: true,
        trim: true
    },
    nivel: {
        type: String,
        required: true,
        alias: "nivelProteccion",
        enum: ["Bajo", "Medio", "Alto", "BAJO", "MEDIO", "ALTO"]
    },
    descripcion: {
        type: String,
        required: true,
        trim: true
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

elementosProteccionPersonalSchema.pre("save", async function(next){

    if (!this.numero) {
        this.numero =
        await generarNumero("ElementosProteccionPersonal");
    }
});

export default mongoose.model("ElementosProteccionPersonal", elementosProteccionPersonalSchema);