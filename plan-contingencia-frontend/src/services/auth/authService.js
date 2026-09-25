import usuarioService from 'src/services/modules/usuarioService.js'

export async function login(documento, correo) {
  let usuarios = []

  try {
    usuarios = await usuarioService.getUsuarios({ documento })
  } catch {
    return {
      success: false,
      message: 'No fue posible validar las credenciales, intente nuevamente',
    }
  }

  const user = usuarios.find((usuario) => {
    return usuario.correo?.toLowerCase() === correo.toLowerCase()
  })

  if (!user) {
    return {
      success: false,
      message: 'Documento o correo institucional incorrecto',
    }
  }

  if (user.estado !== 'Activo') {
    return {
      success: false,
      message: 'El usuario se encuentra inactivo',
    }
  }

  return {
    success: true,
    user,
  }
}
