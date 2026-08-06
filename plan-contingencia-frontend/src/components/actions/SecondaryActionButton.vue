<template>

    <q-btn class="secondary-action-button" :label="label" :icon="icon" :loading="loading" :disable="disable" :class="[
        'secondary-action-button', `secondary-action-button--${size}`]" :unelevated="false" :outline="true"
        @click="emit('click')" />

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
    border: 1px solid $color-border;
    transition: background-color .2s ease,
        transform .2s ease;
    font-family: $font-family-base;
}

.primary-action-button :deep(.q-icon) {
    font-size: 17px;
}

.primary-action-button--sm {
    border-radius: 3px;
    min-width: 90px;
    height: 30px;
    font-size: 0.81rem;
    font-weight: 400;
    text-transform: none;
}

.primary-action-button--md {
    border-radius: 4px;
    min-width: 180px;
    height: 40px;
    font-size: 0.80rem;
    text-transform: none;
}

.primary-action-button--lg {
    border-radius: 6px;
    min-width: 19.7rem;
    height: 42px;
    font-size: 0.80rem;
    text-transform: uppercase;
}

.secondary-action-button:hover {
    background: $color-surface;
    border-color: $color-primary;
}
</style>