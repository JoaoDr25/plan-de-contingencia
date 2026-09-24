import api from './api.js'

const mapProtocolo = (protocolo) => {
  return {
    ...protocolo,
    fecha: protocolo.createdAt,
    codigo: protocolo.codigo ?? protocolo.numero,
  }
}

const getProtocolos = async (params = {}) => {
  const response = await api.get('/protocolos', {
    params,
  })

  return response.data.data.map(mapProtocolo)
}

const getProtocoloById = async (id) => {
  const response = await api.get(`/protocolos/${id}`)

  return mapProtocolo(response.data.data)
}

const createProtocolo = async (data) => {
  const response = await api.post('/protocolos', data)

  return mapProtocolo(response.data.data)
}

const updateProtocolo = async (id, data) => {
  const response = await api.put(`/protocolos/${id}`, data)

  return mapProtocolo(response.data.data)
}

const changeEstadoProtocolo = async (id, estado) => {
  const response = await api.patch(`/protocolos/${id}/estado`, {
    estado,
  })

  return mapProtocolo(response.data.data)
}

const deleteProtocolo = async (id) => {
  const response = await api.delete(`/protocolos/${id}`)

  return mapProtocolo(response.data.data)
}

export default {
  getProtocolos,
  getProtocoloById,
  createProtocolo,
  updateProtocolo,
  changeEstadoProtocolo,
  deleteProtocolo,
}