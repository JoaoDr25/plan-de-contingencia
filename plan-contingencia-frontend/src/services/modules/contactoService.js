import api from '../api.js'

const mapContacto = (contacto) => {
  if (!contacto) {
    return null
  }

  return {
    ...contacto,

    id: contacto._id ?? contacto.id,

    codigo: contacto.numero ?? contacto.codigo,

    nombre: contacto.nombre ?? contacto.nombreEntidad ?? '',

    tipo: contacto.tipo ?? contacto.tipoContacto ?? '',

    telefono: contacto.telefono ?? contacto.telefonoPrincipal ?? '',

    fecha: contacto.createdAt ?? contacto.fecha ?? null,
  }
}

const mapContactos = (contactos = []) => {
  return contactos.map(mapContacto)
}

const limpiarPayload = (contacto = {}) => {
  const payload = {
    ...contacto,
  }

  delete payload.id
  delete payload._id
  delete payload.codigo
  delete payload.numero
  delete payload.fecha
  delete payload.createdAt
  delete payload.updatedAt

  delete payload.nombreEntidad
  delete payload.tipoContacto
  delete payload.telefonoPrincipal

  return payload
}

const getContactos = async (params = {}) => {
  const response = await api.get('/contactos-emergencia', {
    params,
  })

  return {
    ...response.data,
    data: mapContactos(response.data.data),
  }
}

const getContactoById = async (id) => {
  const response = await api.get(`/contactos-emergencia/${id}`)

  return {
    ...response.data,
    data: mapContacto(response.data.data),
  }
}

const createContacto = async (contacto) => {
  const payload = limpiarPayload(contacto)

  const response = await api.post('/contactos-emergencia', payload)

  return {
    ...response.data,
    data: mapContacto(response.data.data),
  }
}

const updateContacto = async (id, contacto) => {
  const payload = limpiarPayload(contacto)

  const response = await api.put(`/contactos-emergencia/${id}`, payload)

  return {
    ...response.data,
    data: mapContacto(response.data.data),
  }
}

const changeContactoEstado = async (id, estado) => {
  const response = await api.patch(`/contactos-emergencia/${id}/estado`, {
    estado,
  })

  return {
    ...response.data,
    data: mapContacto(response.data.data),
  }
}

const deleteContacto = async (id) => {
  const response = await api.delete(`/contactos-emergencia/${id}`)

  return {
    ...response.data,
    data: mapContacto(response.data.data),
  }
}

export default {
  getContactos,
  getContactoById,
  createContacto,
  updateContacto,
  changeContactoEstado,
  deleteContacto,
}