import mongoose from "mongoose";

const protocoloSchema = new mongoose.Schema({
    tipoEmergencia: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    accionInmediata: {
        type: String,
        required: true,
        trim: true
    },
    responsable: {
        type: String,
        required: true,
        trim: true
    },
    medioComunicacion: {
        type: String,
        required: true,
        trim: true
    },
    estado: {
        type: Boolean,
        required: true
    }
},{
    timestamps: true
});

export default mongoose.model("Protocolo", protocoloSchemaSchema);