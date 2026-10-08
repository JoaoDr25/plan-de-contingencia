import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { flushPromises } from '@vue/test-utils'
import { auth, ids, mountPage, push, route, rows } from '../../helpers/planPageHarness'
import PlanesPage from 'src/views/plans/PlanesPage.vue'
import service from 'src/services/plans/planContingenciaService'
import { notifySuccess } from 'src/utils/notifications.utils'

let wrapper
beforeEach(() => {
  vi.resetAllMocks()
  route.query = {}
  auth.role = 'CONSULTOR'
  service.getPlanes.mockResolvedValue(structuredClone(rows))
  service.deletePlan.mockResolvedValue({})
})
afterEach(() => wrapper?.unmount())
describe('PlanesPage', () => {
  it('aplica filtro de estado recibido por query', async () => {
    route.query = { estado: 'aprobado' }
    wrapper = mountPage(PlanesPage)
    await flushPromises()
    expect(ids(wrapper)).toEqual(['p2'])
  })
  it('solo borrador propio expone editar y eliminar', async () => {
    wrapper = mountPage(PlanesPage)
    await flushPromises()
    const actions = wrapper.findAllComponents({ name: 'PlanActions' })
    expect(actions[0].props('actions')).toEqual(['view', 'edit', 'delete'])
    expect(
      actions.slice(1).every((action) => JSON.stringify(action.props('actions')) === '["view"]'),
    ).toBe(true)
    actions[0].vm.$emit('edit')
    expect(push).toHaveBeenCalledWith({ name: 'planes.create', params: { id: 'p1' } })
    push.mockClear()
    actions[1].vm.$emit('edit')
    expect(push).not.toHaveBeenCalled()
  })
  it('elimina solo despues de confirmar y actualiza tabla', async () => {
    wrapper = mountPage(PlanesPage)
    await flushPromises()
    wrapper.findAllComponents({ name: 'PlanActions' })[0].vm.$emit('delete')
    await flushPromises()
    expect(service.deletePlan).not.toHaveBeenCalled()
    const dialog = wrapper.getComponent({ name: 'BaseConfirmationDialog' })
    expect(dialog.props('modelValue')).toBe(true)
    dialog.vm.$emit('confirm')
    await flushPromises()
    expect(service.deletePlan).toHaveBeenCalledWith('p1')
    expect(ids(wrapper)).toEqual(['p2', 'p3', 'p4'])
    expect(dialog.props('modelValue')).toBe(false)
    expect(notifySuccess).toHaveBeenCalledWith('Plan eliminado correctamente')
  })
  it('cancelar confirmacion no llama al servicio', async () => {
    wrapper = mountPage(PlanesPage)
    await flushPromises()
    wrapper.findAllComponents({ name: 'PlanActions' })[0].vm.$emit('delete')
    await flushPromises()
    wrapper.getComponent({ name: 'BaseConfirmationDialog' }).vm.$emit('update:modelValue', false)
    await flushPromises()
    expect(service.deletePlan).not.toHaveBeenCalled()
    expect(ids(wrapper)).toHaveLength(4)
  })
  it('roles solo lectura no muestran acciones destructivas', async () => {
    auth.role = 'SUBDIRECCION'
    wrapper = mountPage(PlanesPage)
    await flushPromises()
    expect(
      wrapper
        .findAllComponents({ name: 'PlanActions' })
        .every((action) => JSON.stringify(action.props('actions')) === '["view"]'),
    ).toBe(true)
  })
})
