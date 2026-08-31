<template>

<BasePage>

    <DashboardHeader />
    
    <DashboardSummary :plans="PLANES_MOCK" />

    <DashboardModules />

</BasePage>

</template>

<script setup>

import { PLANES_MOCK } from 'src/mocks/planes.mock';

import BasePage from 'src/components/base/BasePage.vue';
import DashboardHeader from 'src/components/dashboard/DashboardHeader.vue';
import DashboardSummary from 'src/components/dashboard/DashboardSummary.vue';
import DashboardModules from 'src/components/dashboard/DashboardModules.vue';

</script>