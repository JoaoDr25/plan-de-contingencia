import { installQuasarPlugin } from '@quasar/quasar-app-extension-testing-unit-vitest'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import BaseConfirmationDialog from 'src/components/base/BaseConfirmationDialog.vue'

installQuasarPlugin()
vi.mock('src/stores/auth.store', () => ({ useAuthStore: () => ({ role: 'CONSULTOR' }) }))
let wrapper
afterEach(() => wrapper?.unmount())
function render(props = {}) {
  wrapper = mount(BaseConfirmationDialog, {
    props: { modelValue: true, title: 'Confirmar', ...props },
    global: { stubs: { BaseDialog: { template: '<div><slot /><slot name="actions" /></div>' } } },
  })
}
describe('BaseConfirmationDialog', () => {
  it('requiere observaciones no vacias y las recorta al confirmar', async () => {
    render({ showObservations: true })
    expect(wrapper.findAll('button')[0].attributes('disabled')).toBeDefined()
    await wrapper.get('textarea').setValue('  Motivo  ')
    await wrapper.findAll('button')[0].trigger('click')
    expect(wrapper.emitted('confirm')).toEqual([[{ observations: 'Motivo' }]])
  })
  it('loading bloquea confirmacion y cancelacion', () => {
    render({ loading: true })
    expect(
      wrapper.findAll('button').every((button) => button.attributes('disabled') !== undefined),
    ).toBe(true)
  })
  it('cancelar cierra el dialogo sin confirmar', async () => {
    render()
    await wrapper.findAll('button')[1].trigger('click')
    expect(wrapper.emitted('cancel')).toEqual([[]])
    expect(wrapper.emitted('update:modelValue')).toEqual([[false]])
    expect(wrapper.emitted('confirm')).toBeUndefined()
  })
  it('al cerrar y reabrir no conserva observaciones anteriores', async () => {
    render({ showObservations: true })
    await wrapper.get('textarea').setValue('Anterior')
    await wrapper.setProps({ modelValue: false })
    await wrapper.setProps({ modelValue: true })
    expect(wrapper.get('textarea').element.value).toBe('')
    expect(wrapper.findAll('button')[0].attributes('disabled')).toBeDefined()
  })
})
