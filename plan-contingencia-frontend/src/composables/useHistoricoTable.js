import { computed, ref, watch } from 'vue'

export function usePlanesHistoricoTable({
    sourceRows,
    defaultRowsPerPage = 8
}) {

    const selectedStatus = ref('todos')
    const dateFrom = ref('')
    const dateTo = ref('')
    const searchText = ref('')

    const currentPage = ref(1)
    const rowsPerPage = ref(defaultRowsPerPage)

    function normalizeText(text) {

        return String(text)
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .toLowerCase()
            .trim()
    }

    const filteredRows = computed(() => {

        const search = normalizeText(searchText.value)

        return sourceRows.value.filter(plan => {

            const matchesStatus =
                selectedStatus.value === 'todos' ||
                normalizeText(plan.estado) === normalizeText(selectedStatus.value)

            const matchesSearch =
                !search ||
                [
                    plan.ficha,
                    plan.programaFormacionNombre,
                    plan.descripcionActividad
                ]
                    .filter(Boolean)
                    .some(value =>
                        normalizeText(value).includes(search)
                    )

            const matchesDateFrom =
                !dateFrom.value ||
                plan.fechaCierre >= dateFrom.value

            const matchesDateTo =
                !dateTo.value ||
                plan.fechaCierre <= dateTo.value

            return (
                matchesStatus &&
                matchesSearch &&
                matchesDateFrom &&
                matchesDateTo
            )

        })
    })

    const totalPages = computed(() => {

        return Math.max(
            1,
            Math.ceil(
                filteredRows.value.length /
                rowsPerPage.value
            )
        )
    })

    const paginatedRows = computed(() => {

        const start =
            (currentPage.value - 1) *
            rowsPerPage.value
        const end =
            start + rowsPerPage.value
        return filteredRows.value.slice(start, end)
    })

    const startRow = computed(() => {

        if (!filteredRows.value.length) {
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
        rowsPerPage.value = value
        currentPage.value = 1
    }

    watch(
        [
            selectedStatus,
            dateFrom,
            dateTo,
            searchText
        ],
        () => {
            currentPage.value = 1
        }
    )

    watch(totalPages, (value) => {

        if (currentPage.value > value) {
            currentPage.value = value
        }
    })

    return {
        selectedStatus,
        dateFrom,
        dateTo,
        searchText,
        currentPage,
        rowsPerPage,
        filteredRows,
        paginatedRows,
        totalPages,
        startRow,
        endRow,
        setRowsPerPage
    }
}