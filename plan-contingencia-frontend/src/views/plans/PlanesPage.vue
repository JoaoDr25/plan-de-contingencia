<template>0000000000

    <BasePage>

        <CrudHeader title="Planes de Contingencia">

            <template #actions>

                <PrimaryActionButton
                    label="Crear"
                    icon="add_circle_outline"
                    size="sm"
                    @click="createPlan"
                />

            </template>

        </CrudHeader>

        <plan-section-nav />

        <CrudToolbar>

            <template #center>

                <CrudFilters
                    v-model="selectedStatus"
                    :options="PLAN_STATUS_OPTIONS"
                />

            </template>

            <template #left>

                <BaseSearch
                    v-model="searchText"
                    placeholder="Buscar por número, programa, actividad o instructor..."
                />

            </template>

        </CrudToolbar>

        <BaseTable
            :rows="paginatedRows"
            :columns="PLANES_COLUMNS"
            :loading="loading"
            :current-page="currentPage"
            :total-pages="totalPages"
            :rows-per-page="rowsPerPage"
            :start="startRow"
            :end="endRow"
            :total="filteredRows.length"
            @change-page="currentPage = $event"
            @change-rows-per-page="setRowsPerPage"
        >

            <template #body-cell-estado="props">

                <q-td :props="props">

                    <StatusChip :status="props.value" />

                </q-td>

            </template>

            <template #body-cell-opciones="props">

                <q-td :props="props">

                    <CrudActions
                        :actions="DEFAULT_CRUD_ACTIONS"
                        @view="viewPlan(props.row)"
                        @edit="editPlan(props.row)"
                        @delete="deletePlan(props.row)"
                    />

                </q-td>

            </template>

        </BaseTable>

    </BasePage>

</template>


<script setup>

import { ref } from 'vue'
import { useRouter } from 'vue-router'

import { DEFAULT_CRUD_ACTIONS } from 'src/constants/actions/crud_actions.constants'
import { PLAN_STATUS_OPTIONS } from 'src/constants/filters/planes.constants'
import { PLANES_COLUMNS } from 'src/constants/tables/planes.columns'
import { PLANES_MOCK } from 'src/mocks/planes.mock'

import { usePlansTable } from 'src/composables/usePlansTable'

import BasePage from 'src/components/base/BasePage.vue'
import CrudHeader from 'src/components/cruds/CrudHeader.vue'
import CrudToolbar from 'src/components/cruds/CrudToolbar.vue'
import CrudFilters from 'src/components/cruds/CrudFilters.vue'
import BaseSearch from 'src/components/forms/BaseSearch.vue'
import BaseTable from 'src/components/tables/BaseTable.vue'
import StatusChip from 'src/components/states/StatusChip.vue'
import CrudActions from 'src/components/actions/CrudActions.vue'
import PrimaryActionButton from 'src/components/actions/PrimaryActionButton.vue'
import PlanSectionNav from 'src/components/plans/PlanSectionNav.vue'


const router = useRouter()

const sourceRows = ref(PLANES_MOCK)

const loading = ref(false)

const {
    selectedStatus,
    searchText,
    currentPage,
    rowsPerPage,
    filteredRows,
    paginatedRows,
    totalPages,
    startRow,
    endRow,
    setRowsPerPage
} = usePlansTable({
    sourceRows,
    defaultStatus: 'todos',
    defaultRowsPerPage: 8
})

function createPlan() {

    router.push({
        name: 'planes.create'
    })
}

function viewPlan(row) {

    router.push({
        name: 'planes.detail',
        params: {
            id: row._id
        }
    })
}

function editPlan(row) {

    router.push({
        name: 'planes.edit',
        params: {
            id: row._id
        }
    })
}

function deletePlan(row) {
    console.log('Eliminar Plan:', row)
}

</script>