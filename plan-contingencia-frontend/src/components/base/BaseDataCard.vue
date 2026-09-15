<template>

    <article class="base-data-card">

        <header class="base-data-card__header">

            <div class="base-data-card__title">

                <slot name="header-icon" />

                <span>
                    {{ title }}
                </span>

            </div>

            <div v-if="$slots['header-right']" class="base-data-card__header-right">

                <slot name="header-right" />

            </div>

        </header>


        <div class="base-data-card__content-scroll">

            <div v-if="columns.length" class="base-data-card__columns" :style="gridStyle">

                <span v-for="column in columns" :key="column.key">
                    {{ column.label }}
                </span>

            </div>


            <div class="base-data-card__body" :style="bodyStyle">

                <template v-if="rows.length">

                    <slot name="body" :rows="rows" :grid-style="gridStyle">

                        <div v-for="row in rows" :key="row[rowKey]" class="base-data-card__row" :style="gridStyle">

                            <span v-for="column in columns" :key="column.key">
                                {{ row[column.key] }}
                            </span>

                        </div>

                    </slot>

                </template>


                <div v-else class="base-data-card__empty">

                    <slot name="empty">

                        {{ emptyText }}

                    </slot>

                </div>

            </div>

        </div>


        <footer v-if="$slots.footer" class="base-data-card__footer">

            <slot name="footer" />

        </footer>

    </article>

</template>

<script setup>

import { computed } from 'vue'

const props = defineProps({

    title: {
        type: String,
        required: true,
    },

    columns: {
        type: Array,
        default: () => [],
    },

    rows: {
        type: Array,
        default: () => [],
    },

    rowKey: {
        type: String,
        default: '_id',
    },

    columnTemplate: {
        type: String,
        default: '',
    },

    emptyText: {
        type: String,
        default: 'No existen registros para mostrar',
    },
    maxBodyHeight: {
        type: String,
        default: '150px',
    }
})

const gridStyle = computed(() => {

    if (!props.columnTemplate) {
        return {}
    }

    return {
        gridTemplateColumns: props.columnTemplate,
    }
})

const bodyStyle = computed(() => {
    if (!props.maxBodyHeight) {
        return {}
    }

    return {
        maxHeight: props.maxBodyHeight,
        overflowY: 'auto',
    }
})

</script>

<style scoped lang="scss">

@use 'src/css/variables.scss' as *;
@use 'src/css/typography.scss' as *;


.base-data-card {
    display: flex;
    flex-direction: column;
    width: 100%;
    overflow: hidden;
    border: 1px solid $color-border-table;
    border-radius: 5px;
    background-color: $color-surface;
}

.base-data-card__header {
    min-height: 45px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 10px;
    background-color: $color-primary;
    color: $color-surface;
    border-bottom: 1px solid $color-border-table;
}

.base-data-card__title {
    display: flex;
    align-items: center;
    gap: 5px;
    min-width: 0;
}

.base-data-card__title span {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    font-size: clamp(0.85rem, 1vw, 1.125rem);
}

.base-data-card__header-right {
    display: flex;
    align-items: center;
    flex-shrink: 0;
}

.base-data-card__content-scroll {
    width: 100%;
    min-width: 0;
    overflow-x: auto;
}

.base-data-card__columns {
    display: grid;
    min-height: 45px;
    box-sizing: border-box;
    align-items: center;
    overflow-y: auto;
    scrollbar-gutter: stable;
    padding: 0 20px;
    background-color: $color-background-field;
    border-bottom: 1px solid $color-border-table;
    font-size: clamp(0.7rem, 0.72vw, 0.84rem);
    font-weight: 700;
}

.base-data-card__columns span {
    min-width: 0;
    padding: 0 8px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}

.base-data-card__body {
    width: 100%;
    min-height: 0;
    box-sizing: border-box;
    scrollbar-gutter: stable;
    padding: 0 20px;
    font-size: $font-size-md;
}

.base-data-card__row {
    display: grid;
    align-items: center;
    min-height: 50px;
    border-bottom: 1px solid $color-border-table;
    font-size: clamp(0.7rem, 0.72vw, 0.84rem);
}

.base-data-card__row:last-child {
    border-bottom: 1px solid rgba($color-border-table, 0.55);
}

.base-data-card__row span {
    min-width: 0;
    padding: 6px 8px;
    line-height: 1.25;
}

.base-data-card__empty {
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 80px;
    padding: 20px;
    color: $color-text-secondary;
    font-size: $font-size-xs;
    text-align: center;
}

.base-data-card__footer {
    display: flex;
    align-items: center;
    min-height: 38px;
    padding: 5px 8px;
    border-top: 1px solid $color-border-table;
}

@media (max-width: 900px) {

    .base-data-card__content-scroll {
        scrollbar-width: thin;
    }

    .base-data-card__columns,
    .base-data-card__body {
        min-width: 620px;
    }
}

@media (max-width: 500px) {

    .base-data-card__title :deep(.q-icon) {
        display: none;
    }
}
</style>