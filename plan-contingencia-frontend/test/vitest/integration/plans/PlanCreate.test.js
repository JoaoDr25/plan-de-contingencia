import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { flushPromises, mount } from '@vue/test-utils'
import { defineComponent } from 'vue'
import PlanCreate from 'src/views/plans/PlanCreate.vue'
import { createPlanContingenciaModel } from 'src/models/planContingencia.model'
import service from 'src/services/plans/planContingenciaService'
import { notifyError, notifySuccess } from 'src/utils/notifications.utils'

const { push, back, route, formValidate, stepValidate } = vi.hoisted(() => ({
  push: vi.fn(),
  back: vi.fn(),
  route: { params: {} },
  formValidate: vi.fn(),
  stepValidate: vi.fn(),
}))
vi.mock('vue-router', () => ({ useRouter: () => ({ push, back }), useRoute: () => route }))
vi.mock('src/stores/auth.store', () => ({
  useAuthStore: () => ({ currentUser: { _id: 'u1', nombre: 'Maria', apellido: 'Perez' } }),
}))
vi.mock('src/utils/notifications.utils', () => ({ notifySuccess: vi.fn(), notifyError: vi.fn() }))
vi.mock('src/services/plans/planContingenciaService', () => ({
  default: {
    createPlan: vi.fn(),
    updatePlan: vi.fn(),
    getPlanById: vi.fn(),
    generarPlan: vi.fn(),
    asociarAprendices: vi.fn(),
    asociarRiesgos: vi.fn(),
    seleccionarEpp: vi.fn(),
    guardarContactosEmergencia: vi.fn(),
    registrarSeguridadVial: vi.fn(),
    registrarContextoAcademico: vi.fn(),
    registrarArticulacionFormativa: vi.fn(),
    registrarPlanTrabajo: vi.fn(),
  },
}))
const stepNames = [
  'PlanInformacionGeneral',
  'PlanContextoAcademico',
  'PlanPlanTrabajo',
  'PlanParticipantes',
  'PlanRiesgos',
  'PlanSeguridad',
  'PlanRevision',
]
const steps = Object.fromEntries(
  stepNames.map((name) => [
    name,
    defineComponent({
      name,
      props: ['modelValue'],
      emits: ['update:modelValue', 'go-to-step'],
      setup(_, { expose }) {
        expose({ validate: stepValidate })
      },
      template: '<section class="test-step" />',
    }),
  ]),
)
const Button = {
  props: ['label', 'disable'],
  emits: ['click'],
  template: '<button :disabled="disable" @click="$emit(\'click\')">{{ label }}</button>',
}
const Form = defineComponent({
  name: 'QForm',
  setup(_, { expose }) {
    expose({ validate: formValidate })
  },
  template: '<form @submit.prevent><slot /></form>',
})
let wrapper
beforeEach(() => {
  vi.resetAllMocks()
  route.params = {}
  formValidate.mockResolvedValue(true)
  stepValidate.mockReturnValue(true)
  for (const mock of Object.values(service)) mock.mockResolvedValue({})
  service.createPlan.mockImplementation(async (data) => ({ ...data, _id: 'plan-1' }))
  service.updatePlan.mockImplementation(async (id, data) => ({
    ...createPlanContingenciaModel(),
    ...data,
    _id: id,
  }))
})
afterEach(() => wrapper?.unmount())
async function render() {
  wrapper = mount(PlanCreate, {
    global: {
      stubs: {
        ...steps,
        BasePage: { template: '<main><slot /></main>' },
        CrudHeader: true,
        QForm: Form,
        wizardStepNav: true,
        PrimaryActionButton: Button,
        SecondaryActionButton: Button,
        BaseConfirmationDialog: {
          name: 'BaseConfirmationDialog',
          props: ['modelValue'],
          emits: ['confirm'],
          template: '<div />',
        },
        QSpinner: true,
        QBtn: true,
        QBanner: { template: '<div><slot /><slot name="action" /></div>' },
      },
    },
  })
  await flushPromises()
}
function currentStep() {
  return stepNames.find((name) => wrapper.findComponent({ name }).exists())
}
function model() {
  return wrapper.getComponent({ name: currentStep() }).props('modelValue')
}
async function click(label) {
  await wrapper
    .findAll('button')
    .find((button) => button.text() === label)
    .trigger('click')
  await flushPromises()
}
async function advanceTo(step) {
  while (currentStep() !== stepNames[step - 1]) await click('Siguiente')
}

