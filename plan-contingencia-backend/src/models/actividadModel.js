import mongoose from "mongoose";

const actividadSchema = new mongoose.Schema({
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
    categoria: {
        type: String,
        required: true,
        enum: ["Académico", "Técnico", "Cultural", "Deportivo", "Administrativo"],
        default: "Académico"
    }
},{
    timestamps: true
});

export default mongoose.model("Actividad", actividadSchema);