export const autorizarTransicionPlan = (req, res, next) => {

    if (!req.usuario) {
        return res.status(401).json({
            success: false,
            message: "Usuario no autenticado"
        });
    }

    const { estado } = req.body;

    if (
        req.usuario.rol !== "COORDINACION"
    ) {
        return res.status(403).json({
            success: false,
            message: "Solo Coordinación puede realizar esta transición"
        });
    }

    const transicionesCoordinacion = [
        "ejecutado",
        "cancelado",
        "borrador"
    ];

    if (!transicionesCoordinacion.includes(estado)) {
        return res.status(403).json({
            success: false,
            message: "No tienes permisos para realizar esta transición"
        });
    }

    next();
};