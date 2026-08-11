<template>

    <BaseDialog v-model="dialog" :title="dialogTitle" width="700px">

        <BaseFormGrid>

            <BaseFormField
                v-for="field in USER_FORM_FIELDS"
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

import { USER_FORM_FIELDS } from 'src/constants/forms/usuarios_form.constants'

import BaseDialog from 'src/components/forms/BaseDialog.vue'
import BaseFormGrid from 'src/components/forms/BaseFormGrid.vue'
import BaseFormField from 'src/components/forms/BaseFormField.vue'
import BaseDialogActions from 'src/components/forms/BaseDialogActions.vue'

const {
    modelValue,
    mode,
    user
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
    user: {
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
    nombre: '',
    correo: '',
    apellido: '',
    centro: '',
    tipo: '',
    rol: null,
    numero: ''
})

const dialogTitle = computed(() => {
    return mode === 'create'
        ? 'Crear Usuario'
        : 'Actualizar Usuario'
})

const saveLabel = computed(() => {
    return mode === 'edit'
        ? 'Actualizar'
        : 'Guardar'
})

function validateForm() {
    for (const field of USER_FORM_FIELDS) {
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
    form.nombre = data.nombre ?? ''
    form.correo = data.correo ?? ''
    form.apellido = data.apellido ?? ''
    form.centro = data.centro ?? ''
    form.tipo = data.tipo ?? null
    form.rol = data.rol ?? null
    form.numero = data.numero ?? ''
}

function initializeForm() {
    if (mode === 'edit' && user) {
        resetForm(user)
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