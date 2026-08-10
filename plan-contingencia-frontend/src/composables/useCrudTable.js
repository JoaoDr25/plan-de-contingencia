import { ref, computed } from "vue"

export function useCrudTable({
    sourceRows,
    defaultFilter = 'id',
    exactSearchField = null,
    defaultRowsPerPage
}) {

    const selectedFilter = ref(defaultFilter)
    const searchText = ref('')

    const currentPage = ref(1)
    const rowsPerPage = ref(defaultRowsPerPage)

    function normalizeText(text) {

        return String(text)
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .toLowerCase()
    }

    const filteredRows = computed(() => {

        const search = normalizeText(searchText.value.trim())

        if (!search) {
            return sourceRows.value
        }
        return sourceRows.value.filter((row) => {
            const value = normalizeText(row[selectedFilter.value] ?? '')

            if (exactSearchField === selectedFilter.value) {
                return value === search
            }
            return value.includes(search)
        })
    })

    const totalPages = computed(() => {
        return Math.max(
            1,
            Math.ceil(filteredRows.value.length / rowsPerPage.value)
        )

    })

    const paginatedRows = computed(() => {
        const start = (currentPage.value - 1) * rowsPerPage.value
        const end = start + rowsPerPage.value

        return filteredRows.value.slice(start, end)
    })

    const startRow = computed(() => {
        if (filteredRows.value.length === 0) {
            return 0
        }
        return (currentPage.value - 1) * rowsPerPage.value + 1
    })

    const endRow = computed(() => {
        return Math.min(
            currentPage.value * rowsPerPage.value,
            filteredRows.value.length
        )
    })

    return {
        selectedFilter,
        searchText,
        currentPage,
        rowsPerPage,
        filteredRows,
        paginatedRows,
        totalPages,
        startRow,
        endRow
    }
}



