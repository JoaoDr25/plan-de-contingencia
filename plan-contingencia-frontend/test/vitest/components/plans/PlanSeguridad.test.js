import { installQuasarPlugin } from '@quasar/quasar-app-extension-testing-unit-vitest'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { flushPromises, shallowMount } from '@vue/test-utils'
import { reactive } from 'vue'
import { QCheckbox } from 'quasar'
import PlanSeguridad from 'src/views/wizard/PlanSeguridad.vue'
import { createPlanContingenciaModel } from 'src/models/planContingencia.model'
import { SECURITY_VIAL_ITEMS } from 'src/constants/system/security.constants'
import eppService from 'src/services/modules/eppService'
import contactoService from 'src/services/modules/contactoService'
import { notifyError, notifyWarning } from 'src/utils/notifications.utils'

installQuasarPlugin()
vi.mock('src/services/modules/eppService', () => ({ default: { getEpps: vi.fn() } }))
vi.mock('src/services/modules/contactoService', () => ({ default: { getContactos: vi.fn() } }))
vi.mock('src/utils/notifications.utils', () => ({ notifyError: vi.fn(), notifyWarning: vi.fn() }))
let wrapper
beforeEach(() => {
  vi.resetAllMocks()
  eppService.getEpps.mockResolvedValue({
    data: [
      { _id: 'e1', nombre: 'Casco', estado: 'Activo' },
      { _id: 'e2', nombre: 'Guantes', estado: 'Inactivo' },
    ],
  })
  contactoService.getContactos.mockResolvedValue({
    data: [{ _id: 'c1', nombre: 'Hospital', tipo: 'Salud', estado: 'Activo' }],
  })
})
afterEach(() => wrapper?.unmount())
async function render(overrides = {}) {
  const plan = reactive({
    ...createPlanContingenciaModel(),
    tipoTransporte: 'INSTITUCIONAL',
    ...overrides,
  })
  wrapper = shallowMount(PlanSeguridad, { props: { modelValue: plan } })
  await flushPromises()
  return plan
}
function markRoadSafety(plan, cumple = false) {
  plan.seguridadVial.items.forEach((item) => {
    item.cumple = cumple
    item.soporte = cumple ? 'https://example.test/soporte.pdf' : ''
  })
}

describe('PlanSeguridad', () => {
  it('normaliza EPP incorrecto a arreglo y muestra solo catalogo activo', async () => {
    const plan = await render({ epp: { incorrecto: true } })
    expect(plan.epp).toEqual([])
    expect(wrapper.findAllComponents(QCheckbox)).toHaveLength(1)
    expect(wrapper.text()).toContain('CASCO')
    expect(wrapper.text()).not.toContain('GUANTES')
  })
  it('selecciona y deselecciona IDs sin duplicados ni objetos', async () => {
    const plan = await render()
    const checkbox = wrapper.getComponent(QCheckbox)
    checkbox.vm.$emit('update:modelValue', true)
    checkbox.vm.$emit('update:modelValue', true)
    expect(plan.epp).toEqual(['e1'])
    checkbox.vm.$emit('update:modelValue', false)
    expect(plan.epp).toEqual([])
    expect(wrapper.emitted('update:modelValue').at(-1)[0]).toBe(plan)
  })
  it('descarta IDs eliminados del catalogo sin perder contactos adicionales', async () => {
    const otro = {
      nombreEntidad: 'Bomberos',
      telefono: '1234567',
      ciudad: 'Cali',
      descripcion: 'Emergencia',
    }
    const plan = await render({
      epp: ['e1', 'deleted'],
      contactosEmergencia: { contactosBase: ['c1', 'deleted'], otro },
    })
    expect(plan.epp).toEqual(['e1'])
    expect(plan.contactosEmergencia).toEqual({ contactosBase: ['c1'], otro: [otro] })
  })
  it('agregar contacto mantiene el contrato anidado y recorta textos', async () => {
    const plan = await render()
    wrapper.getComponent({ name: 'ContactosDialog' }).vm.$emit('save', {
      nombre: ' Bomberos ',
      telefono: ' 1234567 ',
      ciudad: ' Cali ',
      direccion: ' Centro ',
    })
    expect(plan.contactosEmergencia).toEqual({
      contactosBase: [],
      otro: [
        { nombreEntidad: 'Bomberos', telefono: '1234567', ciudad: 'Cali', descripcion: 'Centro' },
      ],
    })
  })
  it('migra IDs legacy de seguridad vial conservando respuestas', async () => {
    const plan = await render({
      seguridadVial: {
        aplica: true,
        items: [
          {
            itemId: 'licencia-conductor',
            cumple: true,
            soporte: 'https://example.test/licencia',
            observacion: 'Vigente',
          },
        ],
      },
    })
    expect(plan.seguridadVial.items).toHaveLength(SECURITY_VIAL_ITEMS.length)
    expect(plan.seguridadVial.items[0]).toMatchObject({
      itemId: 'LICENCIA',
      cumple: true,
      observacion: 'Vigente',
    })
  })
  it('APRENDIZ no requiere seguridad vial', async () => {
    const plan = await render({ tipoTransporte: 'APRENDIZ' })
    expect(plan.seguridadVial.aplica).toBe(false)
    expect(wrapper.vm.validate()).toBe(true)
    expect(wrapper.find('.security-section--vial').exists()).toBe(false)
  })
  it('rechaza elementos viales sin responder', async () => {
    await render()
    expect(wrapper.vm.validate()).toBe(false)
    expect(notifyWarning).toHaveBeenCalledWith(
      'Marque el estado de todos los elementos de seguridad vial',
    )
  })
  it.each(['', 'javascript:alert(1)', 'ftp://example.test/file', 'not-url'])(
    'rechaza soporte vacio o no HTTP(S): %s',
    async (url) => {
      const plan = await render()
      markRoadSafety(plan, true)
      plan.contactosEmergencia.contactosBase = ['c1']
      plan.seguridadVial.items[0].soporte = url
      expect(wrapper.vm.validate()).toBe(false)
    },
  )
  it('permite no cumple sin soporte, exige contacto y agrega observacion por defecto', async () => {
    const plan = await render()
    markRoadSafety(plan)
    expect(wrapper.vm.validate()).toBe(false)
    expect(notifyWarning).toHaveBeenCalledWith('Agregue al menos un contacto de emergencia')
    plan.contactosEmergencia.contactosBase = ['c1']
    expect(wrapper.vm.validate()).toBe(true)
    expect(plan.seguridadVial.items.every((item) => item.observacion === 'NO ESPECIFICA')).toBe(
      true,
    )
  })
  it('rechaza contactos adicionales incompletos', async () => {
    const plan = await render()
    markRoadSafety(plan)
    plan.contactosEmergencia.otro = [{ nombreEntidad: 'Hospital', telefono: '1234567' }]
    expect(wrapper.vm.validate()).toBe(false)
    expect(notifyWarning).toHaveBeenCalledWith(
      'Complete todos los datos de los contactos adicionales',
    )
  })
  it('un fallo de catalogo no borra selecciones existentes y notifica', async () => {
    eppService.getEpps.mockRejectedValue(new Error('Network Error'))
    const plan = await render({
      epp: ['e1'],
      contactosEmergencia: { contactosBase: ['c1'], otro: [] },
    })
    expect(plan.epp).toEqual(['e1'])
    expect(plan.contactosEmergencia.contactosBase).toEqual(['c1'])
    expect(notifyError).toHaveBeenCalledWith('Error al cargar los elementos de protección personal')
  })
})