describe('PlanCreate: navegacion y persistencia del wizard', () => {
  it('paso 1 crea borrador con el usuario autenticado y avanza tras guardar', async () => {
    await render()
    expect(model().usuarioId).toBe('u1')
    expect(model().usuarioNombre).toBe('Maria Perez')
    model().descripcionActividad = 'Visita'
    await click('Siguiente')
    expect(service.createPlan).toHaveBeenCalledOnce()
    expect(service.createPlan.mock.calls[0][0]).toMatchObject({
      usuarioId: 'u1',
      descripcionActividad: 'Visita',
    })
    expect(currentStep()).toBe('PlanContextoAcademico')
  })
  it('formulario invalido no guarda ni avanza', async () => {
    formValidate.mockResolvedValue(false)
    await render()
    await click('Siguiente')
    expect(service.createPlan).not.toHaveBeenCalled()
    expect(currentStep()).toBe('PlanInformacionGeneral')
  })
  it('validacion del paso 2 bloquea el guardado', async () => {
    await render()
    await advanceTo(2)
    stepValidate.mockReturnValue(false)
    await click('Siguiente')
    expect(currentStep()).toBe('PlanContextoAcademico')
    expect(service.registrarContextoAcademico).not.toHaveBeenCalled()
  })
  it('error al crear no avanza y permite reintentar', async () => {
    const error = new Error('No se pudo crear')
    service.createPlan.mockRejectedValueOnce(error)
    await render()
    await click('Siguiente')
    expect(currentStep()).toBe('PlanInformacionGeneral')
    expect(notifyError).toHaveBeenCalledWith(error)
    await click('Siguiente')
    expect(currentStep()).toBe('PlanContextoAcademico')
  })
  it('guarda contexto, articulacion y plan de trabajo con sus contratos', async () => {
    await render()
    await advanceTo(2)
    model().contextoAcademico.objetivo = 'Aprender en campo'
    model().articulacionFormativa.visitaEmpresa = true
    await click('Siguiente')
    expect(service.registrarContextoAcademico).toHaveBeenCalledWith(
      'plan-1',
      expect.objectContaining({ objetivo: 'Aprender en campo' }),
    )
    expect(service.registrarArticulacionFormativa).toHaveBeenCalledWith(
      'plan-1',
      expect.objectContaining({ visitaEmpresa: true }),
    )
    model().planTrabajo = [{ actividad: 'Recorrido', horaInicio: '08:00' }]
    await click('Siguiente')
    expect(service.registrarPlanTrabajo).toHaveBeenCalledWith('plan-1', {
      planTrabajo: [{ actividad: 'Recorrido', horaInicio: '08:00' }],
    })
  })
  it('si contexto falla no guarda articulacion ni avanza', async () => {
    await render()
    await advanceTo(2)
    const error = new Error('Error contexto')
    service.registrarContextoAcademico.mockRejectedValueOnce(error)
    await click('Siguiente')
    expect(service.registrarArticulacionFormativa).not.toHaveBeenCalled()
    expect(currentStep()).toBe('PlanContextoAcademico')
    expect(notifyError).toHaveBeenCalledWith(error)
  })
  it('asocia participantes cambiados y riesgos seleccionados', async () => {
    await render()
    await advanceTo(4)
    model().aprendicesId = ['a1', 'a2']
    await click('Siguiente')
    expect(service.asociarAprendices).toHaveBeenCalledWith('plan-1', ['a1', 'a2'])
    model().riesgosId = ['r1']
    await click('Siguiente')
    expect(service.asociarRiesgos).toHaveBeenCalledWith('plan-1', ['r1'])
    expect(currentStep()).toBe('PlanSeguridad')
  })
  it.each([[], ['e1', 'e2']])(
    'seguridad persiste EPP como arreglo (%j) y contactos anidados',
    async (epp) => {
      await render()
      await advanceTo(6)
      model().epp = epp
      model().contactosEmergencia = {
        contactosBase: ['c1'],
        otro: [
          {
            nombreEntidad: 'Hospital',
            telefono: '1234567',
            ciudad: 'Cali',
            descripcion: 'Urgencias',
          },
        ],
      }
      const contacts = model().contactosEmergencia
      const road = model().seguridadVial
      await click('Siguiente')
      expect(service.seleccionarEpp).toHaveBeenCalledWith('plan-1', { epp })
      expect(service.registrarSeguridadVial).toHaveBeenCalledWith('plan-1', { seguridadVial: road })
      expect(service.guardarContactosEmergencia).toHaveBeenCalledWith('plan-1', {
        contactosEmergencia: contacts,
      })
      expect(currentStep()).toBe('PlanRevision')
    },
  )
  it('si seguridad falla no marca el paso completo ni guarda contactos', async () => {
    await render()
    await advanceTo(6)
    const error = new Error('Error EPP')
    service.seleccionarEpp.mockRejectedValueOnce(error)
    await click('Siguiente')
    expect(currentStep()).toBe('PlanSeguridad')
    expect(service.registrarSeguridadVial).not.toHaveBeenCalled()
    expect(service.guardarContactosEmergencia).not.toHaveBeenCalled()
    expect(notifyError).toHaveBeenCalledWith(error)
  })
  it('no permite saltar directamente a pasos no completados', async () => {
    await render()
    wrapper.getComponent({ name: 'wizardStepNav' }).vm.$emit('update:current-step', 7)
    await flushPromises()
    expect(currentStep()).toBe('PlanInformacionGeneral')
    expect(service.generarPlan).not.toHaveBeenCalled()
  })
  it('generacion exige validacion y cuatro firmas, guarda observaciones y envia a revision', async () => {
    await render()
    await advanceTo(7)
    const generate = () =>
      wrapper.findAll('button').find((button) => button.text() === 'Generar Plan')
    expect(generate().attributes('disabled')).toBeDefined()
    model().revision.validacionInformacion = true
    for (const key of ['usuario', 'pedagogia', 'sst', 'coordinacion'])
      model().revision[key].firma = `${key}.png`
    model().observaciones = 'Revisar horario'
    await flushPromises()
    expect(generate().attributes('disabled')).toBeUndefined()
    await click('Generar Plan')
    wrapper.getComponent({ name: 'BaseConfirmationDialog' }).vm.$emit('confirm')
    await flushPromises()
    expect(service.updatePlan).toHaveBeenCalledWith('plan-1', { observaciones: 'Revisar horario' })
    expect(service.generarPlan).toHaveBeenCalledWith('plan-1')
    expect(notifySuccess).toHaveBeenCalledWith('Plan generado correctamente')
    expect(push).toHaveBeenCalledWith({ name: 'planes.stage', params: { id: 'plan-1' } })
  })
  it('normaliza referencias pobladas al editar y actualiza en vez de crear', async () => {
    route.params = { id: 'plan-1' }
    service.getPlanById.mockResolvedValue({
      ...createPlanContingenciaModel(),
      _id: 'plan-1',
      ficha: null,
      programaFormacionId: { _id: 'p1', nombre: 'Produccion', ficha: '3174863' },
      usuarioId: { _id: 'u1' },
      actividadId: { id: 'act1' },
      aprendicesId: [{ _id: 'a1' }],
      riesgosId: [{ _id: 'r1' }],
      epp: [{ _id: 'e1' }],
      contactosEmergencia: { contactosBase: [{ _id: 'c1' }], otro: { nombreEntidad: 'Hospital' } },
      revision: { pedagogia: { estado: 'aprobado', firma: 'anterior.png' } },
    })
    await render()
    expect(model()).toMatchObject({
      programaFormacionId: 'p1',
      programaFormacionNombre: 'Produccion',
      ficha: '3174863',
      actividadId: 'act1',
      usuarioId: 'u1',
      aprendicesId: ['a1'],
      riesgosId: ['r1'],
      epp: ['e1'],
      contactosEmergencia: { contactosBase: ['c1'], otro: [{ nombreEntidad: 'Hospital' }] },
    })
    expect(model().revision.pedagogia.firma).toBeNull()
    await click('Siguiente')
    expect(service.updatePlan).toHaveBeenCalledWith(
      'plan-1',
      expect.objectContaining({ epp: ['e1'] }),
    )
    expect(service.createPlan).not.toHaveBeenCalled()
  })
  it.each([
    ['', 'Observación del revisor'],
    [
      'Nueva observación del autor',
      'Observación del revisor\nObservaciones del autor: Nueva observación del autor',
    ],
  ])(
    'mantiene separadas las observaciones previas y las nuevas al editar (%j)',
    async (newObservation, expectedObservations) => {
      route.params = { id: 'plan-1' }
      service.getPlanById.mockResolvedValue({
        ...createPlanContingenciaModel(),
        _id: 'plan-1',
        observaciones: 'Observación del revisor',
      })
      await render()
      expect(model().observaciones).toBe('')

      await advanceTo(7)
      model().observaciones = newObservation
      model().revision.validacionInformacion = true
      for (const key of ['usuario', 'pedagogia', 'sst', 'coordinacion'])
        model().revision[key].firma = `${key}.png`
      await flushPromises()

      await click('Generar Plan')
      wrapper.getComponent({ name: 'BaseConfirmationDialog' }).vm.$emit('confirm')
      await flushPromises()

      expect(service.updatePlan).toHaveBeenLastCalledWith('plan-1', {
        observaciones: expectedObservations,
      })
    },
  )
  it('no vuelve a asociar participantes si la seleccion no cambio', async () => {
    await render()
    await advanceTo(4)
    await click('Siguiente')
    expect(service.asociarAprendices).not.toHaveBeenCalled()
  })
  it('error de carga muestra estado de error y no presenta un borrador vacio como real', async () => {
    route.params = { id: 'missing' }
    const error = new Error('Plan no encontrado')
    service.getPlanById.mockRejectedValue(error)
    await render()
    expect(wrapper.text()).toContain('No se pudo cargar el borrador')
    expect(currentStep()).toBeUndefined()
    expect(notifyError).toHaveBeenCalledWith(error)
  })
  it('cancelar vuelve sin crear ni generar', async () => {
    await render()
    await click('Cancelar')
    expect(back).toHaveBeenCalledOnce()
    expect(service.createPlan).not.toHaveBeenCalled()
    expect(service.generarPlan).not.toHaveBeenCalled()
  })
})
