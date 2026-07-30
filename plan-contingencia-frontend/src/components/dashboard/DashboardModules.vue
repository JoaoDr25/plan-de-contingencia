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

import { dashboardModules } from 'src/constants/dashboard.constants.js';
import DashboardModuleCard from './DashboardModuleCard.vue';

</script>

<style scoped lang="scss">

@use 'src/css/variables.scss' as *;
@use 'src/css/typography.scss' as *;

.dashboard-modules {
    width: 100%;
}

.dashboard-modules__title {
    margin: 1.8rem;
    text-align: center;
    font-size: 1.30rem;
    font-weight: 600;
    letter-spacing: 0.5px;
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