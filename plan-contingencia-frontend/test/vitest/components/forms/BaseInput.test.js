import { installQuasarPlugin } from '@quasar/quasar-app-extension-testing-unit-vitest'
import { afterEach, describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import { QInput } from 'quasar'
import BaseInput from 'src/components/forms/BaseInput.vue'
import { required } from 'src/validators/form.validator'

installQuasarPlugin()
let wrapper
afterEach(() => wrapper?.unmount())
describe('BaseInput', () => {
  it('interaccion con input emite el nuevo valor', async () => {
    wrapper = mount(BaseInput, { props: { label: 'Nombre', modelValue: '' } })
    await wrapper.get('input').setValue('Maria')
    expect(wrapper.emitted('update:modelValue')).toEqual([['Maria']])
  })
  it('propaga reglas, readonly, disable y longitud a QInput', async () => {
    wrapper = mount(BaseInput, {
      props: {
        label: 'Nombre',
        modelValue: '',
        rules: [required],
        readonly: true,
        disable: true,
        maxlength: 10,
      },
    })
    const input = wrapper.getComponent(QInput)
    expect(input.props()).toMatchObject({
      readonly: true,
      disable: true,
      maxlength: 10,
      rules: [required],
    })
    await wrapper.setProps({ readonly: false, disable: false })
    expect(input.vm.validate()).toBe(false)
    await wrapper.setProps({ modelValue: 'Maria' })
    expect(input.vm.validate()).toBe(true)
  })
  it('etiqueta externa no duplica etiqueta interna', () => {
    wrapper = mount(BaseInput, { props: { label: 'Nombre', externalLabel: true } })
    expect(wrapper.getComponent(QInput).props('label')).toBeUndefined()
  })
})
