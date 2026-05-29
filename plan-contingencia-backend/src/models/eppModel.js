import mongoose from "mongoose";

const elementosProteccionPersonalSchema = new mongoose.Schema ({
    nombreEPP: {
        type: String,
        required: true,
        trim: true
    },
    categoria: {
        type: String,  //Pendiente clasificar
        required: true,
        trim: true
    },
    nivelProteccion: {
        type: String,
        required: true,
        enum: ["Alto", "Medio", "Bajo"]
    },
    descripcion: {
        type: String,
        required: true,
        trim: true
    },
    estado: {
        type: Boolean,
        required: true,
    },
}, {
    timestamps: true
});

export default mongoose.model("ElementosProteccionPersonal", elementosProteccionPersonalSchema);