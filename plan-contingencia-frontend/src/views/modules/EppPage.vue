<template>

  <BasePage>

    <CrudHeader title="Elementos de Protección Personal" back-route="dashboard" />

    <CrudToolbar>

      <template #right>

        <PrimaryActionButton label="Crear" icon="add_circle_outline" size="sm" @click="openDialog" />

      </template>

      <template #center>

        <CrudFilters v-model="selectedFilter" :options="elementosFilters" />

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

     </BaseTable>

  </BasePage>

</template>

<script setup>

import { ref, computed } from 'vue';
import { elementosFilters } from 'src/constants/filters/epp.constantas';
import { EPP_COLUMNS } from 'src/constants/tables/epp.columns';

import BasePage from 'src/components/base/BasePage.vue';
import CrudHeader from 'src/components/base/CrudHeader.vue';
import CrudFilters from 'src/components/base/CrudFilters.vue';
import BaseSearch from 'src/components/base/BaseSearch.vue';
import CrudToolbar from 'src/components/base/CrudToolbar.vue';
import PrimaryActionButton from 'src/components/base/PrimaryActionButton.vue';
import BaseTable from 'src/components/base/BaseTable.vue';
import StatusChip from 'src/components/base/StatusChip.vue';

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
    nombre: 'Casco de Seguridad',
    categoria: 'Protección de Cabeza',
    nivel: 'Alto',
    descripcion: 'Protege la cabeza contra impactos y caída de objetos.',
    estado: 'Activo'
  },
  {
    id: 2,
    nombre: 'Gafas de Seguridad',
    categoria: 'Protección Ocular',
    nivel: 'Medio',
    descripcion: 'Previenen lesiones por partículas, polvo y salpicaduras.',
    estado: 'Activo'
  },
  {
    id: 3,
    nombre: 'Guantes de Nitrilo',
    categoria: 'Protección de Manos',
    nivel: 'Medio',
    descripcion: 'Protegen las manos del contacto con sustancias químicas y biológicas.',
    estado: 'Activo'
  },
  {
    id: 4,
    nombre: 'Botas de Seguridad',
    categoria: 'Protección de Pies',
    nivel: 'Alto',
    descripcion: 'Brindan protección contra impactos, perforaciones y superficies resbalosas.',
    estado: 'Activo'
  },
  {
    id: 5,
    nombre: 'Chaleco Reflectivo',
    categoria: 'Protección Corporal',
    nivel: 'Bajo',
    descripcion: 'Mejora la visibilidad del usuario en zonas de circulación.',
    estado: 'Activo'
  },
  {
    id: 6,
    nombre: 'Respirador N95',
    categoria: 'Protección Respiratoria',
    nivel: 'Alto',
    descripcion: 'Filtra partículas suspendidas en el aire y reduce la inhalación de contaminantes.',
    estado: 'Activo'
  },
  {
    id: 7,
    nombre: 'Protector Auditivo Tipo Copa',
    categoria: 'Protección Auditiva',
    nivel: 'Alto',
    descripcion: 'Disminuye la exposición a niveles elevados de ruido.',
    estado: 'Activo'
  },
  {
    id: 8,
    nombre: 'Arnés de Seguridad',
    categoria: 'Protección contra Caídas',
    nivel: 'Alto',
    descripcion: 'Sistema de protección personal para trabajos en alturas.',
    estado: 'Activo'
  },
  {
    id: 9,
    nombre: 'Bata de Laboratorio',
    categoria: 'Protección Corporal',
    nivel: 'Medio',
    descripcion: 'Protege la ropa y el cuerpo durante prácticas de laboratorio.',
    estado: 'Activo'
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