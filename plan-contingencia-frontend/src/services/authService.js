import { USUARIOS_MOCK } from 'src/mocks/usuarios.mock'

export function login(documento, correo) {

    const user = USUARIOS_MOCK.find(usuario => {
        return (
            usuario.documento === documento &&
            usuario.correo.toLowerCase() === correo.toLowerCase()
        )
    })

    if (!user) {
        return {
            success: false,
            message: 'Documento o correo institucional incorrecto'
        }
    }


    if (user.estado !== 'Activo') {
        return {
            success: false,
            message: 'El usuario se encuentra inactivo'
        }
    }

    return {
        success: true,
        user
    }
    
}