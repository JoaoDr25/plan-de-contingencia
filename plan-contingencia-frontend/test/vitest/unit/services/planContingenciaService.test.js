import { describe, expect, it } from 'vitest'
import { testService } from '../../helpers/serviceAssertions'
import api from 'src/services/auth/api.js'
import service from 'src/services/plans/planContingenciaService'

const raw = { _id: 'plan-1', usuarioNombre: 'Maria Perez', estado: 'borrador' }
const mapped = { ...raw, instructorNombre: 'Maria Perez' }
const response = { data: { data: raw } }
const data = { descripcionActividad: 'Visita tecnica' }
const params = { estado: 'borrador', page: 2 }
const contacts = {
  contactosEmergencia: {
    contactosBase: ['c1'],
    otro: [
      { nombreEntidad: 'Hospital', telefono: '1234567', ciudad: 'Cali', descripcion: 'Urgencias' },
    ],
  },
}

describe('planContingenciaService', () => {
  testService(service, [
    {
      name: 'getPlanes',
      method: 'get',
      args: [params],
      request: ['/planes', { params }],
      response: { data: { data: [raw] } },
      expected: [mapped],
    },
    {
      name: 'getPlanById',
      method: 'get',
      args: ['plan-1'],
      request: ['/planes/plan-1'],
      response,
      expected: mapped,
    },
    {
      name: 'createPlan',
      method: 'post',
      args: [data],
      request: ['/planes', data],
      response,
      expected: mapped,
    },
    {
      name: 'updatePlan',
      method: 'put',
      args: ['plan-1', data],
      request: ['/planes/plan-1', data],
      response,
      expected: mapped,
    },
    {
      name: 'changeEstadoPlan',
      method: 'patch',
      args: ['plan-1', 'cancelado', 'Lluvia'],
      request: ['/planes/plan-1/estado', { estado: 'cancelado', observaciones: 'Lluvia' }],
      response,
      expected: mapped,
    },
    {
      name: 'deletePlan',
      method: 'delete',
      args: ['plan-1'],
      request: ['/planes/plan-1'],
      response,
      expected: raw,
    },
    {
      name: 'generarPlan',
      method: 'post',
      args: ['plan-1'],
      request: ['/planes/plan-1/generar'],
      response,
      expected: mapped,
    },
    {
      name: 'generarPdf',
      method: 'get',
      args: ['plan-1'],
      request: ['/planes/plan-1/generar-pdf', { responseType: 'blob' }],
      response: { data: new Blob(['PDF'], { type: 'application/pdf' }) },
      expected: new Blob(['PDF'], { type: 'application/pdf' }),
    },
    {
      name: 'asociarAprendices',
      method: 'post',
      args: ['plan-1', ['a1', 'a2']],
      request: ['/planes/plan-1/aprendices', { aprendicesId: ['a1', 'a2'] }],
      response,
      expected: mapped,
    },
    {
      name: 'getAprendicesAsociados',
      method: 'get',
      args: ['plan-1'],
      request: ['/planes/plan-1/aprendices'],
      response: { data: { data: [{ _id: 'a1' }] } },
      expected: [{ _id: 'a1' }],
    },
    {
      name: 'eliminarAprendizAsociado',
      method: 'delete',
      args: ['plan-1', 'a1'],
      request: ['/planes/plan-1/aprendices/a1'],
      response,
      expected: mapped,
    },
    {
      name: 'asociarRiesgos',
      method: 'post',
      args: ['plan-1', ['r1']],
      request: ['/planes/plan-1/riesgos', { riesgosId: ['r1'] }],
      response,
      expected: mapped,
    },
    {
      name: 'getRiesgosAsociados',
      method: 'get',
      args: ['plan-1'],
      request: ['/planes/plan-1/riesgos'],
      response: { data: { data: [{ _id: 'r1' }] } },
      expected: [{ _id: 'r1' }],
    },
    {
      name: 'eliminarRiesgoAsociado',
      method: 'delete',
      args: ['plan-1', 'r1'],
      request: ['/planes/plan-1/riesgos/r1'],
      response,
      expected: mapped,
    },
    {
      name: 'guardarContactosEmergencia',
      method: 'put',
      args: ['plan-1', contacts],
      request: ['/planes/plan-1/contactos-emergencia', contacts],
      response,
      expected: mapped,
    },
    ...[[], ['e1', 'e2']].map((epp) => ({
      name: 'seleccionarEpp',
      method: 'put',
      args: ['plan-1', { epp }],
      request: ['/planes/plan-1/epp', { epp }],
      response,
      expected: mapped,
    })),
    {
      name: 'registrarSeguridadVial',
      method: 'put',
      args: ['plan-1', { seguridadVial: { aplica: false, items: [] } }],
      request: ['/planes/plan-1/seguridad-vial', { seguridadVial: { aplica: false, items: [] } }],
      response,
      expected: mapped,
    },
    {
      name: 'registrarContextoAcademico',
      method: 'put',
      args: ['plan-1', { objetivo: 'Aprender' }],
      request: ['/planes/plan-1/contexto-academico', { objetivo: 'Aprender' }],
      response,
      expected: mapped,
    },
    {
      name: 'registrarArticulacionFormativa',
      method: 'put',
      args: ['plan-1', { visitaEmpresa: true }],
      request: ['/planes/plan-1/articulacion-formativa', { visitaEmpresa: true }],
      response,
      expected: mapped,
    },
    {
      name: 'registrarPlanTrabajo',
      method: 'put',
      args: ['plan-1', { planTrabajo: [{ actividad: 'Visita' }] }],
      request: ['/planes/plan-1/plan-trabajo', { planTrabajo: [{ actividad: 'Visita' }] }],
      response,
      expected: mapped,
    },
    {
      name: 'registrarRevision',
      method: 'patch',
      args: ['plan-1', { validacionInformacion: true }],
      request: ['/planes/plan-1/revision', { validacionInformacion: true }],
      response,
      expected: mapped,
    },
  ])

  it('omite observaciones vacias al cambiar estado', async () => {
    api.patch.mockResolvedValue(response)
    await service.changeEstadoPlan('plan-1', 'en revision')
    expect(api.patch).toHaveBeenCalledWith('/planes/plan-1/estado', { estado: 'en revision' })
  })
  it('usa parametros vacios por defecto y normaliza un instructor ausente', async () => {
    api.get.mockResolvedValue({ data: { data: [{ _id: 'plan-2' }] } })
    expect(await service.getPlanes()).toEqual([{ _id: 'plan-2', instructorNombre: '' }])
    expect(api.get).toHaveBeenCalledWith('/planes', { params: {} })
  })
  it('devuelve el Blob original del PDF', async () => {
    const blob = new Blob(['contenido PDF'], { type: 'application/pdf' })
    api.get.mockResolvedValue({ data: blob })
    expect(await service.generarPdf('plan-1')).toBe(blob)
  })
})
