<template>
  <BasePage>
    <CrudHeader title="Riesgos">
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
        <CrudFilters v-model="selectedFilter" :options="RIESGOS_FILTERS" />
      </template>

      <template #left>
        <BaseSearch v-model="searchText" placeholder="Buscar por nombre o nivel..." />
      </template>
    </CrudToolbar>

    <BaseTable
      :rows="paginatedRows"
      :columns="RIESGOS_COLUMNS"
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
          <LevelChip :level="props.value" context="riesgo" />
        </q-td>
      </template>

      <template #body-cell-protocolos="props">
        <q-td :props="props">
          <div class="associated-protocols-cell">
            <span>
              {{ getAssociatedProtocols(props.row).length }}
              {{ getAssociatedProtocols(props.row).length === 1 ? 'Protocolo' : 'Protocolos' }}
            </span>

            <button
              v-if="getAssociatedProtocols(props.row).length"
              type="button"
              class="associated-protocols-cell__action"
              :aria-label="`Ver protocolos asociados a ${props.row.riesgo}`"
              title="Ver protocolos asociados"
              @click="viewAssociatedProtocols(props.row)"
            >
              <q-icon name="open_in_new" size="18px" />
            </button>
          </div>
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

    <RiesgosDialog
      v-model="dialog"
      :mode="dialogMode"
      :risk="selectedRisk"
      @save="handleRiskSave"
    />

    <BaseConfirmationDialog
      v-model="confirmationDialog"
      :title="confirmationTitle"
      :confirm-label="confirmationLabel"
      :variant="confirmationVariant"
      @confirm="confirmAction"
      @cancel="cancelConfirmation"
    />

    <RiesgosDetails v-model="detailsRisk" :risk="selectedRisk" />

    <PlanesProtocolosDialog v-model="protocolsDialog" :risk="selectedRiskWithProtocols" />
  </BasePage>
</template>

<script setup>
import { onMounted, ref, computed } from 'vue'

import { DEFAULT_CRUD_ACTIONS } from 'src/constants/actions/default_actions.constants.js'
import { RIESGOS_FILTERS } from 'src/constants/filters/riesgos.constants'
import { RIESGOS_COLUMNS } from 'src/constants/tables/riesgos.columns'
// import { RIESGOS_MOCK } from 'src/mocks/modules/riesgos.mock.js'
// import { PROTOCOLOS_MOCK } from 'src/mocks/modules/protocolos.mock.js'

import { useCrudTable } from 'src/composables/useCrudTable'
// import { getCurrentDate } from 'src/utils/date.utils'
import { notifySuccess, notifyError } from 'src/utils/notifications.utils.js'

import BasePage from 'src/components/base/BasePage.vue'
import CrudHeader from 'src/components/cruds/CrudHeader.vue'
import CrudFilters from 'src/components/cruds/CrudFilters.vue'
import BaseSearch from 'src/components/forms/BaseSearch.vue'
import CrudToolbar from 'src/components/cruds/CrudToolbar.vue'
import PrimaryActionButton from 'src/components/actions/PrimaryActionButton.vue'
import BaseTable from 'src/components/tables/BaseTable.vue'
import LevelChip from 'src/components/states/LevelChip.vue'
import CrudActions from 'src/components/actions/CrudActions.vue'
import BaseConfirmationDialog from 'src/components/base/BaseConfirmationDialog.vue'

import RiesgosDialog from '../dialogs/RiesgosDialog.vue'
import RiesgosDetails from '../details/RiesgosDetails.vue'
import PlanesProtocolosDialog from '../modals/PlanesProtocolosDialog.vue'

import riesgoService from 'src/services/riesgoService.js'

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
  defaultFilter: 'riesgo',
  exactSearchField: [],
  defaultRowsPerPage: 8,
})

const loading = ref(false)

async function loadRiesgos() {
  loading.value = true

  try {
    sourceRows.value = await riesgoService.getRiesgos()
  } catch (error) {
    console.error('Error al cargar riesgos:', error)

    notifyError(
      error.response?.data?.message ||
      'No fue posible cargar los riesgos'
    )
  } finally {
    loading.value = false
  }
}

const dialog = ref(false)
const detailsRisk = ref(false)
const protocolsDialog = ref(false)

const dialogMode = ref('create')
const selectedRisk = ref(null)
const selectedRiskWithProtocols = ref(null)

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

async function createRisk(formData) {
  try {
    await riesgoService.createRiesgo(formData)

    await loadRiesgos()

    return true
  } catch (error) {
    console.error('Error al crear riesgo:', error)

    notifyError(
      error.response?.data?.message ||
      'No fue posible crear el riesgo'
    )
    return false
  }
}

async function updateRisk(formData) {
  try {
    await riesgoService.updateRiesgo(
      selectedRisk.value.id,
      formData
    )

    await loadRiesgos()

    return true
  } catch (error) {
    console.error('Error al actualizar riesgo:', error)

    notifyError(
      error.response?.data?.message ||
      'No fue posible actualizar el riesgo'
    )
    return false
  }
}

async function deleteRisk(row) {
  try {
    await riesgoService.deleteRiesgo(row.id)

    await loadRiesgos()

    return true
  } catch (error) {
    console.error('Error al eliminar riesgo:', error)

    notifyError(
      error.response?.data?.message ||
      'No fue posible eliminar el riesgo'
    )
    return false
  }
}

async function confirmAction() {
  let success = false

  if (dialogMode.value === 'create') {
    success = await createRisk(pendingActionData.value)

    if (success) {
      notifySuccess('Riesgo creado correctamente')
    }
  }

  if (dialogMode.value === 'edit') {
    success = await updateRisk(pendingActionData.value)

    if (success) {
      notifySuccess('Riesgo actualizado correctamente')
    }
  }

  if (dialogMode.value === 'delete') {
    success = await deleteRisk(selectedRisk.value)

    if (success) {
      notifySuccess('Riesgo eliminado correctamente')
    }
  }

  if (success) {
    pendingActionData.value = null
    confirmationDialog.value = false
  }
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

function getAssociatedProtocols(risk) {
  return Array.isArray(risk?.protocolos)
    ? risk.protocolos
    : []
}

function viewAssociatedProtocols(risk) {
  selectedRiskWithProtocols.value = {
    ...risk,
    protocolos: getAssociatedProtocols(risk),
  }
  protocolsDialog.value = true
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

onMounted(() => {
  loadRiesgos()
})

</script>

<style scoped lang="scss">

@use 'src/css/variables.scss' as *;

.associated-protocols-cell {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.associated-protocols-cell__action {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  padding: 0;
  border: none;
  background: transparent;
  color: $color-primary;
  cursor: pointer;
}

.associated-protocols-cell__action:hover :deep(.q-icon) {
  transform: scale(1.08);
}

.associated-protocols-cell__action :deep(.q-icon) {
  transition: transform 0.2s ease;
}
</style>
