<template>

    <q-btn unelevated :class="[
        'danger-action-button',
        `danger-action-button--${size}`,
        {
            'danger-action-button--full': fullWidth
        }
    ]" :icon="icon" :label="label" :loading="loading" :disable="disable" @click="handleClick" />

</template>

<script setup>

const {
    label,
    icon,
    size,
    loading,
    disable,
    fullWidth
} = defineProps({
    label: {
        type: String,
        required: true
    },
    icon: {
        type: String,
        default: ''
    },
    size: {
        type: String,
        default: 'md',
        validator: value => ['sm', 'md', 'lg'].includes(value)
    },
    loading: {
        type: Boolean,
        default: false
    },
    disable: {
        type: Boolean,
        default: false
    },
    fullWidth: {
        type: Boolean,
        default: false
    }
})

const emit = defineEmits([
    'click'
])

function handleClick() {
    emit('click')
}

</script>

<style scoped lang="scss">
@use 'src/css/variables.scss' as *;
@use 'src/css/typography.scss' as *;

.danger-action-button {
    background-color: $color-error;
    color: $color-background;
    transition:
        background-color 0.2s ease,
        transform 0.2s ease;
    font-family: $font-family-base;
}

.danger-action-button :deep(.q-icon) {
    font-size: 17px;
}

.danger-action-button--sm {
    border-radius: 3px;
    min-width: 100px;
    height: 35px;
    font-size: 0.9rem;
    font-weight: 400;
    text-transform: none;
}

.danger-action-button--md {
    border-radius: 4px;
    min-width: 180px;
    height: 40px;
    font-size: 0.80rem;
    text-transform: none;
}

.danger-action-button--lg {
    border-radius: 6px;
    min-width: 19.7rem;
    height: 43px;
    font-size: 0.85rem;
    text-transform: uppercase;
}

.danger-action-button--full {
    width: 100%;
}

// .danger-action-button:hover {
//     background-color: $color-error-dark;
// }
</style>