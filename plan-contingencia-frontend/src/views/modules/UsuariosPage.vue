<template>

    <BasePage>

        <CrudHeader title="Usuarios">

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
                    :options="USUARIOS_FILTERS"
                />

            </template>

            <template #left>

                <BaseSearch
                    v-model="searchText"
                    placeholder="Buscar por documento, nombre, correo, rol..."
                />

            </template>

        </CrudToolbar>

        <BaseTable
            :rows="paginatedRows"
            :columns="USUARIOS_COLUMNS"
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

        <UsuariosDialog
            v-model="dialog"
            :mode="dialogMode"
            :user="selectedUser"
            @save="handleUserSave"
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

        <UsuariosDetails
            v-model="detailsUser"
            :user="selectedUser"
        />

    </BasePage>

</template>

<script setup>

import { ref, computed } from 'vue'

import { DEFAULT_CRUD_ACTIONS } from 'src/constants/actions/crud_actions.constants'
import { USUARIOS_FILTERS } from 'src/constants/filters/usuarios.constants'
import { USUARIOS_COLUMNS } from 'src/constants/tables/usuarios.columns'
import { USUARIOS_MOCK } from 'src/mocks/usuarios.mock'
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

import UsuariosDialog from '../dialogs/UsuariosDialog.vue'
import UsuariosDetails from '../details/UsuariosDetails.vue'
import BaseConfirmationDialog from 'src/components/forms/BaseConfirmationDialog.vue'

const sourceRows = ref(USUARIOS_MOCK)

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
    exactSearchField: 'estado',
    defaultRowsPerPage: 8
})

const loading = ref(false)

const dialog = ref(false)
const detailsUser = ref(false)

const dialogMode = ref('create')
const selectedUser = ref(null)

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
        create: '¿Está seguro de crear este usuario?',
        edit: '¿Está seguro de actualizar este usuario?',
        delete: '¿Está seguro de eliminar este usuario?'
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
    selectedUser.value = null
    dialog.value = true
}

function openEditDialog(row) {
    dialogMode.value = 'edit'
    selectedUser.value = row
    dialog.value = true
}

function handleUserSave(formData) {
    pendingActionData.value = formData
    dialog.value = false
    confirmationDialog.value = true
}

function createUser(formData) {
    sourceRows.value.push({
        ...formData,
        fecha: getCurrentDate()
    })
    dialog.value = false
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
    dialog.value = false
}

function deleteUser(row) {
    const index = sourceRows.value.findIndex(
        user => user.id === row.id
    )
    if (index === -1) {
        return
    }
    sourceRows.value.splice(index, 1)
}

function confirmAction() {
    if (dialogMode.value === 'create') {
        createUser(pendingActionData.value)
    }
    if (dialogMode.value === 'edit') {
        updateUser(pendingActionData.value)
    }
    if (dialogMode.value === 'delete') {
        deleteUser(selectedUser.value)
    }
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

function editItem(row) {
    console.log('Editar Usuario:', row)
    openEditDialog(row)
}

function deleteItem(row) {
    dialogMode.value = 'delete'
    selectedUser.value = row
    confirmationDialog.value = true
}

</script>