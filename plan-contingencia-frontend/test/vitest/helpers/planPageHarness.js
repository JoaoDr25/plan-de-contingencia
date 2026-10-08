import { vi } from 'vitest'
import { flushPromises, shallowMount } from '@vue/test-utils'
import { defineComponent, h } from 'vue'

const { push, route, auth } = vi.hoisted(() => ({
  push: vi.fn(),
  route: { query: {} },
  auth: { role: 'CONSULTOR', currentUser: { _id: 'u1', nombre: 'Maria', apellido: 'Perez' } },
}))
export { push, route, auth }
vi.mock('vue-router', () => ({ useRouter: () => ({ push }), useRoute: () => route }))
vi.mock('src/stores/auth.store', () => ({ useAuthStore: () => auth }))
vi.mock('src/services/plans/planContingenciaService', () => ({
  default: { getPlanes: vi.fn(), deletePlan: vi.fn() },
}))
vi.mock('src/utils/notifications.utils', () => ({ notifyError: vi.fn(), notifySuccess: vi.fn() }))

export const rows = [
  {
    _id: 'p1',
    numero: 1,
    codigoPlan: 'PC-1',
    estado: 'borrador',
    ficha: '3174863',
    programaFormacionNombre: 'Produccion',
    descripcionActividad: 'Visita',
    usuarioId: 'u1',
    usuarioNombre: 'Maria Perez',
    instructorNombre: 'Maria Perez',
    createdAt: '2026-08-10',
    fechaCierre: null,
  },
  {
    _id: 'p2',
    numero: 2,
    codigoPlan: 'PC-2',
    estado: 'aprobado',
    ficha: '999',
    programaFormacionNombre: 'Sistemas',
    descripcionActividad: 'Taller',
    usuarioId: 'u2',
    usuarioNombre: 'Juan',
    instructorNombre: 'Juan',
    createdAt: '2026-08-11',
    fechaCierre: null,
  },
  {
    _id: 'p3',
    numero: 3,
    codigoPlan: 'PC-3',
    estado: 'ejecutado',
    ficha: '3174863',
    programaFormacionNombre: 'Produccion',
    descripcionActividad: 'Salida',
    usuarioId: 'u1',
    usuarioNombre: 'Maria Perez',
    instructorNombre: 'Maria Perez',
    createdAt: '2026-01-01',
    fechaCierre: '2026-08-12',
  },
  {
    _id: 'p4',
    numero: 4,
    codigoPlan: 'PC-4',
    estado: 'cancelado',
    ficha: '999',
    programaFormacionNombre: 'Sistemas',
    descripcionActividad: 'Taller',
    usuarioId: 'u2',
    usuarioNombre: 'Juan',
    instructorNombre: 'Juan',
    createdAt: '2026-01-02',
    fechaCierre: '2026-08-13',
  },
]
const Table = defineComponent({
  name: 'BaseTable',
  props: [
    'rows',
    'columns',
    'loading',
    'currentPage',
    'totalPages',
    'rowsPerPage',
    'start',
    'end',
    'total',
  ],
  emits: ['change-page', 'change-rows-per-page'],
  setup(props, { slots }) {
    return () =>
      h(
        'div',
        props.rows.map((row) => h('div', { key: row._id }, slots['body-cell-opciones']?.({ row }))),
      )
  },
})
export function mountPage(Page) {
  return shallowMount(Page, {
    global: {
      renderStubDefaultSlot: true,
      stubs: {
        CrudToolbar: { template: '<div><slot name="center" /></div>' },
        BaseTable: Table,
        QTd: { template: '<div><slot /></div>' },
      },
    },
  })
}
export function table(wrapper) {
  return wrapper.getComponent({ name: 'BaseTable' })
}
export function ids(wrapper) {
  return table(wrapper)
    .props('rows')
    .map((row) => row._id)
}
export async function setField(wrapper, name, label, value) {
  const field = wrapper
    .findAllComponents({ name })
    .find((field) => (field.props('label') ?? field.attributes('label')) === label)
  field.vm.$emit('update:modelValue', value)
  await flushPromises()
}
