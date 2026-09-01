<template>

    <BaseDialog v-model="dialog" :title="title" width="500px" persistent>

        <div v-if="showObservations" class="base-confirmation-dialog__body">
            <label class="observations-label">Observaciones:</label>
            <q-input v-model="observations" type="textarea" outlined dense autogrow rows="3"
                placeholder="Escriba aquí las observaciones." class="observations-input" />
        </div>

        <template #actions>

            <div class="base-confirmation-dialog__actions">

                <component :is="confirmButtonComponent" :label="confirmLabel" :icon="confirmIcon" size="sm"
                    :loading="loading" :disable="isConfirmDisabled" @click="handleConfirm" />

                <SecondaryActionButton :label="cancelLabel" icon="close" size="sm" :disable="loading"
                    @click="handleCancel" />

            </div>

        </template>

    </BaseDialog>

</template>

<script setup>

import { computed, ref, watch } from 'vue'

import BaseDialog from '../forms/BaseDialog.vue';
import PrimaryActionButton from '../actions/PrimaryActionButton.vue'
import SecondaryActionButton from '../actions/SecondaryActionButton.vue'
import DangerActionButton from '../actions/DangerActionButton.vue'

const {
    modelValue,
    title,
    confirmLabel,
    cancelLabel,
    variant,
    loading,
    showObservations
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
    },
    showObservations: {
        type: Boolean,
        default: false
    }
})

const emit = defineEmits([
    'update:modelValue',
    'confirm',
    'cancel'
])

const observations = ref('')

watch(
    () => modelValue,
    (val) => {
        if (!val) {
            observations.value = ''
        }
    }
)

const dialog = computed({
    get() {
        return modelValue
    },
    set(value) {
        emit('update:modelValue', value)
    }
})

const isConfirmDisabled = computed(() => {
    if (loading) return true
    if (showObservations && !observations.value.trim()) return true
    return false
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
    emit('confirm', { observations: observations.value.trim() })
    observations.value = ''
}

function handleCancel() {
    emit('cancel')
    observations.value = ''
    dialog.value = false
}

</script>

<style scoped lang="scss">

@use 'src/css/variables.scss' as *;
@use 'src/css/typography.scss' as *;

.base-confirmation-dialog__body {
    display: flex;
    flex-direction: column;
    gap: 8px;
    padding: 10px 0;
}

.observations-label {
    font-size: $font-size-xs;
    font-weight: 600;
    text-transform: uppercase;
    color: $color-primary;
}

.observations-input {
    font-size: $font-size-sm;
}

.base-confirmation-dialog__actions {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 12px;
}

.base-confirmation-dialog__actions:deep(.primary-action-button--sm),
.base-confirmation-dialog__actions:deep(.secondary-action-button--sm) {
    width: 118px;
    min-width: 118px;
}

.base-confirmation-dialog__actions:deep(.danger-action-button--sm) {
    width: 133px;
    min-width: 133px;
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