import api from './api'

const mapPeligro = (peligro) => {
  const riesgos = Array.isArray(peligro.riesgos)
    ? peligro.riesgos
    : []

  return {
    ...peligro,

    codigo: peligro.codigo ?? peligro.numero,

    riesgosIds: riesgos.map((riesgo) =>
      typeof riesgo === 'object' ? riesgo._id : riesgo
    ),

    riesgosDetalle: riesgos,

    fecha: peligro.createdAt,
  }
}

const getPeligros = async (params = {}) => {
  const response = await api.get('/peligros', {
    params,
  })

  return response.data.data.map(mapPeligro)
}

const getPeligroById = async (id) => {
  const response = await api.get(`/peligros/${id}`)

  return mapPeligro(response.data.data)
}

const createPeligro = async (peligro) => {
  const response = await api.post('/peligros', peligro)

  return mapPeligro(response.data.data)
}

const updatePeligro = async (id, peligro) => {
  const response = await api.put(`/peligros/${id}`, peligro)

  return mapPeligro(response.data.data)
}

const deletePeligro = async (id) => {
  const response = await api.delete(`/peligros/${id}`)

  return response.data.data
}

export default {
  getPeligros,
  getPeligroById,
  createPeligro,
  updatePeligro,
  deletePeligro,
}