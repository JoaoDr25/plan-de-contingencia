<template>

    <div class="base-dialog-actions">

        <PrimaryActionButton :label="saveLabel" icon="save" size="sm" :loading="loading" @click="emit('save')" />

        <SecondaryActionButton v-if="showCancel" :label="cancelLabel" icon="cancel" size="sm" @click="emit('cancel')" />

    </div>

</template>

<script setup>

import PrimaryActionButton from '../actions/PrimaryActionButton.vue'
import SecondaryActionButton from '../actions/SecondaryActionButton.vue'

const {
    saveLabel,
    cancelLabel,
    showCancel,
    loading
} = defineProps({

    saveLabel: {
        type: String,
        default: 'Guardar'
    },

    cancelLabel: {
        type: String,
        default: 'Cerrar'
    },

    showCancel: {
        type: Boolean,
        default: true
    },

    loading: {
        type: Boolean,
        default: false
    }

})

const emit = defineEmits([
    'save',
    'cancel'
])

</script>

<style scoped lang="scss">
@use 'src/css/variables.scss' as *;
@use 'src/css/typography.scss' as *;

.base-dialog-actions {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 13px;
}

.base-dialog-actions :deep(.q-btn) {
    width: 116px;
    min-width: 116px;
    min-height: 0 !important;
    height: 35px !important;
    padding: 0 1px !important;
}

.base-dialog-actions :deep(.q-btn__content) {
    font-size: 0.91rem;
    font-weight: 400;
    text-transform: capitalize;
    letter-spacing: 0.5px;
}

.base-dialog-actions :deep(.q-btn.bg-white) {
    border: none;
}

</style>