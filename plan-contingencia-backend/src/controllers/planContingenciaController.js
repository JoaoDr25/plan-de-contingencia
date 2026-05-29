import PlanContingencia from "../models/planContingenciaModels.js";

export const crearPlan = async (req, res) => {
    try {
        const nuevoPlan = new PlanContingencia(req.body);
        await nuevoPlan.save();

        await nuevoPlan.populate("programaFormacionId", "nombre ficha");
        await nuevoPlan.populate("actividadId", "nombre categoria");

        res.status(201).json({
            mensaje: "Plan de contingencia creado exitosamente",
            plan: nuevoPlan
        });
    } catch (error) {
        if (error.name === "ValidationError") {
            return res.status(400).json({
                mensaje: "Error de validación al crear el plan",
                error: error.message
            });
        }
        res.status(500).json({
            mensaje: "Error al crear el plan de contingencia",
            error: error.message
        });
    }
};


export const listarPlanes = async (req, res) => {
    try {
        const listar = await PlanContingencia.find()
            .populate("programaFormacionId", "nombre ficha")
            .populate("actividadId", "nombre categoria")
            .populate("riesgos");

        res.status(200).json({
            mensaje: "Planes de contingencia listados exitosamente",
            planes: listar
        });
    } catch (error) {
        res.status(500).json({
            mensaje: "Error al obtener los planes de contingencia",
            error: error.message
        })
    }
};


export const obtenerPlanId = async (req, res) => {
    try {
        const listarId = await PlanContingencia.findById(req.params.id)
            .populate("programaFormacionId", "nombre ficha")
            .populate("actividadId", "nombre categoria");

        if (!listarId) {
            return res.status(404).json({ mensaje: "No se encontró el plan de contingencia" })
        }
        res.status(200).json({
            mensaje: "Plan de contingencia obtenido exitosamente",
            plan: listarId
        });
    } catch (error) {
        res.status(500).json({
            mensaje: "Error al obtener el plan de contingencia",
            error: error.message
        })
    }
};


export const actualizarPlan = async (req, res) => {
    try {
        const { id } = req.params;

        const plan = await PlanContingencia.findById(id);

        if (plan && plan.estado === "ejecutado") {
            return res.status(400).json({
                mensaje: "No se puede actualizar un plan que ya ha sido ejecutado"
            });
        }

        const datosActualizacion = { ...req.body, estado: "borrador" };
        let mensajeEstado = "Cambios guardados exitosamente. El plan está listo para aprobarse.";

        if (plan && plan.estado === "aprobado") {
            mensajeEstado = "Plan en actualización y requiere una nueva aprobación";
        }

        const actualizar = await PlanContingencia.findByIdAndUpdate(id, datosActualizacion, { new: true, runValidators: true })
            .populate("programaFormacionId", "nombre ficha")
            .populate("actividadId", "nombre categoria");

        if (!actualizar) {
            return res.status(404).json({ mensaje: "No se pudo actualizar el plan: Plan de contingencia no existe" })
        }
        res.status(200).json({
            mensaje: mensajeEstado,
            plan: actualizar
        });
    } catch (error) {
        if (error.name === "ValidationError") {
            return res.status(400).json({
                mensaje: "Los datos proporcionados no son válidos",
                error: error.message
            });
        }
        res.status(500).json({
            mensaje: "Error al actualizar el plan de contingencia",
            error: error.message
        })
    }
};


export const cambiarEstadoPlan = async (req, res) => {
    try {
        const { id } = req.params;
        const { estado } = req.body;
        const cambiarEstado = await PlanContingencia.findByIdAndUpdate(
            id,
            { estado },
            { new: true, runValidators: true }
        )
            .populate("programaFormacionId", "nombre ficha")
            .populate("actividadId", "nombre categoria");

        if (!cambiarEstado) {
            return res.status(404).json({ mensaje: "No se pudo cambiar el estado del plan: Plan de contingencia no existe" })
        }
        res.status(200).json({
            mensaje: `Estado actualizado a ${estado} exitosamente`,
            plan: cambiarEstado
        });
    } catch (error) {
        if (error.name === "ValidationError") {
            return res.status(400).json({
                mensaje: "Error de validación al cambiar el estado del plan",
                error: error.message
            });
        }
        res.status(500).json({
            mensaje: "Error al cambiar el estado del plan de contingencia",
            error: error.message
        })
    }
};


export const generarPlan = async (req, res) => {
    try {
        const { id } = req.params;
        const generar = await PlanContingencia.findById(id)
            .populate("programaFormacionId", "nombre ficha")
            .populate("actividadId", "nombre categoria");

        if (!generar) {
            return res.status(404).json({ mensaje: "No se encontro el plan para generar el documento" })
        }

        if (generar.estado === "borrador") {
            return res.status(400).json({
                mensaje: "No se puede generar el documento. El plan debe estar aprobado primero"
            })
        }

        res.status(200).json({
            mensaje: "Plan de contingencia generado correctamente",
            plan: generar
        });
    } catch (error) {
        res.status(500).json({
            mensaje: "Error al generar el plan de contingencia",
            error: error.message
        })
    }
};
