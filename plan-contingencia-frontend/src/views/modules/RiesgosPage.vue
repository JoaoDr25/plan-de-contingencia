<template>

  <BasePage>

    <CrudHeader title="Riesgos" back-route="dashboard" />

    <CrudToolbar>

      <template #right>

        <PrimaryActionButton label="Crear" icon="add_circle_outline" size="sm" @click="openDialog"/>

      </template>

      <template #center>

        <CrudFilters v-model="selectedFilter" :options="riesgosFilters" />

      </template>

      <template #left>

        <BaseSearch v-model="searchText" placeholder="Buscar por riesgo o nivel..." />

      </template>

    </CrudToolbar>

    <BaseTable :rows="paginatedRows" :columns="RIESGOS_COLUMNS" :loading="loading" :current-page="currentPage"
      :total-pages="totalPages" :rows-per-page="rowsPerPage" :start="startRow" :end="endRow" :total="filteredRows.length"  @change-page="currentPage = $event"/>

  </BasePage>

</template>

<script setup>

import { ref, computed } from 'vue';
import { riesgosFilters } from 'src/constants/filters/riesgos.constants';
import { RIESGOS_COLUMNS } from 'src/constants/tables/riesgos.columns';

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

const selectedFilter = ref('riesgo')
const searchText = ref('')

const currentPage = ref(1)
const rowsPerPage = ref(8)

const loading = ref(false);

const rows = ref([
    {
        id: 1,
        riesgo: 'Fracturas y Esguinces',
        nivel: 'Alto',
        consecuencia: 'Lesiones físicas',
        descripcion: 'Posibles lesiones ocasionadas por caídas, tropiezos o pérdida del equilibrio.',
        protocolos: 2
    },
    {
        id: 2,
        riesgo: 'Intoxicación por Sustancias Químicas',
        nivel: 'Alto',
        consecuencia: 'Afectación respiratoria',
        descripcion: 'Exposición o contacto accidental con sustancias químicas peligrosas.',
        protocolos: 1
    },
    {
        id: 3,
        riesgo: 'Quemaduras Solares',
        nivel: 'Medio',
        consecuencia: 'Lesiones en la piel',
        descripcion: 'Exposición prolongada a la radiación solar durante actividades al aire libre.',
        protocolos: 1
    },
    {
        id: 4,
        riesgo: 'Cortes y Laceraciones',
        nivel: 'Medio',
        consecuencia: 'Heridas superficiales o profundas',
        descripcion: 'Uso inadecuado de herramientas o elementos cortopunzantes.',
        protocolos: 2
    },
    {
        id: 5,
        riesgo: 'Picaduras y Mordeduras',
        nivel: 'Medio',
        consecuencia: 'Reacciones alérgicas o infecciones',
        descripcion: 'Contacto con insectos o animales durante actividades de campo.',
        protocolos: 1
    },
    {
        id: 6,
        riesgo: 'Lesión Muscular',
        nivel: 'Bajo',
        consecuencia: 'Dolor o limitación del movimiento',
        descripcion: 'Manipulación inadecuada de cargas o posturas forzadas.',
        protocolos: 1
    },
    {
        id: 7,
        riesgo: 'Accidente de Tránsito',
        nivel: 'Alto',
        consecuencia: 'Traumatismos múltiples',
        descripcion: 'Incidentes durante el desplazamiento hacia o desde la actividad.',
        protocolos: 2
    },
    {
        id: 8,
        riesgo: 'Hipotermia o Golpe de Calor',
        nivel: 'Alto',
        consecuencia: 'Compromiso del estado de salud',
        descripcion: 'Exposición a condiciones climáticas extremas durante la actividad.',
        protocolos: 1
    },
    {
        id: 9,
        riesgo: 'Pérdida Auditiva Temporal',
        nivel: 'Medio',
        consecuencia: 'Disminución de la capacidad auditiva',
        descripcion: 'Exposición prolongada a altos niveles de ruido.',
        protocolos: 1
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