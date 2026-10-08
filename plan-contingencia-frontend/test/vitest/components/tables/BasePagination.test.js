import { installQuasarPlugin } from '@quasar/quasar-app-extension-testing-unit-vitest'
import { afterEach, describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import { QSelect } from 'quasar'
import BasePagination from 'src/components/tables/BasePagination.vue'

installQuasarPlugin()
let wrapper
afterEach(() => wrapper?.unmount())
describe('BasePagination', () => {
  it('primera pagina bloquea retroceso y emite siguiente pagina', async () => {
    wrapper = mount(BasePagination, { props: { currentPage: 1, totalPages: 3 } })
    const buttons = wrapper.findAll('button')
    expect(buttons[0].attributes('disabled')).toBeDefined()
    expect(buttons[1].attributes('disabled')).toBeDefined()
    await buttons[2].trigger('click')
    expect(wrapper.emitted('change')).toEqual([[2]])
  })
  it('ultima pagina bloquea avance y permite volver a primera', async () => {
    wrapper = mount(BasePagination, { props: { currentPage: 3, totalPages: 3 } })
    const buttons = wrapper.findAll('button')
    expect(buttons[2].attributes('disabled')).toBeDefined()
    expect(buttons[3].attributes('disabled')).toBeDefined()
    await buttons[0].trigger('click')
    expect(wrapper.emitted('change')).toEqual([[1]])
  })
  it('pagina activa no emite y otra pagina si', async () => {
    wrapper = mount(BasePagination, { props: { currentPage: 2, totalPages: 3 } })
    const pages = wrapper.findAll('.base-pagination__page')
    expect(pages).toHaveLength(3)
    await pages[1].trigger('click')
    expect(wrapper.emitted('change')).toBeUndefined()
    await pages[2].trigger('click')
    expect(wrapper.emitted('change')).toEqual([[3]])
  })
  it('cambio de filas emite un numero', () => {
    wrapper = mount(BasePagination)
    wrapper.getComponent(QSelect).vm.$emit('update:modelValue', '15')
    expect(wrapper.emitted('change-rows-per-page')).toEqual([[15]])
  })
})
