<template>

    <BasePage>

        <CrudHeader title="Protocolos">

            <template #actions>

                <PrimaryActionButton label="Crear" icon="add_circle_outline" size="sm" @click="openCreateDialog" />

            </template>

        </CrudHeader>

        <CrudToolbar>

            <template #center>

                <CrudFilters v-model="selectedFilter" :options="PROTOCOLOS_FILTERS" />

            </template>

            <template #left>

                <BaseSearch v-model="searchText" placeholder="Buscar por tipo, responsable o estado..." />

            </template>

        </CrudToolbar>

        <BaseTable :rows="paginatedRows" :columns="PROTOCOLOS_COLUMNS" :loading="loading" :current-page="currentPage"
            :total-pages="totalPages" :rows-per-page="rowsPerPage" :start="startRow" :end="endRow"
            :total="filteredRows.length" @change-page="currentPage = $event" @change-rows-per-page="setRowsPerPage">

            <template #body-cell-estado="props">

                <q-td :props="props">

                    <StatusChip :status="props.value" />

                </q-td>

            </template>

            <template #body-cell-opciones="props">

                <q-td :props="props">

                    <CrudActions :actions="DEFAULT_CRUD_ACTIONS" @view="viewItem(props.row)" @edit="editItem(props.row)"
                        @delete="deleteItem(props.row)" />

                </q-td>

            </template>

        </BaseTable>

        <ProtocolosDialog v-model="dialog" :mode="dialogMode" :protocol="selectedProtocol" @save="handleProtocolSave" />

        <BaseConfirmationDialog v-model="confirmationDialog" :title="confirmationTitle"
            :confirm-label="confirmationLabel" :variant="confirmationVariant" @confirm="confirmAction"
            @cancel="cancelConfirmation" />

        <ProtocolosDetails v-model="detailsProtocol" :protocol="selectedProtocol" />

    </BasePage>

</template>

<script setup>

import { ref, computed } from 'vue'

import { DEFAULT_CRUD_ACTIONS } from 'src/constants/actions/default_actions.constants.js'
import { PROTOCOLOS_FILTERS } from 'src/constants/filters/protocolos.constants'
import { PROTOCOLOS_COLUMNS } from 'src/constants/tables/protocolos.columns'
import { PROTOCOLOS_MOCK } from 'src/mocks/protocolos.mock'

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
import StatusChip from 'src/components/states/StatusChip.vue'
import CrudActions from 'src/components/actions/CrudActions.vue'
import BaseConfirmationDialog from 'src/components/base/BaseConfirmationDialog.vue'

import ProtocolosDialog from '../dialogs/ProtocolosDialog.vue'
import ProtocolosDetails from '../details/ProtocolosDetails.vue'

const sourceRows = ref(PROTOCOLOS_MOCK)

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
    defaultFilter: 'tipo',
    exactSearchField: 'estado',
    defaultRowsPerPage: 8
})

const loading = ref(false)

const dialog = ref(false)
const detailsProtocol = ref(false)

const dialogMode = ref('create')
const selectedProtocol = ref(null)

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
    selectedProtocol.value = null
    dialog.value = true
}

function openEditDialog(row) {
    dialogMode.value = 'edit'
    selectedProtocol.value = row
    dialog.value = true
}

function handleProtocolSave(formData) {
    pendingActionData.value = formData
    dialog.value = false
    confirmationDialog.value = true
}

function createProtocol(formData) {
    sourceRows.value.push({
        ...formData,
        fecha: getCurrentDate()
    })
    dialog.value = false
}

function updateProtocol(formData) {
    const index = sourceRows.value.findIndex(
        row => row === selectedProtocol.value
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

function deleteProtocol(row) {
    const index = sourceRows.value.findIndex(
        protocol => protocol.id === row.id
    )
    if (index === -1) {
        return
    }
    sourceRows.value.splice(index, 1)
}

function confirmAction() {
    if (dialogMode.value === 'create') {
        createProtocol(pendingActionData.value)
        notifySuccess('Protocolo creado correctamente')
    }
    if (dialogMode.value === 'edit') {
        updateProtocol(pendingActionData.value)
        notifySuccess('Protocolo actualizado correctamente')
    }
    if (dialogMode.value === 'delete') {
        deleteProtocol(selectedProtocol.value)
        notifySuccess('Protocolo eliminado correctamente')
    }
    pendingActionData.value = null
    confirmationDialog.value = false
}

function cancelConfirmation() {
    pendingActionData.value = null
    confirmationDialog.value = false
}

function viewItem(row) {
    console.log('Ver Protocolo:', row)
    selectedProtocol.value = row
    detailsProtocol.value = true
}

function editItem(row) {
    console.log('Editar Protocolo:', row)
    openEditDialog(row)
}

function deleteItem(row) {
    dialogMode.value = 'delete'
    selectedProtocol.value = row
    confirmationDialog.value = true
}

</script>