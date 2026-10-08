import { describe, expect, it } from 'vitest'
import { testService } from '../../helpers/serviceAssertions'
import api from 'src/services/auth/api.js'
import service from 'src/services/modules/usuarioService'

const raw = {
  _id: 'u1',
  numero: 6,
  nombre: 'Maria',
  apellido: 'Perez',
  correoInstitucional: 'maria@example.test',
  centroFormacion: 'Centro',
  rolAsignado: 'SST',
}
const mapped = {
  ...raw,
  codigo: 6,
  correo: 'maria@example.test',
  centro: 'Centro',
  rol: 'SST',
  nombreCompleto: 'Maria Perez',
  firma: null,
  firmaNombre: null,
}
const response = { data: { data: raw } }
const payload = { nombre: 'Maria', apellido: 'Perez', rol: 'SST' }
describe('usuarioService', () => {
  testService(service, [
    {
      name: 'getUsuarios',
      method: 'get',
      args: [{ rol: 'SST' }],
      request: ['/usuarios', { params: { rol: 'SST' } }],
      response: { data: { data: [raw] } },
      expected: [mapped],
    },
    {
      name: 'getUsuarioById',
      method: 'get',
      args: ['u1'],
      request: ['/usuarios/u1'],
      response,
      expected: mapped,
    },
    {
      name: 'createUsuario',
      method: 'post',
      args: [payload],
      request: ['/usuarios', payload],
      response,
      expected: mapped,
    },
    {
      name: 'updateUsuario',
      method: 'put',
      args: ['u1', payload],
      request: ['/usuarios/u1', payload],
      response,
      expected: mapped,
    },
    {
      name: 'changeEstadoUsuario',
      method: 'patch',
      args: ['u1', 'Inactivo'],
      request: ['/usuarios/u1/estado', { estado: 'Inactivo' }],
      response,
      expected: mapped,
    },
    {
      name: 'registrarAcceso',
      method: 'patch',
      args: ['u1'],
      request: ['/usuarios/u1/acceso'],
      response,
      expected: mapped,
    },
    {
      name: 'deleteUsuario',
      method: 'delete',
      args: ['u1'],
      request: ['/usuarios/u1'],
      response,
      expected: mapped,
    },
    {
      name: 'getRevisores',
      method: 'get',
      request: ['/usuarios/revisores'],
      response: { data: { data: { sst: [raw] } } },
      expected: { pedagogia: [], sst: [mapped], coordinacion: [] },
    },
  ])
  it('conserva los campos canonicos antes que los alias', async () => {
    api.get.mockResolvedValue({
      data: {
        data: {
          ...raw,
          codigo: 'U1',
          correo: 'canonical@example.test',
          centro: 'Principal',
          rol: 'PEDAGOGIA',
          firma: 'firma.png',
        },
      },
    })
    expect(await service.getUsuarioById('u1')).toMatchObject({
      codigo: 'U1',
      correo: 'canonical@example.test',
      centro: 'Principal',
      rol: 'PEDAGOGIA',
      firma: 'firma.png',
    })
  })
})
