<template>

    <BasePage>

        <CrudHeader title="Aprendices">

            <template #actions>

                <PrimaryActionButton
                    label="Crear"
                    icon="add_circle_outline"
                    size="sm"
                    @click="openCreateDialog"
                />

            </template>

        </CrudHeader>

        <CrudToolbar>

            <template #center>

                <CrudFilters
                    v-model="selectedFilter"
                    :options="APRENDICES_FILTERS"
                />

            </template>

            <template #left>

                <BaseSearch
                    v-model="searchText"
                    placeholder="Buscar por documento, nombre, ficha o estado..."
                />

            </template>

        </CrudToolbar>

        <BaseTable
            :rows="paginatedRows"
            :columns="APRENDICES_COLUMNS"
            :loading="loading"
            :current-page="currentPage"
            :total-pages="totalPages"
            :rows-per-page="rowsPerPage"
            :start="startRow"
            :end="endRow"
            :total="filteredRows.length"
            @change-page="currentPage = $event"
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
                        @view="viewItem(props.row)"
                        @edit="editItem(props.row)"
                        @delete="deleteItem(props.row)"
                    />

                </q-td>

            </template>

        </BaseTable>

        <AprendicesDialog
            v-model="dialog"
            :mode="dialogMode"
            :apprentice="selectedApprentice"
            @save="handleApprenticeSave"
        />

        <BaseConfirmationDialog
            v-model="confirmationDialog"
            :title="confirmationTitle"
            :message="confirmationMessage"
            :confirm-label="confirmationLabel"
            :variant="confirmationVariant"
            @confirm="confirmAction"
            @cancel="cancelConfirmation"
        />

        <AprendicesDetails
            v-model="detailsApprentice"
            :apprentice="selectedApprentice"
        />

    </BasePage>

</template>

<script setup>

import { ref, computed } from 'vue'

import { DEFAULT_CRUD_ACTIONS } from 'src/constants/actions/crud_actions.constants'
import { APRENDICES_FILTERS } from 'src/constants/filters/aprendices.constants'
import { APRENDICES_COLUMNS } from 'src/constants/tables/aprendices.columns'
import { APRENDICES_MOCK } from 'src/mocks/aprendices.mock'
import { useCrudTable } from 'src/composables/useCrudTable'
import { getCurrentDate } from 'src/utils/date.utils'

import BasePage from 'src/components/base/BasePage.vue'
import CrudHeader from 'src/components/cruds/CrudHeader.vue'
import CrudFilters from 'src/components/cruds/CrudFilters.vue'
import BaseSearch from 'src/components/forms/BaseSearch.vue'
import CrudToolbar from 'src/components/cruds/CrudToolbar.vue'
import PrimaryActionButton from 'src/components/actions/PrimaryActionButton.vue'
import BaseTable from 'src/components/tables/BaseTable.vue'
import StatusChip from 'src/components/states/StatusChip.vue'
import CrudActions from 'src/components/actions/CrudActions.vue'

import AprendicesDialog from '../dialogs/AprendicesDialog.vue'
// import AprendicesDetails from '../details/AprendicesDetails.vue'
import BaseConfirmationDialog from 'src/components/forms/BaseConfirmationDialog.vue'

const sourceRows = ref(APRENDICES_MOCK)

const {
    selectedFilter,
    searchText,
    currentPage,
    rowsPerPage,
    filteredRows,
    paginatedRows,
    totalPages,
    startRow,
    endRow
} = useCrudTable({
    sourceRows,
    defaultFilter: 'numeroDocumento',
    exactSearchField: [],
    defaultRowsPerPage: 8
})

const loading = ref(false)

const dialog = ref(false)
const detailsApprentice = ref(false)

const dialogMode = ref('create')
const selectedApprentice = ref(null)

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
        create: '¿Está seguro de crear este aprendiz?',
        edit: '¿Está seguro de actualizar este aprendiz?',
        delete: '¿Está seguro de eliminar este aprendiz?'
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
    selectedApprentice.value = null
    dialog.value = true
}

function openEditDialog(row) {
    dialogMode.value = 'edit'
    selectedApprentice.value = row
    dialog.value = true
}

function handleApprenticeSave(formData) {
    pendingActionData.value = formData
    dialog.value = false
    confirmationDialog.value = true
}

function createApprentice(formData) {
    sourceRows.value.push({
        ...formData,
        fecha: getCurrentDate()
    })
    dialog.value = false
}

function updateApprentice(formData) {
    const index = sourceRows.value.findIndex(
        row => row === selectedApprentice.value
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

function deleteApprentice(row) {
    const index = sourceRows.value.findIndex(
        apprentice => apprentice.id === row.id
    )
    if (index === -1) {
        return
    }
    sourceRows.value.splice(index, 1)
}

function confirmAction() {
    if (dialogMode.value === 'create') {
        createApprentice(pendingActionData.value)
    }
    if (dialogMode.value === 'edit') {
        updateApprentice(pendingActionData.value)
    }
    if (dialogMode.value === 'delete') {
        deleteApprentice(selectedApprentice.value)
    }
    pendingActionData.value = null
    confirmationDialog.value = false
}

function cancelConfirmation() {
    pendingActionData.value = null
    confirmationDialog.value = false
}

function viewItem(row) {
    console.log('Ver Aprendiz:', row)
    selectedApprentice.value = row
    detailsApprentice.value = true
}

function editItem(row) {
    console.log('Editar Aprendiz:', row)
    openEditDialog(row)
}

function deleteItem(row) {
    dialogMode.value = 'delete'
    selectedApprentice.value = row
    confirmationDialog.value = true
}

</script>