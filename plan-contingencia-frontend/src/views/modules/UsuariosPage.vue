<template>

  <BasePage>

    <CrudHeader title="Usuarios" back-route="dashboard" />

    <CrudToolbar>

      <template #right>

        <PrimaryActionButton label="Crear" icon="add_circle_outline" size="sm" @click="openDialog"/>

      </template>

      <template #center>

        <CrudFilters v-model="selectedFilter" :options="usuariosFilters" />

      </template>

      <template #left>

        <BaseSearch v-model="searchText" placeholder="Buscar por documento, nombre, correo, rol o estado..." />

      </template>

    </CrudToolbar>

    <BaseTable :rows="paginatedRows" :columns="USUARIOS_COLUMNS" :loading="loading" :current-page="currentPage"
      :total-pages="totalPages" :rows-per-page="rowsPerPage" :start="startRow" :end="endRow" :total="filteredRows.length"  @change-page="currentPage = $event"/>

  </BasePage>

</template>

<script setup>

import { ref, computed } from 'vue';
import { usuariosFilters } from 'src/constants/filters/usuarios.constants';
import { USUARIOS_COLUMNS } from 'src/constants/tables/usuarios.columns';

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

const selectedFilter = ref('documento')
const searchText = ref('')

const currentPage = ref(1)
const rowsPerPage = ref(8)

const loading = ref(false);

const rows = ref([
    {
        id: 1,
        documento: '1098765432',
        nombre: 'Carlos Andrés Gómez',
        correo: 'cgomez@sena.edu.co',
        centro: 'Centro Industrial',
        rol: 'Administrador',
        acceso: '30/07/2026 08:15',
    },
    {
        id: 2,
        documento: '1023456789',
        nombre: 'Laura Marcela Rojas',
        correo: 'lrojas@sena.edu.co',
        centro: 'Centro de Servicios',
        rol: 'Instructor',
        acceso: '30/07/2026 07:42',
    },
    {
        id: 3,
        documento: '1009876543',
        nombre: 'Jhon Alexander Pérez',
        correo: 'jperez@sena.edu.co',
        centro: 'Centro Agropecuario',
        rol: 'Coordinador',
        acceso: '29/07/2026 16:30',
    },
    {
        id: 4,
        documento: '1011122233',
        nombre: 'Diana Carolina Torres',
        correo: 'dtorres@sena.edu.co',
        centro: 'Centro Industrial',
        rol: 'Instructor',
        acceso: '30/07/2026 09:05',
    },
    {
        id: 5,
        documento: '1033344455',
        nombre: 'Luis Fernando Ramírez',
        correo: 'lramirez@sena.edu.co',
        centro: 'Centro de Comercio y Servicios',
        rol: 'Instructor',
        acceso: '28/07/2026 14:20',
    },
    {
        id: 6,
        documento: '1044455566',
        nombre: 'Natalia Rodríguez',
        correo: 'nrodriguez@sena.edu.co',
        centro: 'Centro Agroempresarial',
        rol: 'Líder de Bienestar',
        acceso: '30/07/2026 08:51',
    },
    {
        id: 7,
        documento: '1055566677',
        nombre: 'Miguel Ángel Hernández',
        correo: 'mhernandez@sena.edu.co',
        centro: 'Centro Industrial',
        rol: 'Instructor',
        acceso: '27/07/2026 10:12',
    },
    {
        id: 8,
        documento: '1066677788',
        nombre: 'Sandra Milena Castro',
        correo: 'scastro@sena.edu.co',
        centro: 'Centro de Gestión Administrativa',
        rol: 'Coordinador',
        acceso: '29/07/2026 11:45',
    },
    {
        id: 9,
        documento: '1077788899',
        nombre: 'Andrés Felipe Moreno',
        correo: 'amoreno@sena.edu.co',
        centro: 'Centro Industrial',
        rol: 'Administrador',
        acceso: '30/07/2026 09:18',
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