import { ROLES } from '../constants/roles.js'

export const mockAuth = (req, res, next) => {

    const rol = req.headers['x-role'] || ROLES.CONSULTOR;

    const usuariosMock = {
        [ROLES.ADMINISTRADOR]: {
            id: 'admin123',
            nombre: 'Administrador Demo',
            rol: ROLES.ADMINISTRADOR
        },

        [ROLES.CONSULTOR]: {
            id: 'user123',
            nombre: 'Consultor Demo',
            rol: ROLES.CONSULTOR
        },

        [ROLES.PEDAGOGIA]: {
            id: 'pedago123',
            nombre: 'Pedagogía Dema',
            rol: ROLES.PEDAGOGIA
        },

        [ROLES.SST]: {
            id: 'sst123',
            nombre: 'SST Demo',
            rol: ROLES.SST
        },

        [ROLES.COORDINACION]: {
            id: 'coordin123',
            nombre: 'Coordinación Demo',
            rol: ROLES.COORDINACION
        },
    };

    req.user =
        usuariosMock[rol] ||
        usuariosMock[ROLES.CONSULTOR];

    next();
};