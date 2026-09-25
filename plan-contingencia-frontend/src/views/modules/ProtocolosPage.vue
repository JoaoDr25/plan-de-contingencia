<template>
  <BasePage>
    <CrudHeader title="Protocolos">
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
        <CrudFilters v-model="selectedFilter" :options="PROTOCOLOS_FILTERS" />
      </template>

      <template #left>
        <BaseSearch v-model="searchText" placeholder="Buscar por tipo, responsable o estado..." />
      </template>
    </CrudToolbar>

    <BaseTable
      :rows="paginatedRows"
      :columns="PROTOCOLOS_COLUMNS"
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

    <ProtocolosDialog
      v-model="dialog"
      :mode="dialogMode"
      :protocol="selectedProtocol"
      @save="handleProtocolSave"
    />

    <BaseConfirmationDialog
      v-model="confirmationDialog"
      :title="confirmationTitle"
      :confirm-label="confirmationLabel"
      :variant="confirmationVariant"
      @confirm="confirmAction"
      @cancel="cancelConfirmation"
    />

    <ProtocolosDetails v-model="detailsProtocol" :protocol="selectedProtocol" />
  </BasePage>
</template>

<script setup>
import { onMounted, ref, computed } from 'vue'

import { DEFAULT_CRUD_ACTIONS } from 'src/constants/actions/default_actions.constants.js'
import { PROTOCOLOS_FILTERS } from 'src/constants/filters/protocolos.constants'
import { PROTOCOLOS_COLUMNS } from 'src/constants/tables/protocolos.columns'
// import { PROTOCOLOS_MOCK } from 'src/mocks/modules/protocolos.mock.js'

// import { getCurrentDate } from 'src/utils/date.utils'
import { useCrudTable } from 'src/composables/useCrudTable'
import { notifySuccess, notifyError } from 'src/utils/notifications.utils.js'

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

import protocolosService from 'src/services/modules/protocoloService.js'

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
  defaultFilter: 'tipo',
  exactSearchField: 'estado',
  defaultRowsPerPage: 8,
})

const loading = ref(false)

async function loadProtocolos() {
  loading.value = true

  try {
    sourceRows.value = await protocolosService.getProtocolos()
  } catch (error) {
    console.error('Error al cargar protocolos:', error)
    notifyError(
      error.response?.data?.message ||
      'No fue posible cargar los protocolos',
    )
  } finally {
    loading.value = false
  }
}

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

async function createProtocol(formData) {
  try {
    const nuevoProtocolo = await protocolosService.createProtocolo(formData)

    sourceRows.value.push(nuevoProtocolo)

    notifySuccess('Protocolo creado correctamente')
  } catch (error) {
    console.error('Error al crear protocolo:', error)
    notifyError(
      error.response?.data?.message ||
      'No fue posible crear el protocolo',
    )
  }
}

async function updateProtocol(formData) {
  try {
    const protocoloActualizado = await protocolosService.updateProtocolo(
      selectedProtocol.value._id,
      formData,
    )
    const index = sourceRows.value.findIndex(
      (row) => row._id === selectedProtocol.value._id,
    )
    if (index === -1) {
      return
    }
    sourceRows.value[index] = protocoloActualizado

    notifySuccess('Protocolo actualizado correctamente')
  } catch (error) {
    console.error('Error al actualizar protocolo:', error)
    notifyError(
      error.response?.data?.message ||
      'No fue posible actualizar el protocolo',
    )
  }
}

async function deleteProtocol(row) {
  try {
    await protocolosService.deleteProtocolo(row._id)

    const index = sourceRows.value.findIndex(
      (protocol) => protocol._id === row._id,
    )

    if (index === -1) {
      return
    }
    sourceRows.value.splice(index, 1)

    notifySuccess('Protocolo eliminado correctamente')
  } catch (error) {
    console.error('Error al eliminar protocolo:', error)
    notifyError(
      error.response?.data?.message ||
      'No fue posible eliminar el protocolo',
    )
  }
}

async function confirmAction() {
  if (dialogMode.value === 'create') {
    await createProtocol(pendingActionData.value)
  }

  if (dialogMode.value === 'edit') {
    await updateProtocol(pendingActionData.value)
  }

  if (dialogMode.value === 'delete') {
    await deleteProtocol(selectedProtocol.value)
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

onMounted(() => {
  loadProtocolos()
})
</script>
