import mongoose from "mongoose";

const configuracionPeligroSchema = new mongoose.Schema({
    actividadId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Actividad",
        required: true
    },
    peligroId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Peligro",
        required: true
    }
}, {
    timestamps: true
});

configuracionPeligroSchema.index(
    {
        actividadId: 1,
        peligroId: 1
    },
    {
        unique: true
    }
);

export default mongoose.model("ConfiguracionPeligro", configuracionPeligroSchema);
