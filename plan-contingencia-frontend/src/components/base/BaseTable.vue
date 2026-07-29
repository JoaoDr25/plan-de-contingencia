<template>

    <q-table flat bordered class="base-table" :rows="rows" :columns="columns" :row-key="rowKey" :loading="loading"
        :pagination="{
            rowsPerPage: 8
        }" rows-per-page-label="Registros por página" no-data-label="No existen registros">

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
    loading: {
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
    border-radius: 5px;
    font-family: $font-family-base;
    background-color: $color-surface;
}


.base-table :deep(thead th) {
    text-transform: uppercase;
    border-top: none;
}

.base-table :deep(tbody td) {
    height: 40px;
    padding: 0 16px;
    text-transform: uppercase;
    border-bottom: none;
}

.base-table :deep(th) {
    font-weight: 600;
    color: $color-text-primary;
    font-size: $font-size-sm;
    padding: 0 16px;
}

.base-table :deep(td) {
    font-size: $font-size-xs;
    vertical-align: middle;
    
}

.base-table :deep(tbody tr:hover) {
    background: rgba($color-primary, 0.04);
}

.base-table :deep(.q-table__middle) {
    min-height: 375px;
    background-image: linear-gradient(
    to bottom,
    transparent 39px,
    $color-border-table 39px,
    $color-border-table 40px,
    transparent 40px);
    background-size: 100% 40.2px;
}

.base-table :deep(.q-table thead tr) {
    height: 40px !important;
}

.base-table :deep(.q-table td) {
    padding-top: 1px !important;
}

.base-table :deep(.q-table) {
    padding-left: 20px;
}
</style>