<template>
  <BasePage>
    <CrudHeader title="Elementos de Protección Personal (EPP)">
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
        <CrudFilters v-model="selectedFilter" :options="EPP_FILTERS" />
      </template>

      <template #left>
        <BaseSearch
          v-model="searchText"
          placeholder="Buscar por nombre, categoría, nivel o estado..."
        />
      </template>
    </CrudToolbar>

    <BaseTable
      :rows="paginatedRows"
      :columns="EPP_COLUMNS"
      :loading="loading"
      :current-page="currentPage"
      :total-pages="totalPages"
      :rows-per-page="rowsPerPage"
      :start="startRow"
      :end="endRow"
      :total="filteredRows.length"
      @change-page="currentPage = $event"
      @change-rows-per-page="setRowsPerPage"
    >
      <template #body-cell-nivel="props">
        <q-td :props="props">
          <LevelChip :level="props.value" context="epp" />
        </q-td>
      </template>

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

    <EppDialog v-model="dialog" :mode="dialogMode" :epp="selectedEpp" @save="handleEppSave" />

    <BaseConfirmationDialog
      v-model="confirmationDialog"
      :title="confirmationTitle"
      :confirm-label="confirmationLabel"
      :variant="confirmationVariant"
      @confirm="confirmAction"
      @cancel="cancelConfirmation"
    />

    <EppDetails v-model="detailsEpp" :epp="selectedEpp" />
  </BasePage>
</template>

<script setup>
import { onMounted, ref, computed } from 'vue'

import { DEFAULT_CRUD_ACTIONS } from 'src/constants/actions/default_actions.constants.js'
import { EPP_FILTERS } from 'src/constants/filters/epp.constants'
import { EPP_COLUMNS } from 'src/constants/tables/epp.columns'
// import { EPP_MOCK } from 'src/mocks/modules/epp.mock.js'

// import { getCurrentDate } from 'src/utils/date.utils'
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
import LevelChip from 'src/components/states/LevelChip.vue'
import CrudActions from 'src/components/actions/CrudActions.vue'
import BaseConfirmationDialog from 'src/components/base/BaseConfirmationDialog.vue'

import EppDialog from '../dialogs/EppDialog.vue'
import EppDetails from '../details/EppDetails.vue'
import eppService from 'src/services/modules/eppService.js'

const sourceRows = ref([])

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
  endRow,
} = useCrudTable({
  sourceRows,
  defaultFilter: 'nombre',
  exactSearchField: 'estado',
  defaultRowsPerPage: 8,
})

const loading = ref(false)

async function loadEpps() {
  loading.value = true

  try {
    const response = await eppService.getEpps()

    sourceRows.value = response.data ?? []
  } finally {
    loading.value = false
  }
}

const dialog = ref(false)
const detailsEpp = ref(false)

const dialogMode = ref('create')
const selectedEpp = ref(null)

const confirmationDialog = ref(false)
const pendingActionData = ref(null)

const confirmationTitle = computed(() => {
  const titles = {
    create: 'Confirmar creación',
    edit: 'Confirmar actualización',
    delete: 'Confirmar eliminación',
  }
  return titles[dialogMode.value]
})

const confirmationLabel = computed(() => {
  const labels = {
    create: 'Crear',
    edit: 'Actualizar',
    delete: 'Eliminar',
  }
  return labels[dialogMode.value]
})

const confirmationVariant = computed(() => {
  return dialogMode.value === 'delete' ? 'danger' : 'primary'
})

function openCreateDialog() {
  dialogMode.value = 'create'
  selectedEpp.value = null
  dialog.value = true
}

function openEditDialog(row) {
  dialogMode.value = 'edit'
  selectedEpp.value = row
  dialog.value = true
}

function handleEppSave(formData) {
  pendingActionData.value = formData
  dialog.value = false
  confirmationDialog.value = true
}

async function createEpp(formData) {
  const response = await eppService.createEpp(formData)

  if (response.data) {
    sourceRows.value.push(response.data)
  }
  dialog.value = false
}

async function updateEpp(formData) {
  const id = selectedEpp.value?.id

  if (!id) {
    return
  }
  const response = await eppService.updateEpp(id, formData)
  const updatedEpp = response.data

  if (!updatedEpp) {
    return
  }
  const index = sourceRows.value.findIndex((row) => row.id === id)

  if (index !== -1) {
    sourceRows.value[index] = updatedEpp
  }
  selectedEpp.value = updatedEpp
  dialog.value = false
}

async function deleteEpp(row) {
  const id = row?.id

  if (!id) {
    return
  }
  await eppService.deleteEpp(id)
  const index = sourceRows.value.findIndex((epp) => epp.id === id)

  if (index !== -1) {
    sourceRows.value.splice(index, 1)
  }
}

function confirmAction() {
  if (dialogMode.value === 'create') {
    createEpp(pendingActionData.value)
    notifySuccess('EPP creado correctamente')
  }
  if (dialogMode.value === 'edit') {
    updateEpp(pendingActionData.value)
    notifySuccess('EPP actualizado correctamente')
  }
  if (dialogMode.value === 'delete') {
    deleteEpp(selectedEpp.value)
    notifySuccess('EPP eliminado correctamente')
  }
  pendingActionData.value = null
  confirmationDialog.value = false
}

function cancelConfirmation() {
  pendingActionData.value = null
  confirmationDialog.value = false
}

function viewItem(row) {
  console.log('Ver EPP:', row)
  selectedEpp.value = row
  detailsEpp.value = true
}

function editItem(row) {
  console.log('Editar EPP:', row)
  openEditDialog(row)
}

function deleteItem(row) {
  dialogMode.value = 'delete'
  selectedEpp.value = row
  confirmationDialog.value = true
}

onMounted(() => {
  loadEpps()
})
</script>
