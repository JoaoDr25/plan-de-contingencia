<template>

  <BasePage>

    <CrudHeader title="Peligros" back-route="dashboard" />

    <CrudToolbar>

      <template #right>

        <PrimaryActionButton label="Crear" icon="add_circle_outline" size="sm" @click="openDialog"/>

      </template>

      <template #center>

        <CrudFilters v-model="selectedFilter" :options="peligrosFilters" />

      </template>

      <template #left>

        <BaseSearch v-model="searchText" placeholder="Buscar por nombre o categoría..." />

      </template>

    </CrudToolbar>

    <BaseTable :rows="paginatedRows" :columns="PELIGROS_COLUMNS" :loading="loading" :current-page="currentPage"
      :total-pages="totalPages" :rows-per-page="rowsPerPage" :start="startRow" :end="endRow" :total="filteredRows.length"  @change-page="currentPage = $event"/>

  </BasePage>

</template>

<script setup>

import { ref, computed } from 'vue';
import { peligrosFilters } from 'src/constants/filters/peligros.constants';
import { PELIGROS_COLUMNS } from 'src/constants/tables/peligros.columns';

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
        nombre: 'Caída a Nivel',
        categoria: 'Locativo',
        descripcion: 'Superficies irregulares, húmedas o con obstáculos que pueden ocasionar caídas.',
        riesgos: 4
    },
    {
        id: 2,
        nombre: 'Exposición a Sustancias Químicas',
        categoria: 'Químico',
        descripcion: 'Contacto o inhalación de productos químicos durante prácticas de laboratorio.',
        riesgos: 6
    },
    {
        id: 3,
        nombre: 'Radiación Solar',
        categoria: 'Físico',
        descripcion: 'Exposición prolongada al sol durante actividades al aire libre.',
        riesgos: 3
    },
    {
        id: 4,
        nombre: 'Herramientas Cortopunzantes',
        categoria: 'Mecánico',
        descripcion: 'Uso de herramientas con filo o punta que pueden causar lesiones.',
        riesgos: 5
    },
    {
        id: 5,
        nombre: 'Contacto con Animales',
        categoria: 'Biológico',
        descripcion: 'Posibilidad de mordeduras, picaduras o transmisión de enfermedades.',
        riesgos: 4
    },
    {
        id: 6,
        nombre: 'Manipulación Manual de Cargas',
        categoria: 'Ergonómico',
        descripcion: 'Levantamiento o transporte de cargas que puede generar lesiones musculares.',
        riesgos: 3
    },
    {
        id: 7,
        nombre: 'Tránsito Vehicular',
        categoria: 'Seguridad',
        descripcion: 'Circulación de vehículos durante desplazamientos o visitas técnicas.',
        riesgos: 5
    },
    {
        id: 8,
        nombre: 'Condiciones Climáticas Adversas',
        categoria: 'Natural',
        descripcion: 'Lluvias intensas, tormentas o vientos fuertes que afectan la actividad.',
        riesgos: 4
    },
    {
        id: 9,
        nombre: 'Ruido Excesivo',
        categoria: 'Físico',
        descripcion: 'Exposición a altos niveles de ruido en ambientes industriales.',
        riesgos: 2
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