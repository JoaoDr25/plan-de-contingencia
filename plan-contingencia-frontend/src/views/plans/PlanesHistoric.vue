<template> 

    <BasePage>

        <CrudHeader title="Planes de Contingencia" :uppercase-title="true" />

        <PlanSectionNav />

        <CrudToolbar>

            <template #center>

                <BaseFilterBar class="historico-filter-bar">

                    <BaseSelect v-model="selectedStatus" label="Estado" :options="HISTORICO_STATUS_OPTIONS"
                        size="filter" :show-icon="false" />

                    <BaseDatePicker v-model="dateFrom" label="Fecha desde" size="filter" :max="dateTo" />

                    <BaseDatePicker v-model="dateTo" label="Fecha hasta" size="filter" :min="dateFrom" />

                    <div class="historico-filter-actions">

                        <BaseSearch v-model="searchText" size="filter" placeholder="Buscar por código, programa o actividad..." />

                        <BaseClearFilters @clear="clearFilters" />

                    </div>

                </BaseFilterBar>

            </template>

        </CrudToolbar>

        <BaseTable :rows="paginatedRows" :columns="PLANES_HISTORICO_COLUMNS" :loading="loading"
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
import BaseSelect from 'src/components/forms/BaseSelect.vue'
import BaseDatePicker from 'src/components/forms/BaseDatePicker.vue'
import BaseSearch from 'src/components/forms/BaseSearch.vue'
import BaseClearFilters from 'src/components/base/BaseClearFilters.vue'
import BaseTable from 'src/components/tables/BaseTable.vue'
import StatusChip from 'src/components/states/StatusChip.vue'
import PlanActions from 'src/components/actions/PlanActions.vue'
import PlanSectionNav from 'src/components/plans/PlanSectionNav.vue'

import { HISTORICO_STATUS_OPTIONS } from 'src/constants/filters/historico.constants'
import { PLANES_HISTORICO_COLUMNS } from 'src/constants/tables/historico.columns'
import { PLANES_HISTORICO_MOCK } from 'src/mocks/historico.mock'

import { usePlanesHistoricoTable } from 'src/composables/useHistoricoTable'

const router = useRouter()

const sourceRows = ref(PLANES_HISTORICO_MOCK)

const loading = ref(false)

const {
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
} = usePlanesHistoricoTable({
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
    selectedStatus.value = 'todos'
    dateFrom.value = ''
    dateTo.value = ''
    searchText.value = ''
}

</script>

<style scoped lang="scss">

@use 'src/css/variables.scss' as *;
@use 'src/css/typography.scss' as *;

.historico-filter-bar {
    justify-content: flex-start;
    align-items: center;
}

.historico-filter-actions {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-left: auto;
    min-width: 0;
}

@media (max-width: 1494px) and (min-width: 601px) {

    .historico-filter-actions {
        flex: 1 1 auto;
        justify-content: space-between;
        margin-left: 0;
    }
}

@media (max-width: 700px) {

    .historico-filter-actions {
        width: 100%;
        margin-left: 0;
        padding-left: 0;
    }
}

@media (max-width: 550px) {

    .historico-filter-actions {
        flex-direction: column;
        align-items: stretch;
        padding-left: 0;
    }

    .historico-filter-actions :deep(.base-clear-filters) {
        align-self: flex-end;
    }
}

@media (max-width: 600px) {

    .historico-filter-bar {
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }

    .historico-filter-bar :deep(.base-select--filter),
    .historico-filter-bar :deep(.base-date-picker--filter) {
        width: 240px;
        min-width: 240px;
        max-width: 100%;
    }

    .historico-filter-actions {
        flex-direction: column;
        align-items: center;
        width: 240px;
        max-width: 100%;
        margin-left: 0;
    }

    .historico-filter-actions :deep(.base-search) {
        width: 240px;
        min-width: 240px;
        max-width: 100%;
    }

    .historico-filter-actions :deep(.base-search .q-field) {
        width: 100%;
    }

    .historico-filter-actions :deep(.base-clear-filters) {
        align-self: center;
        margin-left: 0;
    }
}
</style>