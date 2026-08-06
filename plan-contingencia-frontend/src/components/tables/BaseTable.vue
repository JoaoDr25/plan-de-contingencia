<template>

    <div class="base-table">

        <q-table flat bordered class="base-table__table" :rows="rows" :columns="columns" :row-key="rowKey"
            :loading="loading" hide-bottom :rows-per-page-options="[8]" no-data-label="No existen registros">

            <template #no-data>

                <div class="base-table__empty">

                    No existen registros para mostrar

                </div>
            </template>

            <template #body-cell="props">

                <q-td :props="props" :style="getCellStyle(props.col)" :class="getCellClass(props.col)">

                    {{ props.value }}

                </q-td>

            </template>

            <template v-for="col in columns" :key="col.name" v-slot:[`body-cell-${col.name}`]="props">

                <template v-if="$slots[`body-cell-${col.name}`]">

                    <slot :name="`body-cell-${col.name}`" v-bind="props" />

                </template>

                <template v-else>

                    <q-td :props="props" :style="getCellStyle(props.col)" :class="getCellClass(props.col)">

                        {{ props.value }}

                    </q-td>

                </template>

            </template>

            <template v-for="(_, slotName) in $slots" #[slotName]="slotProps" :key="slotName">

                <slot :name="slotName" v-bind="slotProps" />

            </template>

        </q-table>

        <div class="base-table__footer">

            <BaseTableInfo :start="start" :end="end" :total="total" />

        </div>

        <BasePagination :current-page="currentPage" :total-pages="totalPages" :rows-per-page="rowsPerPage"
            @change="emit('change-page', $event)" />

    </div>

</template>

<script setup>

import BaseTableInfo from './BaseTableInfo.vue';
import BasePagination from 'src/components/tables/BasePagination.vue';

const {
    rows,
    columns,
    rowKey,
    loading,
    currentPage,
    totalPages,
    start,
    end,
    total
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
    },
    currentPage: {
        type: Number,
        default: 1
    },
    totalPages: {
        type: Number,
        default: 1
    },
    start: {
        type: Number,
        default: 0
    },
    end: {
        type: Number,
        default: 0
    },
    total: {
        type: Number,
        default: 0
    },
    rowsPerPage: {
        type: Number,
        default: 8
    }
})

const emit = defineEmits([
    'change-page'
])

function getCellStyle(column) {

    return {
        width: column.width,
        minWidth: column.minWidth,
        maxWidth: column.maxWidth
    }
}

function getCellClass(column) {

    return {
        'base-table__ellipsis': column.ellipsis
    }
}

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
    border-radius: 5px 5px 0 0;
    font-family: $font-family-base;
    background-color: $color-surface;
}


.base-table__table :deep(thead th) {
    text-transform: uppercase;
    border-top: none;
}

.base-table__table :deep(tbody td) {
    height: 40px;
    text-transform: uppercase;
    border-bottom: none;
}

.base-table__table :deep(th) {
    font-weight: 600;
    height: 40.5px;
    color: $color-text-primary;
    font-size: $font-size-sm;
}

.base-table__table :deep(td) {
    font-size: $font-size-xs;
    vertical-align: middle;
}

.base-table__table :deep(.q-table__middle) {
    min-height: 375px;
    // min-height: auto;
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
    padding-top: 10px !important;
}

.base-table__table :deep(.column-index) {
    width: 55px;
    min-width: 55px;
    max-width: 55px;
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

.base-table__ellipsis {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}
</style>
