<template>

    <q-btn unelevated :class="[
        'primary-action-button',
        `primary-action-button--${size}`,
        {
            'primary-action-button--full': fullWidth
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

.primary-action-button {
    background-color: $color-primary;
    color: $color-background;
    transition: background-color 0.2s ease, transform 0.2s ease;
    font-family: $font-family-base;
}

.primary-action-button :deep(.q-icon) {
    font-size: 21px;
}

.primary-action-button--sm {
    border-radius: 3px;
    min-width: 100px;
    height: 35px;
    font-size: 0.9rem;
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
    width: 350px;
    height: 43px;
    font-size: 0.85rem;
    text-transform: uppercase;
    letter-spacing: 1px;
}

@media (max-width: 800px) {
    .primary-action-button--lg,
    .primary-action-button--md {
        min-width: 0;
        width: 100%;
        max-width: 360px;
    }
}

@media (max-width: 420px) {
    .primary-action-button--sm,
    .primary-action-button--md,
    .primary-action-button--lg {
        width: 100%;
        max-width: 360px;
        min-width: 0;
        font-size: 0.8rem;
        letter-spacing: 0.3px;
        height: 38px;
        padding: 0 8px;
    }
}

@media (max-width: 420px) {
    .primary-action-button--sm {
        font-size: 0.9rem;
    }
}

.primary-action-button:hover {
    background-color: $color-primary-dark;
}
</style>