<template>

  <BasePage>

    <CrudHeader title="Peligros">

      <template #actions>

        <PrimaryActionButton label="Crear" icon="add_circle_outline" size="sm" @click="openDialog"/>

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

    <BaseTable :rows="paginatedRows" :columns="PELIGROS_COLUMNS" :loading="loading" :current-page="currentPage"
      :total-pages="totalPages" :rows-per-page="rowsPerPage" :start="startRow" :end="endRow" :total="filteredRows.length"  @change-page="currentPage = $event">

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

import { ref } from 'vue';

import { DEFAULT_CRUD_ACTIONS } from 'src/constants/actions/crud_actions.constants';
import { PELIGROS_FILTERS } from 'src/constants/filters/peligros.constants';
import { PELIGROS_COLUMNS } from 'src/constants/tables/peligros.columns';
import { PELIGROS_MOCK } from 'src/mocks/peligros.mock';
import { useCrudTable } from 'src/composables/useCrudTable';

import BasePage from 'src/components/base/BasePage.vue';
import CrudHeader from 'src/components/cruds/CrudHeader.vue';
import CrudFilters from 'src/components/cruds/CrudFilters.vue';
import BaseSearch from 'src/components/forms/BaseSearch.vue';
import CrudToolbar from 'src/components/cruds/CrudToolbar.vue';
import PrimaryActionButton from 'src/components/actions/PrimaryActionButton.vue';
import BaseTable from 'src/components/tables/BaseTable.vue';
import CrudActions from 'src/components/actions/CrudActions.vue';

const sourceRows = ref(PELIGROS_MOCK);

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
  defaultFilter: 'nombre',
  exactSearchField: [],
  defaultRowsPerPage: 8
})

const loading = ref(false);

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