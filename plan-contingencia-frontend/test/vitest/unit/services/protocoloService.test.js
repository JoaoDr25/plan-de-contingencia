import { describe } from 'vitest'
import { testService } from '../../helpers/serviceAssertions'
import service from 'src/services/modules/protocoloService'

const raw = { _id: 'p1', numero: 9, createdAt: '2026-08-10' }
const mapped = { ...raw, codigo: 9, fecha: raw.createdAt }
const response = { data: { data: raw } }
const payload = { nombre: 'Evacuacion' }
describe('protocoloService', () => {
  testService(service, [
    {
      name: 'getProtocolos',
      method: 'get',
      args: [{ estado: 'Activo' }],
      request: ['/protocolos', { params: { estado: 'Activo' } }],
      response: { data: { data: [raw] } },
      expected: [mapped],
    },
    {
      name: 'getProtocoloById',
      method: 'get',
      args: ['p1'],
      request: ['/protocolos/p1'],
      response,
      expected: mapped,
    },
    {
      name: 'createProtocolo',
      method: 'post',
      args: [payload],
      request: ['/protocolos', payload],
      response,
      expected: mapped,
    },
    {
      name: 'updateProtocolo',
      method: 'put',
      args: ['p1', payload],
      request: ['/protocolos/p1', payload],
      response,
      expected: mapped,
    },
    {
      name: 'changeEstadoProtocolo',
      method: 'patch',
      args: ['p1', 'Inactivo'],
      request: ['/protocolos/p1/estado', { estado: 'Inactivo' }],
      response,
      expected: mapped,
    },
    {
      name: 'deleteProtocolo',
      method: 'delete',
      args: ['p1'],
      request: ['/protocolos/p1'],
      response,
      expected: mapped,
    },
  ])
})
