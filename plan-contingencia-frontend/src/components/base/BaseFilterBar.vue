<template>

    <div class="base-filter-bar">

        <slot />

    </div>

</template>

<script setup>

</script>

<style scoped lang="scss">

@use 'src/css/variables.scss' as *;
@use 'src/css/typography.scss' as *;

.base-filter-bar {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    flex-wrap: wrap;
    gap: clamp(8px, 1vw, 16px);
    width: 100%;
    max-width: 100%;
    min-width: 0;
    font-family: $font-family-base;
}

.base-filter-bar > * {
    flex: 0 0 auto;
    min-width: 0;
}

@media (max-width: 700px) {

    .base-filter-bar {
        justify-content: flex-start;
        gap: 10px;
    }
}

@media (max-width: 550px) {

    .base-filter-bar {
        flex-direction: column;
        align-items: stretch;
        gap: 10px;
        max-width: 100%;
    }

    .base-filter-bar > * {
        width: 100%;
        max-width: 100%;
        min-width: 0;
        flex: 1 1 auto;
    }
}
</style>