import mongoose from "mongoose";

export const validarCuerpoNoVacio = (req, res, next) => {

    if (!req.body || Object.keys(req.body).length === 0) {
        return res.status(400).json({ mensaje: "El cuerpo de la petición no puede estar vacio"});
    }

    next();
};

export const validarEstadoPlan = (req, res, next) => {
    const {estado} = req.body;
    const estadosValidos = [borrador, aprobado, ejecutado];

    if (!estado && !estadosValidos.includes(estado)) {
        return res.status(400).json({ mensaje: `El estado ${estado} no es valido. Estados permitidos ${estadosValidos.join(", ")}`})
    }
};