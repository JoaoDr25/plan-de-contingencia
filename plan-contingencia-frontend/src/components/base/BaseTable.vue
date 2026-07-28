<template>

    <q-table
    flat
    boardered
    class="base-table"
    :rows="rows"
    :columns="columns"
    :row-key="rowKey"
    :loading="loading"
    rows-per-page-label="Registros por página"
    no-data-label="No existen registros"
    >

        <template #no-data>

            <div class="base-table__empty">

                No existen registros para mostrar

            </div>
        </template>

    </q-table>


</template>

<script setup>


const {
    rows,
    columns,
    rowKey,
    loading
} = defineProps({

    rows: {
        type: Array,
        default: () => []
    },
    columns: {
        type: Array,
        default: () => []
    },
    rowKey: {
        type: String,
        default: 'id'
    },
    Loading: {
        type: Boolean,
        required: false
    }
})

</script>

<style scoped lang="scss">

@use 'src/css/variables.scss' as *;
@use 'src/css/typography.scss' as *;
@use 'src/css/mixins.scss' as *;
@use 'src/css/utilities.scss' as *;

.base-table {
    border-radius: 8px;
}

.base-table :deep(thead) {
    background-color: $color-surface;
}

.base-table :deep(th) {
    font-weight: 600;
    color: $color-text-primary;
    font-size: 0.82rem;
}

.base-table :deep(td) {
    font-size: 0.82rem;
}

.base-table :deep(thead tr:hover) {
    background-color: rgba($color-primary, .05);
}


</style>