<template>

    <BaseDialog v-model="dialog" :title="dialogTitle" width="700px">

        <BaseFormGrid>

            <BaseFormField
                v-for="field in APPRENTICE_FORM_FIELDS"
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

import { APPRENTICE_FORM_FIELDS } from 'src/constants/forms/aprendices_form.constants'

import BaseDialog from 'src/components/forms/BaseDialog.vue'
import BaseFormGrid from 'src/components/forms/BaseFormGrid.vue'
import BaseFormField from 'src/components/forms/BaseFormField.vue'
import BaseDialogActions from 'src/components/forms/BaseDialogActions.vue'

const {
    modelValue,
    mode,
    apprentice
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
    apprentice: {
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
    ficha: '',
    programa: null,
    nombre: '',
    eps: '',
    apellido: '',
    contactoEmergencia: '',
    tipoDocumento: null,
    estado: 'Activo',
    numeroDocumento: ''
})

const dialogTitle = computed(() => {
    return mode === 'create'
        ? 'Crear Aprendiz SENA'
        : 'Actualizar Aprendiz SENA'
})

const saveLabel = computed(() => {
    return mode === 'edit'
        ? 'Actualizar'
        : 'Guardar'
})

function validateForm() {
    for (const field of APPRENTICE_FORM_FIELDS) {
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
    form.ficha = data.ficha ?? ''
    form.programa = data.programa ?? null
    form.nombre = data.nombre ?? ''
    form.eps = data.eps ?? ''
    form.apellido = data.apellido ?? ''
    form.contactoEmergencia = data.contactoEmergencia ?? ''
    form.tipoDocumento = data.tipoDocumento ?? null
    form.estado = data.estado ?? 'Activo'
    form.numeroDocumento = data.numeroDocumento ?? ''
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