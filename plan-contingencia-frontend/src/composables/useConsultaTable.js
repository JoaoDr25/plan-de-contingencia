import { computed, ref, watch } from 'vue'

export function usePlanesConsultaTable({
    sourceRows,
    defaultRowsPerPage = 8
}) {
    const codigoPlan = ref('')
    const ficha = ref('')
    const programaFormacion = ref('')
    const actividad = ref('')
    const instructor = ref('')
    const selectedStatus = ref('todos')
    const dateFrom = ref('')
    const dateTo = ref('')

    const currentPage = ref(1)
    const rowsPerPage = ref(defaultRowsPerPage)

    function normalizeText(value) {

        return String(value ?? '')
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .toLowerCase()
            .trim()
    }

    const filteredRows = computed(() => {
        const rows = sourceRows.value || []

        return rows.filter(row => {

            const codigo = normalizeText(codigoPlan.value)
            const matchesCodigo =
                !codigo ||
                normalizeText(row.codigoPlan) === codigo ||
                normalizeText(row.numero) === codigo

            const matchesFicha =
                !ficha.value ||
                normalizeText(row.ficha).includes(normalizeText(ficha.value))

            const matchesPrograma =
                !programaFormacion.value ||
                normalizeText(row.programaFormacionNombre)
                    .includes(normalizeText(programaFormacion.value))

            const matchesActividad =
                !actividad.value ||
                normalizeText(row.descripcionActividad)
                    .includes(normalizeText(actividad.value))

            const matchesInstructor =
                !instructor.value ||
                normalizeText(row.instructorNombre)
                    .includes(normalizeText(instructor.value))

            const matchesStatus =
                normalizeText(selectedStatus.value) === 'todos' ||
                normalizeText(row.estado) === normalizeText(selectedStatus.value)

            const matchesDateFrom =
                !dateFrom.value ||
                row.createdAt >= dateFrom.value

            const matchesDateTo =
                !dateTo.value ||
                row.createdAt <= dateTo.value

            return (
                matchesCodigo &&
                matchesFicha &&
                matchesPrograma &&
                matchesActividad &&
                matchesInstructor &&
                matchesStatus &&
                matchesDateFrom &&
                matchesDateTo
            )
        })
    })

    const totalPages = computed(() => {
        if (!filteredRows.value.length) {
            return 1
        }

        return Math.ceil(
            filteredRows.value.length / rowsPerPage.value
        )
    })

    const paginatedRows = computed(() => {
        const start = (currentPage.value - 1) * rowsPerPage.value
        const end = start + rowsPerPage.value

        return filteredRows.value.slice(start, end)
    })

    const startRow = computed(() => {
        if (!filteredRows.value.length) {
            return 0
        }

        return (currentPage.value - 1) * rowsPerPage.value + 1
    })

    const endRow = computed(() => {
        if (!filteredRows.value.length) {
            return 0
        }

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
            codigoPlan,
            ficha,
            programaFormacion,
            actividad,
            instructor,
            selectedStatus,
            dateFrom,
            dateTo
        ],
        () => {
            currentPage.value = 1
        }
    )

    watch(totalPages, newTotalPages => {
        if (currentPage.value > newTotalPages) {
            currentPage.value = newTotalPages
        }
    })

    return {
        codigoPlan,
        ficha,
        programaFormacion,
        actividad,
        instructor,
        selectedStatus,
        dateFrom,
        dateTo,
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