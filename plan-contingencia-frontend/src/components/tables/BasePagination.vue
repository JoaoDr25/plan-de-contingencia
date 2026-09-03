<template>

    <div class="base-pagination">

        <div class="base-pagination__rows">
            <span>Filas por página:</span>

            <q-select :model-value="props.rowsPerPage" :options="[8, 10, 12]" dense outlined emit-value map-options
                popup-content-class="base-pagination__select-menu" class="base-pagination__select"
                @update:model-value="changeRowsPerPage" />
        </div>

        <q-btn flat dense icon-size="14px" icon="first_page" class="base-pagination__button"
            :disable="props.currentPage === 1" @click="firstPage" />

        <q-btn flat dense icon-size="14px" icon="chevron_left" class="base-pagination__button"
            :disable="props.currentPage === 1" @click="previousPage" />

        <div v-for="page in pages" :key="page" :class="[
            'base-pagination__page',
            {
                'base-pagination__page--active': page === props.currentPage
            }
        ]" @click="goToPage(page)">

            {{ page }}

        </div>

        <q-btn flat dense icon-size="14px" icon="chevron_right" class="base-pagination__button"
            :disable="props.currentPage === totalPages" @click="nextPage" />

        <q-btn flat dense icon-size="14px" icon="last_page" class="base-pagination__button"
            :disable="props.currentPage === props.totalPages" @click="lastPage" />
    </div>

</template>

<script setup>

import { computed } from 'vue'

const props = defineProps({
    currentPage: {
        type: Number,
        default: 1
    },

    totalPages: {
        type: Number,
        default: 1
    },
    rowsPerPage: {
        type: Number,
        default: 8
    }
})

const emit = defineEmits([
    'change',
    'change-rows-per-page'
])

const pages = computed(() => {
    return Array.from(
        { length: props.totalPages },
        (_, index) => index + 1
    )
})

function previousPage() {
    if (props.currentPage > 1) {
        emit('change', props.currentPage - 1)
    }
}

function nextPage() {
    if (props.currentPage < props.totalPages) {
        emit('change', props.currentPage + 1)
    }
}

function goToPage(page) {
    if (page !== props.currentPage) {
        emit('change', page)
    }
}

function firstPage() {
    emit('change', 1)
}

function lastPage() {
    emit('change', props.totalPages)
}

function changeRowsPerPage(value) {
    emit('change-rows-per-page', Number(value))
}

</script>

<style scoped lang="scss">
@use 'src/css/variables.scss' as *;
@use 'src/css/typography.scss' as *;

.base-pagination {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 4px;
    padding: 10px 5px 0 0;
    padding-bottom: 20px;
}

.base-pagination__rows {
    display: flex;
    align-items: center;
    gap: 4px;
    margin-right: 12px;
    font-size: $font-size-xs;
    color: $color-text-primary;
    user-select: none;
}

.base-pagination__button {
    width: 22px;
    height: 22px;
    min-width: 20px;
    padding: 0;
    border-radius: 4px;
    color: $color-text-secondary;
    background-color: #f3f4f6;
}

.base-pagination__page {
    width: 22px;
    height: 22px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 4px;
    cursor: pointer;
    background: #f3f4f6;
    color: $color-text-primary;
    font-size: $font-size-xs;
    font-weight: 500;
}

.base-pagination__page--active {
    background: $color-primary;
    color: white;
    font-weight: 600;
}

.base-pagination__button :deep(.q-icon) {
    font-size: 14px;
}

.base-pagination__select {
    width: 43px;
    min-width: 43px;
    font-size: $font-size-xs;
}

.base-pagination__select :deep(.q-field__control) {
    min-height: 25px;
    height: 26px;
    padding: 0 2px 0 5px;
    border-radius: 4px;
}

.base-pagination__select :deep(.q-field__native) {
    padding: 0;
    min-height: 10px;
    font-size: $font-size-xs;
    line-height: 10px;
}

.base-pagination__select :deep(.q-field__append) {
    padding-left: 0;
    height: 25px;
    margin-left: 1px;
}

.base-pagination__select :deep(.q-icon) {
    font-size: 15px;
    width: 20px;
    height: 15px;
}

:global(.base-pagination__select-menu) {
    min-width: 42px !important;
    padding: 2px 0;
    height: auto;
}

:global(.base-pagination__select-menu .q-item) {
    min-height: 25px;
    height: 25px;
    padding: 0 5px;
    font-size: $font-size-xs;
}

:global(.base-pagination__select-menu .q-item__section) {
    min-height: 30px;
    font-size: $font-size-xs;
}
</style>