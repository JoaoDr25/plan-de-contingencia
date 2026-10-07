import api from '../auth/api'

const mapUsuario = (usuario) => {
  return {
    ...usuario,

    codigo: usuario.codigo ?? usuario.numero,
    correo: usuario.correo ?? usuario.correoInstitucional,
    centro: usuario.centro ?? usuario.centroFormacion,
    rol: usuario.rol ?? usuario.rolAsignado,

    nombreCompleto: `${usuario.nombre ?? ''} ${usuario.apellido ?? ''}`.trim(),

    firma: usuario.firma ?? null,
    firmaNombre: usuario.firmaNombre ?? null,
  }
}

const getUsuarios = async (params = {}) => {
  const response = await api.get('/usuarios', {
    params,
  })

  return response.data.data.map(mapUsuario)
}

const getRevisores = async () => {
  const response = await api.get('/usuarios/revisores')
  const revisores = response.data.data ?? {}

  return {
    pedagogia: (revisores.pedagogia ?? []).map(mapUsuario),
    sst: (revisores.sst ?? []).map(mapUsuario),
    coordinacion: (revisores.coordinacion ?? []).map(mapUsuario),
  }
}

const getUsuarioById = async (id) => {
  const response = await api.get(`/usuarios/${id}`)

  return mapUsuario(response.data.data)
}

const createUsuario = async (usuario) => {
  const response = await api.post('/usuarios', usuario)

  return mapUsuario(response.data.data)
}

const updateUsuario = async (id, usuario) => {
  const response = await api.put(`/usuarios/${id}`, usuario)

  return mapUsuario(response.data.data)
}

const changeEstadoUsuario = async (id, estado) => {
  const response = await api.patch(`/usuarios/${id}/estado`, {
    estado,
  })

  return mapUsuario(response.data.data)
}

const registrarAcceso = async (id) => {
  const response = await api.patch(`/usuarios/${id}/acceso`)

  return mapUsuario(response.data.data)
}

const deleteUsuario = async (id) => {
  const response = await api.delete(`/usuarios/${id}`)

  return mapUsuario(response.data.data)
}

export default {
  getUsuarios,
  getRevisores,
  getUsuarioById,
  createUsuario,
  updateUsuario,
  changeEstadoUsuario,
  registrarAcceso,
  deleteUsuario,
}