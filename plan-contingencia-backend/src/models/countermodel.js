import mongoose from "mongoose";

const counterSchema = new mongoose.Schema({
    nombreModelo: {
        type: String,
        required: true,
        unique: true
    },

    secuencia: {
        type: Number,
        default: 0
    }
});

export default mongoose.model('Counter', counterSchema);