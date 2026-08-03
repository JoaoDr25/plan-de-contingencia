<template>

    <BasePage>

    <CrudHeader title="Actividades" back-route="dashboard" />

    <CrudToolbar>

      <template #right>

        <PrimaryActionButton label="Crear" icon="add_circle_outline" size="sm" @click="openDialog"/>

      </template>

      <template #center>

        <CrudFilters v-model="selectedFilter" :options="actividadesFilters" />

      </template>

      <template #left>

        <BaseSearch v-model="searchText" placeholder="Buscar por nombre o tipo de salida..." />

      </template>

    </CrudToolbar>

     <BaseTable :rows="paginatedRows" :columns="ACTIVIDADES_COLUMNS" :loading="loading" :current-page="currentPage"
      :total-pages="totalPages" :rows-per-page="rowsPerPage" :start="startRow" :end="endRow" :total="filteredRows.length"  @change-page="currentPage = $event"/>

  </BasePage>

</template>

<script setup>

import { ref, computed } from 'vue';
import { actividadesFilters } from 'src/constants/filters/actividades.constants';
import { ACTIVIDADES_COLUMNS } from 'src/constants/tables/actividades.columns';

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
        nombre: 'Práctica de Campo en Cultivos',
        tipo: 'Práctica Académica',
        descripcion: 'Reconocimiento de cultivos y aplicación de técnicas agrícolas.',
        peligros: 5
    },
    {
        id: 2,
        nombre: 'Visita Técnica a Planta Industrial',
        tipo: 'Visita Técnica',
        descripcion: 'Observación de procesos industriales y normas de seguridad.',
        peligros: 8
    },
    {
        id: 3,
        nombre: 'Recorrido Ecológico',
        tipo: 'Salida Ambiental',
        descripcion: 'Identificación de flora, fauna y factores ambientales.',
        peligros: 6
    },
    {
        id: 4,
        nombre: 'Práctica de Laboratorio',
        tipo: 'Práctica Académica',
        descripcion: 'Ensayos y análisis en laboratorio especializado.',
        peligros: 4
    },
    {
        id: 5,
        nombre: 'Inspección de Obras Civiles',
        tipo: 'Visita Técnica',
        descripcion: 'Evaluación de procesos constructivos y seguridad en obra.',
        peligros: 9
    },
    {
        id: 6,
        nombre: 'Salida de Topografía',
        tipo: 'Trabajo de Campo',
        descripcion: 'Levantamiento de información mediante equipos topográficos.',
        peligros: 7
    },
    {
        id: 7,
        nombre: 'Práctica Forestal',
        tipo: 'Salida Ambiental',
        descripcion: 'Reconocimiento de especies forestales y conservación.',
        peligros: 6
    },
    {
        id: 8,
        nombre: 'Visita a Centro Logístico',
        tipo: 'Visita Técnica',
        descripcion: 'Análisis de operaciones de almacenamiento y distribución.',
        peligros: 5
    },
    {
        id: 9,
        nombre: 'Práctica de Mantenimiento Industrial',
        tipo: 'Práctica Académica',
        descripcion: 'Inspección y mantenimiento preventivo de maquinaria.',
        peligros: 8
    }
]);

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