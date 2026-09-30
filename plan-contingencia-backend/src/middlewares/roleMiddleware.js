export const autorizarRoles = (...rolesPermitidos) => {
    return (req, res, next) => {

        if (!req.usuario) {
            return res.status(401).json({
                success: false,
                message: "Usuario no autenticado"
            });
        }

        if (!rolesPermitidos.includes(req.usuario.rol)) {
            return res.status(403).json({
                success: false,
                message: "No tienes permisos para realizar esta acción"
            });
        }

        next();
    };
}; // Middelware actualmente sin uso pero se conserva para posible uso futuro validacion de roles permitidos en las rutas.