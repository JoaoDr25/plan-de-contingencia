<template>

    <BaseDialog v-model="dialog" :title="title" width="500px">

        <div v-if="message" class="base-confirmation-dialog__message">
            {{ message }}
        </div>

        <template #actions>

            <div class="base-confirmation-dialog__actions">

                <component :is="confirmButtonComponent" :label="confirmLabel" :loading="loading"
                    @click="handleConfirm" />

                <SecondaryActionButton :label="cancelLabel" :disable="loading" @click="handleCancel" />

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
    message,
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
    message: {
        type: String,
        default: ''
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
        validator: value => ['primary', 'danger'].includes(value)
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
    return variant === 'danger'
        ? DangerActionButton
        : PrimaryActionButton
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

.base-confirmation-dialog__message {
    padding: 24px;
    text-align: center;
    font-family: $font-family-base;
    font-size: $font-size-sm;
    color: $color-text-primary;
}

.base-confirmation-dialog__actions {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 12px;
}
</style>