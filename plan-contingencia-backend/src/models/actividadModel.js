import mongoose from "mongoose";
import { generarNumero } from "../utils/generarNumero.js";

const actividadSchema = new mongoose.Schema({
    numero: {
        type: Number,
        unique: true,
        alias: "codigo"
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
    tipo: {
        type: String,
        required: true,
        alias: "tipoActividad",
        enum: [
            "Visita Técnica",
            "Recorrido de Campo",
            "Capacitación Externa",
            "Inspección de Seguridad",
            "Encuentro Empresarial",
            "Práctica Académica",
            "Salida Ambiental",
            "Trabajo de Campo"
        ],
    },
    peligros: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Peligro"
        }
    ]
}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

actividadSchema.pre("save", async function (next) {

    if (!this.numero) {
        this.numero =
            await generarNumero("Actividad");
    }
});

export default mongoose.model("Actividad", actividadSchema);
