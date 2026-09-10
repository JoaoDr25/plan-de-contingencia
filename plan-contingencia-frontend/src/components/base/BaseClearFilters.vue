<template>

    <q-btn
        class="base-clear-filters"
        :class="{ 'base-clear-filters--align-right': alignRight }"
        flat
        dense
        no-caps
        @click="emit('clear')"
    >

        <template #default>

            <q-icon
                name="filter_list"
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
    },

    alignRight: {
        type: Boolean,
        default: false
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
    text-transform: uppercase;
    padding: 0;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    white-space: nowrap;
    line-height: 1;
}

.base-clear-filters :deep(.q-btn__content) {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    white-space: nowrap;
}

.base-clear-filters span {
    font-size: $font-size-xs;
    white-space: nowrap;
    display: inline-block;
}

.base-clear-filters:hover {
    color: $color-primary;
}

.base-clear-filters--align-right {
    margin-left: auto;
}

.base-clear-filters :deep(.q-icon) {
    color: $color-text-primary;
    padding-bottom: 4px;
}

</style>