<template>

    <section class="dashboard-modules">

        <h2 class="dashboard-modules__title">

            ADMINISTRADOR DEL SISTEMA

        </h2>

        <div class="dashboard-modules__grid">


            <DashboardModuleCard v-for="module in dashboardModules" :key="module.id" :title="module.title"
                :image="module.image" :route-name="module.routeName" />

        </div>

    </section>

</template>

<script setup>

import { dashboardModules } from 'src/constants/dashboard.constants';
import DashboardModuleCard from './DashboardModuleCard.vue';

</script>

<style scoped lang="scss">

@use 'src/css/variables.scss' as *;
@use 'src/css/typography.scss' as *;

.dashboard-modules {
    width: 100%;
}

.dashboard-modules__title {
    margin-bottom: 2rem;
    text-align: center;
    font-size: 1.75rem;
    font-weight: 700;
    color: $color-text-primary;
}

.dashboard-modules__grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 1.5rem;
}

</style>