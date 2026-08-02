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

    <BaseTable  :rows="rows" :columns="PROTOCOLOS_COLUMNS" row-key="id" :loading="loading"/>

  </BasePage>

</template>

<script setup>

import { ref } from 'vue';
import { protocolosFilters } from 'src/constants/filters/protocolos.constants';
import { PROTOCOLOS_COLUMNS } from 'src/constants/tables/protocolos.columns';

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
];

</script>