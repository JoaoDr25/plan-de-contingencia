import { computed, ref } from 'vue'

const textCollator = new Intl.Collator('es', { numeric: true, sensitivity: 'base' })

export function useSortableRows({ sourceRows, sortValues }) {
  const sortBy = ref(null)
  const sortDirection = ref('asc')

  const sortedRows = computed(() => {
    const getValue = sortValues[sortBy.value]

    if (!getValue) {
      return sourceRows.value
    }

    const direction = sortDirection.value === 'asc' ? 1 : -1

    return [...sourceRows.value].sort((left, right) => {
      const leftValue = String(getValue(left) ?? '')
      const rightValue = String(getValue(right) ?? '')

      return textCollator.compare(leftValue, rightValue) * direction
    })
  })

  function toggleSort(column) {
    if (sortBy.value === column) {
      sortDirection.value = sortDirection.value === 'asc' ? 'desc' : 'asc'
      return
    }

    sortBy.value = column
    sortDirection.value = 'asc'
  }

  function getSortIcon(column) {
    if (sortBy.value !== column) {
      return 'unfold_more'
    }

    return sortDirection.value === 'asc' ? 'arrow_upward' : 'arrow_downward'
  }

  function getSortAria(column) {
    if (sortBy.value !== column) {
      return 'none'
    }

    return sortDirection.value === 'asc' ? 'ascending' : 'descending'
  }

  return { sortedRows, toggleSort, getSortIcon, getSortAria }
}
