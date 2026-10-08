import { afterEach, describe, expect, it } from 'vitest'
import { effectScope, nextTick, ref } from 'vue'
import { usePlanesHistoricoTable } from 'src/composables/useHistoricoTable'

const rows = [
  {
    _id: '1',
    estado: 'ejecutado',
    ficha: '3174863',
    programaFormacionNombre: 'Produccion Agropecuaria',
    descripcionActividad: 'Visita tecnica',
    createdAt: '2026-01-01',
    fechaCierre: '2026-08-10T15:00:00-05:00',
  },
  {
    _id: '2',
    estado: ' CANCELADO ',
    ficha: '999000',
    programaFormacionNombre: 'Sistemas',
    descripcionActividad: 'Taller',
    createdAt: '2026-01-02',
    fechaCierre: '2026-08-12T15:00:00-05:00',
  },
  ...['borrador', 'en revision', 'aprobado'].map((estado) => ({
    _id: estado,
    estado,
    fechaCierre: '2026-08-10',
  })),
]
let scope
function createTable(source = rows) {
  scope = effectScope()
  const sourceRows = ref(source)
  return {
    table: scope.run(() => usePlanesHistoricoTable({ sourceRows, defaultRowsPerPage: 1 })),
    sourceRows,
  }
}
afterEach(() => scope?.stop())

describe('usePlanesHistoricoTable', () => {
  it('solo incluye ejecutados y cancelados, incluso con mayusculas o espacios', () => {
    const { table } = createTable()
    expect(table.filteredRows.value.map((row) => row._id)).toEqual(['1', '2'])
  })
  it.each([
    ['ejecutado', ['1']],
    ['cancelado', ['2']],
    ['aprobado', []],
  ])('filtra %s', (estado, ids) => {
    const { table } = createTable()
    table.selectedStatus.value = estado
    expect(table.filteredRows.value.map((row) => row._id)).toEqual(ids)
  })
  it.each(['3174', 'PRODUCCIÓN', 'técnica'])('busca ficha, programa o actividad: %s', (query) => {
    const { table } = createTable()
    table.searchText.value = query
    expect(table.filteredRows.value.map((row) => row._id)).toEqual(['1'])
  })
  it.each([
    ['2026-08-11', '', ['2']],
    ['', '2026-08-10', ['1']],
    ['2026-08-10', '2026-08-10', ['1']],
    ['2026-08-10', '2026-08-12', ['1', '2']],
  ])('usa fecha de cierre inclusiva, no createdAt (%s / %s)', (from, to, ids) => {
    const { table } = createTable()
    table.dateFrom.value = from
    table.dateTo.value = to
    expect(table.filteredRows.value.map((row) => row._id)).toEqual(ids)
  })
  it('no inventa cierre para registros sin fecha o con fecha invalida', () => {
    const { table } = createTable([
      { estado: 'ejecutado', createdAt: '2026-08-10' },
      { estado: 'cancelado', fechaCierre: 'invalid' },
    ])
    expect(table.filteredRows.value).toHaveLength(2)
    table.dateTo.value = '2026-08-12'
    expect(table.filteredRows.value).toEqual([])
  })
  it('combina busqueda, estado y cierre', () => {
    const { table } = createTable()
    table.searchText.value = 'sistemas'
    table.selectedStatus.value = 'cancelado'
    table.dateFrom.value = '2026-08-12'
    table.dateTo.value = '2026-08-12'
    expect(table.filteredRows.value.map((row) => row._id)).toEqual(['2'])
  })
  it('pagina y reinicia al cambiar filtros o tamano', async () => {
    const { table, sourceRows } = createTable()
    expect(table.totalPages.value).toBe(2)
    table.currentPage.value = 2
    expect(table.paginatedRows.value).toEqual([rows[1]])
    expect([table.startRow.value, table.endRow.value]).toEqual([2, 2])
    table.searchText.value = 'taller'
    await nextTick()
    expect(table.currentPage.value).toBe(1)
    table.setRowsPerPage(8)
    expect(table.rowsPerPage.value).toBe(8)
    sourceRows.value = []
    await nextTick()
    expect([table.totalPages.value, table.startRow.value, table.endRow.value]).toEqual([1, 0, 0])
  })
})
