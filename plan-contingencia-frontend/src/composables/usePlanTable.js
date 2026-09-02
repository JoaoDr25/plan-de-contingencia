import { ref, computed, watch } from 'vue'

export function usePlansTable({
    sourceRows,
    defaultStatus = 'todos',
    defaultRowsPerPage = 8
}) {

    const selectedStatus = ref(defaultStatus)
    const searchText = ref('')

    const currentPage = ref(1)
    const rowsPerPage = ref(defaultRowsPerPage)

    const SEARCH_FIELDS = [
        'numero',
        'programaFormacionNombre',
        'descripcionActividad',
        'usuarioNombre'
    ]

    function normalizeText(text) {

        return String(text)
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .toLowerCase()
            .trim()
    }

    const filteredRows = computed(() => {

        const search = normalizeText(searchText.value)

        return sourceRows.value.filter((plan) => {

            const matchesStatus =
                selectedStatus.value === 'todos'
                ||
                normalizeText(plan.estado) === normalizeText(selectedStatus.value)
            if (!matchesStatus) {
                return false
            }
            if (!search) {
                return true
            }
            return SEARCH_FIELDS.some((field) => {
                const value = normalizeText(plan[field])
                return value.includes(search)
            })
        })
    })

    const totalPages = computed(() => {

        return Math.max(
            1,
            Math.ceil(
                filteredRows.value.length / rowsPerPage.value
            )
        )
    })

    watch(
        [searchText, selectedStatus],
        () => {
            currentPage.value = 1
        }
    )

    watch(totalPages, (newTotalPages) => {

        if (currentPage.value > newTotalPages) {
            currentPage.value = newTotalPages
        }
    })

    const paginatedRows = computed(() => {

        const start =
            (currentPage.value - 1) * rowsPerPage.value
        const end =
            start + rowsPerPage.value

        return filteredRows.value.slice(start, end)
    })

    const startRow = computed(() => {

        if (filteredRows.value.length === 0) {
            return 0
        }
        return (
            (currentPage.value - 1) *
            rowsPerPage.value
        ) + 1
    })

    const endRow = computed(() => {

        return Math.min(
            currentPage.value * rowsPerPage.value,
            filteredRows.value.length
        )
    })

    function setRowsPerPage(value) {

        rowsPerPage.value = Number(value)
        currentPage.value = 1
    }

    function resetFilters() {

        searchText.value = ''
        selectedStatus.value = defaultStatus
        currentPage.value = 1
    }

    return {

        selectedStatus,
        searchText,
        currentPage,
        rowsPerPage,
        filteredRows,
        paginatedRows,
        totalPages,
        startRow,
        endRow,
        setRowsPerPage,
        resetFilters
    }
}