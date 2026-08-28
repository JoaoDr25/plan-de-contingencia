<template>

    <BasePage>

        <CrudHeader title="Riesgos">

            <template #actions>

                <PrimaryActionButton label="Crear" icon="add_circle_outline" size="sm" @click="openCreateDialog" />

            </template>

        </CrudHeader>

        <CrudToolbar>

            <template #center>

                <CrudFilters v-model="selectedFilter" :options="RIESGOS_FILTERS" />

            </template>

            <template #left>

                <BaseSearch v-model="searchText" placeholder="Buscar por nombre o nivel..." />

            </template>

        </CrudToolbar>

        <BaseTable :rows="paginatedRows" :columns="RIESGOS_COLUMNS" :loading="loading" :current-page="currentPage"
            :total-pages="totalPages" :rows-per-page="rowsPerPage" :start="startRow" :end="endRow"
            :total="filteredRows.length" @change-page="currentPage = $event" @change-rows-per-page="setRowsPerPage">

            <template #body-cell-nivel="props">

                <q-td :props="props">
                    <LevelChip :level="props.value" context="riesgo" />
                </q-td>

            </template>

            <template #body-cell-opciones="props">

                <q-td :props="props">

                    <CrudActions :actions="DEFAULT_CRUD_ACTIONS" @view="viewItem(props.row)" @edit="editItem(props.row)"
                        @delete="deleteItem(props.row)" />

                </q-td>

            </template>

        </BaseTable>

        <RiesgosDialog v-model="dialog" :mode="dialogMode" :risk="selectedRisk" @save="handleRiskSave" />

        <BaseConfirmationDialog v-model="confirmationDialog" :title="confirmationTitle"
            :confirm-label="confirmationLabel" :variant="confirmationVariant" @confirm="confirmAction"
            @cancel="cancelConfirmation" />

        <RiesgosDetails v-model="detailsRisk" :risk="selectedRisk" />

    </BasePage>

</template>

<script setup>

import { ref, computed } from 'vue'

import { DEFAULT_CRUD_ACTIONS } from 'src/constants/actions/default_actions.constants.js'
import { RIESGOS_FILTERS } from 'src/constants/filters/riesgos.constants'
import { RIESGOS_COLUMNS } from 'src/constants/tables/riesgos.columns'
import { RIESGOS_MOCK } from 'src/mocks/riesgos.mock'

import { useCrudTable } from 'src/composables/useCrudTable'
import { getCurrentDate } from 'src/utils/date.utils'
import { notifySuccess } from 'src/utils/notifications.utils.js'

import BasePage from 'src/components/base/BasePage.vue'
import CrudHeader from 'src/components/cruds/CrudHeader.vue'
import CrudFilters from 'src/components/cruds/CrudFilters.vue'
import BaseSearch from 'src/components/forms/BaseSearch.vue'
import CrudToolbar from 'src/components/cruds/CrudToolbar.vue'
import PrimaryActionButton from 'src/components/actions/PrimaryActionButton.vue'
import BaseTable from 'src/components/tables/BaseTable.vue'
import LevelChip from 'src/components/states/LevelChip.vue'
import CrudActions from 'src/components/actions/CrudActions.vue'
import BaseConfirmationDialog from 'src/components/forms/BaseConfirmationDialog.vue'

import RiesgosDialog from '../dialogs/RiesgosDialog.vue'
import RiesgosDetails from '../details/RiesgosDetails.vue'

const sourceRows = ref(RIESGOS_MOCK)

const {
    selectedFilter,
    searchText,
    currentPage,
    rowsPerPage,
    setRowsPerPage,
    filteredRows,
    paginatedRows,
    totalPages,
    startRow,
    endRow
} = useCrudTable({
    sourceRows,
    defaultFilter: 'riesgo',
    exactSearchField: [],
    defaultRowsPerPage: 8
})

const loading = ref(false)

const dialog = ref(false)
const detailsRisk = ref(false)

const dialogMode = ref('create')
const selectedRisk = ref(null)

const confirmationDialog = ref(false)
const pendingActionData = ref(null)

const confirmationTitle = computed(() => {
    const titles = {
        create: 'Confirmar creación',
        edit: 'Confirmar actualización',
        delete: 'Confirmar eliminación'
    }
    return titles[dialogMode.value]
})

const confirmationLabel = computed(() => {
    const labels = {
        create: 'Crear',
        edit: 'Actualizar',
        delete: 'Eliminar'
    }
    return labels[dialogMode.value]
})

const confirmationVariant = computed(() => {
    return dialogMode.value === 'delete'
        ? 'danger'
        : 'primary'
})

function openCreateDialog() {
    dialogMode.value = 'create'
    selectedRisk.value = null
    dialog.value = true
}

function openEditDialog(row) {
    dialogMode.value = 'edit'
    selectedRisk.value = row
    dialog.value = true
}

function handleRiskSave(formData) {
    pendingActionData.value = formData
    dialog.value = false
    confirmationDialog.value = true
}

function createRisk(formData) {
    sourceRows.value.push({
        ...formData,
        fecha: getCurrentDate()
    })
    dialog.value = false
}

function updateRisk(formData) {
    const index = sourceRows.value.findIndex(
        row => row === selectedRisk.value
    )
    if (index === -1) {
        return
    }
    sourceRows.value[index] = {
        ...sourceRows.value[index],
        ...formData
    }
    dialog.value = false
}

function deleteRisk(row) {
    const index = sourceRows.value.findIndex(
        risk => risk.id === row.id
    )
    if (index === -1) {
        return
    }
    sourceRows.value.splice(index, 1)
}

function confirmAction() {
    if (dialogMode.value === 'create') {
        createRisk(pendingActionData.value)
        notifySuccess('Riesgo creado correctamente')
    }
    if (dialogMode.value === 'edit') {
        updateRisk(pendingActionData.value)
        notifySuccess('Riesgo actualizado correctamente')
    }
    if (dialogMode.value === 'delete') {
        deleteRisk(selectedRisk.value)
        notifySuccess('Riesgo eliminado correctamente')
    }
    pendingActionData.value = null
    confirmationDialog.value = false
}

function cancelConfirmation() {
    pendingActionData.value = null
    confirmationDialog.value = false
}

function viewItem(row) {
    console.log('Ver Riesgo:', row)
    selectedRisk.value = row
    detailsRisk.value = true
}

function editItem(row) {
    console.log('Editar Riesgo:', row)
    openEditDialog(row)
}

function deleteItem(row) {
    dialogMode.value = 'delete'
    selectedRisk.value = row
    confirmationDialog.value = true
}

</script>