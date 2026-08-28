<template>

  <BasePage>

    <CrudHeader title="Programas de Formación">

      <template #actions>

        <PrimaryActionButton label="Crear" icon="add_circle_outline" size="sm" @click="openCreateDialog" />

      </template>

    </CrudHeader>

    <CrudToolbar>

      <template #center>

        <CrudFilters v-model="selectedFilter" :options="PROGRAMAS_FILTERS" />

      </template>

      <template #left>

        <BaseSearch v-model="searchText" placeholder="Buscar por ficha, nombre, nivel de formación..." />

      </template>

    </CrudToolbar>

    <BaseTable :rows="paginatedRows" :columns="PROGRAMAS_COLUMNS" :loading="loading" :current-page="currentPage"
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

    <ProgramasDialog v-model="dialog" :mode="dialogMode" :program="selectedProgram" @save="handleProgramSave" />

    <BaseConfirmationDialog v-model="confirmationDialog" :title="confirmationTitle" :confirm-label="confirmationLabel"
      :variant="confirmationVariant" @confirm="confirmAction" @cancel="cancelConfirmation" />

    <ProgramasDetails v-model="detailsProgram" :program="selectedProgram" />

  </BasePage>

</template>

<script setup>

import { ref, computed } from 'vue'

import { DEFAULT_CRUD_ACTIONS } from 'src/constants/actions/default_actions.constants.js';
import { PROGRAMAS_FILTERS } from "src/constants/filters/programas.constants";
import { PROGRAMAS_COLUMNS } from 'src/constants/tables/programas.columns';
import { PROGRAMAS_MOCK } from 'src/mocks/programas.mock';

import { useCrudTable } from 'src/composables/useCrudTable';
import { getCurrentDate } from 'src/utils/date.utils.js';
import { notifySuccess } from 'src/utils/notifications.utils.js';

import BasePage from 'src/components/base/BasePage.vue';
import CrudHeader from 'src/components/cruds/CrudHeader.vue';
import CrudFilters from 'src/components/cruds/CrudFilters.vue';
import BaseSearch from 'src/components/forms/BaseSearch.vue';
import CrudToolbar from 'src/components/cruds/CrudToolbar.vue';
import PrimaryActionButton from 'src/components/actions/PrimaryActionButton.vue';
import BaseTable from 'src/components/tables/BaseTable.vue';
import StatusChip from 'src/components/states/StatusChip.vue';
import CrudActions from 'src/components/actions/CrudActions.vue';
import BaseConfirmationDialog from 'src/components/forms/BaseConfirmationDialog.vue';

import ProgramasDialog from '../dialogs/ProgramasDialog.vue';
import ProgramasDetails from '../details/ProgramasDetails.vue';

const sourceRows = ref(PROGRAMAS_MOCK)

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
  defaultFilter: 'ficha',
  exactSearchField: 'estado',
  defaultRowsPerPage: 8
})

const loading = ref(false)

const dialog = ref(false)
const detailsProgram = ref(false)

const dialogMode = ref('create')
const selectedProgram = ref(null)

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
  selectedProgram.value = null
  dialog.value = true
}

function openEditDialog(row) {
  dialogMode.value = 'edit'
  selectedProgram.value = row
  dialog.value = true
}

function handleProgramSave(formData) {
  pendingActionData.value = formData
  dialog.value = false
  confirmationDialog.value = true
}

function createProgram(formData) {
  sourceRows.value.push({
    ...formData,
    fecha: getCurrentDate() //fecha temporal
  })
  dialog.value = false
}

function updateProgram(formData) {
  const index = sourceRows.value.findIndex(
    row => row === selectedProgram.value
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

function deleteProgram(row) {
  const index = sourceRows.value.findIndex(
    program => program.id === row.id
  )
  if (index === -1) {
    return
  }
  sourceRows.value.splice(index, 1)
}

function confirmAction() {
  if (dialogMode.value === 'create') {
    createProgram(pendingActionData.value)
    notifySuccess('Programa creado correctamente')
  }
  if (dialogMode.value === 'edit') {
    updateProgram(pendingActionData.value)
    notifySuccess('Programa actualizado correctamente')
  }
  if (dialogMode.value === 'delete') {
    deleteProgram(selectedProgram.value)
    notifySuccess('Programa eliminado correctamente')
  }
  pendingActionData.value = null
  confirmationDialog.value = false
}

function cancelConfirmation() {
  pendingActionData.value = null
  confirmationDialog.value = false
}

function viewItem(row) {
  console.log('Ver Programa:', row)
  selectedProgram.value = row
  detailsProgram.value = true
}

function editItem(row) {
  console.log('Editar Programa', row)
  openEditDialog(row)
}

function deleteItem(row) {
  dialogMode.value = 'delete'
  selectedProgram.value = row
  confirmationDialog.value = true
}

</script>
