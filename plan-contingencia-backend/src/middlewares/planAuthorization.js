import planContingenciaModel from "../models/planContingenciaModel.js";

export const validarEdicionPlan = async (req, res, next) => {
    try {
        const plan = await planContingenciaModel.findById(req.params.id);

        if (!plan) {
            return res.status(404).json({
                success: false,
                message: "Plan de contingencia no encontrado"
            });
        }

        if (plan.estado !== "borrador") {
            return res.status(403).json({
                success: false,
                message: "Solo se pueden modificar planes en estado borrador"
            });
        }

        if (
            plan.usuarioId.toString() !==
            req.usuario.usuarioId.toString()
        ) {
            return res.status(403).json({
                success: false,
                message: "Solo el usuario responsable del plan puede modificarlo"
            });
        }

        req.plan = plan;

        next();

    } catch (error) {
        next(error);
    }
};