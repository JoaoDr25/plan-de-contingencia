import { describe, expect, it } from 'vitest'
import { testService } from '../../helpers/serviceAssertions'
import api from 'src/services/auth/api.js'
import service from 'src/services/modules/actividadService'

const raw = {
  _id: 'a1',
  numero: 3,
  peligros: [{ _id: 'p1', nombre: 'Caida' }, 'p2'],
  createdAt: '2026-08-10',
}
const mapped = {
  ...raw,
  codigo: 3,
  peligrosIds: ['p1', 'p2'],
  peligrosDetalle: raw.peligros,
  fecha: raw.createdAt,
}
const response = { data: { data: raw } }
const payload = { nombre: 'Visita', peligros: ['p1'] }
describe('actividadService', () => {
  testService(service, [
    {
      name: 'getActividades',
      method: 'get',
      args: [{ page: 2 }],
      request: ['/actividades', { params: { page: 2 } }],
      response: { data: { data: [raw] } },
      expected: [mapped],
    },
    {
      name: 'getActividadById',
      method: 'get',
      args: ['a1'],
      request: ['/actividades/a1'],
      response,
      expected: mapped,
    },
    {
      name: 'createActividad',
      method: 'post',
      args: [payload],
      request: ['/actividades', payload],
      response,
      expected: mapped,
    },
    {
      name: 'updateActividad',
      method: 'put',
      args: ['a1', payload],
      request: ['/actividades/a1', payload],
      response,
      expected: mapped,
    },
    {
      name: 'deleteActividad',
      method: 'delete',
      args: ['a1'],
      request: ['/actividades/a1'],
      response,
      expected: raw,
    },
  ])
  it('conserva codigo existente y normaliza relaciones ausentes', async () => {
    api.get.mockResolvedValue({ data: { data: { codigo: 'ACT-1', numero: 99 } } })
    expect(await service.getActividadById('a1')).toMatchObject({
      codigo: 'ACT-1',
      peligrosIds: [],
      peligrosDetalle: [],
    })
  })
})
