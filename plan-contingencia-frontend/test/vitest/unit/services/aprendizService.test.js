import { describe, expect, it } from 'vitest'
import { testService } from '../../helpers/serviceAssertions'
import api from 'src/services/auth/api.js'
import service from 'src/services/modules/aprendizService'

const programa = { _id: 'p1', nombre: 'Produccion', ficha: '3174863' }
const raw = {
  _id: 'a1',
  numero: 5,
  nombre: 'Maria',
  programaFormacionId: programa,
  createdAt: '2026-08-10',
}
const mapped = {
  ...raw,
  id: 'a1',
  codigo: 5,
  programaFormacionId: 'p1',
  programa: 'Produccion',
  ficha: '3174863',
  fecha: raw.createdAt,
}
const response = { data: { success: true, data: raw } }
const expected = { success: true, data: mapped }
const dirty = {
  ...raw,
  id: 'a1',
  codigo: 5,
  fecha: '10/08/2026',
  programa: 'Produccion',
  ficha: '3174863',
  updatedAt: '2026-08-11',
}
const clean = { nombre: 'Maria', programaFormacionId: 'p1' }
describe('aprendizService', () => {
  testService(service, [
    {
      name: 'getAprendices',
      method: 'get',
      args: [{ programaFormacionId: 'p1' }],
      request: ['/aprendices', { params: { programaFormacionId: 'p1' } }],
      response: { data: { success: true, data: [raw], total: 1 } },
      expected: { success: true, data: [mapped], total: 1 },
    },
    {
      name: 'getAprendizById',
      method: 'get',
      args: ['a1'],
      request: ['/aprendices/a1'],
      response,
      expected,
    },
    {
      name: 'createAprendiz',
      method: 'post',
      args: [dirty],
      request: ['/aprendices', clean],
      response,
      expected,
    },
    {
      name: 'updateAprendiz',
      method: 'put',
      args: ['a1', dirty],
      request: ['/aprendices/a1', clean],
      response,
      expected,
    },
    {
      name: 'changeAprendizEstado',
      method: 'patch',
      args: ['a1', 'Inactivo'],
      request: ['/aprendices/a1/estado', { estado: 'Inactivo' }],
      response,
      expected,
    },
    {
      name: 'deleteAprendiz',
      method: 'delete',
      args: ['a1'],
      request: ['/aprendices/a1'],
      response,
      expected,
    },
  ])
  it('limpia sin mutar referencias del formulario', async () => {
    const original = structuredClone(dirty)
    api.post.mockResolvedValue(response)
    await service.createAprendiz(dirty)
    expect(dirty).toEqual(original)
  })
  it('conserva programas no poblados y metadatos de respuesta', async () => {
    api.get.mockResolvedValue({
      data: { success: true, data: { _id: 'a2', programaFormacionId: 'p2', ficha: '123' } },
    })
    expect(await service.getAprendizById('a2')).toMatchObject({
      success: true,
      data: { id: 'a2', programaFormacionId: 'p2', ficha: '123', programa: '' },
    })
  })
})
