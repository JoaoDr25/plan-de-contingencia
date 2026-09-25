<template>
  <BasePage>
    <CrudHeader title="Usuarios">
      <template #actions>
        <div class="usuarios-page__actions-slot">
          <PrimaryActionButton
            v-if="canSyncUsers"
            label="Sincronizar"
            icon="sync"
            size="sm"
            :loading="syncing"
            :disable="syncing"
            @click="syncUsers"
          />
        </div>
      </template>
    </CrudHeader>

    <CrudToolbar>
      <template #center>
        <CrudFilters v-model="selectedFilter" :options="USUARIOS_FILTERS" />
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
            :actions="USUARIOS_ACTIONS"
            @view="viewItem(props.row)"
            @edit="openEditDialog(props.row)"
          />
        </q-td>
      </template>
    </BaseTable>

    <UsuariosDialog v-model="dialog" :user="selectedUser" @save="handleUserSave" />

    <BaseConfirmationDialog
      v-model="confirmationDialog"
      :title="confirmationTitle"
      :confirm-label="confirmationLabel"
      :variant="confirmationVariant"
      @confirm="confirmAction"
      @cancel="cancelConfirmation"
    />
  </BasePage>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'

import { USUARIOS_ACTIONS } from 'src/constants/actions/default_actions.constants.js'
import { USUARIOS_FILTERS } from 'src/constants/filters/usuarios.constants'
import { USUARIOS_COLUMNS } from 'src/constants/tables/usuarios.columns'
// import { USUARIOS_MOCK } from 'src/mocks/modules/usuarios.mock.js'
import { ROLES } from 'src/constants/system/roles.constants'

import { useCrudTable } from 'src/composables/useCrudTable'
import { mergeUsersFromRepfora } from 'src/utils/userSync.utils'
import {
  notifySuccess,
  notifyWarning,
  notifyError,
} from 'src/utils/notifications.utils.js'
import { useAuthStore } from 'src/stores/auth.store'

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

import UsuariosDialog from '../dialogs/UsuariosDialog.vue'
import usuarioService from 'src/services/modules/usuarioService.js'

const sourceRows = ref([])

const authStore = useAuthStore()
const router = useRouter()

const loading = ref(false)
const syncing = ref(false)

const dialog = ref(false)
const selectedUser = ref(null)

const confirmationDialog = ref(false)
const pendingActionData = ref(null)

const canSyncUsers = computed(() => {
  return (
    String(authStore.role || '')
      .trim()
      .toUpperCase() === ROLES.ADMINISTRADOR
  )
})

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
  defaultFilter: 'documento',
  exactSearchField: 'estado',
  defaultRowsPerPage: 8,
})

async function loadUsuarios() {
  loading.value = true

  try {
    const usuarios = await usuarioService.getUsuarios()

    sourceRows.value = usuarios
  } catch (error) {
    console.error('Error al cargar usuarios:', error)

    sourceRows.value = []

    notifyError('No fue posible cargar los usuarios')
  } finally {
    loading.value = false
  }
}

async function syncUsers() {
  if (!canSyncUsers.value) {
    return
  }

  syncing.value = true

  try {
    const usuariosRepfora = await usuarioService.getUsuarios()

    const syncResult = mergeUsersFromRepfora(
      sourceRows.value,
      usuariosRepfora,
    )

    sourceRows.value = syncResult.users

    if (syncResult.added === 0) {
      notifyWarning('No hay usuarios nuevos para agregar')
      return
    }

    notifySuccess(
      `${syncResult.added} usuario(s) nuevo(s) agregado(s)`,
    )
  } catch (error) {
    console.error('Error al sincronizar usuarios:', error)

    notifyError('No fue posible sincronizar los usuarios')
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

async function updateUser(formData) {
  if (!selectedUser.value) {
    throw new Error('No hay usuario seleccionado')
  }
  const id = selectedUser.value._id || selectedUser.value.id

  if (!id) {
    throw new Error('El usuario no tiene identificador')
  }
  const updatedUser = await usuarioService.updateUsuario(id, formData)

  const index = sourceRows.value.findIndex(
    (row) => (row._id || row.id) === id,
  )

  if (index !== -1) {
    sourceRows.value[index] = updatedUser
  }
  return updatedUser
}

async function confirmAction() {
  if (!pendingActionData.value) {
    return
  }
  try {
    await updateUser(pendingActionData.value)

    notifySuccess('Usuario actualizado correctamente')

    pendingActionData.value = null
    confirmationDialog.value = false
    selectedUser.value = null
  } catch (error) {
    console.error('Error al actualizar usuario:', error)

    notifyError('No fue posible actualizar el usuario')
  }
}

function cancelConfirmation() {
  pendingActionData.value = null
  confirmationDialog.value = false
}

function viewItem(row) {
  const userId = row.id ?? row._id

  router.push({
    name: 'usuarios.detail',
    params: {
      id: userId,
    },
  })
}

onMounted(() => {
  loadUsuarios()
})
</script>

<style scoped lang="scss">

.usuarios-page__actions-slot {
  min-height: 38px;
}
</style>
