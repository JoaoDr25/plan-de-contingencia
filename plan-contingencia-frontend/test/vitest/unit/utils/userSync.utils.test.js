import { describe, expect, it } from 'vitest'
import { mergeUsersFromRepfora } from 'src/utils/userSync.utils'

describe('mergeUsersFromRepfora', () => {
  it('actualiza datos externos pero preserva rol, estado y firma locales', () => {
    const local = {
      documento: ' 123 ',
      nombre: 'Anterior',
      rol: 'SST',
      estado: 'Inactivo',
      firma: 'local.png',
      firmaNombre: 'Firma local',
    }
    const remote = {
      documento: 123,
      nombre: 'Actualizado',
      rol: 'CONSULTOR',
      estado: 'Activo',
      firma: 'remote.png',
    }
    const snapshot = structuredClone(local)
    expect(mergeUsersFromRepfora([local], [remote])).toEqual({
      users: [
        {
          ...local,
          ...remote,
          rol: 'SST',
          estado: 'Inactivo',
          firma: 'local.png',
          firmaNombre: 'Firma local',
        },
      ],
      added: 0,
      preserved: 1,
    })
    expect(local).toEqual(snapshot)
  })
  it('agrega usuarios nuevos con defaults y conserva los exclusivos locales', () => {
    const local = { documento: '1', nombre: 'Local', rol: 'ADMINISTRADOR' }
    expect(mergeUsersFromRepfora([local], [{ documento: '2', nombre: 'Nuevo' }])).toEqual({
      users: [
        {
          documento: '2',
          nombre: 'Nuevo',
          rol: 'CONSULTOR',
          estado: 'Activo',
          firma: null,
          firmaNombre: null,
        },
        local,
      ],
      added: 1,
      preserved: 0,
    })
  })
  it('normaliza rol externo al agregar y acepta catalogos vacios', () => {
    expect(mergeUsersFromRepfora([], [{ documento: '2', rol: ' pedagogia ' }]).users[0].rol).toBe(
      'PEDAGOGIA',
    )
    expect(mergeUsersFromRepfora([], [])).toEqual({ users: [], added: 0, preserved: 0 })
  })
})
