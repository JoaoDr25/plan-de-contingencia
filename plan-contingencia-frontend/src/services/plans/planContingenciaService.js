import api from '../auth/api.js'

const mapPlanContingencia = (plan) => {
  return {
    ...plan,
  }
}

const getPlanes = async (params = {}) => {
  const response = await api.get('/planes', {
    params,
  })

  return response.data.data.map(mapPlanContingencia)
}

const getPlanById = async (id) => {
  const response = await api.get(`/planes/${id}`)

  return mapPlanContingencia(response.data.data)
}

const createPlan = async (planData) => {
  const response = await api.post('/planes', planData)

  return mapPlanContingencia(response.data.data)
}

const updatePlan = async (id, planData) => {
  const response = await api.put(`/planes/${id}`, planData)

  return mapPlanContingencia(response.data.data)
}

const changeEstadoPlan = async (id, estado, observaciones = '') => {
  const response = await api.patch(`/planes/${id}/estado`, {
    estado,
    ...(observaciones ? { observaciones } : {}),
  })

  return mapPlanContingencia(response.data.data)
}

const deletePlan = async (id) => {
  const response = await api.delete(`/planes/${id}`)

  return response.data.data
}

const generarPlan = async (id) => {
  const response = await api.post(`/planes/${id}/generar`)

  return mapPlanContingencia(response.data.data)
}

const generarPdf = async (id) => {
  const response = await api.get(`/planes/${id}/generar-pdf`, {
    responseType: 'blob',
  })

  return response.data
}

const asociarAprendices = async (id, aprendicesId) => {
  const response = await api.post(`/planes/${id}/aprendices`, {
    aprendicesId,
  })

  return mapPlanContingencia(response.data.data)
}

const getAprendicesAsociados = async (id) => {
  const response = await api.get(`/planes/${id}/aprendices`)

  return response.data.data
}

const eliminarAprendizAsociado = async (id, aprendizId) => {
  const response = await api.delete(
    `/planes/${id}/aprendices/${aprendizId}`,
  )

  return mapPlanContingencia(response.data.data)
}

const asociarRiesgos = async (id, riesgosId) => {
  const response = await api.post(`/planes/${id}/riesgos`, {
    riesgosId,
  })

  return mapPlanContingencia(response.data.data)
}

const getRiesgosAsociados = async (id) => {
  const response = await api.get(`/planes/${id}/riesgos`)

  return response.data.data
}

const eliminarRiesgoAsociado = async (id, riesgoId) => {
  const response = await api.delete(
    `/planes/${id}/riesgos/${riesgoId}`,
  )

  return mapPlanContingencia(response.data.data)
}

const guardarContactosEmergencia = async (id, data) => {
  const response = await api.put(
    `/planes/${id}/contactos-emergencia`,
    data,
  )

  return mapPlanContingencia(response.data.data)
}

const seleccionarEpp = async (id, data) => {
  const response = await api.put(
    `/planes/${id}/epp`,
    data,
  )

  return mapPlanContingencia(response.data.data)
}

const registrarSeguridadVial = async (id, data) => {
  const response = await api.put(
    `/planes/${id}/seguridad-vial`,
    data,
  )

  return mapPlanContingencia(response.data.data)
}

const registrarContextoAcademico = async (id, data) => {
  const response = await api.put(
    `/planes/${id}/contexto-academico`,
    data,
  )

  return mapPlanContingencia(response.data.data)
}

const registrarArticulacionFormativa = async (id, data) => {
  const response = await api.put(
    `/planes/${id}/articulacion-formativa`,
    data,
  )

  return mapPlanContingencia(response.data.data)
}

const registrarPlanTrabajo = async (id, data) => {
  const response = await api.put(
    `/planes/${id}/plan-trabajo`,
    data,
  )

  return mapPlanContingencia(response.data.data)
}

const registrarRevision = async (id, data) => {
  const response = await api.patch(
    `/planes/${id}/revision`,
    data,
  )

  return mapPlanContingencia(response.data.data)
}


export default {
  getPlanes,
  getPlanById,
  createPlan,
  updatePlan,
  changeEstadoPlan,
  deletePlan,

  generarPlan,
  generarPdf,

  asociarAprendices,
  getAprendicesAsociados,
  eliminarAprendizAsociado,

  asociarRiesgos,
  getRiesgosAsociados,
  eliminarRiesgoAsociado,

  guardarContactosEmergencia,
  seleccionarEpp,
  registrarSeguridadVial,
  registrarContextoAcademico,
  registrarArticulacionFormativa,
  registrarPlanTrabajo,

  registrarRevision,
}