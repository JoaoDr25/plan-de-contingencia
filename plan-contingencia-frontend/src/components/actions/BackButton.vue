<template>

    <q-btn round unelevated icon="arrow_back" class="back-button" @click="goBack" />

</template>

<script setup>

import { useRouter } from "vue-router";

const router = useRouter()

const { routeName, useHistory } = defineProps({
    routeName: {
        type: String,
        required: true
    },
    useHistory: {
        type: Boolean,
        default: false
    }
})

function goBack() {
    const historyPosition = window.history.state?.position ?? 0

    if (useHistory && historyPosition > 0) {
        router.back()
        return
    }

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
    font-size: 0.76rem;
}

.back-button:hover {
    background-color: $color-primary-dark;
    cursor: pointer;
}
</style>