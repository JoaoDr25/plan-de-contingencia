import express from "express";
import { 
    crearProtocolo,
    listarProtocolo,
    obtenerProtocoloId,
    actualizarprotocoloId,
    eliminarProtocoloId,
 } from "../controllers/protocoloController.js";

import { validarObjectId } from "../middlewares/validateObjectId.js";

const router = express.Router();

router.post('/protocolos', crearProtocolo);
router.get('protocolos', listarProtocolo);
router.get('/protocolos/:id', validarObjectId, obtenerProtocoloId);
router.put('/protocolos/:id', validarObjectId, actualizarprotocoloId);
router.delete('/protocolos/:id', validarObjectId, eliminarProtocoloId);

export default router;