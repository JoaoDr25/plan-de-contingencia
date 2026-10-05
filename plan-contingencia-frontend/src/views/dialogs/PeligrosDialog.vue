<template>
  <BaseDialog v-model="dialog" :title="dialogTitle" width="400px">
    <BaseFormGrid>
      <BaseFormField
        v-for="field in dangerFormFields"
        :key="field.model"
        :field="field"
        v-model="form[field.model]"
      />
    </BaseFormGrid>

    <template #actions>
      <BaseDialogActions :save-label="saveLabel" @save="handleSave" @cancel="closeDialog" />
    </template>
  </BaseDialog>
</template>

<script setup>
import { reactive, computed, watch, ref, onMounted } from 'vue'

import { DANGER_FORM_FIELDS } from 'src/constants/forms/peligros_form.constants'
import { notifyWarning } from 'src/utils/notifications.utils'
import { toSentenceCase } from 'src/utils/text.utils'

import riesgosService from 'src/services/modules/riesgoService.js'

import BaseDialog from 'src/components/forms/BaseDialog.vue'
import BaseFormGrid from 'src/components/forms/BaseFormGrid.vue'
import BaseFormField from 'src/components/forms/BaseFormField.vue'
import BaseDialogActions from 'src/components/forms/BaseDialogActions.vue'

const { modelValue, mode, danger } = defineProps({
  modelValue: {
    type: Boolean,
    required: true,
  },
  mode: {
    type: String,
    default: 'create',
    validator: (value) => ['create', 'edit'].includes(value),
  },
  danger: {
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
  categoria: null,
  riesgos: [],
  descripcion: '',
})

const availableRisks = ref([])

async function loadAvailableRisks() {
  try {
    availableRisks.value = await riesgosService.getRiesgos()
  } catch (error) {
    console.error('Error al cargar los riesgos disponibles:', error)
  }
}

onMounted(loadAvailableRisks)

const dangerFormFields = computed(() => {
  return DANGER_FORM_FIELDS.map((field) => {
    if (field.model !== 'riesgos') {
      return field
    }

    return {
      ...field,
      options: availableRisks.value.map((risk) => ({
        label: toSentenceCase(risk.riesgo),
        value: risk._id ?? risk.id,
      })),
    }
  })
})

const dialogTitle = computed(() => {
  return mode === 'create' ? 'Crear Peligro' : 'Actualizar Peligro'
})

const saveLabel = computed(() => {
  return mode === 'edit' ? 'Actualizar' : 'Guardar'
})

function validateForm() {
  for (const field of DANGER_FORM_FIELDS) {
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

  const riesgosIds = Array.isArray(form.riesgos)
    ? form.riesgos.map((risk) =>
      typeof risk === 'object'
        ? (risk._id ?? risk.id)
        : risk
    )
    : []

  emit('save', {
    ...form,
    riesgos: riesgosIds.filter(Boolean),
  })
}

function resetForm(data = {}) {
  form.nombre = data.nombre ?? ''
  form.categoria = data.categoria ?? null

  form.riesgos = Array.isArray(data.riesgosDetalle)
    ? data.riesgosDetalle.map((risk) =>
      typeof risk === 'object'
        ? (risk._id ?? risk.id)
        : risk
    )
    : Array.isArray(data.riesgos)
      ? data.riesgos.map((risk) =>
        typeof risk === 'object'
          ? (risk._id ?? risk.id)
          : risk
      )
      : []

  form.descripcion = data.descripcion ?? ''
}

function initializeForm() {
  if (mode === 'edit' && danger) {
    resetForm(danger)
    return
  }
  resetForm()
}

watch(
  () => modelValue,
  (isOpen) => {
    if (isOpen) {
      initializeForm()
    }
  },
)

function closeDialog() {
  resetForm()
  dialog.value = false
}
</script>
