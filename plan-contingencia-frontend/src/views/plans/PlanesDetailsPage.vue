<template>

  <BasePage>

    <CrudHeader title="Plan de Contingencia" :uppercase-title="true" />

     <div v-if="plan" class="plan-detail">

      <div class="plan-detail__header">
        <StatusChip :status="plan.estado" />
      </div>


      <PlanSection number="1" title="Información General" icon="description">
        <PlanGeneralInfo v-if="plan" :plan="plan" />
      </PlanSection>


      <PlanSection :number="2" title="Contexto Académico" icon="school">
        <PlanAcademicContext :plan="plan" />
      </PlanSection>

      <PlanSection :number="3" title="Soportes Académicos" icon="attach_file">
        <PlanAcademicSupports :plan="plan" />
      </PlanSection>

      <PlanSection :number="4" title="Plan de Trabajo" icon="schedule">
        <PlanWorkPlan :plan="plan" />
      </PlanSection>

      <PlanSection :number="5" title="Participantes" icon="groups">
        <PlanParticipants :plan="plan" />
      </PlanSection>

      <PlanSection :number="6" title="Riesgos Asociados" icon="warning">
        <PlanRisks :plan="plan" />
      </PlanSection>

      <PlanSection :number="7" title="Seguridad y recursos" icon="security">
        <PlanSecurityResources :plan="plan" />
      </PlanSection>

       <PlanSection :number="8" title="Flujo de Revisión y Aprobación" icon="sync">
        <PlanReview :plan="plan" />
      </PlanSection>

    </div>

    <div class="plan-footer">
      <PlanDetailsActions :role="role" :state="state" @action="handlePlanAction"/>
    </div>

  </BasePage>

</template>


<script setup>

import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'

import BasePage from 'src/components/base/BasePage.vue'
import CrudHeader from 'src/components/cruds/CrudHeader.vue'
import StatusChip from 'src/components/states/StatusChip.vue'
import PlanSection from 'src/components/details/PlanSection.vue'
import PlanGeneralInfo from 'src/components/details/PlanGeneralInfo.vue'
import PlanAcademicContext from 'src/components/details/PlanAcademicContext.vue'
import PlanAcademicSupports from 'src/components/details/PlanAcademicSupports.vue'
import PlanWorkPlan from 'src/components/details/PlanWorkPlan.vue'
import PlanParticipants from 'src/components/details/PlanParticipants.vue'
import PlanRisks from 'src/components/details/PlanRisks.vue'
import PlanSecurityResources from 'src/components/details/PlanSecurityResources.vue'
import PlanReview from 'src/components/details/PlanReview.vue'
import PlanDetailsActions from 'src/components/actions/PlanDetailsActions.vue'

import { PLANES_MOCK } from 'src/mocks/planes.mock'

const route = useRoute()

const plan = computed(() => {

  return PLANES_MOCK.find(
    item => item._id === route.params.id
  )
})

const role = ref('coordinacion')

const state = computed(() => {
    return plan.value?.estado
})

function handlePlanAction(action) {
    console.log('Acción seleccionada:', action)
}

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