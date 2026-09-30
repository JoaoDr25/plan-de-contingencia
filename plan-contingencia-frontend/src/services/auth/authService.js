import api from './api.js'

export async function validarCredenciales(documento, correo) {
  try {
    await api.post('/auth/validar-credenciales', { documento, correoInstitucional: correo })
    return { success: true }
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || 'No fue posible validar las credenciales',
    }
  }
}

export async function login(documento, correo) {
  try {
    const { data } = await api.post('/auth/login', { documento, correoInstitucional: correo })
    return { success: true, ...data.data }
  } catch (error) {
    return {
      success: false,
      message:
        error.response?.data?.message ||
        'No fue posible validar las credenciales, intente nuevamente',
    }
  }
}

export async function verificarCodigo(usuarioId, codigo) {
  try {
    const { data } = await api.post('/auth/verificar-codigo', { usuarioId, codigo })
    return { success: true, ...data.data }
  } catch (error) {
    return {
      success: false,
      message:
        error.response?.data?.message || 'No fue posible validar el código, intente nuevamente',
    }
  }
}
