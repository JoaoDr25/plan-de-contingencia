import mongoose, { isValidObjectId } from "mongoose";

const aprendizSchema = new mongoose.Schema ({
    nombre: {
        type: String,
        required: true,
        trim: true
    },
    apellido: {
        type:String,
        required:true,
        trim:true
    },
    documento: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    programaFormacion: {
        type: String,
        required: true,
        trim: true
    },
    ficha: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "programaFormacion",
        required: true
    },
    eps: {
        type: String,
        required: true,
        trim: true
    },
    contactoEmergencia: {
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

export default mongoose.model("Aprendiz", aprendizSchema);