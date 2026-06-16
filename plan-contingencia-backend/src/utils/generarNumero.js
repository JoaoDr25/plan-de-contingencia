import Counter from '../models/countermodel.js';

export const generarNumero = async (modelo) => {

    const contador = await Counter.findOneAndUpdate(
        { nombreModelo: modelo },
        { $inc: { secuencia: 1 }},
        {
            returnDocument: "after",
            upsert: true
        }
    );

    return contador.secuencia;
};