<template>

    <BaseDialog v-model="dialog" :title="dialogTitle" width="700px">

        <BaseFormGrid>

            <BaseFormField v-for="field in PROGRAM_FORM_FIELDS" :key="field.model" :field="field"
                v-model="form[field.model]" />

        </BaseFormGrid>

        <template #actions>

            <BaseDialogActions :save-label="saveLabel" @save="handleSave" @cancel="closeDialog" />

        </template>

    </BaseDialog>

</template>

<script setup>

import { reactive, computed } from 'vue';

import { PROGRAM_FORM_FIELDS } from 'src/constants/forms/programas_form.constants';

import BaseDialog from 'src/components/forms/BaseDialog.vue';
import BaseFormGrid from 'src/components/forms/BaseFormGrid.vue';
import BaseDialogActions from 'src/components/forms/BaseDialogActions.vue';

const {
    modelValue,
    mode
} = defineProps({

    modelValue: {
        type: String,
        required: true
    },
    mode: {
        type: String,
        default: 'create',
        validator: value =>
            ['create', 'edit'].includes(value)
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

const dialogTitle = computed(() => {
    return mode === 'create'
        ? 'Crear Programa de Formación'
        : 'Actualizar Programa de Formación'
})

function closeDialog() {
    dialog.value = false
}

function handleSave() {
    emit('save')
}

const form = reactive({
    ficha: '',
    nombre: '',
    nivel: null,
    centro: '',
    estado: 'Activo'
})

</script>

<style scoped lang="scss"></style>