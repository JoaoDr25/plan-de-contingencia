import express from "express";

import { 
    crearActividad,
    listarActividades,
    obtenerActividadId,
    actualizarActividadId,
    eliminarActividadId
 } from "../../controllers/configuracion/actividadController.js";
 
 import { validarObjectId } from "../middlewares/validateObjectId.js";

 const router = express.Router();


 router.post('/actividades', crearActividad);
 router.get('/actividades', listarActividades);
 router.get('/actividades/:id', validarObjectId, obtenerActividadId);
 router.put('/actividades/:id', validarObjectId, actualizarActividadId);
 router.delete('/actividades/:id', validarObjectId, eliminarActividadId);

 export default router;