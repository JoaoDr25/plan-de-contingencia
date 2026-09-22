import mongoose from "mongoose";
import { generarNumero } from "../utils/generarNumero.js";

const contactosEmergenciaSchema = new mongoose.Schema ({
    numero: {
        type: Number,
        unique: true,
        alias: "codigo"
    },
    nombre: {
        type: String,
        required: true,
        trim: true,
        alias: "nombreEntidad"
    },
    tipo: {
        type: String,
        required: true,
        trim: true,
        alias: "tipoContacto"
    },
    telefono: {
        type: String,
        required: true,
        trim: true,
        alias: "telefonoPrincipal"
    },
    direccion: {
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
        type: String,
        enum: ["Activo", "Inactivo"],
        default: "Activo"
    },
}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

contactosEmergenciaSchema.pre("save", async function(next){

    if (!this.numero) {
        this.numero =
        await generarNumero("ContactosEmergencia");
    }
});

export default mongoose.model("ContactosEmergencia", contactosEmergenciaSchema);
