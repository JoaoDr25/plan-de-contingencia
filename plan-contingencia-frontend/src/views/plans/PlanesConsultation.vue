<template>

    <BasePage>

        <CrudHeader title="Planes de Contingencia" :uppercase-title="true" />

        <PlanSectionNav />

        <CrudToolbar>

            <template #center>

                <BaseFilterBar class="consulta-filter-bar">

                    <BaseSearch v-model="codigoPlan" size="filter" label="Código del plan" placeholder="Ej. PC-2024-0001" />

                    <BaseSearch v-model="ficha" size="filter" label="Ficha" placeholder="Buscar por ficha..." />

                    <BaseSearch v-model="programaFormacion" size="filter" label="Programa de Formación"
                        placeholder="Buscar programa..." />

                    <BaseSearch v-model="actividad" size="filter" label="Actividad" placeholder="Buscar actividad..." />

                    <BaseSearch v-model="instructor" size="filter" label="Instructor"
                        placeholder="Buscar instructor..." />

                    <BaseSelect v-model="selectedStatus" label="Estado" :options="PLAN_STATUS_OPTIONS" size="filter"
                        :show-icon="false" />

                    <BaseDatePicker v-model="dateFrom" label="Fecha desde" size="filter" :max="dateTo" />

                    <BaseDatePicker v-model="dateTo" label="Fecha hasta" size="filter" :min="dateFrom" />

                    <BaseClearFilters align-right @clear="clearFilters" />

                </BaseFilterBar>

            </template>

        </CrudToolbar>

        <BaseTable :rows="paginatedRows" :columns="PLANES_CONSULTA_COLUMNS" :loading="loading"
            :current-page="currentPage" :total-pages="totalPages" :rows-per-page="rowsPerPage" :start="startRow"
            :end="endRow" :total="filteredRows.length" @change-page="currentPage = $event"
            @change-rows-per-page="setRowsPerPage">

            <template #body-cell-estado="props">

                <q-td :props="props">

                    <StatusChip :status="props.value" />

                </q-td>

            </template>

            <template #body-cell-opciones="props">

                <q-td :props="props">

                    <PlanActions :actions="['view']" @view="viewPlan(props.row)" />

                </q-td>

            </template>

        </BaseTable>

    </BasePage>

</template>

<script setup>

import { ref } from 'vue'
import { useRouter } from 'vue-router'

import BasePage from 'src/components/base/BasePage.vue'
import CrudHeader from 'src/components/cruds/CrudHeader.vue'
import CrudToolbar from 'src/components/cruds/CrudToolbar.vue'
import BaseFilterBar from 'src/components/base/BaseFilterBar.vue'
import BaseSearch from 'src/components/forms/BaseSearch.vue'
import BaseSelect from 'src/components/forms/BaseSelect.vue'
import BaseDatePicker from 'src/components/forms/BaseDatePicker.vue'
import BaseClearFilters from 'src/components/base/BaseClearFilters.vue'
import BaseTable from 'src/components/tables/BaseTable.vue'
import StatusChip from 'src/components/states/StatusChip.vue'
import PlanActions from 'src/components/actions/PlanActions.vue'
import PlanSectionNav from 'src/components/plans/PlanSectionNav.vue'

import { PLAN_STATUS_OPTIONS } from 'src/constants/filters/planes.constants'
import { PLANES_CONSULTA_COLUMNS } from 'src/constants/tables/consulta.columns'
import { PLANES_CONSULTA_MOCK } from 'src/mocks/consulta.mock'

import { usePlanesConsultaTable } from 'src/composables/useConsultaTable'

const router = useRouter()

const sourceRows = ref(PLANES_CONSULTA_MOCK)

const loading = ref(false)

const {
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
} = usePlanesConsultaTable({
    sourceRows,
    defaultRowsPerPage: 8
})

function viewPlan(row) {

    router.push({
        name: 'planes.detail',
        params: {
            id: row._id
        }
    })
}

function clearFilters() {
    codigoPlan.value = ''
    ficha.value = ''
    programaFormacion.value = ''
    actividad.value = ''
    instructor.value = ''
    selectedStatus.value = 'todos'
    dateFrom.value = ''
    dateTo.value = ''
}

</script>

<style scoped lang="scss">

@use 'src/css/variables.scss' as *;
@use 'src/css/typography.scss' as *;

.consulta-filter-bar {
    justify-content: flex-start;
    align-items: center;
    column-gap: 19px;
}

.consulta-filter-bar :deep(.base-search) {
    width: 260px;
}

.consulta-filter-bar :deep(.base-search .q-field) {
    font-size: $font-size-xs;
}

.consulta-filter-bar :deep(.base-search .q-field__native),
.consulta-filter-bar :deep(.base-search .q-field__input) {
    font-size: $font-size-xs;
    padding-top: 12px;
    padding-left: 2px;
}

.consulta-filter-bar :deep(.base-search input::placeholder) {
    font-size: $font-size-xs;
}

.consulta-filter-bar :deep(.base-search .q-field__label) {
    font-size: $font-size-xs;
    line-height: 20px;
}

@media (max-width: 1100px) {

    .consulta-filter-bar {
        justify-content: flex-start;
    }
}

@media (max-width: 700px) {

    .consulta-filter-bar {
        justify-content: flex-start;
    }
}

@media (max-width: 600px) {

    .consulta-filter-bar {
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }

    .consulta-filter-bar :deep(.base-search) {
        width: 240px;
        min-width: 240px;
        max-width: 100%;
    }

    .consulta-filter-bar :deep(.base-search .q-field) {
        width: 100%;
    }

    .consulta-filter-bar :deep(.base-select--filter),
    .consulta-filter-bar :deep(.base-date-picker--filter) {
        width: 240px;
        min-width: 240px;
        max-width: 100%;
    }

    .consulta-filter-bar :deep(.base-clear-filters) {
        align-self: center;
        margin-left: 0;
    }
}
</style>