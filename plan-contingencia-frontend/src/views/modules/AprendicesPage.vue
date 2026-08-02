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

    <BaseTable  :rows="rows" :columns="APRENDICES_COLUMNS" row-key="id" :loading="loading"/>

  </BasePage>

</template>

<script setup>

import { ref } from 'vue';
import { aprendicesFilters } from 'src/constants/filters/aprendices.constants';
import { APRENDICES_COLUMNS } from 'src/constants/tables/aprendices.columns';

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
];

</script>