<template>

  <BasePage>

    <CrudHeader title="Aprendices">

      <template #actions>

        <PrimaryActionButton label="Crear" icon="add_circle_outline" size="sm" @click="openDialog" />

      </template>

    </CrudHeader>

    <CrudToolbar>

      <template #center>

        <CrudFilters v-model="selectedFilter" :options="APRENDICES_FILTERS" />

      </template>

      <template #left>

        <BaseSearch v-model="searchText" placeholder="Buscar por documento, nombre, ficha o estado..." />

      </template>

    </CrudToolbar>

    <BaseTable :rows="paginatedRows" :columns="APRENDICES_COLUMNS" :loading="loading" :current-page="currentPage"
      :total-pages="totalPages" :rows-per-page="rowsPerPage" :start="startRow" :end="endRow"
      :total="filteredRows.length" @change-page="currentPage = $event">

      <template #body-cell-estado="props">

        <q-td :props="props">
          <StatusChip :status="props.value" />
        </q-td>

      </template>

      <template #body-cell-opciones="props">

        <q-td :props="props">
          <CrudActions :actions="getCrudActions(props.row)" @view="viewItem(props.row)" @edit="editItem(props.row)"
            @delete="deleteItem(props.row)" />
        </q-td>

      </template>

    </BaseTable>

  </BasePage>

</template>

<script setup>

import { ref } from 'vue';

import { APRENDICES_FILTERS } from 'src/constants/filters/aprendices.constants';
import { APRENDICES_COLUMNS } from 'src/constants/tables/aprendices.columns';
import { APRENDICES_MOCK } from 'src/mocks/aprendices.mock';

import { getCrudActions } from 'src/helpers/crud.helper';
import { useCrudTable } from 'src/composables/useCrudTable';

import BasePage from 'src/components/base/BasePage.vue';
import CrudHeader from 'src/components/base/CrudHeader.vue';
import CrudFilters from 'src/components/base/CrudFilters.vue';
import BaseSearch from 'src/components/base/BaseSearch.vue';
import CrudToolbar from 'src/components/base/CrudToolbar.vue';
import PrimaryActionButton from 'src/components/base/PrimaryActionButton.vue';
import BaseTable from 'src/components/base/BaseTable.vue';
import StatusChip from 'src/components/base/StatusChip.vue';
import CrudActions from 'src/components/base/CrudActions.vue';

const sourceRows = ref(APRENDICES_MOCK);

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
  defaultFilter: 'documento',
  exactSearchField: ['estado'],
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