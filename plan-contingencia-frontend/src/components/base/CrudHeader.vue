<template>

    <section class="crud-header">

        <div class="crud-header__navigation">

            <BackButton :route-name="backRoute" />

        </div>

        <div class="crud-header__content">

            <h1 class="crud-header__title">

                {{ title }}

            </h1>

                <div class="crud-header__divider"></div>

        </div>

    </section>

</template>

<script setup>

import BackButton from './BackButton.vue';

const {
    title,
    backRoute
} = defineProps({
    title: {
        type: String,
        required: true
    },
    backRoute: {
        type: String,
        required: true
    }
})

</script>

<style scoped lang="scss">

@use 'src/css/variables.scss' as *;

.crud-header {
    display: flex;
    align-items: flex-start;
    gap: 2rem;
    width: 100%;
}

.crud-header__navigation {
    flex-shrink: 0;
}

.crud-header__content {
    flex: 1;
}

.crud-header__title {
    margin: 0;
    text-align: center;
    font-size: 2rem;
    font-weight: 700;
    color: $color-text-primary;
}

.crud-header__divider {
    width: 100%;
    height: 2px;
    margin-top: 0.75rem;
    background: $color-primary;
    border-radius: 999px;
}

</style>