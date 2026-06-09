export const errorHandler = (error, req, res, next) => {

    if (error.name === "ValidationError") {
        return res.status(400).json({
        mensaje: "Error de validación",
        error: error.message
    });
}

    return res.status(error.statusCode || 500).json({
        mensaje: error.message || "Error interno del servidor",
        error: process.env.NODE_ENV === "development"
        ? error.stack
        : undefined
    });
};