<template>

    <div class="crud-filters">

        <q-option-group v-model="selectedFilter" :options="options" type="radio" inline color="color-primary" />

    </div>

</template>

<script setup>

import { computed } from 'vue';

const props = defineProps({

    options: {
        type: Array,
        required: true
    },
    modelValue: {
        type: String,
        required: true
    }
})

const emit = defineEmits([
    'update:modelValue'
])

const selectedFilter = computed({
    get: () => props.modelValue,
    set: (value) => emit('update:modelValue', value)
})

</script>

<style scoped lang="scss">

@use 'src/css/variables.scss' as *;
@use 'src/css/typography.scss' as *;

.crud-filters {
    display: flex;
    align-items: center;
    font-family: $font-family-base;
    font-size: 1.2rem;
    padding-bottom: 2.9px;
}

.crud-filters :deep(.q-radio__inner) {
    font-size: 1.4rem;
    color: $color-primary;
}

.crud-filters :deep(.q-radio__label) {
    font-size: 0.8rem;
    font-family: $font-family-base;
    color: $color-text-secondary;
}

.crud-filters :deep(.q-radio__label) {
    padding-left: 0;
}

@media (max-width: 600px) {

    .crud-filters :deep(.q-option-group) {
        justify-content: center;
        gap: 0.5rem;
    }
}

</style>