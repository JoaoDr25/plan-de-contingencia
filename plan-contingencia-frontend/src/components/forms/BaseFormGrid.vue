<template>

    <div
        class="base-form-grid"
        :style="gridStyle"
    >

        <slot />

    </div>

</template>

<script setup>

import { computed } from 'vue'

const {
    columns,
    gap
} = defineProps({

    columns: {
        type: Number,
        default: 1
    },
    gap: {
        type: String,
        default: '16px'
    }

})

const gridStyle = computed(() => ({
    '--grid-columns': columns,
    '--grid-gap': gap
}))

</script>

<style scoped>

.base-form-grid {
    display: grid;
    grid-template-columns: repeat(var(--grid-columns), 1fr);
    gap: var(--grid-gap);
}

@media (max-width: 768px) {

    .base-form-grid {
        grid-template-columns: 1fr;
    }
}

</style>