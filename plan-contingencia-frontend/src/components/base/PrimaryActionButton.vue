<template>

    <q-btn unelevated class="primary-action-button" :icon="icon" :label="label" @click="handleClick" />

</template>

<script setup>

import { useRouter } from "vue-router";

const router = useRouter()

const {
    label,
    icon,
    routeName
} = defineProps({

    label: {
        type: String,
        required: true
    },
    icon: {
        type: String,
        required: true
    },
    routeName: {
        type: String,
        required: true
    }
})

function handleClick() {
    router.push({
        name: routeName
    })
}

</script>

<style scoped lang="scss">

@use 'src/css/variables.scss' as *;

.primary-action-button {
    min-width: 260px;
    height: 42px;
    border-radius: 6px;
    background-color: $color-primary;
    color: $color-background;
    font-size: 0.80rem;
    transition: background-color 0.2s ease, transform 0.2s ease;
}

.primary-action-button:hover {
    background-color: $color-primary-dark;
}

.primary-action-button .q-icon {
    font-size: 18px;
}

</style>