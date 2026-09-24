import api from './api'
import { formatDate } from 'src/utils/date.utils'

const mapPrograma = (programa) => {
  return {
    ...programa,
    fecha: formatDate(programa.createdAt),
  }
}

const getProgramas = async (params = {}) => {
  const response = await api.get('/programas', {
    params,
  })

  return response.data.data.map(mapPrograma)
}

const getProgramaById = async (id) => {
  const response = await api.get(`/programas/${id}`)

  return response.data.data
}

const createPrograma = async (programa) => {
  const response = await api.post('/programas', programa)

  return response.data.data
}

const updatePrograma = async (id, programa) => {
  const response = await api.put(`/programas/${id}`, programa)

  return response.data.data
}

const changeEstadoPrograma = async (id, estado) => {
  const response = await api.patch(`/programas/${id}/estado`, {
    estado,
  })

  return response.data.data
}

const deletePrograma = async (id) => {
  const response = await api.delete(`/programas/${id}`)

  return response.data.data
}

export default {
  getProgramas,
  getProgramaById,
  createPrograma,
  updatePrograma,
  changeEstadoPrograma,
  deletePrograma,
}