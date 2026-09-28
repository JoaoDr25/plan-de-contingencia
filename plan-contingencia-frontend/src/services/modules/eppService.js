import api from '../auth/api.js'

const mapEpp = (epp) => {
  if (!epp) {
    return null
  }

  return {
    ...epp,

    id: epp._id ?? epp.id,

    codigo: epp.numero ?? epp.codigo,

    nombre: epp.nombre ?? epp.nombreEPP ?? '',

    nivel: epp.nivel ?? epp.nivelProteccion ?? '',

    fecha: epp.createdAt ?? epp.fecha ?? null,
  }
}

const mapEpps = (epps = []) => {
  return epps.map(mapEpp)
}

const limpiarPayload = (epp = {}) => {
  const payload = {
    ...epp,
  }

  delete payload.id
  delete payload._id
  delete payload.codigo
  delete payload.numero
  delete payload.fecha
  delete payload.createdAt
  delete payload.updatedAt

  delete payload.nombreEPP
  delete payload.nivelProteccion

  return payload
}

const getEpps = async (params = {}) => {
  const response = await api.get('/epp', {
    params,
  })

  return {
    ...response.data,
    data: mapEpps(response.data.data),
  }
}

const getEppById = async (id) => {
  const response = await api.get(`/epp/${id}`)

  return {
    ...response.data,
    data: mapEpp(response.data.data),
  }
}

const createEpp = async (epp) => {
  const payload = limpiarPayload(epp)

  const response = await api.post('/epp', payload)

  return {
    ...response.data,
    data: mapEpp(response.data.data),
  }
}

const updateEpp = async (id, epp) => {
  const payload = limpiarPayload(epp)

  const response = await api.put(`/epp/${id}`, payload)

  return {
    ...response.data,
    data: mapEpp(response.data.data),
  }
}

const changeEppEstado = async (id, estado) => {
  const response = await api.patch(`/epp/${id}/estado`, {
    estado,
  })

  return {
    ...response.data,
    data: mapEpp(response.data.data),
  }
}

const deleteEpp = async (id) => {
  const response = await api.delete(`/epp/${id}`)

  return {
    ...response.data,
    data: mapEpp(response.data.data),
  }
}

export default {
  getEpps,
  getEppById,
  createEpp,
  updateEpp,
  changeEppEstado,
  deleteEpp,
}