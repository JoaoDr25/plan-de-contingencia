<template>

    <BasePage>

        <CrudHeader title="Usuarios">

            <template #actions>

                <PrimaryActionButton label="Sincronizar" icon="sync" size="sm" :loading="syncing" :disable="syncing"
                    @click="syncUsers" />

            </template>

        </CrudHeader>

        <CrudToolbar>

            <template #center>

                <CrudFilters v-model="selectedFilter" :options="USUARIOS_FILTERS" />

            </template>

            <template #left>

                <BaseSearch v-model="searchText" placeholder="Buscar por documento, nombre, correo, rol..." />

            </template>

        </CrudToolbar>

        <BaseTable :rows="paginatedRows" :columns="USUARIOS_COLUMNS" :loading="loading" :current-page="currentPage"
            :total-pages="totalPages" :rows-per-page="rowsPerPage" :start="startRow" :end="endRow"
            :total="filteredRows.length" @change-page="currentPage = $event" @change-rows-per-page="setRowsPerPage">

            <template #body-cell-estado="props">

                <q-td :props="props">

                    <StatusChip :status="props.value" />

                </q-td>

            </template>

            <template #body-cell-opciones="props">

                <q-td :props="props">

                    <CrudActions :actions="USUARIOS_ACTIONS" @view="viewItem(props.row)" @edit="openEditDialog(props.row)"
                         />

                </q-td>

            </template>

        </BaseTable>

        <UsuariosDialog v-model="dialog" :user="selectedUser" @save="handleUserSave" />

        <BaseConfirmationDialog v-model="confirmationDialog" :title="confirmationTitle"
            :confirm-label="confirmationLabel" :variant="confirmationVariant" @confirm="confirmAction"
            @cancel="cancelConfirmation" />

        <UsuariosDetails v-model="detailsUser" :user="selectedUser" />

    </BasePage>

</template>

<script setup>

import { ref } from 'vue'

import { USUARIOS_ACTIONS } from 'src/constants/actions/default_actions.constants.js'
import { USUARIOS_FILTERS } from 'src/constants/filters/usuarios.constants'
import { USUARIOS_COLUMNS } from 'src/constants/tables/usuarios.columns'

import { USUARIOS_MOCK } from 'src/mocks/usuarios.mock'
import { useCrudTable } from 'src/composables/useCrudTable'
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
import BaseConfirmationDialog from 'src/components/forms/BaseConfirmationDialog.vue'

import UsuariosDialog from '../dialogs/UsuariosDialog.vue'
import UsuariosDetails from '../details/UsuariosDetails.vue'

const sourceRows = ref(USUARIOS_MOCK)

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
    defaultFilter: 'documento',
    exactSearchField: 'estado',
    defaultRowsPerPage: 8
})

const loading = ref(false)
const syncing = ref(false)

const dialog = ref(false)
const detailsUser = ref(false)

const selectedUser = ref(null)

const confirmationDialog = ref(false)
const pendingActionData = ref(null)

async function syncUsers() {

    syncing.value = true

    try {
        // sincronización
    } finally {
        syncing.value = false
    }
}

const confirmationTitle = 'Confirmar actualización'
const confirmationLabel = 'Actualizar'
const confirmationVariant = 'primary'

function openEditDialog(row) {
    selectedUser.value = row
    dialog.value = true
}

function handleUserSave(formData) {
    pendingActionData.value = formData
    dialog.value = false
    confirmationDialog.value = true
}

function updateUser(formData) {

    const index = sourceRows.value.findIndex(
        row => row === selectedUser.value
    )
    if (index === -1) {
        return
    }
    sourceRows.value[index] = {
        ...sourceRows.value[index],
        ...formData
    }
}

function confirmAction() {

    updateUser(pendingActionData.value)
    notifySuccess('Usuario actualizado correctamente')

    pendingActionData.value = null
    confirmationDialog.value = false
}

function cancelConfirmation() {
    pendingActionData.value = null
    confirmationDialog.value = false
}

function viewItem(row) {
    console.log('Ver Usuario:', row)
    selectedUser.value = row
    detailsUser.value = true
}

</script>