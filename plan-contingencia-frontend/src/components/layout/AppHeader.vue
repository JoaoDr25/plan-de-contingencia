<template>
    <q-header elevated class="app-header">

        <q-toolbar>

            <q-btn flat dense round icon="menu">
                @click="handleToggleDrawer"
            </q-btn>

            <q-toolbar-title>
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
@use 'src/css/mixins.scss' as *;


</style>
