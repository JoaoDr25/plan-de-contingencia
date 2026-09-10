<template>

  <q-dialog
    v-model="dialogModel"
    persistent
  >

    <q-card class="work-activity-dialog">

      <q-card-section class="work-activity-dialog__header">

        <div class="text-h6">

          {{ isEditing ? 'Editar actividad' : 'Agregar actividad' }}

        </div>

        <q-btn
          flat
          round
          dense
          icon="close"
          @click="handleCancel"
        />

      </q-card-section>

      <q-separator />

      <q-card-section class="work-activity-dialog__body">

        <div class="form-grid">

          <BaseInput
            v-model="form.actividad"
            label="Actividad"
            placeholder="Nombre de la actividad"
            required
            size="wizard"
            :rules="[requiredRule]"
          />

          <BaseInput
            v-model="form.lugar"
            label="Lugar"
            placeholder="Lugar donde se realizará"
            required
            size="wizard"
            :rules="[requiredRule]"
          />

          <BaseTimePicker
            v-model="form.horaInicio"
            label="Hora de inicio"
            required
            :rules="[requiredRule]"
          />

          <BaseTimePicker
            v-model="form.horaFin"
            label="Hora de fin"
            required
            :rules="[requiredRule, endTimeRule]"
          />

          <BaseTextarea
            v-model="form.descripcion"
            label="Descripción"
            placeholder="Describa la actividad..."
            maxlength="500"
            required
            size="wizard"
            :rules="[requiredRule]"
            class="form-grid__full"
          />

        </div>

      </q-card-section>

      <q-separator />

      <q-card-actions align="right" class="work-activity-dialog__actions">
        
        <q-btn
          flat
          label="Cancelar"
          @click="handleCancel"
        />

        <q-btn
          unelevated
          color="primary"
          :label="isEditing ? 'Guardar cambios' : 'Agregar'"
          @click="handleSave"
        />

      </q-card-actions>

    </q-card>

  </q-dialog>

</template>

<script setup>

import { computed, reactive, watch } from 'vue'

import BaseInput from 'src/components/forms/BaseInput.vue'
import BaseTextarea from 'src/components/forms/BaseTextarea.vue'
import BaseTimePicker from 'src/components/forms/BaseTimePicker.vue'

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },

  activity: {
    type: Object,
    default: null,
  },
})

const emit = defineEmits([
  'update:modelValue',
  'save',
])

const dialogModel = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value),
})

const isEditing = computed(() => Boolean(props.activity))

const form = reactive(createForm())

function createForm() {
  return {
    numero: null,
    horaInicio: '',
    horaFin: '',
    duracion: '00:00',
    actividad: '',
    descripcion: '',
    lugar: '',
  }
}

function loadActivity(activity) {
  Object.assign(
    form,
    activity
      ? {
          ...createForm(),
          ...activity,
        }
      : createForm(),
  )
}

watch(
  [() => props.activity, () => props.modelValue],
  ([activity, isOpen]) => {
    if (isOpen) {
      loadActivity(activity)
    }
  },
  { immediate: true },
)

function requiredRule(value) {
  return (
    Boolean(String(value ?? '').trim()) ||
    'Este campo es obligatorio'
  )
}

function endTimeRule(value) {
  if (!value || !form.horaInicio) {
    return true
  }

  const inicio = timeToMinutes(form.horaInicio)
  const fin = timeToMinutes(value)

  if (inicio === null || fin === null) {
    return true
  }

  return (
    fin > inicio ||
    'La hora de fin debe ser posterior a la hora de inicio'
  )
}

function timeToMinutes(value) {
  if (!value || typeof value !== 'string') {
    return null
  }

  const parts = value.split(':')

  if (parts.length !== 2) {
    return null
  }

  const hours = Number(parts[0])
  const minutes = Number(parts[1])

  if (
    Number.isNaN(hours) ||
    Number.isNaN(minutes)
  ) {
    return null
  }

  return hours * 60 + minutes
}

function calculateDuration(start, end) {
  const inicio = timeToMinutes(start)
  const fin = timeToMinutes(end)

  if (inicio === null || fin === null || fin <= inicio) {
    return '00:00'
  }

  const duration = fin - inicio
  const hours = Math.floor(duration / 60)
  const minutes = duration % 60

  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`
}

function handleSave() {
  const activity = {
    ...form,
    duracion: calculateDuration(
      form.horaInicio,
      form.horaFin,
    ),
  }

  emit('save', activity)
  dialogModel.value = false
}

function handleCancel() {
  dialogModel.value = false
}

</script>

<style scoped lang="scss">

.work-activity-dialog {
  width: 700px;
  max-width: 90vw;
}

.work-activity-dialog__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.work-activity-dialog__body {
  padding: 24px;
}

.form-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 18px 20px;
}

.form-grid__full {
  grid-column: 1 / -1;
}

.work-activity-dialog__actions {
  padding: 14px 24px;
}

@media (max-width: 700px) {
  .form-grid {
    grid-template-columns: 1fr;
  }

  .form-grid__full {
    grid-column: auto;
  }
}

</style>