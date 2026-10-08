import { afterEach, describe, expect, it } from 'vitest'
import { effectScope, nextTick, ref } from 'vue'
import { usePlanesConsultaTable } from 'src/composables/useConsultaTable'

const states = ['borrador', 'en revision', 'aprobado', 'ejecutado', 'cancelado']
const rows = states.map((estado, index) => ({
  _id: String(index),
  codigoPlan: `PC-2026-${index + 1}`,
  numero: index + 1,
  ficha: index === 0 ? '3174863' : '999000',
  programaFormacionNombre: index < 2 ? 'Produccion Agropecuaria' : 'Sistemas',
  descripcionActividad: index === 0 ? 'Visita tecnica al campo' : 'Taller',
  instructorNombre: index < 2 ? 'Maria Perez' : 'Juan Gomez',
  estado,
  createdAt: `2026-08-${String(10 + index).padStart(2, '0')}T15:30:00-05:00`,
}))

let scope
function createTable(source = rows, defaultRowsPerPage = 2) {
  scope = effectScope()
  const sourceRows = ref(source.map((row) => ({ ...row })))
  const table = scope.run(() => usePlanesConsultaTable({ sourceRows, defaultRowsPerPage }))
  return { table, sourceRows }
}
afterEach(() => scope?.stop())

describe('usePlanesConsultaTable', () => {
  it('incluye todos los estados sin filtros', () => {
    const { table } = createTable()
    expect(table.filteredRows.value).toEqual(rows)
  })

  it.each(['pc-2026-1', '  PC-2026-1  ', '1'])('encuentra codigo o numero exacto: %s', (value) => {
    const { table } = createTable()
    table.codigoPlan.value = value
    expect(table.filteredRows.value.map((row) => row._id)).toEqual(['0'])
  })

  it('no confunde un codigo parcial con uno exacto', () => {
    const { table } = createTable()
    table.codigoPlan.value = 'PC-2026'
    expect(table.filteredRows.value).toEqual([])
  })

  it.each([
    ['ficha', '3174', ['0']],
    ['programaFormacion', '  PRODUCCIÓN  ', ['0', '1']],
    ['actividad', 'TÉCNICA', ['0']],
    ['instructor', 'María', ['0', '1']],
  ])('filtra %s parcialmente, sin acentos ni diferencias de mayusculas', (field, value, ids) => {
    const { table } = createTable()
    table[field].value = value
    expect(table.filteredRows.value.map((row) => row._id)).toEqual(ids)
  })

  it.each(states)('filtra el estado %s', (estado) => {
    const { table } = createTable()
    table.selectedStatus.value = estado === 'en revision' ? ' EN REVISIÓN ' : estado
    expect(table.filteredRows.value).toEqual(rows.filter((row) => row.estado === estado))
  })

  it('combina programa, instructor y estado con AND', () => {
    const { table } = createTable()
    table.programaFormacion.value = 'agropecuaria'
    table.instructor.value = 'perez'
    table.selectedStatus.value = 'borrador'
    expect(table.filteredRows.value.map((row) => row._id)).toEqual(['0'])
    table.instructor.value = 'gomez'
    expect(table.filteredRows.value).toEqual([])
  })

  it.each([
    ['2026-08-12', '', ['2', '3', '4']],
    ['', '2026-08-12', ['0', '1', '2']],
    ['2026-08-11', '2026-08-12', ['1', '2']],
    ['2026-08-12', '2026-08-12', ['2']],
  ])('filtra fechas de creacion inclusivas desde %s hasta %s', (from, to, ids) => {
    const { table } = createTable()
    table.dateFrom.value = from
    table.dateTo.value = to
    expect(table.filteredRows.value.map((row) => row._id)).toEqual(ids)
  })

  it('tolera campos ausentes y excluye fechas invalidas cuando hay rango', () => {
    const { table } = createTable([{ _id: 'missing' }, { _id: 'invalid', createdAt: 'invalid' }])
    expect(table.filteredRows.value).toHaveLength(2)
    table.instructor.value = 'maria'
    expect(table.filteredRows.value).toEqual([])
    table.instructor.value = ''
    table.dateFrom.value = '2026-01-01'
    expect(table.filteredRows.value).toEqual([])
  })

  it('calcula paginas, limites y la ultima pagina incompleta', () => {
    const { table } = createTable()
    expect(table.totalPages.value).toBe(3)
    expect(table.paginatedRows.value).toEqual(rows.slice(0, 2))
    expect([table.startRow.value, table.endRow.value]).toEqual([1, 2])
    table.currentPage.value = 3
    expect(table.paginatedRows.value).toEqual(rows.slice(4))
    expect([table.startRow.value, table.endRow.value]).toEqual([5, 5])
  })

  it('reporta una pagina y limites cero sin resultados', () => {
    const { table } = createTable([])
    expect([table.totalPages.value, table.startRow.value, table.endRow.value]).toEqual([1, 0, 0])
    expect(table.paginatedRows.value).toEqual([])
  })

  it.each([
    'codigoPlan',
    'ficha',
    'programaFormacion',
    'actividad',
    'instructor',
    'selectedStatus',
    'dateFrom',
    'dateTo',
  ])('reinicia pagina al cambiar %s', async (field) => {
    const { table } = createTable(Array.from({ length: 20 }, () => rows[0]))
    table.currentPage.value = 4
    table[field].value = field === 'selectedStatus' ? 'borrador' : ' '
    await nextTick()
    expect(table.currentPage.value).toBe(1)
  })

  it('reinicia al cambiar tamano y ajusta pagina si disminuyen los datos', async () => {
    const { table, sourceRows } = createTable()
    table.currentPage.value = 3
    table.setRowsPerPage(3)
    expect([table.rowsPerPage.value, table.currentPage.value]).toEqual([3, 1])
    table.currentPage.value = 2
    sourceRows.value = [rows[0]]
    await nextTick()
    expect(table.currentPage.value).toBe(1)
  })
})
