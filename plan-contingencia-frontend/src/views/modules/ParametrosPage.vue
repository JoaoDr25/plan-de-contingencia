<template>

  <q-page class="flex flex-center">

    <BaseTimePicker v-model="horaPrueba" label="Hora de salida" />

    <div class="q-gutter-md">

      <BaseInput v-model="inputTest" label="Campo de prueba" size="wizard" />

      <BaseSelect v-model="selectTest" label="Selección de prueba" :options="selectOptions" size="wizard" />

      <BaseTimePicker v-model="timeTest" label="Hora de prueba" />

    </div>

  </q-page>

</template>

<script setup>

import { ref } from 'vue'

import BaseInput from 'src/components/forms/BaseInput.vue'
import BaseSelect from 'src/components/forms/BaseSelect.vue'
import BaseTimePicker from 'src/components/forms/BaseTimePicker.vue'

const inputTest = ref('')

const selectTest = ref(null)

const selectOptions = [
  {
    label: 'Opción 1',
    value: '1'
  },
  {
    label: 'Opción 2',
    value: '2'
  }
]


const horaPrueba = ref('07:00')

</script>

<style scoped>


.q-gutter-md {
  display: flex;
  justify-content: space-around;
}
</style>