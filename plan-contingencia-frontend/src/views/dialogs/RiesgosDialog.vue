<template>

    <BaseDialog v-model="dialog" :title="dialogTitle" width="400px">

        <BaseFormGrid>

            <BaseFormField
                v-for="field in RISK_FORM_FIELDS"
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

import { reactive, computed, watch } from 'vue'

import { RISK_FORM_FIELDS } from 'src/constants/forms/riesgos_form.constants'

import BaseDialog from 'src/components/forms/BaseDialog.vue'
import BaseFormGrid from 'src/components/forms/BaseFormGrid.vue'
import BaseFormField from 'src/components/forms/BaseFormField.vue'
import BaseDialogActions from 'src/components/forms/BaseDialogActions.vue'

const {
    modelValue,
    mode,
    risk
} = defineProps({

    modelValue: {
        type: Boolean,
        required: true
    },
    mode: {
        type: String,
        default: 'create',
        validator: value =>
            ['create', 'edit'].includes(value)
    },
    risk: {
        type: Object,
        default: null
    }
})

const emit = defineEmits([
    'update:modelValue',
    'save'
])

const dialog = computed({
    get() {
        return modelValue
    },
    set(value) {
        emit('update:modelValue', value)
    }
})

const form = reactive({
    riesgo: '',
    nivel: null,
    protocolos: [],
    descripcion: '',
    consecuencia: ''
})

const dialogTitle = computed(() => {
    return mode === 'create'
        ? 'Crear Riesgo'
        : 'Actualizar Riesgo'
})

const saveLabel = computed(() => {
    return mode === 'edit'
        ? 'Actualizar'
        : 'Guardar'
})

function validateForm() {
    for (const field of RISK_FORM_FIELDS) {
        const rules = field.rules ?? []
        const value = form[field.model]

        for (const rule of rules) {
            const result = rule(value)

            if (result !== true) {
                return false
            }
        }
    }
    return true
}

function handleSave() {
    if (!validateForm()) {
        return
    }
    console.log('Datos del formulario:', form)
    emit('save', { ...form })
}

function resetForm(data = {}) {
    form.riesgo = data.riesgo ?? ''
    form.nivel = data.nivel ?? null
    form.protocolos = data.protocolos?? []
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
    (isOpen) => {
        if (isOpen) {
            initializeForm()
        }
    }
)

function closeDialog() {
    resetForm()
    dialog.value = false
}

</script>