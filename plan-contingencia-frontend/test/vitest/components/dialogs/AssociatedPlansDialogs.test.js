import { afterEach, describe, expect, it } from 'vitest'
import { shallowMount } from '@vue/test-utils'
import { installQuasarPlugin } from '@quasar/quasar-app-extension-testing-unit-vitest'
import PlanesPeligrosDialog from 'src/views/modals/PlanesPeligrosDialog.vue'
import PlanesRiesgosDialog from 'src/views/modals/PlanesRiesgosDialog.vue'
import PlanesProtocolosDialog from 'src/views/modals/PlanesProtocolosDialog.vue'

installQuasarPlugin()

const cases = [
  ['Peligros', PlanesPeligrosDialog, 'activity', 'peligros', 'nombre'],
  ['Riesgos', PlanesRiesgosDialog, 'danger', 'riesgos', 'riesgo'],
  ['Protocolos', PlanesProtocolosDialog, 'risk', 'protocolos', 'tipo'],
]

let wrapper
afterEach(() => wrapper?.unmount())

describe.each(cases)('%s: registros asociados', (_, component, prop, field, textField) => {
  function render(count = 9) {
    const rows = Array.from({ length: count }, (_, index) => ({
      _id: String(index + 1),
      [textField]: `Registro ${index + 1}`,
      descripcion: 'Texto completo sin truncamiento',
      accion: 'Texto completo sin truncamiento',
    }))
    wrapper = shallowMount(component, {
      props: { modelValue: true, [prop]: { [field]: rows } },
      global: {
        stubs: {
          BaseDialog: {
            name: 'BaseDialog',
            props: { scrollable: Boolean },
            template: '<div><slot /><slot name="actions" /></div>',
          },
        },
      },
    })
  }

  it('muestra cuatro filas y conserva numeracion y texto en las siguientes paginas', async () => {
    render()
    expect(wrapper.findAll('tbody tr')).toHaveLength(4)
    expect(wrapper.get('tbody tr td').text()).toBe('1')
    expect(wrapper.getComponent({ name: 'BaseDialog' }).props('scrollable')).toBe(true)
    expect(wrapper.findComponent({ name: 'BaseTableInfo' }).exists()).toBe(false)
    const pagination = wrapper.getComponent('q-pagination-stub')
    const closeButton = wrapper.getComponent({ name: 'SecondaryActionButton' })
    expect(pagination.element.parentElement).toBe(closeButton.element.parentElement)
    expect(pagination.element.nextElementSibling).toBe(closeButton.element)
    expect(pagination.props('max')).toBe(3)
    pagination.vm.$emit('update:modelValue', 2)
    await wrapper.vm.$nextTick()
    expect(wrapper.findAll('tbody tr')).toHaveLength(4)
    expect(wrapper.get('tbody tr td').text()).toBe('5')
    expect(wrapper.get('tbody').text()).toContain('Texto completo sin truncamiento')
    pagination.vm.$emit('update:modelValue', 3)
    await wrapper.vm.$nextTick()
    expect(wrapper.findAll('tbody tr')).toHaveLength(1)
    expect(wrapper.get('tbody tr td').text()).toBe('9')
  })

  it('reinicia la pagina al reabrir o consultar otra entidad', async () => {
    render()
    const pagination = wrapper.getComponent('q-pagination-stub')
    pagination.vm.$emit('update:modelValue', 2)
    await wrapper.vm.$nextTick()
    await wrapper.setProps({ modelValue: false })
    await wrapper.setProps({ modelValue: true })
    expect(wrapper.get('tbody tr td').text()).toBe('1')
    pagination.vm.$emit('update:modelValue', 2)
    await wrapper.vm.$nextTick()
    await wrapper.setProps({
      [prop]: { [field]: [{ _id: 'new', [textField]: 'Nuevo registro' }] },
    })
    expect(wrapper.get('tbody tr td').text()).toBe('1')
    expect(wrapper.get('tbody').text()).toContain('Nuevo registro')
    expect(wrapper.find('q-pagination-stub').exists()).toBe(false)
  })

  it('mantiene el mensaje vacio sin paginacion y permite cerrar', async () => {
    render(0)
    expect(wrapper.get('tbody').text()).toContain('No hay')
    expect(wrapper.find('q-pagination-stub').exists()).toBe(false)
    wrapper.getComponent({ name: 'SecondaryActionButton' }).vm.$emit('click')
    await wrapper.vm.$nextTick()
    expect(wrapper.emitted('update:modelValue')).toEqual([[false]])
  })
})
