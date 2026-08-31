<template>

    <BaseDialog v-model="dialog" :title="title" width="500px" persistent>

        <template #actions>

            <div class="base-confirmation-dialog__actions">

                <component :is="confirmButtonComponent" :label="confirmLabel" :icon="confirmIcon" size="sm"
                    :loading="loading" :disable="loading" @click="handleConfirm" />

                <SecondaryActionButton :label="cancelLabel" icon="close" size="sm" :disable="loading"
                    @click="handleCancel" />

            </div>

        </template>

    </BaseDialog>

</template>

<script setup>

import { computed } from 'vue'

import BaseDialog from './BaseDialog.vue'
import PrimaryActionButton from '../actions/PrimaryActionButton.vue'
import SecondaryActionButton from '../actions/SecondaryActionButton.vue'
import DangerActionButton from '../actions/DangerActionButton.vue'

const {
    modelValue,
    title,
    confirmLabel,
    cancelLabel,
    variant,
    loading
} = defineProps({

    modelValue: {
        type: Boolean,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    confirmLabel: {
        type: String,
        default: 'Confirmar'
    },
    cancelLabel: {
        type: String,
        default: 'Cancelar'
    },
    variant: {
        type: String,
        default: 'primary',
        validator: value => ['primary', 'secondary', 'danger'].includes(value)
    },
    loading: {
        type: Boolean,
        default: false
    }
})

const emit = defineEmits([
    'update:modelValue',
    'confirm',
    'cancel'
])

const dialog = computed({
    get() {
        return modelValue
    },
    set(value) {
        emit('update:modelValue', value)
    }
})

const confirmButtonComponent = computed(() => {

    switch (variant) {
        case 'danger':
            return DangerActionButton
        case 'secondary':
            return SecondaryActionButton
        default:
            return PrimaryActionButton
    }
})

const confirmIcon = computed(() => {

    switch (variant) {
        case 'danger':
            return 'close'
        case 'secondary':
            return 'check'
        default:
            return 'check'
    }
})

function handleConfirm() {
    emit('confirm')
}

function handleCancel() {
    emit('cancel')
    dialog.value = false
}

</script>

<style scoped lang="scss">

@use 'src/css/variables.scss' as *;
@use 'src/css/typography.scss' as *;

.base-confirmation-dialog__actions {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 12px;
}

.base-confirmation-dialog__actions:deep(.primary-action-button--sm) {
    width: auto;
    min-width: 114px;
}

.base-confirmation-dialog__actions:deep(.danger-action-button--sm),
.base-confirmation-dialog__actions:deep(.secondary-action-button--sm) {
    width: auto;
    min-width: 130px;
    height: 35px;
}

@media (max-width: 480px) {

    .base-confirmation-dialog__actions {
        flex-direction: column;
        width: 100%;
        gap: 8px;
    }
}
</style>