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
      <PlanDetailsActions :role="role" :plan="plan" @action="handlePlanAction" />
    </div>

    <BaseConfirmationDialog
    v-model="showConfirmation"
    title="Aprobar plan"
    confirm-label="Aprobar"
    cancel-label="Cancelar"
    variant="primary"
    @confirm="confirmPlanAction"
/>

  </BasePage>

</template>


<script setup>

import { ref } from 'vue'
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
import BaseConfirmationDialog from 'src/components/forms/BaseConfirmationDialog.vue'

import { PLANES_MOCK } from 'src/mocks/planes.mock'

import {
    approvePlan,
    rejectPlan,
    executePlan,
    cancelPlan,
    sendPlanToEdition
} from 'src/utils/plan.workflow'

const route = useRoute()

const role = ref('coordinacion')

const showConfirmation = ref(false)
const pendingAction = ref(null)

const plan = ref(
    PLANES_MOCK.find(
        item => item._id === route.params.id
    )
)

function handlePlanAction(action) {

    if (action === 'aprobar') {

        pendingAction.value = action
        showConfirmation.value = true

        return
    }

    switch (action) {

        case 'no_aprobar':
            rejectPlan(plan.value, role.value)
            break
        case 'ejecutar':
            executePlan(plan.value, role.value)
            break
        case 'cancelar':
            cancelPlan(plan.value, role.value)
            break
        case 'mandar_edicion':
            sendPlanToEdition(plan.value, role.value)
            break
        case 'editar':
            console.log('Editar plan')
            break
        case 'imprimir':
            console.log('Imprimir plan')
            break
    }
}

function confirmPlanAction() {

    switch (pendingAction.value) {

        case 'aprobar':
            approvePlan(plan.value, role.value)
            break
    }
    pendingAction.value = null
    showConfirmation.value = false
}

</script>

<style scoped lang="scss">

@use 'src/css/variables.scss' as *;
@use 'src/css/typography.scss' as *;

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

</style>