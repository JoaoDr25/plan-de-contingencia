import { describe } from 'vitest'
import { testService } from '../../helpers/serviceAssertions'
import service from 'src/services/modules/riesgoService'

const raw = { _id: 'r1', numero: 7, createdAt: '2026-08-10' }
const mapped = { ...raw, codigo: 7, fecha: raw.createdAt }
const response = { data: { data: raw } }
const payload = { nombre: 'Lesion' }
describe('riesgoService', () => {
  testService(service, [
    {
      name: 'getRiesgos',
      method: 'get',
      request: ['/riesgos'],
      response: { data: { data: [raw] } },
      expected: [mapped],
    },
    {
      name: 'getRiesgoById',
      method: 'get',
      args: ['r1'],
      request: ['/riesgos/r1'],
      response,
      expected: mapped,
    },
    {
      name: 'createRiesgo',
      method: 'post',
      args: [payload],
      request: ['/riesgos', payload],
      response,
      expected: mapped,
    },
    {
      name: 'updateRiesgo',
      method: 'put',
      args: ['r1', payload],
      request: ['/riesgos/r1', payload],
      response,
      expected: mapped,
    },
    {
      name: 'deleteRiesgo',
      method: 'delete',
      args: ['r1'],
      request: ['/riesgos/r1'],
      response,
      expected: raw,
    },
  ])
})
