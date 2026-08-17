<template>

    <BaseDialog v-model="dialog" :title="dialogTitle" width="400px">

        <BaseFormGrid>

            <BaseFormField
                v-for="field in PROTOCOL_FORM_FIELDS"
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

import { PROTOCOL_FORM_FIELDS } from 'src/constants/forms/protocolos_form.constants'

import BaseDialog from 'src/components/forms/BaseDialog.vue'
import BaseFormGrid from 'src/components/forms/BaseFormGrid.vue'
import BaseFormField from 'src/components/forms/BaseFormField.vue'
import BaseDialogActions from 'src/components/forms/BaseDialogActions.vue'

const {
    modelValue,
    mode,
    protocol
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
    protocol: {
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
    tipo: '',
    accion: '',
    responsable: '',
    medio: '',
    estado: 'Activo'
})

const dialogTitle = computed(() => {
    return mode === 'create'
        ? 'Crear Protocolo'
        : 'Actualizar Protocolo'
})

const saveLabel = computed(() => {
    return mode === 'edit'
        ? 'Actualizar'
        : 'Guardar'
})

function validateForm() {
    for (const field of PROTOCOL_FORM_FIELDS) {
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
    form.tipo = data.tipo ?? ''
    form.accion = data.accion ?? ''
    form.responsable = data.responsable ?? ''
    form.medio = data.medio ?? ''
    form.estado = data.estado ?? 'Activo'
}

function initializeForm() {
    if (mode === 'edit' && protocol) {
        resetForm(protocol)
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