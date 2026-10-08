import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { ROLES } from 'src/constants/system/roles.constants'
import {
  approvePlan,
  cancelPlan,
  canApprovePlan,
  canRejectPlan,
  canReviewPlan,
  executePlan,
  rejectPlan,
  sendPlanToEdition,
} from 'src/utils/workflow.utils'

function reviewPlan() {
  return {
    estado: 'en revision',
    observaciones: 'Previas',
    revision: {
      pedagogia: { estado: 'pendiente', firma: 'ped.png' },
      sst: { estado: 'pendiente', firma: 'sst.png' },
      coordinacion: { estado: 'pendiente', firma: 'coord.png' },
    },
  }
}
beforeEach(() => {
  vi.useFakeTimers()
  vi.setSystemTime(new Date('2026-08-12T15:00:00Z'))
})
afterEach(() => vi.useRealTimers())

describe('workflow: roles y estados', () => {
  it.each([ROLES.PEDAGOGIA, ROLES.SST])('permite revision pendiente a %s', (role) => {
    const plan = reviewPlan()
    expect(canReviewPlan(role, plan)).toBe(true)
    expect(canApprovePlan(role, plan)).toBe(true)
    expect(canRejectPlan(role, plan)).toBe(true)
  })
  it.each([ROLES.ADMINISTRADOR, ROLES.CONSULTOR, ROLES.SUBDIRECCION, ROLES.BIENESTAR, 'UNKNOWN'])(
    'no concede revision a %s',
    (role) => {
      expect(canReviewPlan(role, reviewPlan())).toBe(false)
    },
  )
  it('coordinacion requiere aprobacion previa de pedagogia y SST', () => {
    const plan = reviewPlan()
    expect(canReviewPlan(ROLES.COORDINACION, plan)).toBe(false)
    plan.revision.pedagogia.estado = 'aprobado'
    expect(canReviewPlan(ROLES.COORDINACION, plan)).toBe(false)
    plan.revision.sst.estado = 'aprobado'
    expect(canReviewPlan(ROLES.COORDINACION, plan)).toBe(true)
    plan.revision.coordinacion.estado = 'aprobado'
    expect(canReviewPlan(ROLES.COORDINACION, plan)).toBe(false)
  })
  it('aprobar es inmutable y solo la ultima aprobacion cambia el estado del plan', () => {
    const original = reviewPlan()
    const snapshot = structuredClone(original)
    const pedagogia = approvePlan(original, ROLES.PEDAGOGIA)
    expect(pedagogia.estado).toBe('en revision')
    expect(pedagogia.revision.pedagogia).toEqual({
      estado: 'aprobado',
      firma: 'ped.png',
      fecha: '2026-08-12T15:00:00.000Z',
    })
    expect(approvePlan(pedagogia, ROLES.PEDAGOGIA)).toBe(pedagogia)
    const sst = approvePlan(pedagogia, ROLES.SST)
    const approved = approvePlan(sst, ROLES.COORDINACION)
    expect(approved.estado).toBe('aprobado')
    expect(original).toEqual(snapshot)
  })
  it('rechazar devuelve a borrador, reinicia revisiones y conserva observaciones y firmas', () => {
    const original = reviewPlan()
    original.revision.sst.estado = 'aprobado'
    const rejected = rejectPlan(original, ROLES.PEDAGOGIA, 'Falta soporte')
    expect(rejected.estado).toBe('borrador')
    expect(rejected.observaciones).toContain('Previas\n')
    expect(rejected.observaciones).toContain('Falta soporte')
    for (const key of ['pedagogia', 'sst', 'coordinacion']) {
      expect(rejected.revision[key]).toMatchObject({
        estado: 'pendiente',
        fecha: null,
        firma: expect.any(String),
      })
    }
    expect(original.revision.sst.estado).toBe('aprobado')
  })
  it.each([executePlan, cancelPlan])('solo coordinacion cierra un aprobado', (transition) => {
    const plan = { ...reviewPlan(), estado: 'aprobado' }
    expect(transition(plan, ROLES.COORDINACION).estado).toBe(
      transition === executePlan ? 'ejecutado' : 'cancelado',
    )
    for (const role of Object.values(ROLES).filter((role) => role !== ROLES.COORDINACION)) {
      expect(transition(plan, role)).toBe(plan)
    }
    expect(plan.estado).toBe('aprobado')
  })
  it('cancelacion agrega el motivo sin perder observaciones previas', () => {
    const plan = { ...reviewPlan(), estado: 'aprobado' }
    const result = cancelPlan(plan, ROLES.COORDINACION, 'Lluvia')
    expect(result.observaciones).toContain('Previas\n')
    expect(result.observaciones).toContain('Cancelado (COORDINACION): Lluvia')
  })
  it('enviar a edicion reinicia revisiones de un aprobado', () => {
    const plan = { ...reviewPlan(), estado: 'aprobado' }
    const result = sendPlanToEdition(plan, ROLES.COORDINACION, 'Ajustar fecha')
    expect(result.estado).toBe('borrador')
    expect(result.observaciones).toContain('Ajustar fecha')
    expect(result.revision.coordinacion.estado).toBe('pendiente')
  })
  it.each(['borrador', 'ejecutado', 'cancelado'])(
    'no permite revisar ni cerrar el estado %s',
    (estado) => {
      const plan = { ...reviewPlan(), estado }
      for (const role of Object.values(ROLES)) {
        expect(canReviewPlan(role, plan)).toBe(false)
        expect(approvePlan(plan, role)).toBe(plan)
        expect(rejectPlan(plan, role)).toBe(plan)
        expect(executePlan(plan, role)).toBe(plan)
        expect(cancelPlan(plan, role)).toBe(plan)
      }
      expect(sendPlanToEdition(plan)).toBe(plan)
    },
  )
  it('tolera plan ausente sin conceder permisos', () => {
    expect(canReviewPlan(ROLES.SST, null)).toBe(false)
    expect(executePlan(null, ROLES.COORDINACION)).toBeNull()
    expect(cancelPlan(null, ROLES.COORDINACION)).toBeNull()
  })
})
