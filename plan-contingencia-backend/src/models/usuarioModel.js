import mongoose from "mongoose";

const usuarioSchema = new mongoose.Schema ({
    nombre: {
        type: String,
        required: true,
        trim: true
    },
    ficha: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    nivelFormacion: {
        type: String,
        required: true,
        trim: true
    },
    centroFormacion: {
        type: String,
        required: true,
        trim: true
    },
    estado: {
        type: Boolean,
        default: true
    },
}, {
    timestamps: true
});

export default mongoose.model("Usuario", usuarioSchema);