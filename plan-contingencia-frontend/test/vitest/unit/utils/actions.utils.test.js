import { describe, expect, it } from 'vitest'
import { getPlanActions, isPlanOwner } from 'src/utils/actions.utils'
import { ROLES } from 'src/constants/system/roles.constants'

const user = { _id: 'u1', nombre: 'Maria', apellido: 'Perez' }
const draft = { estado: 'borrador', usuarioId: 'u1', usuarioNombre: 'Maria Perez' }
describe('actions.utils', () => {
  it.each([{ usuarioId: 'u1' }, { usuario: { _id: 'u1' } }, { usuarioNombre: ' MARIA PEREZ ' }])(
    'identifica al propietario por los formatos existentes',
    (plan) => {
      expect(isPlanOwner(plan, user)).toBe(true)
    },
  )
  it('no concede propiedad si falta el plan o usuario', () => {
    expect(isPlanOwner(null, user)).toBe(false)
    expect(isPlanOwner(draft, null)).toBe(false)
  })
  it('propietario de borrador puede ver, editar y eliminar', () => {
    expect(getPlanActions(draft, ' consultor ', user)).toEqual(['view', 'edit', 'delete'])
  })
  it.each(Object.values(ROLES))('otros usuarios solo ven el borrador: %s', (role) => {
    expect(getPlanActions(draft, role, { _id: 'other', nombre: 'Juan' })).toEqual(['view'])
  })
  it.each(['en revision', 'aprobado', 'ejecutado', 'cancelado'])(
    'el propietario no edita ni elimina en %s',
    (estado) => {
      expect(getPlanActions({ ...draft, estado }, ROLES.CONSULTOR, user)).toEqual(['view'])
    },
  )
  it.each([ROLES.SUBDIRECCION, ROLES.BIENESTAR])(
    'roles de lectura no editan ni su propio borrador: %s',
    (role) => {
      expect(getPlanActions(draft, role, user)).toEqual(['view'])
    },
  )
  it('sin plan o rol reconocido no expone acciones', () => {
    expect(getPlanActions(null, ROLES.CONSULTOR, user)).toEqual([])
    expect(getPlanActions({ estado: 'aprobado' }, 'UNKNOWN', user)).toEqual([])
  })
})
