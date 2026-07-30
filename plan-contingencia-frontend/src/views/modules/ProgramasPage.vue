<template>

  <BasePage>

    <CrudHeader title="Programas de Formación" back-route="dashboard" />

    <CrudToolbar>

      <template #right>

        <PrimaryActionButton label="Crear" icon="add_circle_outline" size="sm" @click="openDialog"/>

      </template>

      <template #center>

        <CrudFilters v-model="selectedFilter" :options="programasFilters" />

      </template>

      <template #left>

        <BaseSearch v-model="searchText" placeholder="Buscar por ficha, nombre, nivel de formación..." />

      </template>

    </CrudToolbar>

    <BaseTable  :rows="rows" :columns="PROGRAMAS_COLUMNS" row-key="id" :loading="loading"/>

  </BasePage>

</template>

<script setup>

import { ref } from 'vue'
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

const selectedFilter = ref('estado')
const searchText = ref('')

const loading = ref(false);

const rows = [
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
]

</script>
