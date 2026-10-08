import { describe, expect, it } from 'vitest'
import { testService } from '../../helpers/serviceAssertions'
import api from 'src/services/auth/api.js'
import service from 'src/services/modules/eppService'

const raw = {
  _id: 'e1',
  numero: 2,
  nombreEPP: 'Casco',
  nivelProteccion: 'Alto',
  createdAt: '2026-08-10',
}
const mapped = { ...raw, id: 'e1', codigo: 2, nombre: 'Casco', nivel: 'Alto', fecha: raw.createdAt }
const response = { data: { success: true, data: raw } }
const expected = { success: true, data: mapped }
const clean = { nombre: 'Casco', nivel: 'Alto', estado: 'Activo' }
const dirty = {
  ...raw,
  ...clean,
  id: 'e1',
  codigo: 2,
  fecha: '10/08/2026',
  updatedAt: '2026-08-11',
}
describe('eppService', () => {
  testService(service, [
    {
      name: 'getEpps',
      method: 'get',
      args: [{ estado: 'Activo' }],
      request: ['/epp', { params: { estado: 'Activo' } }],
      response: { data: { success: true, data: [raw], total: 1 } },
      expected: { success: true, data: [mapped], total: 1 },
    },
    { name: 'getEppById', method: 'get', args: ['e1'], request: ['/epp/e1'], response, expected },
    {
      name: 'createEpp',
      method: 'post',
      args: [dirty],
      request: ['/epp', clean],
      response,
      expected,
    },
    {
      name: 'updateEpp',
      method: 'put',
      args: ['e1', dirty],
      request: ['/epp/e1', clean],
      response,
      expected,
    },
    {
      name: 'changeEppEstado',
      method: 'patch',
      args: ['e1', 'Inactivo'],
      request: ['/epp/e1/estado', { estado: 'Inactivo' }],
      response,
      expected,
    },
    { name: 'deleteEpp', method: 'delete', args: ['e1'], request: ['/epp/e1'], response, expected },
  ])
  it('no muta el formulario al limpiar payload', async () => {
    const original = structuredClone(dirty)
    api.post.mockResolvedValue(response)
    await service.createEpp(dirty)
    expect(dirty).toEqual(original)
  })
})
