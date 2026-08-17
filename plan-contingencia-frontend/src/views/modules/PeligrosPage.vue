<template>

    <BasePage>

        <CrudHeader title="Peligros">

            <template #actions>

                <PrimaryActionButton label="Crear" icon="add_circle_outline" size="sm" @click="openCreateDialog" />

            </template>

        </CrudHeader>

        <CrudToolbar>

            <template #center>

                <CrudFilters v-model="selectedFilter" :options="PELIGROS_FILTERS" />

            </template>

            <template #left>

                <BaseSearch v-model="searchText" placeholder="Buscar por nombre o categoría..." />

            </template>

        </CrudToolbar>

        <BaseTable :rows="paginatedRows" :columns="PELIGROS_COLUMNS" :loading="loading" :current-page="currentPage"
            :total-pages="totalPages" :rows-per-page="rowsPerPage" :start="startRow" :end="endRow"
            :total="filteredRows.length" @change-page="currentPage = $event" @change-rows-per-page="setRowsPerPage">

            <template #body-cell-opciones="props">

                <q-td :props="props">

                    <CrudActions :actions="DEFAULT_CRUD_ACTIONS" @view="viewItem(props.row)" @edit="editItem(props.row)"
                        @delete="deleteItem(props.row)" />

                </q-td>

            </template>

        </BaseTable>

        <PeligrosDialog v-model="dialog" :mode="dialogMode" :danger="selectedDanger" @save="handleDangerSave" />

        <BaseConfirmationDialog v-model="confirmationDialog" :title="confirmationTitle" :message="confirmationMessage"
            :confirm-label="confirmationLabel" :variant="confirmationVariant" @confirm="confirmAction"
            @cancel="cancelConfirmation" />

        <PeligrosDetails v-model="detailsDanger" :danger="selectedDanger" />

    </BasePage>

</template>

<script setup>

import { ref, computed } from 'vue'

import { DEFAULT_CRUD_ACTIONS } from 'src/constants/actions/crud_actions.constants'
import { PELIGROS_FILTERS } from 'src/constants/filters/peligros.constants'
import { PELIGROS_COLUMNS } from 'src/constants/tables/peligros.columns'
import { PELIGROS_MOCK } from 'src/mocks/peligros.mock'
import { useCrudTable } from 'src/composables/useCrudTable'
import { getCurrentDate } from 'src/utils/date.utils'

import BasePage from 'src/components/base/BasePage.vue'
import CrudHeader from 'src/components/cruds/CrudHeader.vue'
import CrudFilters from 'src/components/cruds/CrudFilters.vue'
import BaseSearch from 'src/components/forms/BaseSearch.vue'
import CrudToolbar from 'src/components/cruds/CrudToolbar.vue'
import PrimaryActionButton from 'src/components/actions/PrimaryActionButton.vue'
import BaseTable from 'src/components/tables/BaseTable.vue'
import CrudActions from 'src/components/actions/CrudActions.vue'

import PeligrosDialog from '../dialogs/PeligrosDialog.vue'
import PeligrosDetails from '../details/PeligrosDetails.vue'
import BaseConfirmationDialog from 'src/components/forms/BaseConfirmationDialog.vue'

const sourceRows = ref(PELIGROS_MOCK)

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
    defaultFilter: 'nombre',
    exactSearchField: [],
    defaultRowsPerPage: 8
})


const loading = ref(false)

const dialog = ref(false)
const detailsDanger = ref(false)

const dialogMode = ref('create')
const selectedDanger = ref(null)

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

const confirmationMessage = computed(() => {
    const messages = {
        create: '¿Está seguro de crear este peligro?',
        edit: '¿Está seguro de actualizar este peligro?',
        delete: '¿Está seguro de eliminar este peligro?'
    }
    return messages[dialogMode.value]
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
    selectedDanger.value = null
    dialog.value = true
}

function openEditDialog(row) {
    dialogMode.value = 'edit'
    selectedDanger.value = row
    dialog.value = true
}

function handleDangerSave(formData) {
    pendingActionData.value = formData
    dialog.value = false
    confirmationDialog.value = true
}

function createDanger(formData) {
    sourceRows.value.push({
        ...formData,
        fecha: getCurrentDate()
    })
    dialog.value = false
}

function updateDanger(formData) {
    const index = sourceRows.value.findIndex(
        row => row === selectedDanger.value
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

function deleteDanger(row) {
    const index = sourceRows.value.findIndex(
        danger => danger.id === row.id
    )
    if (index === -1) {
        return
    }
    sourceRows.value.splice(index, 1)
}

function confirmAction() {
    if (dialogMode.value === 'create') {
        createDanger(pendingActionData.value)
    }
    if (dialogMode.value === 'edit') {
        updateDanger(pendingActionData.value)
    }
    if (dialogMode.value === 'delete') {
        deleteDanger(selectedDanger.value)
    }
    pendingActionData.value = null
    confirmationDialog.value = false
}

function cancelConfirmation() {
    pendingActionData.value = null
    confirmationDialog.value = false
}

function viewItem(row) {
    console.log('Ver Peligro:', row)
    selectedDanger.value = row
    detailsDanger.value = true
}

function editItem(row) {
    console.log('Editar Peligro:', row)
    openEditDialog(row)
}

function deleteItem(row) {
    dialogMode.value = 'delete'
    selectedDanger.value = row
    confirmationDialog.value = true
}

</script>