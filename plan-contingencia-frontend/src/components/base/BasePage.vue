<template>

    <section class="base-page">

        <slot />

    </section>

</template>

<script setup>

</script>

<style scoped lang="scss">

@use 'src/css/variables.scss' as *;

.base-page {
    width: 100%;
    min-height: 100%;
    max-width: 90%;
    margin: 0 auto;
    padding: 0;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    background-color: $color-surface;
}

@media (max-width: 1200px) {
    .base-page {
        max-width: 94%;
    }
}

@media (max-width: 768px) {
    .base-page {
        max-width: 100%;
        padding-inline: 0.5rem;
    }
}

</style>
