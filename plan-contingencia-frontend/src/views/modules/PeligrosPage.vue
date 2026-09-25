<template>
  <BasePage>
    <CrudHeader title="Peligros">
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
        <CrudFilters v-model="selectedFilter" :options="PELIGROS_FILTERS" />
      </template>

      <template #left>
        <BaseSearch v-model="searchText" placeholder="Buscar por nombre o categoría..." />
      </template>
    </CrudToolbar>

    <BaseTable
      :rows="paginatedRows"
      :columns="PELIGROS_COLUMNS"
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
      <template #body-cell-riesgos="props">
        <q-td :props="props">
          <div class="associated-risks-cell">
            <span> {{ getAssociatedRisks(props.row).length }} Riesgos </span>

            <button
              v-if="getAssociatedRisks(props.row).length"
              type="button"
              class="associated-risks-cell__action"
              :aria-label="`Ver riesgos asociados a ${props.row.nombre}`"
              title="Ver riesgos asociados"
              @click="viewAssociatedRisks(props.row)"
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

    <PeligrosDialog
      v-model="dialog"
      :mode="dialogMode"
      :danger="selectedDanger"
      @save="handleDangerSave"
    />

    <BaseConfirmationDialog
      v-model="confirmationDialog"
      :title="confirmationTitle"
      :confirm-label="confirmationLabel"
      :variant="confirmationVariant"
      @confirm="confirmAction"
      @cancel="cancelConfirmation"
    />

    <PeligrosDetails v-model="detailsDanger" :danger="selectedDanger" />

    <PlanesRiesgosDialog v-model="risksDialog" :danger="selectedDangerWithRisks" />
  </BasePage>
</template>

<script setup>
import { onMounted, ref, computed } from 'vue'

import { DEFAULT_CRUD_ACTIONS } from 'src/constants/actions/default_actions.constants.js'
import { PELIGROS_FILTERS } from 'src/constants/filters/peligros.constants'
import { PELIGROS_COLUMNS } from 'src/constants/tables/peligros.columns'
// import { PELIGROS_MOCK } from 'src/mocks/modules/peligros.mock.js'
// import { RIESGOS_MOCK } from 'src/mocks/modules/riesgos.mock.js'

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
import CrudActions from 'src/components/actions/CrudActions.vue'
import BaseConfirmationDialog from 'src/components/base/BaseConfirmationDialog.vue'

import PeligrosDialog from '../dialogs/PeligrosDialog.vue'
import PeligrosDetails from '../details/PeligrosDetails.vue'
import PlanesRiesgosDialog from '../modals/PlanesRiesgosDialog.vue'

import peligrosService from 'src/services/modules/peligroService.js'

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
  exactSearchField: [],
  defaultRowsPerPage: 8,
})

const loading = ref(false)

async function loadPeligros() {
  loading.value = true

  try {
    sourceRows.value = await peligrosService.getPeligros()
  } catch (error) {
    console.error('Error al cargar peligros:', error)

    notifyError(
      error.response?.data?.message ||
      'No fue posible cargar los peligros'
    )
  } finally {
    loading.value = false
  }
}

const dialog = ref(false)
const detailsDanger = ref(false)
const risksDialog = ref(false)

const dialogMode = ref('create')
const selectedDanger = ref(null)
const selectedDangerWithRisks = ref(null)

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

async function createDanger(formData) {
  try {
    await peligrosService.createPeligro(formData)

    await loadPeligros()

    return true
  } catch (error) {
    console.error('Error al crear peligro:', error)

    notifyError(
      error.response?.data?.message ||
      'No fue posible crear el peligro'
    )
    return false
  }
}

async function updateDanger(formData) {
  try {
    await peligrosService.updatePeligro(
      selectedDanger.value.id,
      formData
    )
    await loadPeligros()

    dialog.value = false

    return true
  } catch (error) {
    console.error('Error al actualizar el peligro:', error)

    notifyError(
      error.response?.data?.message ||
      'No fue posible actualizar el peligro'
    )
    return false
  }
}

async function deleteDanger(row) {
  try {
    await peligrosService.deletePeligro(row.id)

    await loadPeligros()

    return true
  } catch (error) {
    console.error('Error al eliminar peligro:', error)

    notifyError(
      error.response?.data?.message ||
      'No fue posible eliminar el peligro'
    )
    return false
  }
}

async function confirmAction() {
  let success = false

  if (dialogMode.value === 'create') {
    success = await createDanger(pendingActionData.value)

    if (success) {
      notifySuccess('Peligro creado correctamente')
    }
  }

  if (dialogMode.value === 'edit') {
    success = await updateDanger(pendingActionData.value)

    if (success) {
      notifySuccess('Peligro actualizado correctamente')
    }
  }

  if (dialogMode.value === 'delete') {
    success = await deleteDanger(selectedDanger.value)

    if (success) {
      notifySuccess('Peligro eliminado correctamente')
    }
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

function getAssociatedRisks(danger) {
  const rawRisks = danger?.riesgosDetalle ?? danger?.riesgos ?? []

  if (!Array.isArray(rawRisks)) {
    return []
  }

  return rawRisks
    .filter((risk) => risk && typeof risk === 'object')
    .map((risk) => ({
      ...risk,
      riesgo: risk.riesgo ?? risk.nombre ?? 'Riesgo no identificado',
      nombre: risk.nombre ?? risk.riesgo ?? 'Riesgo no identificado',
      nivel: risk.nivel ?? risk.nivelRiesgo ?? 'No disponible',
      descripcion: risk.descripcion ?? 'No disponible',
      consecuencia: risk.consecuencia ?? 'No disponible',
    }))
}

function viewAssociatedRisks(danger) {
  selectedDangerWithRisks.value = {
    ...danger,
    riesgos: getAssociatedRisks(danger),
  }

  risksDialog.value = true
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

onMounted(() => {
  loadPeligros()
})
</script>

<style scoped lang="scss">

@use 'src/css/variables.scss' as *;

.associated-risks-cell {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.associated-risks-cell__action {
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

.associated-risks-cell__action:hover {
  transform: scale(1.08);
}
</style>
