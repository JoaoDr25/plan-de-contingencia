import mongoose from "mongoose";

const programaFormacionSchema = new mongoose.Schema ({
    nombre: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    ficha: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    estado: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
});

export default mongoose.model("ProgramaFormacion", programaFormacionSchema);
