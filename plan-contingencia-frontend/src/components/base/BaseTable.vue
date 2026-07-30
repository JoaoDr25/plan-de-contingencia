<template>

    <div class="base-table">

        <q-table flat bordered class="base-table__table" :rows="rows" :columns="columns" :row-key="rowKey"
            :loading="loading" hide-bottom :rows-per-page-options="[8]" no-data-label="No existen registros">

            <template #no-data>

                <div class="base-table__empty">

                    No existen registros para mostrar

                </div>
            </template>

        </q-table>

        <div class="base-table__footer">

            <BaseTableInfo :start="1" :end="Math.min(8, rows.length)" :total="rows.length" />

        </div>

        <BasePagination
    :current-page="1"
    :total-pages="1"
/>

    </div>

</template>

<script setup>

import BaseTableInfo from './BaseTableInfo.vue';
import BasePagination from 'src/components/base/BasePagination.vue';

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
    display: flex;
    flex-direction: column;
}

.base-table__table {
    border-radius: 5px;
    font-family: $font-family-base;
    background-color: $color-surface;
}


.base-table__table :deep(thead th) {
    text-transform: uppercase;
    border-top: none;
}

.base-table__table :deep(tbody td) {
    height: 40px;
    padding: 0 16px;
    text-transform: uppercase;
    border-bottom: none;
}

.base-table__table :deep(th) {
    font-weight: 600;
    color: $color-text-primary;
    font-size: $font-size-sm;
    padding: 0 16px;
}

.base-table__table :deep(td) {
    font-size: $font-size-xs;
    vertical-align: middle;

}

.base-table__table :deep(tbody tr:hover) {
    background: rgba($color-primary, 0.04);
}

.base-table__table :deep(.q-table__middle) {
    min-height: 375px;
    background-image: linear-gradient(to bottom,
            transparent 39px,
            $color-border-table 39px,
            $color-border-table 40px,
            transparent 40px);
    background-size: 100% 40.2px;
}

.base-table__table :deep(.q-table thead tr) {
    height: 40px !important;
}

.base-table__table :deep(.q-table td) {
    padding-top: 1px !important;
}

.base-table__table :deep(.q-table) {
    padding-left: 20px;
}

.base-table__footer {
    display: flex;
    justify-content: flex-end;
    align-items: flex-end;
    height: 40px;
    padding: 0 16px 5px;
    border-right: 1px solid $color-border-table;
    border-bottom: 1px solid $color-border-table;
    border-left: 1px solid $color-border-table;
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
    background: $color-surface;
}

.base-table-info {
    font-size: 0.67rem;
    color: $color-text-primary;
    letter-spacing: 1px;
}
</style>