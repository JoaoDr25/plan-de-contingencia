import express from "express";
import { 
    crearProtocolo,
    listarProtocolos,
    obtenerProtocoloId,
    actualizarProtocoloId,
    eliminarProtocoloId,
    // obtenerRiesgosProtocolo
 } from "../controllers/protocoloController.js";

import { validarObjectId } from "../middlewares/validateObjectId.js";

const router = express.Router();

router.post('/protocolos', crearProtocolo);
router.get('/protocolos', listarProtocolos);
router.get('/protocolos/:id', validarObjectId, obtenerProtocoloId);
router.put('/protocolos/:id', validarObjectId, actualizarProtocoloId);
router.delete('/protocolos/:id', validarObjectId, eliminarProtocoloId);

// router.get('/protocolos/:id/riesgos', validarObjectId, obtenerRiesgosProtocolo);

export default router;