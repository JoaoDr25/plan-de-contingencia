import { installQuasarPlugin } from '@quasar/quasar-app-extension-testing-unit-vitest'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { flushPromises, shallowMount } from '@vue/test-utils'
import { reactive } from 'vue'
import PlanInformacionGeneral from 'src/views/wizard/PlanInformacionGeneral.vue'
import { createPlanContingenciaModel } from 'src/models/planContingencia.model'
import programaService from 'src/services/modules/programaService'
import actividadService from 'src/services/modules/actividadService'

installQuasarPlugin()
vi.mock('src/services/modules/programaService', () => ({ default: { getProgramas: vi.fn() } }))
vi.mock('src/services/modules/actividadService', () => ({ default: { getActividades: vi.fn() } }))
let wrapper
beforeEach(() => {
  vi.resetAllMocks()
  vi.useFakeTimers({ toFake: ['Date'] })
  vi.setSystemTime(new Date(2026, 7, 12, 12))
  programaService.getProgramas.mockResolvedValue([
    { _id: 'p1', nombre: 'Produccion', ficha: '3174863', estado: 'Activo' },
    { _id: 'p2', nombre: 'Inactivo', estado: 'Inactivo' },
  ])
  actividadService.getActividades.mockResolvedValue([{ _id: 'act1', nombre: 'Visita' }])
})
afterEach(() => {
  wrapper?.unmount()
  vi.useRealTimers()
})
async function render() {
  const plan = reactive(createPlanContingenciaModel())
  wrapper = shallowMount(PlanInformacionGeneral, { props: { modelValue: plan } })
  await flushPromises()
  return plan
}
function field(name, label) {
  return wrapper.findAllComponents({ name }).find((field) => field.props('label') === label)
}
describe('PlanInformacionGeneral', () => {
  it('muestra solo programas activos y actualiza ficha al seleccionar', async () => {
    const plan = await render()
    const select = field('BaseSelect', 'Programa de formación')
    expect(select.props('options')).toEqual([{ label: 'Produccion - 3174863', value: 'p1' }])
    select.vm.$emit('update:modelValue', 'p1')
    expect(plan).toMatchObject({
      programaFormacionId: 'p1',
      programaFormacionNombre: 'Produccion',
      ficha: '3174863',
    })
    select.vm.$emit('update:modelValue', null)
    expect(plan.programaFormacionNombre).toBe('')
    expect(plan.ficha).toBe('')
  })
  it('carga actividades para seleccion por ID', async () => {
    await render()
    expect(field('BaseSelect', 'Actividad').props('options')).toEqual([
      { label: 'Visita', value: 'act1' },
    ])
  })
  it('fecha minima incluye hoy y rechaza ayer, en ISO o DD/MM/YYYY', async () => {
    await render()
    const date = field('BaseDatePicker', 'Fecha de salida')
    expect(date.props('min')).toBe('2026-08-12')
    const [required, validDate] = date.props('rules')
    expect(required('')).not.toBe(true)
    expect(validDate('2026-08-11')).not.toBe(true)
    expect(validDate('11/08/2026')).not.toBe(true)
    expect(validDate('2026-08-12')).toBe(true)
    expect(validDate('13/08/2026')).toBe(true)
  })
  it('hora de regreso debe ser estrictamente posterior a salida', async () => {
    const plan = await render()
    plan.horaSalida = '08:00'
    const rule = field('BaseTimePicker', 'Hora de regreso prevista').props('rules')[1]
    expect(rule('07:59')).not.toBe(true)
    expect(rule('08:00')).not.toBe(true)
    expect(rule('08:01')).toBe(true)
  })
  it('contacto del destino solo acepta numeros', async () => {
    await render()
    const [required, numeric] = field('BaseInput', 'Contacto lugar').props('rules')
    expect(required('')).not.toBe(true)
    expect(numeric('1234567')).toBe(true)
    expect(numeric('123-4567')).not.toBe(true)
  })
})
