export const mockAuth = (req, res, next) => {

    const rol = req.headers['x-role'] || INSTRUCTOR;

    const usuariosMock = {
        ADMINISTRADOR: {
            id: 'admin123',
            nombre: 'Administrador Demo',
            rol: 'ADMINISTRADOR'
        },

        INSTRUCTOR: {
            id: 'user123',
            nombre: 'Instructor Demo',
            rol: 'INSTRUCTOR'
        },

        PEDAGOGIA: {
            id: 'pedago123',
            nombre: 'Pedagogía Dema',
            rol: 'PEDAGOGIA'
        },

        SST: {
            id: 'sst123',
            nombre: 'SST Demo',
            rol: 'SST'
        },

        COORDINACION: {
            id: 'coordin123',
            nombre: 'Coordinación Demo',
            rol: 'COORDINACION'
        },
    };

    req.user =
        usuariosMock[rol] ||
        usuariosMock.INSTRUCTOR;

    next();
};