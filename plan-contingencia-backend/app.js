import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'

dotenv.config();

const app = express();
const PORT = process.env.PORT

app.use(express.json());
app.use(cors());

app.get('/api', (req, res) => {
    res.send('¡Servidor funcionando!')
});

app.use((req, res) => {
    res.status(404).json({error: 'Ruta no encontrada'});
});

app.listen(PORT, () => {
    console.log('Servidor corriendo en http://localhost::${PORT}');
})
