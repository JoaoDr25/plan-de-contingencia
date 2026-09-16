<template>

    <BaseDialog v-model="dialog" :title="dialogTitle" :width="`${width}px`">

        <BaseFormGrid :columns="singleColumn ? 1 : 2">

            <BaseFormField v-for="field in visibleFields" :key="field.model" :field="field"
                v-model="form[field.model]" />

        </BaseFormGrid>

        <template #actions>

            <BaseDialogActions :save-label="saveLabel" @save="handleSave" @cancel="closeDialog" />

        </template>

    </BaseDialog>

</template>

<script setup>

import { reactive, computed, watch } from 'vue'

import { CONTACTS_FORM_FIELDS } from 'src/constants/forms/contactos_form.constants'
import { notifyWarning } from 'src/utils/notifications.utils'

import BaseDialog from 'src/components/forms/BaseDialog.vue'
import BaseFormGrid from 'src/components/forms/BaseFormGrid.vue'
import BaseFormField from 'src/components/forms/BaseFormField.vue'
import BaseDialogActions from 'src/components/forms/BaseDialogActions.vue'

const {
    modelValue,
    mode,
    contact,
    showStatus,
    showType,
    customTitle,
    singleColumn,
    width
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
    contact: {
        type: Object,
        default: null
    },
    showStatus: {
        type: Boolean,
        default: true
    },
    showType: {
        type: Boolean,
        default: true
    },
    customTitle: {
        type: String,
        default: ''
    },
    singleColumn: {
        type: Boolean,
        default: false
    },
    width: {
        type: [Number, String],
        default: '700px'
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
    tipo: null,
    nombre: '',
    telefono: '',
    ciudad: '',
    direccion: '',
    estado: 'Activo'
})

const visibleFields = computed(() => {
    return CONTACTS_FORM_FIELDS.filter(field => {
        if (!showStatus && field.model === 'estado') {
            return false
        }

        if (!showType && field.model === 'tipo') {
            return false
        }

        return true
    })
})

const dialogTitle = computed(() => {
    if (customTitle) {
        return customTitle
    }

    return mode === 'create'
        ? 'Crear Contacto de Emergencia'
        : 'Actualizar Contacto de Emergencia'
})

const saveLabel = computed(() => {
    return mode === 'edit'
        ? 'Actualizar'
        : 'Guardar'
})

function validateForm() {
    for (const field of visibleFields.value) {
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
    form.tipo = data.tipo ?? null
    form.nombre = data.nombre ?? ''
    form.telefono = data.telefono ?? ''
    form.ciudad = data.ciudad ?? ''
    form.direccion = data.direccion ?? ''
    form.estado = data.estado ?? 'Activo'
}

function initializeForm() {
    if (mode === 'edit' && contact) {
        resetForm(contact)
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