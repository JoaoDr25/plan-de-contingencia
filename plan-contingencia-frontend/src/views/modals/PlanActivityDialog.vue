<template>

    <BaseDialog v-model="dialogModel" :title="dialogTitle" width="400px" persistent>

        <BaseFormGrid>

            <BaseFormField
                v-for="field in activityFormFields"
                :key="field.model"
                :field="field"
                v-model="form[field.model]"
            />

            <BaseFormField
                :field="PLAN_ACTIVITY_DESCRIPTION_FIELD"
                v-model="form.descripcion"
            />

        </BaseFormGrid>

        <template #actions>

            <BaseDialogActions
                class="plan-activity-actions"
                :save-label="saveLabel"
                @save="handleSave"
                @cancel="handleCancel"
            />

        </template>

    </BaseDialog>

</template>

<script setup>

import { computed, reactive, watch } from 'vue'

import { PLAN_ACTIVITY_FORM_FIELDS, PLAN_ACTIVITY_DESCRIPTION_FIELD } from 'src/constants/forms/plan_actividad_form.constants'
import { notifyWarning } from 'src/utils/notifications.utils'

import BaseDialog from 'src/components/forms/BaseDialog.vue'
import BaseFormGrid from 'src/components/forms/BaseFormGrid.vue'
import BaseFormField from 'src/components/forms/BaseFormField.vue'
import BaseDialogActions from 'src/components/forms/BaseDialogActions.vue'

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },

  activity: {
    type: Object,
    default: null,
  },

  horaSalida: {
    type: String,
    default: '',
  },

  horaRegreso: {
    type: String,
    default: '',
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

const dialogTitle = computed(() => {
  return isEditing.value ? 'Editar actividad' : 'Agregar actividad'
})

const saveLabel = computed(() => {
  return isEditing.value ? 'Guardar' : 'Agregar'
})

const activityFormFields = computed(() => {
  return PLAN_ACTIVITY_FORM_FIELDS.map((field) => {
    if (field.model !== 'horaInicio' && field.model !== 'horaFin') {
      return field
    }

    const rules = [...field.rules, rangeRule]

    if (field.model === 'horaFin') {
      rules.push(endTimeRule)
    }

    return {
      ...field,
      minTime: props.horaSalida,
      maxTime: props.horaRegreso,
      rules,
    }
  })
})

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

function rangeRule(value) {
  if (!value || !props.horaSalida || !props.horaRegreso) {
    return true
  }

  const time = timeToMinutes(value)
  const start = timeToMinutes(props.horaSalida)
  const end = timeToMinutes(props.horaRegreso)

  if (time === null || start === null || end === null) {
    return true
  }

  return (
    (time >= start && time <= end) ||
    `La hora debe estar entre ${props.horaSalida} y ${props.horaRegreso}`
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

function validateForm() {
  for (const field of [...activityFormFields.value, PLAN_ACTIVITY_DESCRIPTION_FIELD]) {
    const rules = field.rules ?? []
    const value = form[field.model]

    for (const rule of rules) {
      const result = rule(value)

      if (result !== true) {
        return result
      }
    }
  }
  return true
}

function handleSave() {
  const validationResult = validateForm()

  if (validationResult !== true) {
    notifyWarning(validationResult)
    return
  }

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

:global(.plan-activity-actions .primary-action-button) {
  width: 115px !important;
  min-width: 115px !important;
  white-space: nowrap;
}

</style>
