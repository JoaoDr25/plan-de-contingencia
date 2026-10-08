import { installQuasarPlugin } from '@quasar/quasar-app-extension-testing-unit-vitest'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { flushPromises, shallowMount } from '@vue/test-utils'
import { reactive } from 'vue'
import { QBtn, QCheckbox } from 'quasar'
import PlanParticipantes from 'src/views/wizard/PlanParticipantes.vue'
import { createPlanContingenciaModel } from 'src/models/planContingencia.model'
import aprendizService from 'src/services/modules/aprendizService'
import { notifyWarning } from 'src/utils/notifications.utils'
import { TableWithSelection } from '../../helpers/wizardSlots'

installQuasarPlugin()
vi.mock('src/services/modules/aprendizService', () => ({ default: { getAprendices: vi.fn() } }))
vi.mock('src/utils/notifications.utils', () => ({ notifyWarning: vi.fn() }))
let wrapper
beforeEach(() => {
  vi.resetAllMocks()
  aprendizService.getAprendices.mockResolvedValue({
    data: [
      { _id: 'a1', nombre: 'Maria', apellido: 'Perez', documento: '123', estado: 'Activo' },
      { _id: 'a2', nombre: 'Juan', apellido: 'Gomez', documento: '456', estado: 'Inactivo' },
      { _id: 'a3', nombre: 'Ana', apellido: 'Lopez', documento: '789', estado: 'Activo' },
    ],
  })
})
afterEach(() => wrapper?.unmount())
async function render(overrides = {}) {
  const plan = reactive({
    ...createPlanContingenciaModel(),
    programaFormacionId: 'p1',
    ...overrides,
  })
  wrapper = shallowMount(PlanParticipantes, {
    props: { modelValue: plan },
    global: { renderStubDefaultSlot: true, stubs: { BaseTable: TableWithSelection } },
  })
  await flushPromises()
  return plan
}
function action(label) {
  wrapper
    .findAllComponents(QBtn)
    .find((button) => button.props('label') === label)
    .vm.$emit('click')
}
describe('PlanParticipantes', () => {
  it('carga aprendices del programa y descarta seleccion ajena al catalogo', async () => {
    const plan = await render({ aprendicesId: ['a1', 'deleted'] })
    expect(aprendizService.getAprendices).toHaveBeenCalledWith({ programaFormacionId: 'p1' })
    expect(plan.aprendicesId).toEqual(['a1'])
  })
  it('sin programa no consulta el backend', async () => {
    await render({ programaFormacionId: null })
    expect(aprendizService.getAprendices).not.toHaveBeenCalled()
  })
  it('selecciona IDs sin duplicados y bloquea checkbox inactivo', async () => {
    const plan = await render()
    const checkboxes = wrapper.findAllComponents(QCheckbox)
    expect(checkboxes[1].props('disable')).toBe(true)
    checkboxes[0].vm.$emit('update:modelValue', true)
    checkboxes[0].vm.$emit('update:modelValue', true)
    expect(plan.aprendicesId).toEqual(['a1'])
    checkboxes[0].vm.$emit('update:modelValue', false)
    expect(plan.aprendicesId).toEqual([])
  })
  it('seleccionar todos incluye solo activos de la busqueda y limpiar vacia IDs', async () => {
    const plan = await render()
    wrapper.getComponent({ name: 'BaseSearch' }).vm.$emit('update:modelValue', 'Maria')
    await flushPromises()
    action('Seleccionar todos')
    expect(plan.aprendicesId).toEqual(['a1'])
    wrapper.getComponent({ name: 'BaseSearch' }).vm.$emit('update:modelValue', '')
    await flushPromises()
    action('Seleccionar todos')
    expect(plan.aprendicesId).toEqual(['a1', 'a3'])
    action('Limpiar selección')
    expect(plan.aprendicesId).toEqual([])
  })
  it('requiere al menos un participante para continuar', async () => {
    const plan = await render()
    expect(wrapper.vm.validate()).toBe(false)
    expect(notifyWarning).toHaveBeenCalledWith('Seleccione al menos un aprendiz')
    plan.aprendicesId = ['a1']
    expect(wrapper.vm.validate()).toBe(true)
  })
})
