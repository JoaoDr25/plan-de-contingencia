import mongoose from "mongoose";
import { generarNumero } from "../utils/generarNumero.js";

const usuarioSchema = new mongoose.Schema({
    numero: {
        type: Number,
        unique: true,
        alias: "codigo"
    },
    tipo: {
        type: String,
        required: true,
        trim: true
    },
    nombre: {
        type: String,
        required: true,
        trim: true
    },
    apellido: {
        type: String,
        required: true,
        trim: true
    },
    documento: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    correo: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        alias: "correoInstitucional"
    },
    correoPersonal: {
        type: String,
        trim: true,
        lowercase: true
    },
    telefono: {
        type: String,
        trim: true
    },
    centro: {
        type: String,
        required: true,
        trim: true,
        alias: "centroFormacion"
    },
    redConocimiento: {
        type: String,
        trim: true
    },
    areaTematica: {
        type: String,
        trim: true
    },
    tipoVinculacion: {
        type: String,
        trim: true
    },
    maximoHoras: {
        type: Number,
        min: 0
    },
    rol: {
        type: String,
        required: true,
        enum: [
            "ADMINISTRADOR",
            "CONSULTOR",
            "PEDAGOGIA",
            "SST",
            "COORDINACION"
        ],
        alias: "rolAsignado"
    },
    acceso: {
        type: String,
        trim: true
    },
    firma: {   
        type: String,
        default: null
    },
    firmaNombre: {
        type: String,
        default: null,
        trim: true
    },
    firmaActualizada: {   
        type: Date,
        default: null
    },
    estado: {
        type: String,
        enum: ["Activo", "Inactivo"],
        default: "Activo"
    }
}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

usuarioSchema.pre("save", async function(next){

    if (!this.numero) {
        this.numero =
        await generarNumero("Usuario");
    }
});

export default mongoose.model("Usuario", usuarioSchema);