import api from './api'

const mapRiesgo = (riesgo) => {
  return {
    ...riesgo,
    fecha: riesgo.createdAt,
    codigo: riesgo.codigo ?? riesgo.numero,
  }
}

const getRiesgos = async () => {
  const response = await api.get('/riesgos')

  return response.data.data.map(mapRiesgo)
}

const getRiesgoById = async (id) => {
  const response = await api.get(`/riesgos/${id}`)

  return mapRiesgo(response.data.data)
}

const createRiesgo = async (data) => {
  const response = await api.post('/riesgos', data)

  return mapRiesgo(response.data.data)
}

const updateRiesgo = async (id, data) => {
  const response = await api.put(`/riesgos/${id}`, data)

  return mapRiesgo(response.data.data)
}

const deleteRiesgo = async (id) => {
  const response = await api.delete(`/riesgos/${id}`)

  return response.data.data
}

export default {
  getRiesgos,
  getRiesgoById,
  createRiesgo,
  updateRiesgo,
  deleteRiesgo,
}