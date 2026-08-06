<template>

    <q-btn 
    round 
    unelevated 
    icon="arrow_back" 
    class="back-button"
    @click="goBack" 
     />

</template>

<script setup>

import { useRouter } from "vue-router";

const router = useRouter()

const { routeName } = defineProps({
    routeName: {
        type: String,
        required: true
    }
})

function goBack() {
    router.push({
        name: routeName
    })
}

</script>

<style scoped lang="scss">

@use 'src/css/variables.scss' as *;

.back-button {
    border-radius: 50%;
    background-color: $color-primary;
    color: $color-background;
    transition: background-color 0.2s ease;
    font-size: 0.70rem;
}

.back-button:hover {
    background-color: $color-primary-dark;
    cursor: pointer;
}

</style>