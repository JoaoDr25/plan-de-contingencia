<template>
    <q-header elevated class="app-header">

        <q-toolbar>

            <q-btn flat dense round icon="menu" @click="handleToggleDrawer" />

            <q-toolbar-title class="app-header__title">
                {{ APP_TITLE }}
            </q-toolbar-title>

            <q-btn flat dense round icon="logout">
            </q-btn>

        </q-toolbar>

    </q-header>
</template>

<script setup>

const emit = defineEmits([
    'toggleDrawer'
])

function handleToggleDrawer() {
    emit('toggleDrawer')
}

const APP_TITLE = "PLANES DE CONTINGENCIA"

</script>

<style scoped lang="scss">

@use 'src/css/variables.scss' as *;
@use 'src/css/typography.scss' as *;

.app-header {
    background-color: $color-primary;
}

.app-header__title {
    font-family: $font-family-base;
    font-size: 0.96rem;
    font-weight: 500;
    padding-top: 0.1rem;
    letter-spacing: 2px;
}

</style>
