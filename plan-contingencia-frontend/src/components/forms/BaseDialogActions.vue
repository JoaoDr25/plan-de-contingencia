<template>

    <div class="base-dialog-actions">

        <SecondaryActionButton
            v-if="showCancel"
            :label="cancelLabel"
            @click="emit('cancel')"
        />

        <PrimaryActionButton
            :label="saveLabel"
            :loading="loading"
            @click="emit('save')"
        />

    </div>

</template>

<script setup>

import PrimaryActionButton from './PrimaryActionButton.vue'
import SecondaryActionButton from './SecondaryActionButton.vue'

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
        default: 'Cancelar'
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

<style scoped>

.base-dialog-actions {
    display: flex;
    justify-content: flex-end;
    gap: 12px;
}

</style>