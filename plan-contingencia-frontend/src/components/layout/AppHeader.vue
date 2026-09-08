<template>
    <q-header elevated class="app-header">

        <q-toolbar>

            <q-btn v-if="showMenu" flat dense round icon="menu" @click="handleToggleDrawer" />

            <q-toolbar-title class="app-header__title">
                <span class="app-header__title-text" role="button" tabindex="0" @click="goToDashboard"
                    @keydown.enter="goToDashboard" @keydown.space.prevent="goToDashboard">
                    {{ APP_TITLE }}
                </span>
            </q-toolbar-title>

            <q-btn v-if="showLogout" flat dense round icon="logout" @click="handleLogout">
            </q-btn>

        </q-toolbar>

    </q-header>
</template>

<script setup>

import { useRouter } from 'vue-router'
import { useAuthStore } from 'src/stores/auth.store'

const router = useRouter()
const authStore = useAuthStore()

const {
    showMenu,
    showLogout
} = defineProps({
    showMenu: {
        type: Boolean,
        default: true
    },
    showLogout: {
        type: Boolean,
        default: true
    }
})

const emit = defineEmits([
    'toggleDrawer'
])

function handleToggleDrawer() {
    emit('toggleDrawer')
}

function goToDashboard() {
    router.push({ name: 'dashboard' })
}

function handleLogout() {
    authStore.logout()
    router.push({ name: 'login' })
}

const APP_TITLE = "PLANES DE CONTINGENCIA"

</script>

<style scoped lang="scss">
@use 'src/css/variables.scss' as *;
@use 'src/css/typography.scss' as *;

.app-header {
    background-color: $color-primary;
}

.app-header :deep(.q-toolbar) {
    min-height: 56px;
}

.app-header__title {
    font-family: $font-family-base;
    font-size: 0.98rem;
    font-weight: 500;
    padding-top: 0.1rem;
    letter-spacing: 0.8px;
}

.app-header__title-text {
    cursor: pointer;
    display: inline-block;
}

@media (max-width: 600px) {
    .app-header {
        height: 56px;
    }

    .app-header :deep(.q-toolbar) {
        min-height: 56px;
    }
}
</style>
