import api from './api'

const mapActividad = (actividad) => {
  const peligros = Array.isArray(actividad.peligros)
    ? actividad.peligros
    : []

  return {
    ...actividad,

    codigo: actividad.codigo ?? actividad.numero,

    peligrosIds: peligros.map((peligro) =>
      typeof peligro === 'object' ? peligro._id : peligro
    ),

    peligrosDetalle: peligros,

    fecha: actividad.createdAt,
  }
}

const getActividades = async (params = {}) => {
  const response = await api.get('/actividades', {
    params,
  })

  return response.data.data.map(mapActividad)
}

const getActividadById = async (id) => {
  const response = await api.get(`/actividades/${id}`)

  return mapActividad(response.data.data)
}

const createActividad = async (actividad) => {
  const response = await api.post('/actividades', actividad)

  return mapActividad(response.data.data)
}

const updateActividad = async (id, actividad) => {
  const response = await api.put(`/actividades/${id}`, actividad)

  return mapActividad(response.data.data)
}

const deleteActividad = async (id) => {
  const response = await api.delete(`/actividades/${id}`)

  return response.data.data
}

export default {
  getActividades,
  getActividadById,
  createActividad,
  updateActividad,
  deleteActividad,
}