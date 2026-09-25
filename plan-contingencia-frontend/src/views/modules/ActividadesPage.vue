<template>
  <BasePage>
    <CrudHeader title="Actividades">
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
        <CrudFilters v-model="selectedFilter" :options="ACTIVIDADES_FILTERS" />
      </template>

      <template #left>
        <BaseSearch v-model="searchText" placeholder="Buscar por nombre o tipo de salida..." />
      </template>
    </CrudToolbar>

    <BaseTable
      :rows="paginatedRows"
      :columns="ACTIVIDADES_COLUMNS"
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
      <template #body-cell-peligros="props">
        <q-td :props="props">
          <div class="associated-dangers-cell">
            <span>
              {{ getAssociatedDangers(props.row).length }}
              {{ getAssociatedDangers(props.row).length === 1 ? 'Peligro' : 'Peligros' }}
            </span>

            <button
              v-if="getAssociatedDangers(props.row).length"
              type="button"
              class="associated-dangers-cell__action"
              :aria-label="`Ver peligros asociados a ${props.row.nombre}`"
              title="Ver peligros asociados"
              @click="viewAssociatedDangers(props.row)"
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

    <ActividadesDialog
      v-model="dialog"
      :mode="dialogMode"
      :activity="selectedActivity"
      @save="handleActivitySave"
    />

    <BaseConfirmationDialog
      v-model="confirmationDialog"
      :title="confirmationTitle"
      :confirm-label="confirmationLabel"
      :variant="confirmationVariant"
      @confirm="confirmAction"
      @cancel="cancelConfirmation"
    />

    <ActividadesDetails v-model="detailsActivity" :activity="selectedActivity" />

    <PlanesPeligrosDialog v-model="dangersDialog" :activity="selectedActivityWithDangers" />
  </BasePage>
</template>

<script setup>
import { onMounted, ref, computed } from 'vue'

import { DEFAULT_CRUD_ACTIONS } from 'src/constants/actions/default_actions.constants.js'
import { ACTIVIDADES_FILTERS } from 'src/constants/filters/actividades.constants'
import { ACTIVIDADES_COLUMNS } from 'src/constants/tables/actividades.columns'
// import { ACTIVIDADES_MOCK } from 'src/mocks/modules/actividades.mock.js'
// import { PELIGROS_MOCK } from 'src/mocks/modules/peligros.mock.js'

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

import ActividadesDialog from '../dialogs/ActividadesDialog.vue'
import ActividadesDetails from '../details/ActividadesDetails.vue'
import PlanesPeligrosDialog from '../modals/PlanesPeligrosDialog.vue'

import actividadesService from 'src/services/modules/actividadService.js'

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

async function loadActividades() {
  loading.value = true

  try {
    sourceRows.value = await actividadesService.getActividades()
  } catch (error) {
    console.error('Error al cargar actividades:', error)

    notifyError(
      error.response?.data?.message ||
      'No fue posible cargar las actividades'
    )
  } finally {
    loading.value = false
  }
}

const dialog = ref(false)
const detailsActivity = ref(false)
const dangersDialog = ref(false)

const dialogMode = ref('create')
const selectedActivity = ref(null)
const selectedActivityWithDangers = ref(null)

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

async function createActivity(formData) {
  try {
    await actividadesService.createActividad(formData)

    await loadActividades()

    dialog.value = false

    return true
  } catch (error) {
    console.error('Error al crear actividad:', error)

    notifyError(
      error.response?.data?.message ||
      'No fue posible crear la actividad'
    )
    return false
  }
}

async function updateActivity(formData) {
  try {
    await actividadesService.updateActividad(
      selectedActivity.value.id,
      formData
    )
    await loadActividades()

    dialog.value = false

    return true
  } catch (error) {
    console.error('Error al actualizar actividad:', error)

    notifyError(
      error.response?.data?.message ||
      'No fue posible actualizar la actividad'
    )
    return false
  }
}

async function deleteActivity(row) {
  try {
    await actividadesService.deleteActividad(row.id)

    await loadActividades()

    return true
  } catch (error) {
    console.error('Error al eliminar actividad:', error)

    notifyError(
      error.response?.data?.message ||
      'No fue posible eliminar la actividad'
    )
    return false
  }
}

async function confirmAction() {
  let success = false

  if (dialogMode.value === 'create') {
    success = await createActivity(pendingActionData.value)

    if (success) {
      notifySuccess('Actividad creada correctamente')
    }
  }

  if (dialogMode.value === 'edit') {
    success = await updateActivity(pendingActionData.value)

    if (success) {
      notifySuccess('Actividad actualizada correctamente')
    }
  }

  if (dialogMode.value === 'delete') {
    success = await deleteActivity(selectedActivity.value)

    if (success) {
      notifySuccess('Actividad eliminada correctamente')
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
  console.log('Ver Actividad:', row)

  selectedActivity.value = row
  detailsActivity.value = true
}

function getAssociatedDangers(activity) {
  if (Array.isArray(activity?.peligrosDetalle)) {
    return activity.peligrosDetalle
  }

  if (Array.isArray(activity?.peligros)) {
    return activity.peligros
  }
  return []
}

function viewAssociatedDangers(activity) {
  selectedActivityWithDangers.value = {
    ...activity,
    peligros: getAssociatedDangers(activity),
  }

  dangersDialog.value = true
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

onMounted(() => {
  loadActividades()
})
</script>

<style scoped lang="scss">
@use 'src/css/variables.scss' as *;

.associated-dangers-cell {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.associated-dangers-cell__action {
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

.associated-dangers-cell__action:hover :deep(.q-icon) {
  transform: scale(1.08);
}

.associated-dangers-cell__action :deep(.q-icon) {
  transition: transform 0.2s ease;
}
</style>
