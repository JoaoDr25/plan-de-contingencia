<template>

  <BasePage>

    <CrudHeader title="Protocolos" back-route="dashboard" />

    <CrudToolbar>

      <template #right>

        <PrimaryActionButton label="Crear" icon="add_circle_outline" size="sm" @click="openDialog"/>

      </template>

      <template #center>

        <CrudFilters v-model="selectedFilter" :options="protocolosFilters" />

      </template>

      <template #left>

        <BaseSearch v-model="searchText" placeholder="Buscar por tipo, responsable o estado..." />

      </template>

    </CrudToolbar>

   <BaseTable :rows="paginatedRows" :columns="PROTOCOLOS_COLUMNS" :loading="loading" :current-page="currentPage"
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
import { protocolosFilters } from 'src/constants/filters/protocolos.constants';
import { PROTOCOLOS_COLUMNS } from 'src/constants/tables/protocolos.columns';

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

const selectedFilter = ref('tipo')
const searchText = ref('')

const currentPage = ref(1)
const rowsPerPage = ref(8)

const loading = ref(false);

const rows = ref([
    {
        id: 1,
        tipo: 'Accidente por Caída',
        accion: 'Asegurar el área, valorar al lesionado y activar el protocolo de primeros auxilios.',
        responsable: 'Instructor Responsable',
        medio: 'Llamada telefónica',
        estado: 'Activo'
    },
    {
        id: 2,
        tipo: 'Incendio',
        accion: 'Evacuar el área de forma inmediata y notificar al Cuerpo de Bomberos.',
        responsable: 'Brigadista de Emergencias',
        medio: 'Llamada telefónica',
        estado: 'Activo'
    },
    {
        id: 3,
        tipo: 'Emergencia Médica',
        accion: 'Solicitar asistencia médica y brindar primeros auxilios mientras llega el apoyo.',
        responsable: 'Instructor Responsable',
        medio: 'Línea de Emergencias',
        estado: 'Activo'
    },
    {
        id: 4,
        tipo: 'Derrame de Sustancias Químicas',
        accion: 'Aislar la zona, utilizar EPP y aplicar el procedimiento de contención.',
        responsable: 'Responsable de Seguridad',
        medio: 'Radio de Comunicación',
        estado: 'Activo'
    },
    {
        id: 5,
        tipo: 'Picadura o Mordedura de Animal',
        accion: 'Prestar atención inicial y trasladar al aprendiz al centro asistencial más cercano.',
        responsable: 'Instructor Responsable',
        medio: 'Llamada telefónica',
        estado: 'Activo'
    },
    {
        id: 6,
        tipo: 'Condiciones Climáticas Extremas',
        accion: 'Suspender la actividad y trasladar al grupo a un lugar seguro.',
        responsable: 'Coordinador de la Actividad',
        medio: 'Comunicación Verbal',
        estado: 'Activo'
    },
    {
        id: 7,
        tipo: 'Accidente de Tránsito',
        accion: 'Asegurar la escena, contactar a los organismos de emergencia y reportar el incidente.',
        responsable: 'Conductor Responsable',
        medio: 'Línea de Emergencias',
        estado: 'Activo'
    },
    {
        id: 8,
        tipo: 'Persona Extraviada',
        accion: 'Realizar conteo del grupo, activar la búsqueda y notificar a las autoridades si es necesario.',
        responsable: 'Instructor Responsable',
        medio: 'Teléfono Celular',
        estado: 'Activo'
    },
    {
        id: 9,
        tipo: 'Evacuación Preventiva',
        accion: 'Guiar al grupo hacia el punto de encuentro siguiendo la ruta de evacuación establecida.',
        responsable: 'Brigadista de Emergencias',
        medio: 'Alarma y Comunicación Verbal',
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