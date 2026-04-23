import mongoose from "mongoose";

export const validarObjectId = (req, res, next) => {
    const {id} = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ mensaje: "El ID no tiene un formato valido"});
    }

    next();
};