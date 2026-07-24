<template>

  <BasePage>

    <CrudHeader title="Programas de Formación" back-route="dashboard" />

    <CrudFilters v-model="selectedFilter" :options="programasFilters" />

  </BasePage>


  <q-page class="flex flex-center">
    Lista de Programas de Formación
  </q-page>
</template>

<script setup>

import BasePage from 'src/components/base/BasePage.vue';
import CrudHeader from 'src/components/base/CrudHeader.vue';

import { ref } from 'vue'
import CrudFilters from 'src/components/base/CrudFilters.vue';
import { programasFilters } from "src/constants/modules/programas.constants";

const selectedFilter = ref('nombre')

</script>