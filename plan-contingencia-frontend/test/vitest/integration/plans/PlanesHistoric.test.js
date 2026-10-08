import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { flushPromises } from '@vue/test-utils'
import { ids, mountPage, push, rows, setField, table } from '../../helpers/planPageHarness'
import PlanesHistoric from 'src/views/plans/PlanesHistoric.vue'
import service from 'src/services/plans/planContingenciaService'
import { notifyError } from 'src/utils/notifications.utils'

let wrapper
beforeEach(() => {
  vi.resetAllMocks()
  service.getPlanes.mockResolvedValue(structuredClone(rows))
})
afterEach(() => wrapper?.unmount())
describe('PlanesHistoric', () => {
  it('muestra exclusivamente ejecutados y cancelados', async () => {
    wrapper = mountPage(PlanesHistoric)
    await flushPromises()
    expect(ids(wrapper)).toEqual(['p3', 'p4'])
    expect(table(wrapper).props('total')).toBe(2)
  })
  it('filtra estado y busqueda y limpiar los restablece', async () => {
    wrapper = mountPage(PlanesHistoric)
    await flushPromises()
    await setField(wrapper, 'BaseSelect', 'Estado', 'cancelado')
    wrapper.getComponent({ name: 'BaseSearch' }).vm.$emit('update:modelValue', 'sistemas')
    await flushPromises()
    expect(ids(wrapper)).toEqual(['p4'])
    wrapper.getComponent({ name: 'BaseClearFilters' }).vm.$emit('clear')
    await flushPromises()
    expect(ids(wrapper)).toEqual(['p3', 'p4'])
  })
  it('filtro de fechas debe usar cierre, no creacion', async () => {
    wrapper = mountPage(PlanesHistoric)
    await flushPromises()
    await setField(wrapper, 'BaseDatePicker', 'Fecha desde', '2026-08-12')
    await setField(wrapper, 'BaseDatePicker', 'Fecha hasta', '2026-08-12')
    expect(ids(wrapper)).toEqual(['p3'])
  })
  it('incluye el dia completo de cierre y no usa creacion como reemplazo de cierre ausente', async () => {
    service.getPlanes.mockResolvedValue([
      { ...rows[2], _id: 'start', fechaCierre: new Date(2026, 7, 12, 0).toISOString() },
      { ...rows[3], _id: 'end', fechaCierre: new Date(2026, 7, 12, 23, 59, 59, 999).toISOString() },
      { ...rows[2], _id: 'next', fechaCierre: '2026-08-13' },
      { ...rows[2], _id: 'missing', createdAt: '2026-08-12', fechaCierre: null },
      { ...rows[3], _id: 'invalid', fechaCierre: 'invalid' },
    ])
    wrapper = mountPage(PlanesHistoric)
    await flushPromises()
    expect(ids(wrapper)).toHaveLength(5)
    await setField(wrapper, 'BaseDatePicker', 'Fecha desde', '2026-08-12')
    await setField(wrapper, 'BaseDatePicker', 'Fecha hasta', '2026-08-12')
    expect(ids(wrapper)).toEqual(['start', 'end'])
    wrapper.getComponent({ name: 'BaseClearFilters' }).vm.$emit('clear')
    await flushPromises()
    expect(ids(wrapper)).toHaveLength(5)
  })
  it('ver abre detalle y no ofrece edicion de estados terminales', async () => {
    wrapper = mountPage(PlanesHistoric)
    await flushPromises()
    const action = wrapper.findAllComponents({ name: 'PlanActions' })[0]
    expect(action.props('actions')).toEqual(['view'])
    action.vm.$emit('view')
    expect(push).toHaveBeenCalledWith({ name: 'planes.detail', params: { id: 'p3' } })
  })
  it('fallo de carga informa al usuario y finaliza loading', async () => {
    const error = new Error('Backend no disponible')
    service.getPlanes.mockRejectedValue(error)
    wrapper = mountPage(PlanesHistoric)
    await flushPromises()
    expect(notifyError).toHaveBeenCalledWith(error)
    expect(table(wrapper).props('loading')).toBe(false)
    expect(ids(wrapper)).toEqual([])
  })
})
