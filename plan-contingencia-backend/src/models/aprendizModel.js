import mongoose, { isValidObjectId } from "mongoose";
import { generarNumero } from "../utils/generarNumero.js";

const aprendizSchema = new mongoose.Schema ({
    numero: {
        type: Number,
        unique: true
    },
    nombre: {
        type: String,
        required: true,
        trim: true
    },
    apellido: {
        type:String,
        required:true,
        trim:true
    },
    documento: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    programaFormacion: {
        type: String,
        required: true,
        trim: true
    },
    ficha: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "programaFormacion",
        required: true
    },
    eps: {
        type: String,
        required: true,
        trim: true
    },
    contactoEmergencia: {
        type: String,
        required: true,
        trim: true
    },
    condicionesMedicas: {
        type: String,
        trim: true
    },
    estado: {
        type: Boolean,
        required: true,
    },
}, {
    timestamps: true
});

export default mongoose.model("Aprendiz", aprendizSchema);

aprendizSchema.pre("save", async function(next){

    if (!this.numero) {
        this.numero =
        await generarNumero("Aprendiz");
    }

    next();
});