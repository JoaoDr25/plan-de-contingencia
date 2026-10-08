import { installQuasarPlugin } from '@quasar/quasar-app-extension-testing-unit-vitest'
import { afterEach, describe, expect, it } from 'vitest'
import { shallowMount } from '@vue/test-utils'
import { reactive } from 'vue'
import { QCheckbox } from 'quasar'
import PlanContextoAcademico from 'src/views/wizard/PlanContextoAcademico.vue'
import { createPlanContingenciaModel } from 'src/models/planContingencia.model'

installQuasarPlugin()
let wrapper
afterEach(() => wrapper?.unmount())
function render() {
  const plan = reactive(createPlanContingenciaModel())
  wrapper = shallowMount(PlanContextoAcademico, { props: { modelValue: plan } })
  return plan
}
function checkbox(label) {
  return wrapper.findAllComponents(QCheckbox).find((field) => field.props('label') === label)
}
describe('PlanContextoAcademico', () => {
  it('otro requiere especificacion no vacia', () => {
    const plan = render()
    expect(wrapper.vm.validate()).toBe(false)
    plan.articulacionFormativa.otro = '  '
    expect(wrapper.vm.validate()).toBe(false)
    plan.articulacionFormativa.otro = 'Salida academica'
    expect(wrapper.vm.validate()).toBe(true)
  })
  it('seleccion de articulacion es exclusiva y limpia especificacion de otro', () => {
    const plan = render()
    plan.articulacionFormativa.otro = 'Anterior'
    checkbox('Visita a empresa').vm.$emit('update:modelValue', true)
    expect(plan.articulacionFormativa).toMatchObject({
      proyectoFormativo: false,
      visitaEmpresa: true,
      investigacion: false,
      otroSeleccionado: false,
      otro: '',
    })
    expect(wrapper.vm.validate()).toBe(true)
  })
  it('sin articulacion seleccionada impide continuar', () => {
    const plan = render()
    for (const key of ['proyectoFormativo', 'visitaEmpresa', 'investigacion', 'otroSeleccionado'])
      plan.articulacionFormativa[key] = false
    expect(wrapper.vm.validate()).toBe(false)
  })
  it('al indicar que no hay menores elimina consentimiento anterior', () => {
    const plan = render()
    plan.contextoAcademico.consentimientoLink = 'https://example.test/consentimiento'
    checkbox('No').vm.$emit('update:modelValue', true)
    expect(plan.contextoAcademico.consentimientoMenores).toBe(false)
    expect(plan.contextoAcademico.consentimientoLink).toBe('')
  })
  it('consentimiento requiere enlace y solo admite HTTP(S)', () => {
    render()
    const input = wrapper
      .findAllComponents({ name: 'BaseInput' })
      .find((field) => field.props('label') === 'Consentimiento informado')
    const [required, url] = input.props('rules')
    expect(required('')).not.toBe(true)
    expect(url('https://example.test/consentimiento.pdf')).toBe(true)
    expect(url('javascript:alert(1)')).not.toBe(true)
    expect(url('not-url')).not.toBe(true)
  })
  it('mantiene consentimiento visible y opcional al marcar No y lo exige al marcar Si', async () => {
    render()
    const input = wrapper
      .findAllComponents({ name: 'BaseInput' })
      .find((field) => field.props('label') === 'Consentimiento informado')
    checkbox('No').vm.$emit('update:modelValue', true)
    await wrapper.vm.$nextTick()
    expect(input.exists()).toBe(true)
    expect(input.props('required')).toBe(false)
    expect(input.props('rules')[0]('')).toBe(true)
    expect(input.props('rules')[0]('not-url')).not.toBe(true)
    checkbox('Sí').vm.$emit('update:modelValue', true)
    await wrapper.vm.$nextTick()
    expect(input.props('required')).toBe(true)
    expect(input.props('rules')[0]('')).not.toBe(true)
  })
  it('mantiene especificacion visible y opcional sin Otro y obligatoria al seleccionarlo', async () => {
    render()
    const input = wrapper
      .findAllComponents({ name: 'BaseInput' })
      .find((field) => field.props('label') === 'Especificación')
    expect(input.props('required')).toBe(true)
    expect(input.props('rules')[0]('')).not.toBe(true)
    checkbox('Otro').vm.$emit('update:modelValue', false)
    await wrapper.vm.$nextTick()
    expect(input.exists()).toBe(true)
    expect(input.props('required')).toBe(false)
    expect(input.props('rules')).toEqual([])
    checkbox('Otro').vm.$emit('update:modelValue', true)
    await wrapper.vm.$nextTick()
    expect(input.props('required')).toBe(true)
    expect(input.props('rules')[0]('')).not.toBe(true)
  })
})
