import mongoose from "mongoose";

export const validarObjectId = (req, res, next) => {

    const id = Object.values(req.params)[0];

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({
            success: false,
            message: "El ID no tiene un formato válido"
        });
    }

    next();
};