<template>

    <section class="base-page">

        <slot />

    </section>

</template>

<script setup>

</script>

<style scoped>

.base-page {
    width: 100%;
    min-height: 100%;
    max-width: 1400px;
    margin: 0 auto;
    padding: 2rem;
    display: flex;
    flex-direction: column;
    gap: 2rem;
}

</style>