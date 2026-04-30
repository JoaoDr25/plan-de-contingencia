import mongoose from "mongoose";

const riesgosSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    descripcion: {
        type: String,
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