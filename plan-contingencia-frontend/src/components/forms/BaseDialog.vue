<template>

    <q-dialog :model-value="modelValue" :persistent="persistent"
        @update:model-value="$emit('update:modelValue', $event)">

        <q-card class="base-dialog" :style="{ width, maxWidth: 'calc(100vw - 32px)' }">

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
@use 'src/css/typography.scss' as *;

.base-dialog {
    width: min(100%, 600px);
    max-width: calc(100vw - 32px);
    border-radius: 4px;
    overflow: hidden;
}

.base-dialog__header {
    padding: 13px;
    background: $color-primary;
    color: white;
    font-weight: 500;
    font-size: $font-size-md;
    text-transform: uppercase;
    text-align: center;
    letter-spacing: 0.5px;
}

.base-dialog__body {
    padding: 15px 22px 15px;
}

.base-dialog__footer {
    padding: 0 24px 20px;
    display: flex;
    justify-content: center;
}

</style>