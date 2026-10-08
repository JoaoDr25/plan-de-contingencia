<template>
  <BasePage>
    <DashboardHeader />

    <DashboardSummary :plans="plans" :loading="loadingPlans" />

    <DashboardModules />
  </BasePage>
</template>

<script setup>
import { onMounted, ref } from 'vue'

import { notifyError } from 'src/utils/notifications.utils'

import BasePage from 'src/components/base/BasePage.vue'
import DashboardHeader from 'src/components/dashboard/DashboardHeader.vue'
import DashboardSummary from 'src/components/dashboard/DashboardSummary.vue'
import DashboardModules from 'src/components/dashboard/DashboardModules.vue'

import planContingenciaService from 'src/services/plans/planContingenciaService'

const plans = ref(null)
const loadingPlans = ref(true)

async function loadPlans() {
  try {
    plans.value = await planContingenciaService.getPlanes()
  } catch (error) {
    notifyError(error)
  } finally {
    loadingPlans.value = false
  }
}

onMounted(loadPlans)
</script>
