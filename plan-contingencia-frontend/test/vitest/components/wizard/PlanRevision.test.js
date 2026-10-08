import { installQuasarPlugin } from '@quasar/quasar-app-extension-testing-unit-vitest'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { flushPromises, shallowMount } from '@vue/test-utils'
import { reactive } from 'vue'
import { QBtn } from 'quasar'
import PlanRevision from 'src/views/wizard/PlanRevision.vue'
import { createPlanContingenciaModel } from 'src/models/planContingencia.model'
import riesgoService from 'src/services/modules/riesgoService'
import usuarioService from 'src/services/modules/usuarioService'
import { notifyError } from 'src/utils/notifications.utils'

installQuasarPlugin()
const { auth } = vi.hoisted(() => ({ auth: { currentUser: null, refreshCurrentUser: vi.fn() } }))
vi.mock('src/stores/auth.store', () => ({ useAuthStore: () => auth }))
vi.mock('src/services/modules/riesgoService', () => ({ default: { getRiesgos: vi.fn() } }))
vi.mock('src/services/modules/usuarioService', () => ({ default: { getRevisores: vi.fn() } }))
vi.mock('src/utils/notifications.utils', () => ({ notifyError: vi.fn() }))
let wrapper
beforeEach(() => {
  vi.resetAllMocks()
  auth.currentUser = { _id: 'u1', nombre: 'Maria', apellido: 'Perez', firma: 'instructor.png' }
  auth.refreshCurrentUser.mockResolvedValue(auth.currentUser)
  riesgoService.getRiesgos.mockResolvedValue([])
  usuarioService.getRevisores.mockResolvedValue(
    Object.fromEntries(
      ['pedagogia', 'sst', 'coordinacion'].map((role) => [
        role,
        [{ _id: role, nombreCompleto: `Revisor ${role}`, firma: `${role}.png` }],
      ]),
    ),
  )
})
afterEach(() => wrapper?.unmount())
async function render() {
  const plan = reactive(createPlanContingenciaModel())
  wrapper = shallowMount(PlanRevision, { props: { modelValue: plan } })
  await flushPromises()
  return plan
}
async function selectReviewers() {
  const selects = wrapper.findAllComponents({ name: 'BaseSelect' })
  for (const [index, role] of ['pedagogia', 'sst', 'coordinacion'].entries())
    selects[index].vm.$emit('update:modelValue', role)
  await flushPromises()
}
describe('PlanRevision', () => {
  it('refresca usuario y carga firma de instructor', async () => {
    const plan = await render()
    expect(auth.refreshCurrentUser).toHaveBeenCalledOnce()
    expect(plan.revision.usuario).toEqual({
      usuarioId: 'u1',
      nombre: 'Maria Perez',
      firma: 'instructor.png',
    })
    expect(wrapper.get('img[alt="Firma del instructor"]').attributes('src')).toBe('instructor.png')
  })
  it('selecciona responsables por rol y exige validacion y firmas', async () => {
    const plan = await render()
    expect(wrapper.vm.validate()).toBe(false)
    await selectReviewers()
    expect(plan.revision.pedagogia).toMatchObject({
      usuarioId: 'pedagogia',
      firma: 'pedagogia.png',
      nombre: 'Revisor pedagogia',
    })
    expect(wrapper.vm.validate()).toBe(false)
    plan.revision.validacionInformacion = true
    expect(wrapper.vm.validate()).toBe(true)
  })
  it('sin firma del instructor no permite generar aun con revisores', async () => {
    auth.currentUser.firma = null
    const plan = await render()
    await selectReviewers()
    plan.revision.validacionInformacion = true
    expect(wrapper.vm.validate()).toBe(false)
  })
  it('ver detalles emite paso correspondiente para regresar', async () => {
    await render()
    const buttons = wrapper
      .findAllComponents(QBtn)
      .filter((button) => button.props('label') === 'Ver detalles')
    expect(buttons).toHaveLength(6)
    buttons[4].vm.$emit('click')
    expect(wrapper.emitted('go-to-step')).toEqual([[5]])
  })
  it('fallo de catalogo de revisores se informa y no habilita generacion', async () => {
    usuarioService.getRevisores.mockRejectedValue(new Error('Backend no disponible'))
    await render()
    expect(notifyError).toHaveBeenCalledWith('Error al cargar los responsables de revisión')
    expect(wrapper.vm.validate()).toBe(false)
  })
})
