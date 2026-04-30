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
    }
}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

peligroSchema.virtual('riesgos', {
    ref: 'Riesgo',
    localField: '_id',
    foreignField: 'peligroId',
    justOne: false
});

export default mongoose.model("Peligro", peligroSchema);