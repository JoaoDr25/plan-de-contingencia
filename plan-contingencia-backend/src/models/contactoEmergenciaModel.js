import mongoose from "mongoose";

const contactosEmergenciaSchema = new mongoose.Schema ({
    nombreEntidad: {
        type: String,
        required: true,
        trim: true
    },
    tipoContacto: {
        type: String,
        required: true,
        trim: true
    },
    telefonoPrincipal: {
        type: String,
        required: true,
        trim: true
    },
    ciudad: {
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

export default mongoose.model("ContactosEmergencia", contactosEmergenciaSchema);