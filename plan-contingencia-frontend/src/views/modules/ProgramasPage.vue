<template>

  <BasePage>

    <CrudHeader title="Programas de Formación">

    <template #actions>

      <PrimaryActionButton label="Crear" icon="add_circle_outline" size="sm" @click="openDialog" />

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
      :total="filteredRows.length" @change-page="currentPage = $event">

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

  </BasePage>

</template>

<script setup>

import { ref } from 'vue'

import { DEFAULT_CRUD_ACTIONS } from 'src/constants/actions/crud_actions.constants';
import { PROGRAMAS_FILTERS } from "src/constants/filters/programas.constants";
import { PROGRAMAS_COLUMNS } from 'src/constants/tables/programas.columns';
import { PROGRAMAS_MOCK } from 'src/mocks/programas.mock';
import { useCrudTable } from 'src/composables/useCrudTable';

import BasePage from 'src/components/base/BasePage.vue';
import CrudHeader from 'src/components/cruds/CrudHeader.vue';
import CrudFilters from 'src/components/cruds/CrudFilters.vue';
import BaseSearch from 'src/components/base/BaseSearch.vue';
import CrudToolbar from 'src/components/cruds/CrudToolbar.vue';
import PrimaryActionButton from 'src/components/actions/PrimaryActionButton.vue';
import BaseTable from 'src/components/tables/BaseTable.vue';
import StatusChip from 'src/components/states/StatusChip.vue';
import CrudActions from 'src/components/actions/CrudActions.vue';

const sourceRows = ref(PROGRAMAS_MOCK)

const {
  selectedFilter,
  searchText,
  currentPage,
  rowsPerPage,
  filteredRows,
  paginatedRows,
  totalPages,
  startRow,
  endRow
} = useCrudTable({
  sourceRows,
  defaultFilter: 'ficha',
  exactSearchField: ['estado'],
  defaultRowsPerPage: 8
})

const loading = ref(false)

const openDialog = () => {
  console.log('Abrir diálogo de creación')
}

function viewItem(row) {
  console.log('Ver', row)
}

function editItem(row) {
  console.log('Editar', row)
}

function deleteItem(row) {
  console.log('Eliminar', row)
}

</script>
