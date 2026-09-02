<template>

    <BasePage>

        <CrudHeader title="Planes de Contingencia" :uppercase-title="true">

        </CrudHeader>

        <plan-section-nav />

        <CrudToolbar>

            <template #center>

                <BaseFilterBar>

                    <BaseSearch v-model="searchText"  placeholder="Buscar por código, programa o actividad..." />

                    <BaseSelect v-model="selectedStatus" label="Estado" :options="PLAN_STATUS_OPTIONS" size="filter"
                        :show-icon="false" />

                </BaseFilterBar>

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

        <BaseConfirmationDialog v-model="showConfirmation" title="Eliminar plan" confirm-label="Eliminar"
            cancel-label="Cancelar" variant="danger" @confirm="confirmDeletePlan" />

    </BasePage>

</template>

<script setup>

import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import { PLAN_STATUS_OPTIONS } from 'src/constants/filters/planes.constants'
import { PLANES_COLUMNS } from 'src/constants/tables/planes.columns'
import { PLANES_MOCK } from 'src/mocks/planes.mock'
import { ROLES } from 'src/constants/system/roles.constants'

import { usePlansTable } from 'src/composables/usePlanTable'
import { getPlanActions } from 'src/utils/actions.utils'
import { notifySuccess } from 'src/utils/notifications.utils'

import BasePage from 'src/components/base/BasePage.vue'
import CrudHeader from 'src/components/cruds/CrudHeader.vue'
import CrudToolbar from 'src/components/cruds/CrudToolbar.vue'
import BaseTable from 'src/components/tables/BaseTable.vue'
import StatusChip from 'src/components/states/StatusChip.vue'
import PlanActions from 'src/components/actions/PlanActions.vue'
import PlanSectionNav from 'src/components/plans/PlanSectionNav.vue'
import BaseFilterBar from 'src/components/base/BaseFilterBar.vue'
import BaseSearch from 'src/components/forms/BaseSearch.vue'
import BaseSelect from 'src/components/forms/BaseSelect.vue'
import BaseConfirmationDialog from 'src/components/base/BaseConfirmationDialog.vue'

const router = useRouter()
const route = useRoute()

const sourceRows = ref(PLANES_MOCK)

const currentRole = ROLES.USUARIO

const loading = ref(false)

const showConfirmation = ref(false)
const selectedPlan = ref(null)

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
    defaultStatus: route.query.estado || 'todos',
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
        name: 'planes.create',
        params: {
            id: row._id
        }
    })
}

function deletePlan(row) {
    selectedPlan.value = row
    showConfirmation.value = true
}

function confirmDeletePlan() {

    if (!selectedPlan.value) {
        return
    }

    sourceRows.value = sourceRows.value.filter(
        plan => plan._id !== selectedPlan.value._id
    )

    notifySuccess('Plan eliminado correctamente')

    selectedPlan.value = null
    showConfirmation.value = false
}

</script>