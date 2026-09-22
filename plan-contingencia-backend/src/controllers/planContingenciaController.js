import planContingenciaService from '../services/planContingenciaService.js'
import { sendSuccess } from '../utils/apiResponse.js';

export const crearPlan = async (req, res, next) => {
    try {
        const nuevoPlan = await planContingenciaService.create(req.body);
        
        sendSuccess(res, {
            statusCode: 201,
            message: "Plan de contingencia creado exitosamente",
            data: nuevoPlan
        });
    } catch (error) {
        next(error);
    }
};


export const listarPlanes = async (req, res, next) => {
    try {
        const listar = await planContingenciaService.getAll(req.query);

        sendSuccess(res, {
            message: "Planes de contingencia listados exitosamente",
            data: listar
        });
    } catch (error) {
        next(error);
    }
};


export const obtenerPlanId = async (req, res, next) => {
    try {
        const obtenerId = await planContingenciaService.getById(req.params.id);

        sendSuccess(res, {
            message: "Plan de contingencia obtenido exitosamente",
            data: obtenerId
        });
    } catch (error) {
        next(error);
    }
};


export const actualizarPlanId = async (req, res, next) => {
    try {
        const actualizar = await planContingenciaService.updateById(req.params.id, req.body);

        sendSuccess(res, {
            message: "Plan actualizado correctamente",
            data: actualizar
        });
    } catch (error) {
        next(error);
    }
};


export const cambiarEstadoPlanId = async (req, res, next) => {
    try {
        const { estado } = req.body;

        const cambiarEstado = await planContingenciaService.cambiarEstadoId(req.params.id, estado)

        sendSuccess(res, {
            message: `Estado actualizado a ${estado} exitosamente`,
            data: cambiarEstado
        });
    } catch (error) {
      next(error);
    }
};


export const eliminarPlanId = async (req, res, next) => {
    try {
        const eliminar = await planContingenciaService.deleteById(req.params.id);

        sendSuccess(res, {
            message: "Plan de contingencia eliminado exitosamente",
            data: eliminar
        });
    } catch (error) {
        next(error);
    }
};


export const generarPlan = async (req, res, next) => {
    try {
        const generar = await planContingenciaService.generarPlanId(req.params.id);

        sendSuccess(res, {
            message: "Plan de contingencia enviado a revisión exitosamente",
            data: generar
        });
    } catch (error) {
       next(error);
    }
};


export const generarPdf = async (req, res, next) => {
    try {
        
        const pdfBuffer = await planContingenciaService.generarPdfId(req.params.id);

        res.setHeader(
            "Content-Type",
            "application/pdf"
        );

        res.setHeader(
            "Content-Disposition",
            "inline; filename=PlanContingencia.pdf"
        );

        res.send(pdfBuffer);

    } catch (error) {
        next(error)
    }
};


export const asociarRiesgosPlan = async (req, res, next) => {
    try {

        const { riesgosId } = req.body;

        const asociarRiesgo = await planContingenciaService.asociarRiesgosId(req.params.id, riesgosId);

        sendSuccess(res, {
            message: "Riesgos asociados al plan correctamente",
            data: asociarRiesgo
        });
    } catch (error) {
       next(error);
    }
}


export const obtenerRiesgosPlan = async (req, res, next) => {
    try {
        const obtenerRiesgo = await planContingenciaService.obtenerAsociacionRiesgoId(req.params.id);

        sendSuccess(res, {
            message: "Riesgos asociados al plan obtenidos exitosamente",
            data: obtenerRiesgo
        });
    } catch (error) {
       next(error);
    }
}


export const eliminarRiesgosPlan = async (req, res, next) => {
    try {
        const eliminarRiesgo = await planContingenciaService.eliminarAsociacionRiesgoId(req.params.id, req.params.riesgoId);

        sendSuccess(res, {
            message: "Riesgo asociado al plan eliminado exitosamente",
            data: eliminarRiesgo
        });
    } catch (error) {
       next(error);
    }
}


export const asociarAprendices = async (req, res, next) => {
    try {

        const { aprendicesId } = req.body;

        const asociarAprendiz = await planContingenciaService.asociarAprendicesId(req.params.id, aprendicesId);

        sendSuccess(res, {
            message: "Aprendices asociados al plan correctamente",
            data: asociarAprendiz
        });
    } catch (error) {
        next(error);
    }
}


export const obtenerAprendicesAsociados = async (req, res, next) => {
    try {
        const obtenerAprendiz = await planContingenciaService.obtenerAsociacionAprendicesId(req.params.id);

        sendSuccess(res, {
            message: "Aprendices asociados al plan obtenidos exitosamente",
            data: obtenerAprendiz
        });
    } catch (error) {
        next(error);
    }
}


export const eliminarAprendizAsociado = async (req, res, next) => {
    try {
        const eliminarAprendiz = await planContingenciaService.eliminarAsociacionAprendicesId(req.params.id, req.params.aprendizId);

        sendSuccess(res, {
            message: "Aprendiz asociado al plan eliminado exitosamente",
            data: eliminarAprendiz
        });
    } catch (error) {
        next(error);
    }
}


export const guardarContactosEmergencia = async (req, res, next) => {
    try {
        const contactosEmergencia = await planContingenciaService.guardarContactosEmergenciaId(req.params.id, req.body);

        sendSuccess(res, {
            message: "Contactos de emergencia guardados correctamente",
            data: contactosEmergencia
        });
    } catch (error) {
        next(error);
    }
}


export const seleccionarEpp = async (req, res, next) => {
    try {
        const epp = await planContingenciaService.seleccionarEppId(req.params.id, req.body);

        sendSuccess(res, {
            message: "Elementos de protección personal seleccionados correctamente",
            data: epp
        });
    } catch (error) {
        next(error);
    }
}


export const registrarSeguridadVial = async (req, res, next) => {
    try {
        const seguridadVial = await planContingenciaService.registrarSeguridadVialId(req.params.id, req. body);
        sendSuccess(res, {
            message: "Seguridad vial registrada correctamente",
            data: seguridadVial
        });
    } catch (error) {
        next(error);
    }
}


export const registrarContextoAcademico = async (req, res, next) => {
    try {
        const contextoAcademico = await planContingenciaService.registrarContextoAcademicoId(req.params.id, req.body);

        sendSuccess(res, {
            message: "Contexto académico registrado correctamente",
            data: contextoAcademico
        });
    } catch (error) {
     next(error);
    }
}


export const registrarArticulacionFormativa = async (req, res, next) => {
    try {
        const articulacionFormativa = await planContingenciaService.registrarArticulacionFormativaId(req.params.id, req.body);

        sendSuccess(res, {
            message: "Articulación formativa registrada correctamente",
            data: articulacionFormativa
        });
    } catch (error) {
      next(error);
    }
}


export const registrarPlanTrabajo = async (req, res, next) => {
    try {
        const planTrabajo = await planContingenciaService.registrarPlanTrabajoId(req.params.id, req.body);

        sendSuccess(res, {
            message: "Plan de trabajo registrado correctamente",
            data: planTrabajo
        });
    } catch (error) {
       next(error);
    }
}
