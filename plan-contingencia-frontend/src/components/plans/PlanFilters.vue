<template>

    <div class="plan-filters">

        <q-input
            v-model="searchText"
            class="plan-filters__search"
            outlined
            dense
            placeholder="Buscar por código, programa o actividad..."
            clearable
        >
            <template #prepend>
                <q-icon name="search" />
            </template>
        </q-input>

        <q-select
            v-model="selectedStatus"
            class="plan-filters__status"
            outlined
            dense
            emit-value
            map-options
            :options="options"
            label="Estado"
        />

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
    },
    searchValue: {
        type: String,
        default: ''
    }
})

const emit = defineEmits([
    'update:modelValue',
    'update:searchValue'
])

const selectedStatus = computed({
    get: () => props.modelValue,
    set: (value) => {
        emit('update:modelValue', value)
    }
})

const searchText = computed({
    get: () => props.searchValue,
    set: (value) => {
        emit('update:searchValue', value)
    }
})

</script>

<style scoped lang="scss">

@use 'src/css/variables.scss' as *;
@use 'src/css/typography.scss' as *;

.plan-filters {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 12px;
    width: 100%;
    font-family: $font-family-base;
}

.plan-filters__search {
    width: 300px;
}

.plan-filters__search :deep(.q-field__control) {
    height: 38px;
    border-radius: 6px;
}

.plan-filters__status {
    width: 120px;
}

.plan-filters :deep(.q-field__label) {
    font-size: 0.75rem;
}

.plan-filters :deep(.q-field__native) {
    font-family: $font-family-base;
    font-size: 0.8rem;
}

.plan-filters :deep(.q-field__prepend) {
    padding-right: 4px;
}

@media (max-width: 700px) {

    .plan-filters {
        flex-direction: column;
        align-items: stretch;
    }

    .plan-filters__search,
    .plan-filters__status {
        width: 100%;
    }
}

</style>