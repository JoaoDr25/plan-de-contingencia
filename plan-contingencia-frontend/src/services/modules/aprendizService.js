import api from '../api.js'

const mapAprendiz = (aprendiz) => {
  if (!aprendiz) {
    return null
  }

  const programa =
    aprendiz.programaFormacionId &&
    typeof aprendiz.programaFormacionId === 'object'
      ? aprendiz.programaFormacionId
      : null

  return {
    ...aprendiz,

    id: aprendiz._id ?? aprendiz.id,
    codigo: aprendiz.numero ?? aprendiz.codigo,

    programaFormacionId:
      programa?._id ??
      programa?.id ??
      aprendiz.programaFormacionId ??
      null,

    programa:
      programa?.nombre ??
      aprendiz.programa ??
      aprendiz.programaFormacion ??
      '',

    ficha:
      programa?.ficha ??
      aprendiz.ficha ??
      '',

    fecha: aprendiz.createdAt ?? aprendiz.fecha ?? null,
  }
}

const mapAprendices = (aprendices = []) => {
  return aprendices.map(mapAprendiz)
}

const limpiarPayload = (aprendiz = {}) => {
  const payload = {
    ...aprendiz,
  }

  if (
    payload.programaFormacionId &&
    typeof payload.programaFormacionId === 'object'
  ) {
    payload.programaFormacionId =
      payload.programaFormacionId._id ??
      payload.programaFormacionId.id ??
      null
  }

  delete payload.id
  delete payload._id
  delete payload.codigo
  delete payload.numero
  delete payload.fecha
  delete payload.createdAt
  delete payload.updatedAt
  delete payload.programa
  delete payload.ficha

  return payload
}

const getAprendices = async (params = {}) => {
  const response = await api.get('/aprendices', {
    params,
  })

  return {
    ...response.data,
    data: mapAprendices(response.data.data),
  }
}

const getAprendizById = async (id) => {
  const response = await api.get(`/aprendices/${id}`)

  return {
    ...response.data,
    data: mapAprendiz(response.data.data),
  }
}

const createAprendiz = async (aprendiz) => {
  const payload = limpiarPayload(aprendiz)

  const response = await api.post('/aprendices', payload)

  return {
    ...response.data,
    data: mapAprendiz(response.data.data),
  }
}

const updateAprendiz = async (id, aprendiz) => {
  const payload = limpiarPayload(aprendiz)

  const response = await api.put(`/aprendices/${id}`, payload)

  return {
    ...response.data,
    data: mapAprendiz(response.data.data),
  }
}

const changeAprendizEstado = async (id, estado) => {
  const response = await api.patch(`/aprendices/${id}/estado`, {
    estado,
  })

  return {
    ...response.data,
    data: mapAprendiz(response.data.data),
  }
}

const deleteAprendiz = async (id) => {
  const response = await api.delete(`/aprendices/${id}`)

  return {
    ...response.data,
    data: mapAprendiz(response.data.data),
  }
}

export default {
  getAprendices,
  getAprendizById,
  createAprendiz,
  updateAprendiz,
  changeAprendizEstado,
  deleteAprendiz,
}