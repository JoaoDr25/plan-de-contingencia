<template>

  <BasePage>

    <CrudHeader title="Aprendices" back-route="dashboard" />

    <CrudToolbar>

      <template #right>

        <PrimaryActionButton label="Crear" icon="add_circle_outline" size="sm" @click="openDialog"/>

      </template>

      <template #center>

        <CrudFilters v-model="selectedFilter" :options="aprendicesFilters" />

      </template>

      <template #left>

        <BaseSearch v-model="searchText" placeholder="Buscar por documento, nombre, ficha o estado..." />

      </template>

    </CrudToolbar>

    <BaseTable :rows="paginatedRows" :columns="APRENDICES_COLUMNS" :loading="loading" :current-page="currentPage"
      :total-pages="totalPages" :rows-per-page="rowsPerPage" :start="startRow" :end="endRow" :total="filteredRows.length"  @change-page="currentPage = $event">

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
import { aprendicesFilters } from 'src/constants/filters/aprendices.constants';
import { APRENDICES_COLUMNS } from 'src/constants/tables/aprendices.columns';

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

const selectedFilter = ref('documento')
const searchText = ref('')

const currentPage = ref(1)
const rowsPerPage = ref(8)

const loading = ref(false);

const rows = ref([
    {
        id: 1,
        documento: '1098765432',
        nombre: 'Juan Camilo Rojas',
        programa: 'Análisis y Desarrollo de Software',
        ficha: '2876541',
        eps: 'Nueva EPS',
        contacto: 'María Rojas - 3204567890',
        estado: 'Activo'
    },
    {
        id: 2,
        documento: '1032456789',
        nombre: 'Laura González',
        programa: 'Gestión Administrativa',
        ficha: '2876542',
        eps: 'Sanitas',
        contacto: 'Carlos González - 3115678901',
        estado: 'Activo'
    },
    {
        id: 3,
        documento: '1012345678',
        nombre: 'Andrés Martínez',
        programa: 'Producción Agropecuaria',
        ficha: '2876543',
        eps: 'SURA',
        contacto: 'Ana Martínez - 3156789012',
        estado: 'Inactivo'
    },
    {
        id: 4,
        documento: '1009876543',
        nombre: 'Valentina Pérez',
        programa: 'Construcción de Edificaciones',
        ficha: '2876544',
        eps: 'Compensar',
        contacto: 'Luis Pérez - 3187890123',
        estado: 'Activo'
    },
    {
        id: 5,
        documento: '1122334455',
        nombre: 'Santiago Herrera',
        programa: 'Electricidad Industrial',
        ficha: '2876545',
        eps: 'Famisanar',
        contacto: 'Mónica Herrera - 3178901234',
        estado: 'Activo'
    },
    {
        id: 6,
        documento: '1099887766',
        nombre: 'Camila Torres',
        programa: 'Gestión Logística',
        ficha: '2876546',
        eps: 'Coosalud',
        contacto: 'Pedro Torres - 3109012345',
        estado: 'Suspendido'
    },
    {
        id: 7,
        documento: '1001122334',
        nombre: 'Miguel Rodríguez',
        programa: 'Mantenimiento de Equipos de Cómputo',
        ficha: '2876547',
        eps: 'Nueva EPS',
        contacto: 'Sandra Rodríguez - 3190123456',
        estado: 'Activo'
    },
    {
        id: 8,
        documento: '1023456781',
        nombre: 'Daniela Castro',
        programa: 'Control de Calidad de Alimentos',
        ficha: '2876548',
        eps: 'Salud Total',
        contacto: 'Jorge Castro - 3161234567',
        estado: 'Activo'
    },
    {
        id: 9,
        documento: '1011223344',
        nombre: 'Felipe Ramírez',
        programa: 'Mecánica Automotriz',
        ficha: '2876549',
        eps: 'SURA',
        contacto: 'Patricia Ramírez - 3212345678',
        estado: 'Retirado'
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