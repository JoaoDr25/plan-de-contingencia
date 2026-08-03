<template>

  <BasePage>

    <CrudHeader title="Contactos de Emergencia" back-route="dashboard" />

    <CrudToolbar>

      <template #right>

        <PrimaryActionButton label="Crear" icon="add_circle_outline" size="sm" @click="openDialog"/>

      </template>

      <template #center>

        <CrudFilters v-model="selectedFilter" :options="contactosFilters" />

      </template>

      <template #left>

        <BaseSearch v-model="searchText" placeholder="Buscar por tipo de contacto, nombre, ciudad, estado..." />

      </template>

    </CrudToolbar>

    <BaseTable :rows="paginatedRows" :columns="CONTACTOS_COLUMNS" :loading="loading" :current-page="currentPage"
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

import { ref, computed } from 'vue'
import { contactosFilters } from 'src/constants/filters/contactos.constants';
import { CONTACTOS_COLUMNS } from 'src/constants/tables/contactos.columns';

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

const selectedFilter = ref('tipo-contacto')
const searchText = ref('')

const currentPage = ref(1)
const rowsPerPage = ref(8)

const loading = ref(false);

const rows = ref([
    {
        id: 1,
        tipo: 'Hospital',
        nombre: 'Hospital Universitario Erasmo Meoz',
        telefono: '(607) 5827777',
        direccion: 'Av. 11E #5AN-71',
        ciudad: 'Cúcuta',
        estado: 'Activo'
    },
    {
        id: 2,
        tipo: 'Bomberos',
        nombre: 'Cuerpo de Bomberos Voluntarios',
        telefono: '(607) 5724200',
        direccion: 'Av. 7 #6-15',
        ciudad: 'Cúcuta',
        estado: 'Activo'
    },
    {
        id: 3,
        tipo: 'Policía',
        nombre: 'Policía Metropolitana de Cúcuta',
        telefono: '123',
        direccion: 'Av. Libertadores #15-25',
        ciudad: 'Cúcuta',
        estado: 'Activo'
    },
    {
        id: 4,
        tipo: 'Cruz Roja',
        nombre: 'Cruz Roja Colombiana - Seccional Norte de Santander',
        telefono: '(607) 5715909',
        direccion: 'Calle 15 #4-28',
        ciudad: 'Cúcuta',
        estado: 'Activo'
    },
    {
        id: 5,
        tipo: 'Defensa Civil',
        nombre: 'Defensa Civil Colombiana - Junta Cúcuta',
        telefono: '(607) 5830030',
        direccion: 'Calle 2N #8-40',
        ciudad: 'Cúcuta',
        estado: 'Activo'
    },
    {
        id: 6,
        tipo: 'Tránsito',
        nombre: 'Secretaría de Tránsito Municipal',
        telefono: '(607) 5784949',
        direccion: 'Av. Gran Colombia #8-35',
        ciudad: 'Cúcuta',
        estado: 'Activo'
    },
    {
        id: 7,
        tipo: 'Ambulancia',
        nombre: 'Servicio de Ambulancias Vital',
        telefono: '125',
        direccion: 'Calle 10 #12-45',
        ciudad: 'Cúcuta',
        estado: 'Activo'
    },
    {
        id: 8,
        tipo: 'Gestión del Riesgo',
        nombre: 'Oficina Municipal para la Gestión del Riesgo',
        telefono: '(607) 5955555',
        direccion: 'Calle 11 #5-49 - Alcaldía de Cúcuta',
        ciudad: 'Cúcuta',
        estado: 'Activo'
    },
    {
        id: 9,
        tipo: 'EPS',
        nombre: 'Nueva EPS',
        telefono: '(601) 3077022',
        direccion: 'Av. 0 #10-50',
        ciudad: 'Cúcuta',
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