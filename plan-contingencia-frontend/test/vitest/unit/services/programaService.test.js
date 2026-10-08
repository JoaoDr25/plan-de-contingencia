import { describe } from 'vitest'
import { testService } from '../../helpers/serviceAssertions'
import service from 'src/services/modules/programaService'

const raw = { _id: 'p1', nombre: 'Produccion', createdAt: '2026-08-10' }
const response = { data: { data: raw } }
const payload = { nombre: 'Produccion', ficha: '3174863' }
describe('programaService', () => {
  testService(service, [
    {
      name: 'getProgramas',
      method: 'get',
      args: [{ estado: 'Activo' }],
      request: ['/programas', { params: { estado: 'Activo' } }],
      response: { data: { data: [raw] } },
      expected: [{ ...raw, fecha: '10/08/2026' }],
    },
    {
      name: 'getProgramaById',
      method: 'get',
      args: ['p1'],
      request: ['/programas/p1'],
      response,
      expected: raw,
    },
    {
      name: 'createPrograma',
      method: 'post',
      args: [payload],
      request: ['/programas', payload],
      response,
      expected: raw,
    },
    {
      name: 'updatePrograma',
      method: 'put',
      args: ['p1', payload],
      request: ['/programas/p1', payload],
      response,
      expected: raw,
    },
    {
      name: 'changeEstadoPrograma',
      method: 'patch',
      args: ['p1', 'Inactivo'],
      request: ['/programas/p1/estado', { estado: 'Inactivo' }],
      response,
      expected: raw,
    },
    {
      name: 'deletePrograma',
      method: 'delete',
      args: ['p1'],
      request: ['/programas/p1'],
      response,
      expected: raw,
    },
  ])
})
