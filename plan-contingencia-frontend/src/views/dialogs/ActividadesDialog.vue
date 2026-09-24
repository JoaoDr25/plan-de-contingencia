<template>
  <BaseDialog v-model="dialog" :title="dialogTitle" width="400px">
    <BaseFormGrid>
      <BaseFormField v-for="field in activityFormFields" :key="field.model" :field="field"
        v-model="form[field.model]" />
    </BaseFormGrid>

    <template #actions>
      <BaseDialogActions :save-label="saveLabel" @save="handleSave" @cancel="closeDialog" />
    </template>
  </BaseDialog>
</template>

<script setup>
import { reactive, computed, watch, ref } from 'vue'

import { ACTIVITY_FORM_FIELDS } from 'src/constants/forms/actividades_form.constants'
// import { PELIGROS_MOCK } from 'src/mocks/modules/peligros.mock.js'
import { notifyWarning, notifyError } from 'src/utils/notifications.utils'

import peligrosService from 'src/services/peligroService.js'

import BaseDialog from 'src/components/forms/BaseDialog.vue'
import BaseFormGrid from 'src/components/forms/BaseFormGrid.vue'
import BaseFormField from 'src/components/forms/BaseFormField.vue'
import BaseDialogActions from 'src/components/forms/BaseDialogActions.vue'

const { modelValue, mode, activity } = defineProps({
  modelValue: {
    type: Boolean,
    required: true,
  },
  mode: {
    type: String,
    default: 'create',
    validator: (value) => ['create', 'edit'].includes(value),
  },
  activity: {
    type: Object,
    default: null,
  },
})

const emit = defineEmits(['update:modelValue', 'save'])

const dialog = computed({
  get() {
    return modelValue
  },
  set(value) {
    emit('update:modelValue', value)
  },
})

const form = reactive({
  nombre: '',
  tipo: null,
  peligros: [],
  descripcion: '',
})

const dangers = ref([])

const activityFormFields = computed(() => {
  return ACTIVITY_FORM_FIELDS.map((field) => {
    if (field.model !== 'peligros') {
      return field
    }

    return {
      ...field,
      options: dangers.value.map((danger) => ({
        label: danger.nombre,
        value: danger._id,
      })),
    }
  })
})

const dialogTitle = computed(() => {
  return mode === 'create' ? 'Crear Actividad' : 'Actualizar Actividad'
})

const saveLabel = computed(() => {
  return mode === 'edit' ? 'Actualizar' : 'Guardar'
})

async function loadPeligros() {
  try {
    dangers.value = await peligrosService.getPeligros()
  } catch (error) {
    console.error('Error al cargar peligros:', error)

    notifyError(
      error.response?.data?.message ||
        'No fue posible cargar los peligros'
    )
    dangers.value = []
  }
}

function validateForm() {
  for (const field of ACTIVITY_FORM_FIELDS) {
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
  console.log('Datos del formulario:', form)
  emit('save', { ...form })
}

function resetForm(data = {}) {
  form.nombre = data.nombre ?? ''
  form.tipo = data.tipo ?? null

  form.peligros = Array.isArray(data.peligrosDetalle)
    ? data.peligrosDetalle.map((danger) => danger._id)
    : Array.isArray(data.peligros)
      ? data.peligros.map((danger) =>
        typeof danger === 'object' ? danger._id : danger
      )
      : []
  form.descripcion = data.descripcion ?? ''
}

function initializeForm() {
  if (mode === 'edit' && activity) {
    resetForm(activity)
    return
  }
  resetForm()
}

watch(
  () => modelValue,
  async (isOpen) => {
    if (isOpen) {
      await loadPeligros()
      initializeForm()
    }
  },
)

function closeDialog() {
  resetForm()
  dialog.value = false
}
</script>
