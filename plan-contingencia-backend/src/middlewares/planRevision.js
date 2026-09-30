const mapaRevisiones = {
    SST: "sst",
    PEDAGOGIA: "pedagogia",
    COORDINACION: "coordinacion"
};

export const validarRevisionPlan = (req, res, next) => {

    if (!req.usuario) {
        return res.status(401).json({
            success: false,
            message: "Usuario no autenticado"
        });
    }

    const tipoRevision = mapaRevisiones[req.usuario.rol];

    if (!tipoRevision) {
        return res.status(403).json({
            success: false,
            message: "No tienes permisos para revisar planes de contingencia"
        });
    }

    req.tipoRevision = tipoRevision;

    next();
};