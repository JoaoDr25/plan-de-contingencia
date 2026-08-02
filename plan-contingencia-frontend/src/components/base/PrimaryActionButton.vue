<template>

    <q-btn unelevated :class="['primary-action-button', `primary-action-button--${size}`]" :icon="icon" :label="label" @click="handleClick" />

</template>

<script setup>

const {
    label,
    icon,
} = defineProps({

    label: {
        type: String,
        required: true
    },
    icon: {
        type: String,
        required: true
    },
    size: {
        type: String,
        default: 'md',
        validator: value => ['sm','md','lg'].includes(value)
    }
})

const emit = defineEmits(['click'])

function handleClick() {
    emit('click')
}

</script>

<style scoped lang="scss">

@use 'src/css/variables.scss' as *;
@use 'src/css/typography.scss' as *;

.primary-action-button {
    background-color: $color-primary;
    color: $color-background;
    transition: background-color 0.2s ease, transform 0.2s ease;
    font-family: $font-family-base;
}

.primary-action-button :deep(.q-icon){
    font-size: 17px;
}

.primary-action-button--sm {
    border-radius: 3px;
    min-width: 100px;
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

.primary-action-button:hover {
    background-color: $color-primary-dark;
}

.primary-action-button .q-icon {
    font-size: 18px;
}

</style>