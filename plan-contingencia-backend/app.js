import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'

import { conectarDB } from './src/config/db.js'

import planContingenciaRoutes from './src/routes/planContingenciaRoutes.js'
import programaFormacionRoutes from './src/routes/programaFormacionRoutes.js'
import actividadRoutes from './src/routes/actividadRoutes.js'
import peligroRoutes from './src/routes/peligroRoutes.js'
import riesgoRoutes from './src/routes/riesgoRoutes.js'
import protocoloRoutes from './src/routes/protocoloRoutes.js'
import configuracionPeligroRoutes from './src/routes/configuracionPeligroRoutes.js'
import aprendizRoutes from './src/routes/aprendizRoutes.js'
import usuarioRoutes from './src/routes/usuarioRoutes.js'
import contactoEmergenciaRoutes from './src/routes/contactoEmergenciaRoutes.js'
import eppRoutes from './src/routes/eppRoutes.js'

import { mockAuth } from './src/middlewares/authMiddleware.js'
import { errorHandler } from './src/middlewares/errorHandler.js'

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

app.get('/api', (req, res) => {
    res.send('¡Servidor funcionando!');
});

app.use(mockAuth); //Autenticación temporal

app.use('/api', 
    planContingenciaRoutes, 
    programaFormacionRoutes, 
    actividadRoutes, 
    peligroRoutes,
    riesgoRoutes,
    protocoloRoutes,
    configuracionPeligroRoutes,
    aprendizRoutes,
    usuarioRoutes,
    contactoEmergenciaRoutes,
    eppRoutes
);

app.use((req, res) => {
    res.status(404).json({error: 'Ruta no encontrada'});
});

app.use(errorHandler); //Middleware de manejo de errores del servidor

conectarDB();

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
