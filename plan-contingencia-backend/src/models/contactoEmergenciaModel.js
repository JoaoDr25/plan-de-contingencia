import mongoose from "mongoose";
import { generarNumero } from "../utils/generarNumero.js";

const contactosEmergenciaSchema = new mongoose.Schema ({
    numero: {
        type: Number,
        unique: true
    },
    nombreEntidad: {
        type: String,
        required: true,
        trim: true
    },
    tipoContacto: {
        type: String,
        required: true,
        trim: true
    },
    telefonoPrincipal: {
        type: String,
        required: true,
        trim: true
    },
    ciudad: {
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

contactosEmergenciaSchema.pre("save", async function(next){

    if (!this.numero) {
        this.numero =
        await generarNumero("ContactosEmergencia");
    }

    next();
});

export default mongoose.model("ContactosEmergencia", contactosEmergenciaSchema);
