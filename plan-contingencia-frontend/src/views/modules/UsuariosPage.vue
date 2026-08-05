<template>

  <BasePage>

    <CrudHeader title="Usuarios">

    <template #actions>

        <PrimaryActionButton label="Crear" icon="add_circle_outline" size="sm" @click="openDialog"/>

      </template>

  </CrudHeader>

    <CrudToolbar>

      <template #right>

        <PrimaryActionButton label="Crear" icon="add_circle_outline" size="sm" @click="openDialog"/>

      </template>

      <template #center>

        <CrudFilters v-model="selectedFilter" :options="USUARIOS_FILTERS" />

      </template>

      <template #left>

        <BaseSearch v-model="searchText" placeholder="Buscar por documento, nombre, correo, rol o estado..." />

      </template>

    </CrudToolbar>

    <BaseTable :rows="paginatedRows" :columns="USUARIOS_COLUMNS" :loading="loading" :current-page="currentPage"
      :total-pages="totalPages" :rows-per-page="rowsPerPage" :start="startRow" :end="endRow" :total="filteredRows.length"  @change-page="currentPage = $event">

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

import { USUARIOS_FILTERS } from 'src/constants/filters/usuarios.constants';
import { USUARIOS_COLUMNS } from 'src/constants/tables/usuarios.columns';
import { USUARIOS_MOCK } from 'src/mocks/usuarios.mock';

import { getCrudActions } from 'src/helpers/crud.helper';
import { useCrudTable } from 'src/composables/useCrudTable';

import BasePage from 'src/components/base/BasePage.vue';
import CrudHeader from 'src/components/base/CrudHeader.vue';
import CrudFilters from 'src/components/base/CrudFilters.vue';
import BaseSearch from 'src/components/base/BaseSearch.vue';
import CrudToolbar from 'src/components/base/CrudToolbar.vue';
import PrimaryActionButton from 'src/components/base/PrimaryActionButton.vue';
import BaseTable from 'src/components/base/BaseTable.vue';
import CrudActions from 'src/components/base/CrudActions.vue';

const sourceRows = ref(USUARIOS_MOCK);

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