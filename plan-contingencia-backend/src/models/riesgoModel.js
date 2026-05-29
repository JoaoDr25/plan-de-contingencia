import mongoose from "mongoose";

const riesgosSchema = new mongoose.Schema({
    nombreRiesgo: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    nivelRiesgo: {
        type: String,
        required: true,
        enum: ["Alto", "medio", "bajo"]
    },
    descripcion: {
        type: String,
        trim: true
    },
    consecuencia: {
        type: String,
        required: true,
        trim: true
    },
    medidasPrevencion: {
        type: String,
        required: true,
        trim: true
    },
    peligroId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Peligro",
        required: true
    }
},{
    timestamps: true
});

export default mongoose.model("Riesgo", riesgosSchema);