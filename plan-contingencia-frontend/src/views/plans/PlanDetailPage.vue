<template>

  <BasePage>

    <CrudHeader title="Plan de Contingencia" :uppercase-title="true" />

    <div class="plan-detail">

      <div class="plan-detail__header">

        <StatusChip :status="plan.estado" />

      </div>


      <PlanSection number="1" title="Información General" icon="description">

        <PlanGeneralInfo v-if="plan" :plan="plan" />

      </PlanSection>


      <PlanSection :number="2" title="Contexto Académico" icon="school">
        <PlanAcademicContext :plan="plan" />
      </PlanSection>


    </div>

  </BasePage>

</template>


<script setup>

import { computed } from 'vue'
import { useRoute } from 'vue-router'

import BasePage from 'src/components/base/BasePage.vue'
import CrudHeader from 'src/components/cruds/CrudHeader.vue'
// import StatusChip from 'src/components/status/StatusChip.vue'
import PlanSection from 'src/components/details/PlanSection.vue'
import PlanGeneralInfo from 'src/components/details/PlanGeneralInfo.vue'
import PlanAcademicContext from 'src/components/details/PlanAcademicContext.vue'

import { PLANES_MOCK } from 'src/mocks/planes.mock'

const route = useRoute()

const plan = computed(() => {

  return PLANES_MOCK.find(
    item => item._id === route.params.id
  )

})

</script>


<style scoped lang="scss">
.plan-detail {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.plan-detail__header {
  display: flex;
  justify-content: flex-start;
  margin-bottom: 4px;
}

.detail-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 22px 30px;
}

.detail-item {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.detail-label {
  font-size: 11px;
  font-weight: 700;
  color: #287C2D;
  text-transform: uppercase;
}

.detail-value {
  font-size: 13px;
  color: #222222;
}
</style>