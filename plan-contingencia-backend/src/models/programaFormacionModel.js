import mongoose, { model, Schema } from "mongoose";

const programaFormacionSchema = new mongoose.Schema ({
    nombre: {
        type: "String",
        required: true,
        trim: true
    },
    ficha: {
        type: "String",
        required: true,
        trim: true
    }
}, {
    timestamps: true
});

export default mongoose.model("ProgramaFormacion", programaFormacionSchema);
