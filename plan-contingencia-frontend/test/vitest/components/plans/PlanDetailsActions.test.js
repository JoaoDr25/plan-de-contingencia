import { installQuasarPlugin } from '@quasar/quasar-app-extension-testing-unit-vitest'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { QBtn } from 'quasar'
import PlanDetailsActions from 'src/components/actions/PlanDetailsActions.vue'

installQuasarPlugin()
const { push } = vi.hoisted(() => ({ push: vi.fn() }))
vi.mock('vue-router', () => ({ useRouter: () => ({ push }) }))
vi.mock('src/stores/auth.store', () => ({ useAuthStore: () => ({ role: 'COORDINACION' }) }))
let wrapper
beforeEach(() => vi.clearAllMocks())
afterEach(() => wrapper?.unmount())
function render(role, estado, revision = {}) {
  wrapper = mount(PlanDetailsActions, { props: { role, plan: { estado, revision } } })
  return wrapper
}
function button(label) {
  return wrapper.findAllComponents(QBtn).find((button) => button.props('label') === label)
}
function labels() {
  return wrapper.findAllComponents(QBtn).map((button) => button.props('label'))
}

describe('PlanDetailsActions', () => {
  it('coordinacion tiene acciones de cierre para un aprobado', async () => {
    render('COORDINACION', 'aprobado')
    expect(labels()).toEqual([
      'Ejecutar Plan',
      'Cancelar Plan',
      'Enviar a Edición',
      'Imprimir',
      'Volver',
    ])
    await button('Ejecutar Plan').trigger('click')
    expect(wrapper.emitted('action')).toEqual([['ejecutar']])
  })
  it.each(['ejecutado', 'cancelado'])(
    'estado terminal %s solo permite imprimir y volver',
    (estado) => {
      render('COORDINACION', estado)
      expect(labels()).toEqual(['Imprimir', 'Volver'])
    },
  )
  it('deshabilita aprobacion y rechazo de coordinacion sin aprobaciones previas', async () => {
    render('COORDINACION', 'en revision')
    expect(button('Aprobar Plan').attributes('disabled')).toBeDefined()
    expect(button('No Aprobar').attributes('disabled')).toBeDefined()
    await button('Aprobar Plan').trigger('click')
    expect(wrapper.emitted('action')).toBeUndefined()
  })
  it('habilita coordinacion despues de pedagogia y SST', async () => {
    render('COORDINACION', 'en revision', {
      pedagogia: { estado: 'aprobado' },
      sst: { estado: 'aprobado' },
    })
    expect(button('Aprobar Plan').attributes('disabled')).toBeUndefined()
    await button('Aprobar Plan').trigger('click')
    expect(wrapper.emitted('action')).toEqual([['aprobar']])
  })
  it('un revisor que ya aprobo no repite la accion', () => {
    render('SST', 'en revision', { sst: { estado: 'aprobado' } })
    expect(button('Aprobar Plan').attributes('disabled')).toBeDefined()
  })
  it('reacciona al cambio de estado y rol', async () => {
    render('COORDINACION', 'aprobado')
    await wrapper.setProps({ role: 'SUBDIRECCION' })
    expect(labels()).toEqual(['Imprimir', 'Volver'])
    await wrapper.setProps({ plan: { estado: 'borrador' } })
    expect(labels()).toEqual(['Volver'])
  })
  it('volver navega al listado sin emitir accion de negocio', async () => {
    render('CONSULTOR', 'aprobado')
    await button('Volver').trigger('click')
    expect(push).toHaveBeenCalledExactlyOnceWith({ name: 'planes.list' })
    expect(wrapper.emitted('action')).toBeUndefined()
  })
})
