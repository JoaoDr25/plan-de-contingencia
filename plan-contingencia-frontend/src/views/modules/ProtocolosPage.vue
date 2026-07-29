<template>

  <BasePage>

    <CrudHeader title="Protocolos" back-route="dashboard" />

    <CrudToolbar>

      <template #right>

        <PrimaryActionButton label="Crear" icon="add_circle_outline" size="sm" @click="openDialog"/>

      </template>

      <template #center>

        <CrudFilters v-model="selectedFilter" :options="PROTOCOLOS_FILTERS" />

      </template>

      <template #left>

        <BaseSearch v-model="searchText" placeholder="Buscar por tipo, responsable o estado..." />

      </template>

    </CrudToolbar>

   <BaseTable :rows="paginatedRows" :columns="PROTOCOLOS_COLUMNS" :loading="loading" :current-page="currentPage"
      :total-pages="totalPages" :rows-per-page="rowsPerPage" :start="startRow" :end="endRow"
      :total="filteredRows.length" @change-page="currentPage = $event">

      <template #body-cell-estado="props">

      <q-td :props="props">
        <StatusChip :status="props.value" />
      </q-td>

    </template>

    <template #body-cell-opciones="props">

        <q-td :props="props">
          <CrudActions :actions="getCrudActions()" @view="viewItem(props.row)" @edit="editItem(props.row)"
            @delete="deleteItem(props.row)" />
        </q-td>

      </template>

     </BaseTable>

  </BasePage>

</template>

<script setup>

import { ref, computed } from 'vue';
import { PROTOCOLOS_FILTERS } from 'src/constants/filters/protocolos.constants';
import { PROTOCOLOS_COLUMNS } from 'src/constants/tables/protocolos.columns';
import { PROTOCOLOS_MOCK } from 'src/mocks/protocolos.mock';

import BasePage from 'src/components/base/BasePage.vue';
import CrudHeader from 'src/components/base/CrudHeader.vue';
import CrudFilters from 'src/components/base/CrudFilters.vue';
import BaseSearch from 'src/components/base/BaseSearch.vue';
import CrudToolbar from 'src/components/base/CrudToolbar.vue';
import PrimaryActionButton from 'src/components/base/PrimaryActionButton.vue';
import BaseTable from 'src/components/base/BaseTable.vue';
import StatusChip from 'src/components/base/StatusChip.vue';
import CrudActions from 'src/components/base/CrudActions.vue';

const openDialog = () => {
  console.log('Abrir diálogo de creación')
}

const selectedFilter = ref('tipo')
const searchText = ref('')

const currentPage = ref(1)
const rowsPerPage = ref(8)

const loading = ref(false);

const rows = ref(PROTOCOLOS_MOCK);

function normalizeText(text) {

  return String(text)
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
}

const filteredRows = computed(() => {

  const search = normalizeText(searchText.value.trim())

  if (!search) {
    return rows.value
  }

  return rows.value.filter((row) => {

    const value = normalizeText(row[selectedFilter.value] ?? '')

    if (selectedFilter.value === 'estado') {
      return value === search
    }
    return value.includes(search)
  })
})

const totalPages = computed(() => {

  return Math.max(
    1,
    Math.ceil(filteredRows.value.length / rowsPerPage.value)
  )
})

const paginatedRows = computed(() => {

  const start = (currentPage.value - 1) * rowsPerPage.value
  const end = start + rowsPerPage.value

  return filteredRows.value.slice(start, end)
})

const startRow = computed(() => {

  if (filteredRows.value.length === 0) {
    return 0
  }
  return (currentPage.value - 1) * rowsPerPage.value + 1
})


const endRow = computed(() => {

  return Math.min(
    currentPage.value * rowsPerPage.value,
    filteredRows.value.length
  )
})

function viewItem(row) {
  console.log('Ver', row)
}

function editItem(row) {
  console.log('Editar', row)
}

function deleteItem(row) {
  console.log('Eliminar', row)
}

function getCrudActions() {
  return [
    'view',
    'edit',
    'delete'
  ]
}

</script>