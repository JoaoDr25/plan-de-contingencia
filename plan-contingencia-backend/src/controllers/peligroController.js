import peligroService from '../services/peligroService.js';

export const crearPeligro = async (req, res, next) => {
    try {
        const nuevoPeligro = await peligroService.create(req.body);

        return res.status(201).json({
            mensaje: "Peligro creado exitosamente",
            peligro: nuevoPeligro
        });
    } catch (error) {
       next(error);
    }
};


export const listarPeligros = async (req, res, next) => {
    try {
        const listar = await peligroService.getAll();

        return res.status(200).json({
            mensaje: "Lista de peligros obtenidos exitosamente",
            peligros: listar
        });
    } catch (error) {
        next(error);
    }
};


export const obtenerPeligroId = async (req, res, next) => {
    try {
        const obtenerId = await peligroService.getById(req.params.id)

        return res.status(200).json({
            mensaje: "Peligro obtenido exitosamente",
            peligro: obtenerId
        });
    } catch (error) {
        next(error);
    }
};


export const actualizarPeligroId = async (req, res, next) => {
    try {
        const actualizar = await peligroService.updateById(req.params.id, req.body);

        return res.status(200).json({
            mensaje: "Peligro actualizado exitosamente",
            peligro: actualizar
        });
    } catch (error) {
        next(error);
    }
};


export const eliminarPeligroId = async (req, res, next) => {
    try {
        const eliminar = await peligroService.deleteById(req.params.id);

        return res.status(200).json({
            mensaje: "Peligro eliminado exitosamente",
            peligro: eliminar
        });
    } catch (error) {
        next(error);
    }
};


// export const obtenerAsociacionRiesgoPeligro = async (req, res, next) => {
//     try {
//         const obtenerAsociacion = await peligroService.obtenerRiesgoPeligro(req.params.id);

//         return res.status(200).json({
//             mensaje: `Riesgos asociados obtenidos exitosamente`,
//             asociar: obtenerAsociacion
//         });
//     } catch (error) {
//         next(error);
//     }
// };