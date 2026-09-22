<template>
  <BaseDetailDialog v-model="dialog" title="Información de la Actividad" width="650px">
    <template #column-left>
      <BaseDetailItem label="Código" :value="activity.codigo" />

      <BaseDetailItem label="Nombre de la Actividad" :value="activity.nombre" />

      <BaseDetailItem label="Tipo de Salida" :value="activity.tipo" />

      <BaseDetailItem label="Descripción" :value="activity.descripcion" />
    </template>

    <template #column-right>
      <BaseDetailItem
        class="activity-details__right-offset"
        label="Peligros Asociados"
        :value="associatedDangers"
      />

      <BaseDetailItem label="Fecha de Creación" :value="activity.fecha" />
    </template>
  </BaseDetailDialog>
</template>

<script setup>
import { computed } from 'vue'

import BaseDetailItem from '../../components/forms/BaseDetailItem.vue'
import BaseDetailDialog from '../../components/forms/BaseDetailDialog.vue'

const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true,
  },
  activity: {
    type: Object,
    default: null,
  },
})

const emit = defineEmits(['update:modelValue'])

const dialog = computed({
  get: () => props.modelValue,
  set: (value) => {
    emit('update:modelValue', value)
  },
})

const associatedDangers = computed(() => {
  const count = Array.isArray(props.activity?.peligros) ? props.activity.peligros.length : 0

  return `${count} ${count === 1 ? 'Peligro' : 'Peligros'}`
})
</script>

<style scoped>
.activity-details__right-offset {
  margin-top: 46px;
}
</style>
