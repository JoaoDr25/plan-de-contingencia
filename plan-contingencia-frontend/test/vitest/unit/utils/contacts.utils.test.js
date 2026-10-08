import { describe, expect, it } from 'vitest'
import { normalizeAdditionalContacts } from 'src/utils/contacts.utils'

describe('normalizeAdditionalContacts', () => {
  it.each([null, undefined, '', []])('normaliza ausencia a arreglo: %s', (value) => {
    expect(normalizeAdditionalContacts(value)).toEqual([])
  })
  it('convierte el objeto legado sin perder datos', () => {
    const contact = {
      nombreEntidad: 'Hospital',
      telefono: '1234567',
      ciudad: 'Cali',
      descripcion: 'Urgencias',
    }
    expect(normalizeAdditionalContacts(contact)).toEqual([contact])
  })
  it('conserva contactos validos y descarta entradas vacias sin mutar el origen', () => {
    const contact = { nombreEntidad: 'Bomberos' }
    const source = [null, {}, { nombreEntidad: '  ' }, contact]
    expect(normalizeAdditionalContacts(source)).toEqual([contact])
    expect(source).toHaveLength(4)
  })
})
