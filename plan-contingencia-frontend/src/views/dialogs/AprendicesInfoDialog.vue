<template>

    <BaseDialog v-model="dialog" title="COMPLETAR INFORMACIÓN DEL APRENDIZ" width="700px">

        <BaseFormGrid :columns="2">

            <BaseFormField v-for="field in APPRENTICE_INFO_FORM_FIELDS" :key="field.model" :field="field"
                v-model="form[field.model]" />

        </BaseFormGrid>

        <template #actions>

            <BaseDialogActions save-label="Guardar" @save="handleSave" @cancel="closeDialog" />

        </template>

    </BaseDialog>

</template>

<script setup>

import { reactive, computed, watch } from 'vue'

import { APPRENTICE_INFO_FORM_FIELDS } from 'src/constants/forms/aprendices_info.constants'
import { notifyWarning } from 'src/utils/notifications.utils'
import { toTitleCase } from 'src/utils/text.utils'

import BaseDialog from 'src/components/forms/BaseDialog.vue'
import BaseFormGrid from 'src/components/forms/BaseFormGrid.vue'
import BaseFormField from 'src/components/forms/BaseFormField.vue'
import BaseDialogActions from 'src/components/forms/BaseDialogActions.vue'

const {
    modelValue,
    apprentice
} = defineProps({

    modelValue: {
        type: Boolean,
        required: true
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
    eps: '',
    tipoSangre: null,
    condicionesMedicas: '',
    contacto: '',
    telefono: '',
    parentesco: null,
    direccion: ''
})

function resetForm(data = {}) {

    form.eps = data.eps ?? ''

    form.tipoSangre = data.tipoSangre ?? null

    form.condicionesMedicas =
        data.condicionesMedicas ?? ''

    form.contacto =
        data.contacto ?? ''

    form.telefono =
        data.telefono ?? ''

    form.parentesco =
        data.parentesco ?? null

    form.direccion =
        data.direccion ?? ''
}

function initializeForm() {

    if (apprentice) {
        resetForm(apprentice)
        return
    }
    resetForm()
}

function validateForm() {

    for (const field of APPRENTICE_INFO_FORM_FIELDS) {

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
    const TITLE_CASE_FIELDS = ['eps', 'contacto', 'direccion', 'condicionesMedicas']

    for (const field of TITLE_CASE_FIELDS) {
        form[field] = toTitleCase(form[field])
    }
    emit('save', {
        ...form
    })
}

function closeDialog() {
    resetForm()
    dialog.value = false
}

watch(
    () => modelValue,
    (isOpen) => {
        if (isOpen) {
            initializeForm()
        }
    }
)
</script>
