<template>

  <BasePage>

    <CrudHeader title="Programas de Formación" back-route="dashboard" />

    <CrudToolbar>

      <template #right>

        <PrimaryActionButton label="Crear" icon="add_circle_outline" size="sm" @click="openDialog" />

      </template>

      <template #center>

        <CrudFilters v-model="selectedFilter" :options="programasFilters" />

      </template>

      <template #left>

        <BaseSearch v-model="searchText" placeholder="Buscar por ficha, nombre, nivel de formación..." />

      </template>

    </CrudToolbar>

    <BaseTable :rows="paginatedRows" :columns="PROGRAMAS_COLUMNS" :loading="loading" :current-page="currentPage"
      :total-pages="totalPages" :rows-per-page="rowsPerPage" :start="startRow" :end="endRow" :total="filteredRows.length"  @change-page="currentPage = $event"/>

  </BasePage>

</template>

<script setup>

import { ref, computed } from 'vue'
import { programasFilters } from "src/constants/filters/programas.constants";
import { PROGRAMAS_COLUMNS } from 'src/constants/tables/programas.columns';

import BasePage from 'src/components/base/BasePage.vue';
import CrudHeader from 'src/components/base/CrudHeader.vue';
import CrudFilters from 'src/components/base/CrudFilters.vue';
import BaseSearch from 'src/components/base/BaseSearch.vue';
import CrudToolbar from 'src/components/base/CrudToolbar.vue';
import PrimaryActionButton from 'src/components/base/PrimaryActionButton.vue';
import BaseTable from 'src/components/base/BaseTable.vue';

const openDialog = () => {
  console.log('Abrir diálogo de creación')
}

const selectedFilter = ref('nombre')
const searchText = ref('')

const currentPage = ref(1)
const rowsPerPage = ref(8)

const loading = ref(false);

const rows = ref([
  {
    id: 1,
    ficha: '2876541',
    nombre: 'Análisis y Desarrollo de Software',
    nivel: 'Tecnólogo',
    centro: 'Centro Industrial',
    fecha: "00/00/0000",
    estado: 'Activo'
  },
  {
    id: 2,
    ficha: '2876542',
    nombre: 'Gestión Administrativa',
    nivel: 'Técnico',
    centro: 'Centro de Servicios',
    fecha: "00/00/0000",
    estado: 'Activo'
  },
  {
    id: 3,
    ficha: '2876543',
    nombre: 'Producción Agropecuaria',
    nivel: 'Tecnólogo',
    centro: 'Centro Agropecuario',
    fecha: "00/00/0000",
    estado: 'Inactivo'
  },
  {
    id: 4,
    ficha: '2876541',
    nombre: 'Análisis y Desarrollo de Software',
    nivel: 'Tecnólogo',
    centro: 'Centro Industrial',
    fecha: "00/00/0000",
    estado: 'Activo'
  },
  {
    id: 5,
    ficha: '2876542',
    nombre: 'Gestión Administrativa',
    nivel: 'Técnico',
    centro: 'Centro de Servicios',
    fecha: "00/00/0000",
    estado: 'Activo'
  },
  {
    id: 6,
    ficha: '2876543',
    nombre: 'Producción Agropecuaria',
    nivel: 'Tecnólogo',
    centro: 'Centro Agropecuario',
    fecha: "00/00/0000",
    estado: 'Inactivo'
  },
  {
    id: 7,
    ficha: '2876541',
    nombre: 'Análisis y Desarrollo de Software',
    nivel: 'Tecnólogo',
    centro: 'Centro Industrial',
    fecha: "00/00/0000",
    estado: 'Activo'
  },
  {
    id: 8,
    ficha: '2876542',
    nombre: 'Gestión Administrativa',
    nivel: 'Técnico',
    centro: 'Centro de Servicios',
    fecha: "00/00/0000",
    estado: 'Activo'
  },
  {
    id: 9,
    ficha: '2876543',
    nombre: 'Producción Agropecuaria',
    nivel: 'Tecnólogo',
    centro: 'Centro Agropecuario',
    fecha: "00/00/0000",
    estado: 'Inactivo'
  }
])

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


</script>
