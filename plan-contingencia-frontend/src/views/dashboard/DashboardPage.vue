<template>

<BasePage>

    <DashboardHeader />
    
    <DashboardSummary />

    <DashboardModules />

</BasePage>

</template>

<script setup>

import BasePage from 'src/components/base/BasePage.vue';
import DashboardHeader from 'src/components/dashboard/DashboardHeader.vue';
import DashboardSummary from 'src/components/dashboard/DashboardSummary.vue';
import DashboardModules from 'src/components/dashboard/DashboardModules.vue';

</script>