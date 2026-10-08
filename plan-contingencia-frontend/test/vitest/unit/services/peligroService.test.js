import { describe, expect, it } from 'vitest'
import { testService } from '../../helpers/serviceAssertions'
import api from 'src/services/auth/api.js'
import service from 'src/services/modules/peligroService'

const raw = { _id: 'p1', numero: 8, riesgos: [{ _id: 'r1' }, 'r2'], createdAt: '2026-08-10' }
const mapped = {
  ...raw,
  codigo: 8,
  riesgosIds: ['r1', 'r2'],
  riesgosDetalle: raw.riesgos,
  fecha: raw.createdAt,
}
const response = { data: { data: raw } }
const payload = { nombre: 'Caida', riesgos: ['r1'] }
describe('peligroService', () => {
  testService(service, [
    {
      name: 'getPeligros',
      method: 'get',
      args: [{ page: 2 }],
      request: ['/peligros', { params: { page: 2 } }],
      response: { data: { data: [raw] } },
      expected: [mapped],
    },
    {
      name: 'getPeligroById',
      method: 'get',
      args: ['p1'],
      request: ['/peligros/p1'],
      response,
      expected: mapped,
    },
    {
      name: 'createPeligro',
      method: 'post',
      args: [payload],
      request: ['/peligros', payload],
      response,
      expected: mapped,
    },
    {
      name: 'updatePeligro',
      method: 'put',
      args: ['p1', payload],
      request: ['/peligros/p1', payload],
      response,
      expected: mapped,
    },
    {
      name: 'deletePeligro',
      method: 'delete',
      args: ['p1'],
      request: ['/peligros/p1'],
      response,
      expected: raw,
    },
  ])
  it('normaliza riesgos ausentes sin perder codigo existente', async () => {
    api.get.mockResolvedValue({ data: { data: { codigo: 'PEL-1', riesgos: null } } })
    expect(await service.getPeligroById('p1')).toMatchObject({
      codigo: 'PEL-1',
      riesgosIds: [],
      riesgosDetalle: [],
    })
  })
})
