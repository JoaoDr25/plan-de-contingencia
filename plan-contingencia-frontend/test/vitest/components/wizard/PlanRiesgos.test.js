import { installQuasarPlugin } from '@quasar/quasar-app-extension-testing-unit-vitest'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { flushPromises, shallowMount } from '@vue/test-utils'
import { reactive } from 'vue'
import { QBtn, QCheckbox } from 'quasar'
import PlanRiesgos from 'src/views/wizard/PlanRiesgos.vue'
import { createPlanContingenciaModel } from 'src/models/planContingencia.model'
import actividadService from 'src/services/modules/actividadService'
import peligroService from 'src/services/modules/peligroService'
import { notifyWarning } from 'src/utils/notifications.utils'
import { CardWithBody } from '../../helpers/wizardSlots'

installQuasarPlugin()
vi.mock('src/services/modules/actividadService', () => ({ default: { getActividadById: vi.fn() } }))
vi.mock('src/services/modules/peligroService', () => ({ default: { getPeligros: vi.fn() } }))
vi.mock('src/utils/notifications.utils', () => ({ notifyWarning: vi.fn() }))
let wrapper
beforeEach(() => {
  vi.resetAllMocks()
  actividadService.getActividadById.mockResolvedValue({
    nombre: 'Visita',
    peligrosIds: ['p1', 'p2'],
  })
  peligroService.getPeligros.mockResolvedValue([
    { _id: 'p1', nombre: 'Caida', riesgosDetalle: [{ _id: 'r1', riesgo: 'Lesion' }] },
    {
      _id: 'p2',
      nombre: 'Golpe',
      riesgosDetalle: [
        { _id: 'r1', riesgo: 'Lesion' },
        { _id: 'r2', riesgo: 'Herida' },
      ],
    },
    { _id: 'p3', nombre: 'No asociado', riesgosDetalle: [{ _id: 'r3' }] },
  ])
})
afterEach(() => wrapper?.unmount())
async function render(riesgosId = []) {
  const plan = reactive({ ...createPlanContingenciaModel(), actividadId: 'act1', riesgosId })
  wrapper = shallowMount(PlanRiesgos, {
    props: { modelValue: plan },
    global: { stubs: { BaseDataCard: CardWithBody } },
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
describe('PlanRiesgos', () => {
  it('solo muestra peligros de la actividad y restaura seleccion visible', async () => {
    const plan = await render(['r1', 'r3'])
    expect(actividadService.getActividadById).toHaveBeenCalledWith('act1')
    expect(
      wrapper.findAllComponents({ name: 'BaseDataCard' }).map((card) => card.props('title')),
    ).toEqual(['Caida', 'Golpe'])
    expect(plan.riesgosId).toEqual(['r1'])
    expect(
      wrapper.findAllComponents(QCheckbox).map((checkbox) => checkbox.props('modelValue')),
    ).toEqual([true, true, false])
  })
  it('riesgo compartido no se duplica ni desaparece mientras otra relacion lo conserve', async () => {
    const plan = await render()
    const checkboxes = wrapper.findAllComponents(QCheckbox)
    checkboxes[0].vm.$emit('update:modelValue', true)
    checkboxes[1].vm.$emit('update:modelValue', true)
    expect(plan.riesgosId).toEqual(['r1'])
    checkboxes[0].vm.$emit('update:modelValue', false)
    expect(plan.riesgosId).toEqual(['r1'])
    checkboxes[1].vm.$emit('update:modelValue', false)
    expect(plan.riesgosId).toEqual([])
  })
  it('seleccionar todos deduplica IDs y limpiar vacia selecciones', async () => {
    const plan = await render()
    action('Seleccionar todos')
    expect(plan.riesgosId).toEqual(['r1', 'r2'])
    action('Limpiar selección')
    expect(plan.riesgosId).toEqual([])
  })
  it('normaliza un valor incorrecto y exige al menos un riesgo', async () => {
    const plan = await render({ invalid: true })
    expect(plan.riesgosId).toEqual([])
    expect(wrapper.vm.validate()).toBe(false)
    expect(notifyWarning).toHaveBeenCalledWith('Seleccione al menos un riesgo')
    plan.riesgosId = ['r1']
    expect(wrapper.vm.validate()).toBe(true)
  })
})
