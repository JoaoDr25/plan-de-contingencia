<template>

    <q-dialog :model-value="modelValue" :persistent="persistent"
        @update:model-value="$emit('update:modelValue', $event)">

        <q-card class="base-dialog" :style="{ width }">

            <div class="base-dialog__header">
                {{ title }}
            </div>

            <div class="base-dialog__body">
                <slot />
            </div>

            <div v-if="showFooter" class="base-dialog__footer">
                <slot name="actions" />
            </div>

        </q-card>

    </q-dialog>

</template>

<script setup>

defineProps({

    modelValue: {
        type: Boolean,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    width: {
        type: String,
        default: '600px'
    },
    persistent: {
        type: Boolean,
        default: false
    },
    showFooter: {
        type: Boolean,
        default: true
    }
})

defineEmits([
    'update:modelValue'
])

</script>

<style scoped lang="scss">
@use 'src/css/variables.scss' as *;

.base-dialog {
    border-radius: 4px;
    overflow: hidden;
}

.base-dialog__header {
    padding: 18px 24px;
    background: $color-primary;
    color: white;
    font-weight: 700;
    text-transform: uppercase;
    text-align: center;
}

.base-dialog__body {
    padding: 24px;
}

.base-dialog__footer {
    padding: 0 24px 24px;
    display: flex;
    justify-content: center;
    gap: 12px;
}
</style>