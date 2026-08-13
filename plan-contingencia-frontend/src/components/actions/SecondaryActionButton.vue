<template>

    <q-btn :label="label" :icon="icon" :loading="loading" :disable="disable" :class="[
        'secondary-action-button', `secondary-action-button--${size}`]" :unelevated="false" :outline="false" @click="emit('click')" />

</template>

<script setup>

const {
    label,
    icon,
    loading,
    disable,
    size,
} = defineProps({

    label: {
        type: String,
        required: true
    },
    icon: {
        type: String,
        default: ''
    },
    loading: {
        type: Boolean,
        default: false
    },
    disable: {
        type: Boolean,
        default: false
    },
    size: {
        type: String,
        default: 'md',
        validator: value => ['sm', 'md', 'lg'].includes(value)
    },
    // fullWidth: {
    //     type: Boolean,
    //     default: false
    // }
})

const emit = defineEmits([
    'click'
])

</script>

<style scoped lang="scss">

@use 'src/css/variables.scss' as *;
@use 'src/css/typography.scss' as *;

.secondary-action-button {
    background: $color-background;
    color: $color-text-secondary;
    border: none;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.12) !important;
    transition: background-color .2s ease,
        transform .2s ease;
    font-family: $font-family-base;
}

.secondary-action-button :deep(.q-icon) {
    font-size: 22px;
}

.secondary-action-button :deep(.q-icon.on-left) {
    margin-right: 8px;
}

.secondary-action-button :deep(.q-btn__content) {
    gap: 0;
}

.secondary-action-button--sm {
    border-radius: 3px;
    min-width: 90px;
    height: 30px;
    font-size: 0.81rem;
    font-weight: 400;
    text-transform: none;
}

.secondary-action-button--md {
    border-radius: 4px;
    min-width: 180px;
    height: 40px;
    font-size: 0.80rem;
    font-weight: 400;
    text-transform: none;
}

.secondary-action-button--lg {
    border-radius: 6px;
    min-width: 19.7rem;
    height: 42px;
    font-size: 0.80rem;
    font-weight: 400;
    text-transform: none;
}

.secondary-action-button:hover {
    background: $color-surface;
    border: none;
    box-shadow: 0 2px 3px rgba(0, 0, 0, 0.14) !important;
}

.secondary-action-button:active {
    box-shadow: 0 1px 1px rgba(0, 0, 0, 0.10) !important;
}

</style>