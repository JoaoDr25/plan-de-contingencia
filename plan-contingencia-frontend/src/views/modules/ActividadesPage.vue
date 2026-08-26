<template>

    <BasePage>

        <CrudHeader title="Actividades">

            <template #actions>

                <PrimaryActionButton label="Crear" icon="add_circle_outline" size="sm" @click="openCreateDialog" />

            </template>


        </CrudHeader>

        <CrudToolbar>

            <template #center>

                <CrudFilters v-model="selectedFilter" :options="ACTIVIDADES_FILTERS" />

            </template>

            <template #left>

                <BaseSearch v-model="searchText" placeholder="Buscar por nombre o tipo de salida..." />

            </template>

        </CrudToolbar>

        <BaseTable :rows="paginatedRows" :columns="ACTIVIDADES_COLUMNS" :loading="loading" :current-page="currentPage"
            :total-pages="totalPages" :rows-per-page="rowsPerPage" :start="startRow" :end="endRow"
            :total="filteredRows.length" @change-page="currentPage = $event" @change-rows-per-page="setRowsPerPage">

            <template #body-cell-opciones="props">

                <q-td :props="props">
                    <CrudActions :actions="DEFAULT_CRUD_ACTIONS" @view="viewItem(props.row)" @edit="editItem(props.row)"
                        @delete="deleteItem(props.row)" />
                </q-td>

            </template>

        </BaseTable>

        <ActividadesDialog v-model="dialog" :mode="dialogMode" :activity="selectedActivity"
            @save="handleActivitySave" />


        <BaseConfirmationDialog v-model="confirmationDialog" :title="confirmationTitle" :message="confirmationMessage"
            :confirm-label="confirmationLabel" :variant="confirmationVariant" @confirm="confirmAction"
            @cancel="cancelConfirmation" />


        <ActividadesDetails v-model="detailsActivity" :activity="selectedActivity" />


    </BasePage>

</template>

<script setup>

import { ref, computed } from 'vue';

import { DEFAULT_CRUD_ACTIONS } from 'src/constants/actions/default_actions.constants.js';
import { ACTIVIDADES_FILTERS } from 'src/constants/filters/actividades.constants';
import { ACTIVIDADES_COLUMNS } from 'src/constants/tables/actividades.columns';
import { ACTIVIDADES_MOCK } from 'src/mocks/actividades.mock';
import { useCrudTable } from 'src/composables/useCrudTable';
import { getCurrentDate } from 'src/utils/date.utils';

import BasePage from 'src/components/base/BasePage.vue';
import CrudHeader from 'src/components/cruds/CrudHeader.vue';
import CrudFilters from 'src/components/cruds/CrudFilters.vue';
import BaseSearch from 'src/components/forms/BaseSearch.vue';
import CrudToolbar from 'src/components/cruds/CrudToolbar.vue';
import PrimaryActionButton from 'src/components/actions/PrimaryActionButton.vue';
import BaseTable from 'src/components/tables/BaseTable.vue';
import CrudActions from 'src/components/actions/CrudActions.vue';

import ActividadesDialog from '../dialogs/ActividadesDialog.vue'
import ActividadesDetails from '../details/ActividadesDetails.vue'
import BaseConfirmationDialog from 'src/components/forms/BaseConfirmationDialog.vue'

const sourceRows = ref(ACTIVIDADES_MOCK);

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

const loading = ref(false);

const dialog = ref(false)
const detailsActivity = ref(false)


const dialogMode = ref('create')
const selectedActivity = ref(null)


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
        create: '¿Está seguro de crear esta actividad?',
        edit: '¿Está seguro de actualizar esta actividad?',
        delete: '¿Está seguro de eliminar esta actividad?'
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
    selectedActivity.value = null
    dialog.value = true
}


function openEditDialog(row) {
    dialogMode.value = 'edit'
    selectedActivity.value = row
    dialog.value = true
}


function handleActivitySave(formData) {
    pendingActionData.value = formData
    dialog.value = false
    confirmationDialog.value = true
}


function createActivity(formData) {
    sourceRows.value.push({
        ...formData,
        fecha: getCurrentDate()
    })

    dialog.value = false
}


function updateActivity(formData) {
    const index = sourceRows.value.findIndex(
        row => row === selectedActivity.value
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


function deleteActivity(row) {
    const index = sourceRows.value.findIndex(
        activity => activity.id === row.id
    )

    if (index === -1) {
        return
    }

    sourceRows.value.splice(index, 1)
}


function confirmAction() {
    if (dialogMode.value === 'create') {
        createActivity(pendingActionData.value)
    }

    if (dialogMode.value === 'edit') {
        updateActivity(pendingActionData.value)
    }

    if (dialogMode.value === 'delete') {
        deleteActivity(selectedActivity.value)
    }

    pendingActionData.value = null
    confirmationDialog.value = false
}


function cancelConfirmation() {
    pendingActionData.value = null
    confirmationDialog.value = false
}


function viewItem(row) {
    console.log('Ver Actividad:', row)

    selectedActivity.value = row
    detailsActivity.value = true
}


function editItem(row) {
    console.log('Editar Actividad:', row)

    openEditDialog(row)
}


function deleteItem(row) {
    dialogMode.value = 'delete'
    selectedActivity.value = row
    confirmationDialog.value = true
}

</script>