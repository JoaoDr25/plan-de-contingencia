import mongoose from "mongoose";

const codigoVerificacionSchema = new mongoose.Schema(
    {
        usuarioId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Usuario",
            required: true,
            index: true
        },

        codigoHash: {
            type: String,
            required: true
        },

        intentos: {
            type: Number,
            default: 0
        },

        maxIntentos: {
            type: Number,
            default: 5
        },

        usado: {
            type: Boolean,
            default: false
        },

        fechaExpiracion: {
            type: Date,
            required: true
        },

        fechaVerificacion: {
            type: Date,
            default: null
        }
    },
    {
        timestamps: true
    }
);

codigoVerificacionSchema.index(
    { fechaExpiracion: 1 },
    { expireAfterSeconds: 0 }
);

export default mongoose.model(
    "CodigoVerificacion",
    codigoVerificacionSchema
);