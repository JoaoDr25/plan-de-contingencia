<template>

    <section class="dashboard-summary">

        <div class="dashboard-summary__grid">

            <DashboardStatCard 
            
            v-for="item in dashboardSummary"

            :key="item.id"
            :icon="item.icon"
            :value="item.value"
            :title="item.title"
            :description="item.description"
            />

        </div>

    </section>

</template>

<script setup>

import { dashboardSummary } from 'src/constants/dashboard.constants.js';
import DashboardStatCard from './DashboardStatCard.vue';

</script>

<style scoped lang="scss">

@use 'src/css/variables.scss' as *;
@use 'src/css/mixins.scss' as *;
@use 'src/css/typography.scss' as *;

.dashboard-summary {
    width: 100%;
}

.dashboard-summary__grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
    gap: 1.5rem;
}

</style>