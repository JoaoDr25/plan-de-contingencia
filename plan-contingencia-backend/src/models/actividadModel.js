import mongoose from "mongoose";
import { generarNumero } from "../utils/generarNumero.js";

const actividadSchema = new mongoose.Schema({
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
    descripcion: {
        type: String,
        trim: true
    },
    tipoActividad: {
        type: String,
        required: true,
        enum: ["Académico", "Técnico", "Cultural", "Deportivo", "Administrativo"],
    }
},{
    timestamps: true
});

actividadSchema.pre("save", async function(next){

    if (!this.numero) {
        this.numero =
        await generarNumero("Actividad");
    }
});

export default mongoose.model("Actividad", actividadSchema);
