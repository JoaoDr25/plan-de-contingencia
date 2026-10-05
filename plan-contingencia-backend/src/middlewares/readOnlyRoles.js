const rolesSoloLectura = new Set(["SUBDIRECCION", "BIENESTAR"]);
const metodosSoloLectura = new Set(["GET", "HEAD", "OPTIONS"]);

export const bloquearEscrituraRolesSoloLectura = (req, res, next) => {
    if (
        rolesSoloLectura.has(req.usuario?.rol) &&
        !metodosSoloLectura.has(req.method)
    ) {
        return res.status(403).json({
            success: false,
            message: "Este rol solo tiene permisos de consulta"
        });
    }

    next();
};