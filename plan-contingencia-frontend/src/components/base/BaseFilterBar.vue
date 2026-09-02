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
    justify-content: flex-end;
    flex-wrap: wrap;
    gap: 12px;
    width: 100%;
    font-family: $font-family-base;
}

.base-filter-bar > * {
    flex: 0 0 auto;
}

@media (max-width: 700px) {

    .base-filter-bar {
        justify-content: flex-end;
        gap: 10px;
    }
}

@media (max-width: 550px) {

    .base-filter-bar {
        flex-direction: column;
        align-items: stretch;
        gap: 10px;
    }
}
</style>