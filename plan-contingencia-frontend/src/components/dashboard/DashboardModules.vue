<template>

    <section class="dashboard-modules">

        <h2 class="dashboard-modules__title">{{ roleTitle }}</h2>

        <div class="dashboard-modules__grid">


            <DashboardModuleCard v-for="module in visibleModules" :key="module.id" :title="module.title"
                :image="module.image" :route-name="module.routeName" />

        </div>

    </section>

</template>

<script setup>

import { computed } from 'vue'
import { useAuthStore } from 'src/stores/auth.store'
import { useRouter } from 'vue-router'
import { dashboardModules } from 'src/constants/navigation/dashboard.constants.js';

import DashboardModuleCard from './DashboardModuleCard.vue';

const authStore = useAuthStore()
const router = useRouter()

const visibleModules = computed(() => {
    return dashboardModules.filter(module => {
        const route = router.getRoutes().find(item => item.name === module.routeName)
        const roles = route?.meta?.roles ?? []

        return roles.length === 0 || roles.includes(authStore.role)
    })
})

const roleTitle = computed(() => {
    return authStore.role === 'usuario'
        ? 'CONFIGURACIÓN DEL SISTEMA'
        : 'ADMINISTRADOR DEL SISTEMA'
})

</script>

<style scoped lang="scss">

@use 'src/css/variables.scss' as *;
@use 'src/css/typography.scss' as *;

.dashboard-modules {
    width: 100%;
    padding-bottom: 50px;
}

.dashboard-modules__title {
    padding-top: 22px;
    margin: 1.8rem;
    text-align: center;
    font-size: 1.36rem;
    font-weight: 600;
    letter-spacing: 0.8px;
    color: $color-text-primary;
    font-family: $font-family-base;
}

.dashboard-modules__grid {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 1.5rem;
}

</style>