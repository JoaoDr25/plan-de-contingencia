<template>

    <div class="app-logo">

        <img 
        :src="logoSena"
        alt="Logo SENA"
        :style="{ width: `${props.size}px`}"
        />

    </div>

</template>

<script setup>

import logoSena from 'src/assets/logos/logo-sena.png'

const props = defineProps({
    
    size: {
        type: Number,
        default: 80
    }
})

</script>

<style scoped lang="scss">

@use 'src/css/mixins.scss' as *;

.app-logo {
    @include flex-center;
}

.app-logo img {
    display: block;
    height: auto;
}

</style>