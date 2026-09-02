<template>

    <q-btn
        class="base-clear-filters"
        flat
        dense
        no-caps
        :label="label"
        @click="emit('clear')"
    >

        <template #default>

            <q-icon
                name="filter_alt_off"
                size="14px"
                class="q-mr-xs"
            />

            <span>{{ label }}</span>

        </template>

    </q-btn>

</template>

<script setup>

defineProps({

    label: {
        type: String,
        default: 'Limpiar filtros'
    }
})

const emit = defineEmits([
    'clear'
])

</script>

<style scoped lang="scss">

@use 'src/css/variables.scss' as *;
@use 'src/css/typography.scss' as *;

.base-clear-filters {
    color: $color-text-primary;
    font-size: 0.68rem;
    font-weight: 600;
    padding: 0;
}

.base-clear-filters:hover {
    color: $color-primary;
}

.base-clear-filters :deep(.q-icon) {
    color: $color-text-secondary;
}

</style>