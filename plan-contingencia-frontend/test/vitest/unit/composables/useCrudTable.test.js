import { afterEach, describe, expect, it } from 'vitest'
import { effectScope, nextTick, ref } from 'vue'
import { useCrudTable } from 'src/composables/useCrudTable'

let scope
function createTable() {
  scope = effectScope()
  const sourceRows = ref([
    { id: 12, nombre: 'Producción' },
    { id: 123, nombre: 'Sistemas' },
    { id: 2 },
  ])
  return {
    table: scope.run(() =>
      useCrudTable({ sourceRows, defaultRowsPerPage: 2, exactSearchField: 'id' }),
    ),
    sourceRows,
  }
}
afterEach(() => scope?.stop())

describe('useCrudTable', () => {
  it('busca id exactamente, no por prefijo', () => {
    const { table } = createTable()
    table.searchText.value = ' 12 '
    expect(table.filteredRows.value.map((row) => row.id)).toEqual([12])
  })
  it('busca texto parcialmente y normaliza acentos', () => {
    const { table } = createTable()
    table.selectedFilter.value = 'nombre'
    table.searchText.value = 'PRODUCCION'
    expect(table.filteredRows.value.map((row) => row.id)).toEqual([12])
  })
  it('tolera campos ausentes y busqueda vacia', () => {
    const { table } = createTable()
    table.selectedFilter.value = 'nombre'
    table.searchText.value = 'xyz'
    expect(table.filteredRows.value).toEqual([])
    table.searchText.value = ' '
    expect(table.filteredRows.value).toHaveLength(3)
  })
  it('pagina, convierte el tamano numerico y ajusta pagina cuando cambian los datos', async () => {
    const { table, sourceRows } = createTable()
    table.currentPage.value = 2
    expect(table.paginatedRows.value).toEqual([{ id: 2 }])
    expect([table.totalPages.value, table.startRow.value, table.endRow.value]).toEqual([2, 3, 3])
    table.setRowsPerPage('1')
    expect([table.rowsPerPage.value, table.currentPage.value]).toEqual([1, 1])
    table.currentPage.value = 3
    sourceRows.value = []
    await nextTick()
    expect([
      table.currentPage.value,
      table.totalPages.value,
      table.startRow.value,
      table.endRow.value,
    ]).toEqual([1, 1, 0, 0])
  })
})
