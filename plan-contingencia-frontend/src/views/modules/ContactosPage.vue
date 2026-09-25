<template>
  <BasePage>
    <CrudHeader title="Contactos de Emergencia">
      <template #actions>
        <PrimaryActionButton label="Crear" icon="add_circle_outline" size="sm" @click="openCreateDialog" />
      </template>
    </CrudHeader>

    <CrudToolbar>
      <template #center>
        <CrudFilters v-model="selectedFilter" :options="CONTACTOS_FILTERS" />
      </template>

      <template #left>
        <BaseSearch v-model="searchText" placeholder="Buscar por tipo de contacto, nombre, estado..." />
      </template>
    </CrudToolbar>

    <BaseTable :rows="paginatedRows" :columns="CONTACTOS_COLUMNS" :loading="loading" :current-page="currentPage"
      :total-pages="totalPages" :rows-per-page="rowsPerPage" :start="startRow" :end="endRow"
      :total="filteredRows.length" @change-rows-per-page="setRowsPerPage" @change-page="currentPage = $event">
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

    <ContactosDialog v-model="dialog" :mode="dialogMode" :contact="selectedContact" @save="handleContactSave" />

    <BaseConfirmationDialog v-model="confirmationDialog" :title="confirmationTitle" :confirm-label="confirmationLabel"
      :variant="confirmationVariant" @confirm="confirmAction" @cancel="cancelConfirmation" />

    <ContactosDetails v-model="detailsContact" :contact="selectedContact" />
  </BasePage>
</template>

<script setup>
import { onMounted, ref, computed } from 'vue'

import { DEFAULT_CRUD_ACTIONS } from 'src/constants/actions/default_actions.constants.js'
import { CONTACTOS_FILTERS } from 'src/constants/filters/contactos.constants'
import { CONTACTOS_COLUMNS } from 'src/constants/tables/contactos.columns'
// import { CONTACTOS_MOCK } from 'src/mocks/modules/contactos.mock.js'

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

import ContactosDialog from '../dialogs/ContactosDialog.vue'
import ContactosDetails from '../details/ContactosDetails.vue'

import contactoService from 'src/services/modules/contactoService.js'

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

async function loadContactos() {
  loading.value = true

  try {
    const response = await contactoService.getContactos()

    sourceRows.value = response.data ?? []
  } catch (error) {
    console.error('Error al cargar contactos de emergencia:', error)
    notifyError('Error al cargar los contactos de emergencia')
  } finally {
    loading.value = false
  }
}

const dialog = ref(false)
const detailsContact = ref(false)

const dialogMode = ref('create')
const selectedContact = ref(null)

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
  selectedContact.value = null
  dialog.value = true
}

function openEditDialog(row) {
  dialogMode.value = 'edit'
  selectedContact.value = row
  dialog.value = true
}

function handleContactSave(formData) {
  pendingActionData.value = formData
  dialog.value = false
  confirmationDialog.value = true
}

async function createContact(formData) {
  try {
    const response = await contactoService.createContacto(formData)

    if (response.data) {
      sourceRows.value.push(response.data)
    }

    dialog.value = false
    return true
  } catch (error) {
    console.error('Error al crear contacto de emergencia:', error)
    notifyError('Error al crear el contacto de emergencia')
    return false
  }
}

async function updateContact(formData) {
  const id = selectedContact.value?.id

  if (!id) {
    return false
  }

  try {
    const response = await contactoService.updateContacto(id, formData)

    const updatedContact = response.data

    if (!updatedContact) {
      return false
    }
    const index = sourceRows.value.findIndex((row) => row.id === id)

    if (index !== -1) {
      sourceRows.value[index] = updatedContact
    }
    selectedContact.value = updatedContact
    dialog.value = false
    return true
  } catch (error) {
    console.error('Error al actualizar contacto de emergencia:', error)
    notifyError('Error al actualizar el contacto de emergencia')
    return false
  }
}

async function deleteContact(row) {
  const id = row?.id

  if (!id) {
    return false
  }

  try {
    await contactoService.deleteContacto(id)

    const index = sourceRows.value.findIndex((contact) => contact.id === id)

    if (index !== -1) {
      sourceRows.value.splice(index, 1)
    }
    return true
  } catch (error) {
    console.error('Error al eliminar contacto de emergencia:', error)
    notifyError('Error al eliminar el contacto de emergencia')
    return false
  }
}

async function confirmAction() {
  if (dialogMode.value === 'create') {
    const success = await createContact(pendingActionData.value)
    if (success) {
      notifySuccess('Contacto creado correctamente')
    }
  }

  if (dialogMode.value === 'edit') {
    const success = await updateContact(pendingActionData.value)
    if (success) {
      notifySuccess('Contacto actualizado correctamente')
    }
  }

  if (dialogMode.value === 'delete') {
    const success = await deleteContact(selectedContact.value)
    if (success) {
      notifySuccess('Contacto eliminado correctamente')
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
  console.log('Ver Contacto de Emergencia:', row)
  selectedContact.value = row
  detailsContact.value = true
}

function editItem(row) {
  console.log('Editar Contacto de Emergencia:', row)
  openEditDialog(row)
}

function deleteItem(row) {
  dialogMode.value = 'delete'
  selectedContact.value = row
  confirmationDialog.value = true
}

onMounted(() => {
  loadContactos()
})
</script>
