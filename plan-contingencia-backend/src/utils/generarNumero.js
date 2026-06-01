import Counter from '../models/countermodel.js';

export const generarNumero = async (modelo) => {

    const contador = await Counter.findByIdAndUpdate(
        { nombreModelo: modelo },
        { $inc: { secuencia: 1 }},
        {
            new : true,
            upsert: true
        }
    );

    return contador.secuencia;
};