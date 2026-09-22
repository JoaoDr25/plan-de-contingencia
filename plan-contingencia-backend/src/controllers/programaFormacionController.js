import programaFormacionService from "../services/programaFormacionService.js";
import { sendSuccess } from "../utils/apiResponse.js";

export const crearPrograma = async (req, res, next) => {
    try {
        const nuevoPrograma = await programaFormacionService.create(req.body);

        sendSuccess(res, {
            statusCode: 201,
            message: "Programa de formación creado correctamente",
            data: nuevoPrograma
        });
    } catch (error) {
      next(error);
    }
};

export const listarProgramas = async (req, res, next) => {
    try {
        const listar = await programaFormacionService.getAll(req.query);

        sendSuccess(res, {
            message: "Lista de programas obtenidos exitosamente",
            data: listar
        });
    } catch (error) {
       next(error);
    }
};


export const obtenerProgramaId = async (req, res, next) => {
    try {
        const obtenerId = await programaFormacionService.getById( req.params.id );

        sendSuccess(res, {
            message: "Programa de formación obtenido exitosamente",
            data: obtenerId
        });
    } catch (error) {
        next(error);
    }
};


export const actualizarProgramaId = async (req, res, next) => {
    try {
        const actualizar = await programaFormacionService.updateById( req.params.id, req.body );

        sendSuccess(res, {
            message: "Programa de formación actualizado correctamente",
            data: actualizar
        });
    } catch (error) {
        next(error);
    }
};


export const cambiarEstadoProgramaId = async (req, res, next) => {
    try {
        const { estado } = req.body;
        const cambiarEstado = await programaFormacionService.cambiarEstadoId( req.params.id, estado );
   
        sendSuccess(res, {
            message: `Programa de formación ${cambiarEstado.estado === "Activo" ? "activado" : "desactivado"} exitosamente`,
            data: cambiarEstado
        });
    } catch (error) {
        next(error);
    }
}


export const eliminarProgramaId = async (req, res, next) => {
    try {
        const eliminar = await programaFormacionService.deleteById( req.params.id );
      
        sendSuccess(res, {
            message: "Programa de formación eliminado exitosamente",
            data: eliminar
        });
    } catch (error) {
       next(error);
    }
};
