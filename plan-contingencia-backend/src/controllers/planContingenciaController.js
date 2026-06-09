import planContingenciaService from '../services/planContingenciaService.js'

export const crearPlan = async (req, res, next) => {
    try {
        const nuevoPlan = await planContingenciaService.create(req.body);
        
        res.status(201).json({
            mensaje: "Plan de contingencia creado exitosamente",
            plan: nuevoPlan
        });
    } catch (error) {
        next(error);
    }
};


export const listarPlanes = async (req, res, next) => {
    try {
        const listar = await planContingenciaService.getAll();

        res.status(200).json({
            mensaje: "Planes de contingencia listados exitosamente",
            planes: listar
        });
    } catch (error) {
        next(error);
    }
};


export const obtenerPlanId = async (req, res, next) => {
    try {
        const obtenerId = await planContingenciaService.getById(req.params.id);

        if (!obtenerId) {
            return res.status(404).json({ mensaje: "No se encontró el plan de contingencia" })
        }
        res.status(200).json({
            mensaje: "Plan de contingencia obtenido exitosamente",
            plan: obtenerId
        });
    } catch (error) {
        next(error);
    }
};


export const actualizarPlanId = async (req, res, next) => {
    try {
        const actualizar = await planContingenciaService.updateById(req.params.id, req.body);

        res.status(200).json({
            mensaje: "Plan actualizado correctamente",
            plan: actualizar
        });
    } catch (error) {
        next(error);
    }
};


export const cambiarEstadoPlanId = async (req, res, next) => {
    try {
        const { estado } = req.body;

        const cambiarEstado = await planContingenciaService.cambiarEstadoId(req.params.id, estado)

        res.status(200).json({
            mensaje: `Estado actualizado a ${estado} exitosamente`,
            plan: cambiarEstado
        });
    } catch (error) {
      next(error);
    }
};


export const generarPlan = async (req, res, next) => {
    try {
        const generar = await planContingenciaService.generarPlan(req.params.id);

        res.status(200).json({
            mensaje: "Plan de contingencia enviado a revisión exitosamente",
            plan: generar
        });
    } catch (error) {
       next(error);
    }
};


export const asociarRiesgosPlan = async (req, res, next) => {
    try {

        const { riesgoId } = req.body;

        const asociarRiesgo = await planContingenciaService.asociarRiesgosId(req.params.id, riesgoId);

        res.status(200).json({
            mensaje: "Plan de contingencia generado correctamente",
            plan: asociarRiesgo
        });
    } catch (error) {
       next(error);
    }
}


export const obtenerRiesgosPlan = async (req, res, next) => {
    try {
        const obtenerRiesgo = await planContingenciaService.obtenerAsociacionRiesgoId(req.params.id);

        res.status(200).json({
            mensaje: "Plan de contingencia generado correctamente",
            plan: obtenerRiesgo
        });
    } catch (error) {
       next(error);
    }
}


export const eliminarRiesgosPlan = async (req, res, next) => {
    try {
        const eliminarRiesgo = planContingenciaService.eliminarAsociacionRiesgoId(req.params.id, req.params.riesgoId);

        res.status(200).json({
            mensaje: "Plan de contingencia generado correctamente",
            plan: eliminarRiesgo
        });
    } catch (error) {
       next(error);
    }
}


export const asociarAprendices = async (req, res, next) => {
    try {

        const { aprendizId } = req.body;

        const asociarAprendiz = await planContingenciaService.asociarAprendicesId(req.params.id, aprendizId);

        res.status(200).json({
            mensaje: "Plan de contingencia generado correctamente",
            plan: asociarAprendiz
        });
    } catch (error) {
        next(error);
    }
}


export const obtenerAprendicesAsociados = async (req, res, next) => {
    try {
        const obtenerAprendiz = await planContingenciaService.obtenerAsociacionAprendicesId(req.params.id);

        res.status(200).json({
            mensaje: "Plan de contingencia generado correctamente",
            plan: obtenerAprendiz
        });
    } catch (error) {
        next(error);
    }
}


export const eliminarAprendizAsociado = async (req, res, next) => {
    try {
        const eliminarAprendiz = await planContingenciaService.eliminarAsociacionAprendicesId(req.params.id, req.params.aprendizId);

        res.status(200).json({
            mensaje: "Plan de contingencia generado correctamente",
            plan: eliminarAprendiz
        });
    } catch (error) {
        next(error);
    }
}


export const guardarContactosEmergencia = async (req, res, next) => {
    try {
        const contactosEmergencia = await planContingenciaService.guardarContactosEmergenciaId(req.params.id, req.body);

        res.status(200).json({
            mensaje: "Plan de contingencia generado correctamente",
            plan: contactosEmergencia
        });
    } catch (error) {
        next(error);
    }
}


export const seleccionarEpp = async (req, res, next) => {
    try {
        const epp = await planContingenciaService.seleccionarEppId(req.params.id, req.body);

        res.status(200).json({
            mensaje: "Plan de contingencia generado correctamente",
            plan: epp
        });
    } catch (error) {
        next(error);
    }
}


export const registrarSeguridadVial = async (req, res, next) => {
    try {
        const seguridadVial = await planContingenciaService.registrarSeguridadVialId(req.params.id, req. body);
        res.status(200).json({
            mensaje: "Plan de contingencia generado correctamente",
            plan: seguridadVial
        });
    } catch (error) {
        next(error);
    }
}


export const registrarContextoAcademico = async (req, res, next) => {
    try {
        const contextoAcademico = await planContingenciaService.registrarContextoAcademicoId(req.params.id, req.body);

        res.status(200).json({
            mensaje: "Plan de contingencia generado correctamente",
            plan: contextoAcademico
        });
    } catch (error) {
     next(error);
    }
}


export const registrarArticulacionFormativa = async (req, res, next) => {
    try {
        const articulacionFormativa = await planContingenciaService.registrarArticulacionFormativaId(req.params.id, req.body);

        res.status(200).json({
            mensaje: "Plan de contingencia generado correctamente",
            plan: articulacionFormativa
        });
    } catch (error) {
      next(error);
    }
}


export const registrarPlanTrabajo = async (req, res, next) => {
    try {
        const planTrabajo = await planContingenciaService.registrarPlanTrabajoId(req.params.id, req.body);

        res.status(200).json({
            mensaje: "Plan de contingencia generado correctamente",
            plan: planTrabajo
        });
    } catch (error) {
       next(error);
    }
}
