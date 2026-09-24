<template>
  <BaseDialog v-model="dialog" :title="dialogTitle" width="400px">
    <BaseFormGrid>
      <BaseFormField
        v-for="field in riskFormFields"
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
import { reactive, computed, watch, ref } from 'vue'

import { RISK_FORM_FIELDS } from 'src/constants/forms/riesgos_form.constants'
// import { PROTOCOLOS_MOCK } from 'src/mocks/modules/protocolos.mock.js'
import { notifyWarning } from 'src/utils/notifications.utils'

import protocoloService from 'src/services/protocoloService'

import BaseDialog from 'src/components/forms/BaseDialog.vue'
import BaseFormGrid from 'src/components/forms/BaseFormGrid.vue'
import BaseFormField from 'src/components/forms/BaseFormField.vue'
import BaseDialogActions from 'src/components/forms/BaseDialogActions.vue'

const { modelValue, mode, risk } = defineProps({
  modelValue: {
    type: Boolean,
    required: true,
  },
  mode: {
    type: String,
    default: 'create',
    validator: (value) => ['create', 'edit'].includes(value),
  },
  risk: {
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
  riesgo: '',
  nivel: null,
  protocolos: [],
  descripcion: '',
  consecuencia: '',
})

const protocolos = ref([])
const loadingProtocolos = ref(false)

async function loadProtocolos() {
  try {
    loadingProtocolos.value = true

    const data = await protocoloService.getProtocolos()

    protocolos.value = data
  } catch (error) {
    console.error('Error al cargar protocolos:', error)
    protocolos.value = []
  } finally {
    loadingProtocolos.value = false
  }
}

const riskFormFields = computed(() => {
  return RISK_FORM_FIELDS.map((field) => {
    if (field.model !== 'protocolos') {
      return field
    }

    return {
      ...field,
      options: protocolos.value.map((protocol) => ({
        label: protocol.tipo,
        value: protocol._id,
      })),
    }
  })
})

const dialogTitle = computed(() => {
  return mode === 'create' ? 'Crear Riesgo' : 'Actualizar Riesgo'
})

const saveLabel = computed(() => {
  return mode === 'edit' ? 'Actualizar' : 'Guardar'
})

function validateForm() {
  for (const field of RISK_FORM_FIELDS) {
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
  emit('save', { ...form })
}

function resetForm(data = {}) {
  form.riesgo = data.riesgo ?? ''
  form.nivel = data.nivel ?? null

  form.protocolos = Array.isArray(data.protocolos)
    ? data.protocolos.map((protocol) =>
        typeof protocol === 'object'
          ? protocol._id
          : protocol
      )
    : []

  form.descripcion = data.descripcion ?? ''
  form.consecuencia = data.consecuencia ?? ''
}

function initializeForm() {
  if (mode === 'edit' && risk) {
    resetForm(risk)
    return
  }
  resetForm()
}

watch(
  () => modelValue,
  async (isOpen) => {
    if (isOpen) {
      initializeForm()
      await loadProtocolos()
    }
  },
)

function closeDialog() {
  resetForm()
  dialog.value = false
}
</script>
