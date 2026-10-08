import { afterEach, describe, expect, it } from 'vitest'
import { effectScope, nextTick, ref } from 'vue'
import { usePlansTable } from 'src/composables/usePlanTable'

let scope
const rows = [
  {
    numero: 12,
    programaFormacionNombre: 'Producción',
    descripcionActividad: 'Visita',
    usuarioNombre: 'María',
    estado: 'borrador',
  },
  {
    numero: 13,
    programaFormacionNombre: 'Sistemas',
    descripcionActividad: 'Taller',
    usuarioNombre: 'Juan',
    estado: 'aprobado',
  },
  {
    numero: 14,
    programaFormacionNombre: 'Sistemas',
    descripcionActividad: 'Visita',
    usuarioNombre: 'Juan',
    estado: 'ejecutado',
  },
]
function createTable(options = {}) {
  scope = effectScope()
  const sourceRows = ref(rows)
  return {
    table: scope.run(() => usePlansTable({ sourceRows, defaultRowsPerPage: 2, ...options })),
    sourceRows,
  }
}
afterEach(() => scope?.stop())

describe('usePlansTable', () => {
  it.each(['12', ' produccion ', 'VISITA', 'maria'])(
    'busca en los campos del plan: %s',
    (query) => {
      const { table } = createTable({ defaultStatus: 'borrador' })
      table.searchText.value = query
      expect(table.filteredRows.value).toEqual([rows[0]])
    },
  )
  it('combina estado y busqueda', () => {
    const { table } = createTable()
    table.searchText.value = 'sistemas'
    table.selectedStatus.value = 'APROBADO'
    expect(table.filteredRows.value).toEqual([rows[1]])
  })
  it('pagina y restaura filtros al estado inicial', async () => {
    const { table } = createTable()
    expect(table.totalPages.value).toBe(2)
    table.currentPage.value = 2
    expect(table.paginatedRows.value).toEqual([rows[2]])
    expect([table.startRow.value, table.endRow.value]).toEqual([3, 3])
    table.searchText.value = 'visita'
    await nextTick()
    expect(table.currentPage.value).toBe(1)
    table.setRowsPerPage('1')
    expect(table.rowsPerPage.value).toBe(1)
    table.selectedStatus.value = 'aprobado'
    table.resetFilters()
    expect(table.searchText.value).toBe('')
    expect(table.selectedStatus.value).toBe('todos')
  })
  it('ajusta pagina al reducir la fuente y maneja vacios', async () => {
    const { table, sourceRows } = createTable()
    table.currentPage.value = 2
    sourceRows.value = []
    await nextTick()
    expect(table.currentPage.value).toBe(1)
    expect([table.totalPages.value, table.startRow.value, table.endRow.value]).toEqual([1, 0, 0])
  })
})
