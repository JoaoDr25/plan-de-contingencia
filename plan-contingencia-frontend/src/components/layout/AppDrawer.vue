<template>

    <q-drawer v-model="drawerOpen" bordered class="app-dawer" overlay behavior="mobile">

        <div class="app-drawer__header">

            <AppLogo :size="78" />

        </div>

        <div class="app-drawer__user">

            <h2 class="app-drawer__role">{{ roleLabel }}</h2>

            <p class="app-drawer__name">{{ userName }}</p>

            <p class="app-drawer__email">{{ userEmail }}</p>

        </div>

        <q-separator />

        <div class="app-drawer__content">

            <DrawerMenuItem v-for="item in visibleNavigation" :key="item.routeName" :title="item.title"
                :icon="item.icon" :route-name="item.routeName" @closeDrawer="handleCloseDrawer"/>
        </div>

    </q-drawer>

</template>

<script setup>

import AppLogo from './AppLogo.vue';
import DrawerMenuItem from '../navigation/DrawerMenuItem.vue';

import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from 'src/stores/auth.store'
import { navigation } from 'src/constants/navigation/navigation.constants.js';
import { ROLES } from 'src/constants/system/roles.constants.js';

const emit = defineEmits([
  'closeDrawer'
])

function handleCloseDrawer() {
    emit('closeDrawer')
}

const drawerOpen = defineModel()
const router = useRouter()
const authStore = useAuthStore()

const userName = computed(() => {
    const user = authStore.currentUser
    return [user?.nombre, user?.apellido].filter(Boolean).join(' ') || 'Usuario'
})

const userEmail = computed(() => authStore.currentUser?.correo || 'Correo no disponible')

const roleLabel = computed(() => String(authStore.role || 'usuario').toUpperCase())

const visibleNavigation = computed(() => {
    const administratorItems = navigation[ROLES.ADMINISTRADOR] || []

    return administratorItems.filter(item => {
        const route = router.getRoutes().find(registeredRoute => registeredRoute.name === item.routeName)
        const roles = route?.meta?.roles ?? []

        return roles.length === 0 || roles.includes(authStore.role)
    })
})

</script>

<style scoped lang="scss">

@use 'src/css/variables.scss' as *;
@use 'src/css/mixins.scss' as *;
@use 'src/css/typography.scss' as *;

.app-drawer {
    display: flex;
    flex-direction: column;
    height: 100%;
    background-color: $color-surface;
}

.app-drawer__header {
    @include flex-center;
    padding: 3rem 1rem 0.4rem;
}

.app-drawer__user {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0 1rem 1.5rem;
    text-align: center;
}

.app-drawer__role {
    font-size: 1.2rem;
    font-weight: 700;
    text-transform: uppercase;
    margin: 0;
}

.app-drawer__name {
    margin-top: 0.5rem;
    font-size: 0.77rem;
    font-weight: 600;
}

.app-drawer__email {
    margin: 0;
    font-size: 0.75rem;
}

.app-drawer__content {
    flex: 1;
    padding: 1.5rem 1.5rem 0;
    overflow-y: auto;
}
</style>