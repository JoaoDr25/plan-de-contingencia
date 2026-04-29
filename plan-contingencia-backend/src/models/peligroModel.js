import mongoose from "mongoose";

const peligroSchema = new mongoose.Schema ({
    nombre: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    tipo: {
        type: String,
        required: true,
        enum: ["Físico", "Químico", "Biológico", "Mecánico", "Psicosocial", "Ergonómico", "Locativo"],
    },
    riesgos: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Riesgo"
    }]
}, {
    timestamps: true
});

export default mongoose.model("Peligro", peligroSchema);