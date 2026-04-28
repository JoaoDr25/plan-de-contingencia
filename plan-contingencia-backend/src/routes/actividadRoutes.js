import express from "express";

import { 
    crearActividad,
    listarActividades,
    obtenerActividad,
    actualizarActividad,
    eliminarActividad
 } from "../controllers/actividadController.js";
 import { validarObjectId } from "../middlewares/validateObjectId.js";

 const router = express.Router();


 router.post('/actividades', crearActividad);
 router.get('/actividades', listarActividades);
 router.get('/actividades/:id', validarObjectId, obtenerActividad);
 router.put('/actividades/:id', validarObjectId, actualizarActividad);
 router.delete('/actividades/:id', validarObjectId, eliminarActividad);

 export default router;