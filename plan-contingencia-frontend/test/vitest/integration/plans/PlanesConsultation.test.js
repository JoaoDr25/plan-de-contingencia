import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { flushPromises } from '@vue/test-utils'
import { nextTick } from 'vue'
import { ids, mountPage, push, rows, setField, table } from '../../helpers/planPageHarness'
import PlanesConsultation from 'src/views/plans/PlanesConsultation.vue'
import service from 'src/services/plans/planContingenciaService'

let wrapper
beforeEach(() => {
  vi.resetAllMocks()
  service.getPlanes.mockResolvedValue(structuredClone(rows))
})
afterEach(() => wrapper?.unmount())
describe('PlanesConsultation', () => {
  it('carga todos los estados y elimina el indicador de carga', async () => {
    let complete
    service.getPlanes.mockReturnValue(
      new Promise((resolve) => {
        complete = resolve
      }),
    )
    wrapper = mountPage(PlanesConsultation)
    await nextTick()
    expect(table(wrapper).props('loading')).toBe(true)
    complete(structuredClone(rows))
    await flushPromises()
    expect(service.getPlanes).toHaveBeenCalledOnce()
    expect(ids(wrapper)).toEqual(['p1', 'p2', 'p3', 'p4'])
    expect(table(wrapper).props('loading')).toBe(false)
  })
  it('conecta filtros combinados y limpiar restaura los datos', async () => {
    wrapper = mountPage(PlanesConsultation)
    await flushPromises()
    await setField(wrapper, 'BaseSearch', 'Programa de Formación', 'producción')
    await setField(wrapper, 'BaseSearch', 'Instructor', 'maria')
    await setField(wrapper, 'BaseSelect', 'Estado', 'ejecutado')
    expect(ids(wrapper)).toEqual(['p3'])
    wrapper.getComponent({ name: 'BaseClearFilters' }).vm.$emit('clear')
    await flushPromises()
    expect(ids(wrapper)).toEqual(['p1', 'p2', 'p3', 'p4'])
  })
  it('filtra por creacion incluyendo todo el dia, independientemente del cierre', async () => {
    service.getPlanes.mockResolvedValue([
      {
        ...rows[0],
        _id: 'start',
        createdAt: new Date(2026, 7, 12, 0).toISOString(),
        fechaCierre: null,
      },
      {
        ...rows[2],
        _id: 'end',
        createdAt: new Date(2026, 7, 12, 23, 59, 59, 999).toISOString(),
        fechaCierre: '2026-09-01',
      },
      { ...rows[2], _id: 'other', createdAt: '2026-08-11', fechaCierre: '2026-08-12' },
      { ...rows[0], _id: 'invalid', createdAt: 'invalid' },
      { ...rows[0], _id: 'missing', createdAt: null },
    ])
    wrapper = mountPage(PlanesConsultation)
    await flushPromises()
    await setField(wrapper, 'BaseDatePicker', 'Fecha desde', '2026-08-12')
    await setField(wrapper, 'BaseDatePicker', 'Fecha hasta', '2026-08-12')
    expect(ids(wrapper)).toEqual(['start', 'end'])
    wrapper.getComponent({ name: 'BaseClearFilters' }).vm.$emit('clear')
    await flushPromises()
    expect(ids(wrapper)).toEqual(['start', 'end', 'other', 'invalid', 'missing'])
  })
  it('cablea paginacion y cambio de tamano', async () => {
    service.getPlanes.mockResolvedValue(
      Array.from({ length: 10 }, (_, i) => ({ ...rows[0], _id: String(i) })),
    )
    wrapper = mountPage(PlanesConsultation)
    await flushPromises()
    expect(table(wrapper).props('totalPages')).toBe(2)
    table(wrapper).vm.$emit('change-page', 2)
    await flushPromises()
    expect(ids(wrapper)).toEqual(['8', '9'])
    table(wrapper).vm.$emit('change-rows-per-page', 10)
    await flushPromises()
    expect(table(wrapper).props('currentPage')).toBe(1)
    expect(ids(wrapper)).toHaveLength(10)
  })
  it('solo expone ver y navega al detalle del registro', async () => {
    wrapper = mountPage(PlanesConsultation)
    await flushPromises()
    const actions = wrapper.findAllComponents({ name: 'PlanActions' })
    expect(actions.every((action) => JSON.stringify(action.props('actions')) === '["view"]')).toBe(
      true,
    )
    actions[0].vm.$emit('view')
    expect(push).toHaveBeenCalledWith({ name: 'planes.detail', params: { id: 'p1' } })
  })
})
