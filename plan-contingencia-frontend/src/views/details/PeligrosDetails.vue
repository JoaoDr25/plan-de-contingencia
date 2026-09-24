<template>
  <BaseDetailDialog v-model="dialog" title="Información del Peligro" width="650px">
    <template #column-left>
      <BaseDetailItem label="Código" :value="danger.codigo" />

      <BaseDetailItem label="Nombre del Peligro" :value="danger.nombre" />

      <BaseDetailItem label="Categoría" :value="danger.categoria" />

      <BaseDetailItem label="Descripción" :value="danger.descripcion" />
    </template>

    <template #column-right>
      <BaseDetailItem
        class="danger-details__right-offset"
        label="Riesgos Asociados"
        :value="associatedRisks"
      />

      <BaseDetailItem label="Fecha de Creación" :value="formattedCreatedAt" />
    </template>
  </BaseDetailDialog>
</template>

<script setup>
import { computed } from 'vue'

import { formatDate } from 'src/utils/date.utils'

import BaseDetailItem from '../../components/forms/BaseDetailItem.vue'
import BaseDetailDialog from '../../components/forms/BaseDetailDialog.vue'

const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true,
  },
  danger: {
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

const associatedRisks = computed(() => {
  const count = Array.isArray(props.danger?.riesgos) ? props.danger.riesgos.length : 0

  return `${count} ${count === 1 ? 'Riesgo' : 'Riesgos'}`
})

const formattedCreatedAt = computed(() => {
  const createdAt = props.danger?.createdAt || props.danger?.fecha

  if (!createdAt) {
    return 'No disponible'
  }

  const formatted = formatDate(createdAt)

  return formatted || 'No disponible'
})
</script>

<style scoped>
.danger-details__right-offset {
  margin-top: 46px;
}
</style>
