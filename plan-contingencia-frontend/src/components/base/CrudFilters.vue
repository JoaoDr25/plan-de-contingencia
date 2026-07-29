<template>

    <div class="crud-filters">

        <q-option-group v-model="selectedFilter" :options="options" type="radio" inline color="primary" />

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

@use 'src/css/typography.scss' as *;

.crud-filters {
    display: flex;
    align-items: center;
    padding-top: 0.5rem;
    font-family: $font-family-base;
    font-size: 0.7rem;
    gap: 0.5px;
}
</style>