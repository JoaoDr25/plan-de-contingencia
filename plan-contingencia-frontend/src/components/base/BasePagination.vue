<template>

    <div class="base-pagination">

        <div class="base-pagination__rows">

            <span>Filas por página:</span>

            <span class="base-pagination__rows-value">

                {{ props.rowsPerPage }}

            </span>

        </div>

        <q-btn flat dense icon-size="14px" icon="first_page" class="base-pagination__button" :disable="props.currentPage === 1"
            @click="firstPage" />

        <q-btn flat dense icon-size="14px" icon="chevron_left" class="base-pagination__button" :disable="props.currentPage === 1"
            @click="previousPage" />

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
    'change'
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

</script>

<style scoped lang="scss">
@use 'src/css/variables.scss' as *;
@use 'src/css/typography.scss' as *;

.base-pagination {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding: 10px 5px 0 0;
}

.base-pagination__rows {
    display: flex;
    align-items: center;
    gap: 4px;
    margin-right: 12px;
    font-size: $font-size-xs;
    color: $color-text-secondary;
    user-select: none;
}

.base-pagination__rows-value {
    min-width: 22px;
    text-align: center;
    color: $color-text-primary;
}

.base-pagination__button {
    color: $color-text-secondary;
    min-width: 18px;
    padding:0;
}

.base-pagination__page {
    width: 21px;
    height: 21px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 4px;
    cursor: pointer;
    background: transparent;
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
    font-size: 16px;
}
</style>