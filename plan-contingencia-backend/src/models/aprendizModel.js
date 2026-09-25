import mongoose from "mongoose";
import { generarNumero } from "../utils/generarNumero.js";

const aprendizSchema = new mongoose.Schema({
    numero: {
        type: Number,
        unique: true,
        alias: "codigo"
    },
    tipo: {
        type: String,
        required: true,
        trim: true,
        enum: [
            "CC",
            "TI",
            "CE",
            "Cédula de Ciudadanía",
            "Tarjeta de Identidad",
            "Cédula de Extranjería",
            "Pasaporte"
        ]
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
    // programa: {
    //     type: String,
    //     required: true,
    //     trim: true,
    //     alias: "programaFormacion"
    // },
    programaFormacionId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "ProgramaFormacion",
        required: true
    },
    // ficha: {
    //     type: String,
    //     required: true,
    //     trim: true
    // },
    eps: {
        type: String,
        required: true,
        trim: true
    },
    tipoSangre: {
        type: String,
        trim: true
    },
    condicionesMedicas: {
        type: String,
        trim: true
    },
    contacto: {
        type: String,
        trim: true
    },
    telefono: {
        type: String,
        required: true,
        trim: true,
        alias: "contactoEmergencia"
    },
    parentesco: {
        type: String,
        trim: true
    },
    direccion: {
        type: String,
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

aprendizSchema.pre("save", async function (next) {

    if (!this.numero) {
        this.numero =
            await generarNumero("Aprendiz");
    }
});

export default mongoose.model("Aprendiz", aprendizSchema);
