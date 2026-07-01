import mongoose from "mongoose";
import { generarNumero } from "../utils/generarNumero.js";

const peligroSchema = new mongoose.Schema ({
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
    categoria: {
        type: String,
        required: true,
        enum: ["Físico", "Químico", "Biológico", "Mecánico", "Psicosocial", "Ergonómico", "Locativo"],
    },
    descripcion: {
        type: String,
        required: true,
        trim: true
    },
    riesgos: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Riesgo"
            }
        ]
}, {
    timestamps: true
});

peligroSchema.pre("save", async function(next){

    if (!this.numero) {
        this.numero =
        await generarNumero("Peligro");
    }
});

export default mongoose.model("Peligro", peligroSchema);
