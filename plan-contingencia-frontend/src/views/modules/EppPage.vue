<template>

  <BasePage>

    <CrudHeader title="Elementos de Protección Personal">

      <template #actions>

        <PrimaryActionButton label="Crear" icon="add_circle_outline" size="sm" @click="openDialog" />

      </template>

    </CrudHeader>

    <CrudToolbar>

      <template #center>

        <CrudFilters v-model="selectedFilter" :options="EPP_FILTERS" />

      </template>

      <template #left>

        <BaseSearch v-model="searchText" placeholder="Buscar por nombre, categoría, nivel o estado..." />

      </template>

    </CrudToolbar>

    <BaseTable :rows="paginatedRows" :columns="EPP_COLUMNS" :loading="loading" :current-page="currentPage"
      :total-pages="totalPages" :rows-per-page="rowsPerPage" :start="startRow" :end="endRow"
      :total="filteredRows.length" @change-page="currentPage = $event">

      <template #body-cell-estado="props">

        <q-td :props="props">
          <StatusChip :status="props.value" />
        </q-td>

      </template>

      <template #body-cell-nivel="props">

        <q-td :props="props">
          <LevelChip :level="props.value" />
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

import { EPP_FILTERS } from 'src/constants/filters/epp.constantas';
import { EPP_COLUMNS } from 'src/constants/tables/epp.columns';
import { EPP_MOCK } from 'src/mocks/epp.mock';

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
import LevelChip from 'src/components/base/LevelChip.vue';
import CrudActions from 'src/components/base/CrudActions.vue';

const sourceRows = ref(EPP_MOCK);

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