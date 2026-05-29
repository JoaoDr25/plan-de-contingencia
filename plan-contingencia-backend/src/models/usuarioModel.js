import mongoose from "mongoose";

const usuarioSchema = new mongoose.Schema ({
    nombre: {
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
    correoInstitucional: {
        type: String,
        required: true,
        trim: true
    },
    centroFormacion: {
        type: String,
        required: true,
        trim: true
    },
    rolAsignado: {
        type: String,
        required: true,
        enum: ["usuario", "administrador"]
    },
}, {
    timestamps: true
});

export default mongoose.model("Usuario", usuarioSchema);