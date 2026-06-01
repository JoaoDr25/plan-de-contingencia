import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'

import { conectarDB } from './src/config/db.js'

import planRoutes from './src/routes/planes/planContingenciaRoutes.js'
import programasRoutes from './src/routes/configuracion/programaFormacionRoutes.js'
import actividadRoutes from './src/routes/configuracion/actividadRoutes.js'
import peligroRoutes from './src/routes/configuracion/peligroRoutes.js'
import riesgosRoutes from './src/routes/configuracion/riesgoRoutes.js'

import { mockAuth } from './src/middlewares/authMiddleware.js'

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

app.get('/api', (req, res) => {
    res.send('¡Servidor funcionando!');
});

app.use('/api', 
    planRoutes, 
    programasRoutes, 
    actividadRoutes, 
    peligroRoutes,
    riesgosRoutes
);

app.use(mockAuth); //Autenticación temporal

app.use((req, res) => {
    res.status(404).json({error: 'Ruta no encontrada'});
});

conectarDB();

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
