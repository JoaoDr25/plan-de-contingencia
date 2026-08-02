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

    <BaseTable  :rows="rows" :columns="RIESGOS_COLUMNS" row-key="id" :loading="loading"/>

  </BasePage>

</template>

<script setup>

import { ref } from 'vue';
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

const selectedFilter = ref('estado')
const searchText = ref('')

const loading = ref(false);

const rows = [
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
];

</script>