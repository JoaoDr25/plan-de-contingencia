import { describe, expect, it } from 'vitest'
import { testService } from '../../helpers/serviceAssertions'
import api from 'src/services/auth/api.js'
import service from 'src/services/modules/contactoService'

const raw = {
  _id: 'c1',
  numero: 4,
  nombreEntidad: 'Hospital',
  tipoContacto: 'Salud',
  telefonoPrincipal: '1234567',
  createdAt: '2026-08-10',
}
const mapped = {
  ...raw,
  id: 'c1',
  codigo: 4,
  nombre: 'Hospital',
  tipo: 'Salud',
  telefono: '1234567',
  fecha: raw.createdAt,
}
const response = { data: { success: true, message: 'OK', data: raw } }
const expected = { ...response.data, data: mapped }
const clean = { nombre: 'Hospital', tipo: 'Salud', telefono: '1234567', estado: 'Activo' }
const dirty = {
  ...clean,
  ...raw,
  id: 'c1',
  codigo: 4,
  fecha: '10/08/2026',
  updatedAt: '2026-08-11',
}
describe('contactoService', () => {
  testService(service, [
    {
      name: 'getContactos',
      method: 'get',
      args: [{ estado: 'Activo' }],
      request: ['/contactos-emergencia', { params: { estado: 'Activo' } }],
      response: { data: { success: true, data: [raw], total: 1 } },
      expected: { success: true, data: [mapped], total: 1 },
    },
    {
      name: 'getContactoById',
      method: 'get',
      args: ['c1'],
      request: ['/contactos-emergencia/c1'],
      response,
      expected,
    },
    {
      name: 'createContacto',
      method: 'post',
      args: [dirty],
      request: ['/contactos-emergencia', clean],
      response,
      expected,
    },
    {
      name: 'updateContacto',
      method: 'put',
      args: ['c1', dirty],
      request: ['/contactos-emergencia/c1', clean],
      response,
      expected,
    },
    {
      name: 'changeContactoEstado',
      method: 'patch',
      args: ['c1', 'Inactivo'],
      request: ['/contactos-emergencia/c1/estado', { estado: 'Inactivo' }],
      response,
      expected,
    },
    {
      name: 'deleteContacto',
      method: 'delete',
      args: ['c1'],
      request: ['/contactos-emergencia/c1'],
      response,
      expected,
    },
  ])
  it('no muta el formulario al limpiar payload', async () => {
    const original = structuredClone(dirty)
    api.post.mockResolvedValue(response)
    await service.createContacto(dirty)
    expect(dirty).toEqual(original)
  })
})
