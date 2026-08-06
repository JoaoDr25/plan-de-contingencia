<template>

    <BaseDialog
        v-model="dialog"
        :title="dialogTitle"
        width="700px"
    >

        <BaseFormGrid>

            <!-- Aquí construiremos el formulario -->

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

import { computed } from 'vue';

import BaseDialog from 'src/components/forms/BaseDialog.vue';
import BaseFormGrid from 'src/components/forms/BaseFormGrid.vue';
import BaseDialogActions from 'src/components/forms/BaseDialogActions.vue';

const {
    modelValue,
    mode,
    program
} = defineProps ({
    
    modelValue: {
        type: String,
        required: True
    },
    mode: {
        type: String,
        default: 'create',
        validator: value =>
            ['create', 'edit'].includes(value)
    },
    program: {
        type: Object,
        default: () => ({})
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

</script>

<style scoped lang="scss">



</style>