<template>

    <section class="dashboard-summary">

        <div class="dashboard-summary__grid">

            <DashboardStatCard v-for="item in summaryItems" :key="item.id" :icon="item.icon" :value="item.value"
                :title="item.title" :description="item.description" @click="openSummary(item)" />

        </div>

    </section>

</template>

<script setup>

import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { dashboardSummary } from 'src/constants/navigation/dashboard.constants.js';
import DashboardStatCard from './DashboardStatCard.vue';

const props = defineProps({
    plans: {
        type: Array,
        default: () => []
    }
})

const router = useRouter()

function normalizeStatus(status) {
    return String(status ?? '')
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .toLowerCase()
        .trim()
}

const summaryItems = computed(() => {
    const plans = props.plans

    return dashboardSummary.map(item => ({
        ...item,
        value: item.status === 'todos'
            ? plans.length
            : plans.filter(plan => normalizeStatus(plan.estado) === normalizeStatus(item.status)).length
    }))
})

function openSummary(item) {
    router.push({
        name: item.routeName,
        query: {
            estado: item.status
        }
    })
}

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
    grid-template-columns: repeat(auto-fit, minmax(270px, 1fr));
    gap: 1.5rem;
}
</style>