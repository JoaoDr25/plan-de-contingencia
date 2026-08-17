<template>

    <div class="base-detail-item">

        <span class="base-detail-item__label">
            {{ label }}
        </span>

        <span class="base-detail-item__value">
            <slot>
                {{ value }}
            </slot>
        </span>

    </div>

</template>

<script setup>

defineProps({

    label: {
        type: String,
        required: true
    },

    value: {
        type: [String, Number],
        default: ''
    }

})

</script>

<style scoped lang="scss">

@use 'src/css/variables.scss' as *;

.base-detail-item {
    display: flex;
    flex-direction: column;
}

.base-detail-item__label {
    color: $color-primary;
    font-size: 0.80rem;
    font-weight: 700;
    text-transform: uppercase;
    line-height: 1.4;
}

.base-detail-item__value {
    color: $color-text-primary;
    font-size: 0.90rem;
    line-height: 1.3;
}

</style>