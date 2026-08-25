<template>

    <BasePage>

        <CrudHeader title="Planes de Contingencia" :uppercase-title="true">

        </CrudHeader>

        <plan-section-nav />

        <CrudToolbar>

            <template #center>

                <PlanFilters v-model="selectedStatus" v-model:search-value="searchText"
                    :options="PLAN_STATUS_OPTIONS" />

            </template>

        </CrudToolbar>

        <BaseTable :rows="paginatedRows" :columns="PLANES_COLUMNS" :loading="loading" :current-page="currentPage"
            :total-pages="totalPages" :rows-per-page="rowsPerPage" :start="startRow" :end="endRow"
            :total="filteredRows.length" @change-page="currentPage = $event" @change-rows-per-page="setRowsPerPage">

            <template #body-cell-estado="props">

                <q-td :props="props">

                    <StatusChip :status="props.value" />

                </q-td>

            </template>

            <template #body-cell-opciones="props">

                <q-td :props="props">

                    <PlanActions :actions="getPlanActions(props.row, currentRole)" @view="viewPlan(props.row)"
                        @edit="editPlan(props.row)" @delete="deletePlan(props.row)" />

                </q-td>

            </template>

        </BaseTable>

    </BasePage>

</template>

<script setup>

import { ref } from 'vue'
import { useRouter } from 'vue-router'

import { PLAN_STATUS_OPTIONS } from 'src/constants/filters/planes.constants'
import { PLANES_COLUMNS } from 'src/constants/tables/planes.columns'
import { PLANES_MOCK } from 'src/mocks/planes.mock'
import { PLAN_ROLES } from 'src/constants/actions/plan.constants'

import { usePlansTable } from 'src/composables/usePlansTable'
import { getPlanActions } from 'src/utils/actions.utils'

import BasePage from 'src/components/base/BasePage.vue'
import CrudHeader from 'src/components/cruds/CrudHeader.vue'
import CrudToolbar from 'src/components/cruds/CrudToolbar.vue'
import PlanFilters from 'src/components/plans/PlanFilters.vue'
import BaseTable from 'src/components/tables/BaseTable.vue'
import StatusChip from 'src/components/states/StatusChip.vue'
import PlanActions from 'src/components/actions/PlanActions.vue'
import PlanSectionNav from 'src/components/plans/PlanSectionNav.vue'

const router = useRouter()

const sourceRows = ref(PLANES_MOCK)

const currentRole = PLAN_ROLES.USUARIO

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