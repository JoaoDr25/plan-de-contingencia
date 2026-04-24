import PlanContingencia from "../models/planContingenciaModels.js";

export const crearPlan = async (req, res) => {
    try {
        const nuevoPlan = new PlanContingencia(req.body);
        await nuevoPlan.save();
        res.status(201).json(nuevoPlan);
    } catch (error) {
        res.status(500).json({
            mensaje: "Error al crear el plan de contingencia",
            error: error.message
        });
    }
};


export const listarPlanes = async (req, res) => {
    try {
        const listar = await PlanContingencia.find();
        res.status(200).json(listar);
    } catch (error) {
        res.status(500).json({
            mensaje: "Error al obtener los planes de contingencia",
            error: error.message
        })
    }
};


export const obtenerPlanId = async (req, res) => {
    try {
        const listarId = await PlanContingencia.findById(req.params.id);
        if (!listarId) {
            return res.status(404).json({mensaje: "No se encontró el plan de contingencia"})
        }
        res.status(200).json(listarId);
    } catch (error) {
        res.status(500).json({
            mensaje: "Error al obtener el plan de contingencia",
            error: error.message
        })
    }
};


export const actualizarPlan = async (req, res) => {
    try {
        const {id} = req.params;

        const plan = await PlanContingencia.findById(id);
        if (plan && (plan.estado = "ejecutado")) {
            return res.status(400).json({
                message: "No se puede actualizar un plan que ya ha sido ejecutado"
            });
        }

        const actualizar = await PlanContingencia.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
        
        if (!actualizar) {
            return res.status(404).json({mensaje: "No se pudo actualizar el plan: Plan de contingencia no existe"})
        }
        res.status(200).json({
            mensaje: "Plan de contingencia actualizado",
            plan: actualizar
        });
    } catch (error) {
        res.status(500).json({
            mensaje: "Error al actualizar el plan de contingencia",
            error: error.message
        })
    }
};


export const cambiarEstadoPlan = async (req, res) => {
    try {
        const {id} = req.params;
        const {estado} = req.body;
        const cambiarEstado = await  PlanContingencia.findByIdAndUpdate(id, 
            { estado },
            { new: true, runValidators: true }
        );

        if (!cambiarEstado) {
            return res.status(404).json({mensaje: "No se pudo cambiar el estado del plan: Plan de contingencia no existe"})
        }
        res.status(200).json({
            mensaje: `Estado actualizado a ${estado} exitosamente`,
            plan: cambiarEstado
        });
    } catch (error) {
        res.status(500).json({
            mensaje: "Error al cambiar el estado del plan de contingencia",
            error: error.message
        })
    }
};


export const validarPlan = async (req, res) => {
    try {
        const {id} = req.params;
        const validar = await PlanContingencia.findById(id)

        if (!validar){
            return res.status(404).json({ mensaje: "No se encontro el plan para validar"})
        }
        res.status(200).json({ 
            mensaje: "Plan validado correctamente", 
            plan: validar
        });
    } catch (error) {
        res.status(500).json({
            mensaje: "Error al validar el plan de contingencia",
            error: error.message
        })
    }
};


export const generarPlan = async (req, res) => {
    try {
        const {id} = req.params;
        const generar = await PlanContingencia.findById(id);

        if (!generar){
            return res.status(404).json({ mensaje: "No se encontro el plan para generar el documento"})
        }
        res.status(200).json({
            mensaje: "Plan generado correctamente",
            plan: generar
        });
    } catch (error) {
        res.status(500).json({
            mensaje: "Error al generar el plan de contingencia",
            error: error.message
        })
    }
};
