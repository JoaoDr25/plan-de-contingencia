<template>

<q-card class="dashboard-module-card">

<q-card-section class="dashboard-module-card__header">

<h3 class="dashboard-module-card__title">

    {{ title }}

</h3>

</q-card-section>

<q-card-section class="dashboard-module-card__body">

    <img :src="image" :alt="imageAlt || title"
    class="dashboard-module-card__image"
    >

</q-card-section>

<q-card-actions align="center" class="dashboard-module-card__footer">

    <q-btn unelevated no-caps label="Ver" class="dashboard-module-card__button" @click="goToModule"/>

</q-card-actions>

</q-card>

</template>

<script setup>

import { useRouter } from "vue-router";

const router = useRouter()

function goToModule(){
    router.push({
        name: routeName
    })
}

const {
    title,
    image,
    routeName
} = defineProps({
    title: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    imageAlt: {
        type: String,
        default: ''
    },
    routeName: {
        type: String,
        required: true
    }
})

</script>

<style scoped lang="scss">

@use 'src/css/variables.scss' as *;
@use 'src/css/mixins.scss' as *;
@use 'src/css/typography.scss' as *;

.dashboard-module-card {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 270px;
    border-radius: $radius-lg;
    box-shadow: $shadow-sm;
    transition: transform 0.25s ease, box-shadow 0.25s ease;
}

.dashboard-module-card:hover {
    transform: translateY(-4px);
    box-shadow: $shadow-md;
}

.dashboard-module-card__header {
    background-color: $color-primary;
    border-radius: $radius-lg;
    text-align: center;
    padding: 1rem;
}

.dashboard-module-card__title {
    margin: 0;
    font-size: 0.96rem;
    font-weight: 500;
    color: $color-background;
}

.dashboard-module-card__body {
    display: flex;
    justify-content: center;
    align-items: center;
    flex: 1;
    padding: 1.5rem 1rem;
}

.dashboard-module-card__image {
    width: 100%;
    max-width: 110%;
    height: auto;
    object-fit: contain;
}

.dashboard-module-card__footer {
    padding: 0.75rem 1rem 1rem;
}

.dashboard-module-card__button {
    width: 110px;
    height: 32px;
    border-radius: 4px;
    font-size: 0.8rem;
    font-weight: 600;
    letter-spacing: 0.5px;
    background-color: $color-primary;
    color: $color-background;
}

</style>