import jwt from "jsonwebtoken";

export const autenticarToken = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader) {
            return res.status(401).json({
                success: false,
                message: "Token de autenticación requerido"
            });
        }

        const [tipo, token] = authHeader.split(" ");

        if (tipo !== "Bearer" || !token) {
            return res.status(401).json({
                success: false,
                message: "Formato de autenticación inválido"
            });
        }

        const secret = process.env.JWT_SECRET;

        if (!secret) {
            throw new Error(
                "JWT_SECRET no está configurado"
            );
        }

        const payload = jwt.verify(token, secret);

        req.usuario = payload;

        next();

    } catch (error) {

        if (error.name === "TokenExpiredError") {
            return res.status(401).json({
                success: false,
                message: "El token de autenticación ha expirado"
            });
        }

        if (error.name === "JsonWebTokenError") {
            return res.status(401).json({
                success: false,
                message: "El token de autenticación no es válido"
            });
        }

        next(error);
    }
};