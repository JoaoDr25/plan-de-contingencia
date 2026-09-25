<template>
  <BaseDialog v-model="dialog" :title="dialogTitle" width="700px">
    <BaseFormGrid :columns="2">
      <BaseFormField
        v-for="field in formFields"
        :key="field.model"
        :field="field"
        v-model="form[field.model]"
      />
    </BaseFormGrid>

    <template #actions>
      <BaseDialogActions
        :save-label="saveLabel"
        @save="handleSave"
        @cancel="closeDialog"
      />
    </template>
  </BaseDialog>
</template>

<script setup>
import { reactive, computed, watch, ref } from 'vue'

import { APPRENTICE_FORM_FIELDS } from 'src/constants/forms/aprendices_form.constants'

import programaService from 'src/services/modules/programaService.js'

import { notifyWarning, notifyError } from 'src/utils/notifications.utils'

import BaseDialog from 'src/components/forms/BaseDialog.vue'
import BaseFormGrid from 'src/components/forms/BaseFormGrid.vue'
import BaseFormField from 'src/components/forms/BaseFormField.vue'
import BaseDialogActions from 'src/components/forms/BaseDialogActions.vue'

const { modelValue, mode, apprentice } = defineProps({
  modelValue: {
    type: Boolean,
    required: true,
  },

  mode: {
    type: String,
    default: 'create',
    validator: (value) => ['create', 'edit'].includes(value),
  },

  apprentice: {
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
  programaFormacionId: null,
  nombre: '',
  apellido: '',
  eps: '',
  telefono: '',
  tipo: null,
  documento: '',
  estado: 'Activo',
})

const programas = ref([])

const loadingProgramas = ref(false)

const dialogTitle = computed(() => {
  return mode === 'create'
    ? 'Crear Aprendiz SENA'
    : 'Actualizar Aprendiz SENA'
})

const saveLabel = computed(() => {
  return mode === 'edit' ? 'Actualizar' : 'Guardar'
})

const programaOptions = computed(() => {
  return programas.value.map((programa) => ({
    label: `${programa.nombre} - ${programa.ficha}`,
    value: programa.id,
  }))
})

const formFields = computed(() => {
  return APPRENTICE_FORM_FIELDS.map((field) => {
    if (field.model === 'programaFormacionId') {
      return {
        ...field,
        options: programaOptions.value,
        loading: loadingProgramas.value,
      }
    }

    return field
  })
})

async function loadProgramas() {
  loadingProgramas.value = true

  try {
    const programasDisponibles = await programaService.getProgramas()

    programas.value = (programasDisponibles || []).filter(
      (programa) => programa.estado === 'Activo'
    )
  } catch (error) {
    console.error('Error al cargar programas:', error)

    notifyError(
      error.response?.data?.message ||
      'No fue posible cargar los programas de formación'
    )
  } finally {
    loadingProgramas.value = false
  }
}

function validateForm() {
  for (const field of formFields.value) {
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

  emit('save', {
    ...form,
  })
}

function resetForm(data = {}) {
  form.programaFormacionId =
    data.programaFormacionId ?? null

  form.nombre = data.nombre ?? ''
  form.apellido = data.apellido ?? ''
  form.eps = data.eps ?? ''
  form.telefono = data.telefono ?? ''
  form.tipo = data.tipo ?? null
  form.documento = data.documento ?? ''
  form.estado = data.estado ?? 'Activo'
}

function initializeForm() {
  if (mode === 'edit' && apprentice) {
    resetForm(apprentice)
    return
  }

  resetForm()
}

watch(
  () => modelValue,
  async (isOpen) => {
    if (isOpen) {
      await loadProgramas()
      initializeForm()
    }
  },
)

function closeDialog() {
  resetForm()
  dialog.value = false
}
</script>