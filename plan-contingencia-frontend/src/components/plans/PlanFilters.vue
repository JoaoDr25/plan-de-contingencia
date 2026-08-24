<template>

    <div class="plan-filters">

        <div class="plan-filters__status">

            <q-option-group
                v-model="selectedFilter"
                :options="options"
                type="radio"
                color="primary"
                class="plan-filters__options"
            />

        </div>

    </div>

</template>

<script setup>

import { computed } from 'vue'

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
    set: (value) => {
        emit('update:modelValue', value)
    }
})

</script>

<style scoped lang="scss">

@use 'src/css/variables.scss' as *;
@use 'src/css/typography.scss' as *;

.plan-filters {
    display: flex;
    align-items: center;
    width: 100%;
    font-family: $font-family-base;
}


.plan-filters__status {
    display: flex;
    align-items: center;
    width: 100%;
}


.plan-filters__options {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 0.15rem 0.45rem;
}


.plan-filters :deep(.q-radio__inner) {
    font-size: 1.35rem;
    color: $color-primary;
}


.plan-filters :deep(.q-radio__label) {
    padding-left: 0;
    font-size: 0.8rem;
    font-family: $font-family-base;
    color: $color-text-secondary;
}


@media (max-width: 900px) {
    .plan-filters__options {
        justify-content: flex-start;
    }
}

@media (max-width: 600px) {
    .plan-filters {
        width: 100%;
    }

    .plan-filters__options {
        justify-content: center;
        gap: 0.35rem 0.7rem;
    }
}

</style>