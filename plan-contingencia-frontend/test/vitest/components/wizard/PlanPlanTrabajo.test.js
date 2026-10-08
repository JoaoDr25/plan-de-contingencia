import { installQuasarPlugin } from '@quasar/quasar-app-extension-testing-unit-vitest'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { shallowMount } from '@vue/test-utils'
import { reactive } from 'vue'
import PlanPlanTrabajo from 'src/views/wizard/PlanPlanTrabajo.vue'
import { createPlanContingenciaModel } from 'src/models/planContingencia.model'
import { notifyWarning } from 'src/utils/notifications.utils'
import { TableWithSelection } from '../../helpers/wizardSlots'

installQuasarPlugin()
vi.mock('src/utils/notifications.utils', () => ({ notifyWarning: vi.fn() }))
let wrapper
afterEach(() => {
  wrapper?.unmount()
  vi.clearAllMocks()
})
function render(planTrabajo = []) {
  const plan = reactive({ ...createPlanContingenciaModel(), planTrabajo })
  wrapper = shallowMount(PlanPlanTrabajo, {
    props: { modelValue: plan },
    global: { renderStubDefaultSlot: true, stubs: { BaseTable: TableWithSelection } },
  })
  return plan
}
function save(activity) {
  wrapper.getComponent({ name: 'PlanesActividadDialog' }).vm.$emit('save', activity)
}
describe('PlanPlanTrabajo', () => {
  it('impide continuar sin actividades y notifica', () => {
    render()
    expect(wrapper.vm.validate()).toBe(false)
    expect(notifyWarning).toHaveBeenCalledWith('Agregue al menos una actividad')
  })
  it('agrega, ordena por hora y renumera de forma consecutiva', () => {
    const plan = render()
    save({ actividad: 'Segunda', horaInicio: '10:00', horaFin: '11:00' })
    save({ actividad: 'Primera', horaInicio: '08:00', horaFin: '09:00' })
    expect(plan.planTrabajo.map(({ numero, actividad }) => ({ numero, actividad }))).toEqual([
      { numero: 1, actividad: 'Primera' },
      { numero: 2, actividad: 'Segunda' },
    ])
    expect(wrapper.vm.validate()).toBe(true)
    expect(wrapper.emitted('update:modelValue')).toHaveLength(2)
  })
  it('editar reemplaza actividad existente sin duplicarla', async () => {
    const plan = render([
      { numero: 1, actividad: 'Original', horaInicio: '08:00', horaFin: '09:00' },
    ])
    wrapper.getComponent({ name: 'CrudActions' }).vm.$emit('edit')
    save({ actividad: 'Actualizada', horaInicio: '08:00', horaFin: '10:00' })
    expect(plan.planTrabajo).toEqual([
      { numero: 1, actividad: 'Actualizada', horaInicio: '08:00', horaFin: '10:00' },
    ])
  })
  it('eliminar requiere confirmacion y renumera restantes', async () => {
    const plan = render([
      { numero: 1, actividad: 'Primera', horaInicio: '08:00' },
      { numero: 2, actividad: 'Segunda', horaInicio: '09:00' },
    ])
    wrapper.findAllComponents({ name: 'CrudActions' })[0].vm.$emit('delete')
    expect(plan.planTrabajo).toHaveLength(2)
    wrapper.getComponent({ name: 'BaseConfirmationDialog' }).vm.$emit('confirm')
    expect(plan.planTrabajo).toEqual([{ numero: 1, actividad: 'Segunda', horaInicio: '09:00' }])
  })
})
