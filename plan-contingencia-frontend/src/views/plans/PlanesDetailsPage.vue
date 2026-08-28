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

    <BaseConfirmationDialog v-model="showConfirmation" :title="confirmationConfig.title"
      :confirm-label="confirmationConfig.confirmLabel" :cancel-label="confirmationConfig.cancelLabel"
      :variant="confirmationConfig.variant" @confirm="confirmPlanAction" />

  </BasePage>

</template>


<script setup>

import { ref, computed } from 'vue'
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
import { PLAN_ACTIONS } from 'src/constants/plans/planActions'
import { PLAN_ACTIONS_CONFIRMATION } from 'src/constants/actions/plan_confirmation.constants'
import { PLAN_ACTION_NOTIFICATIONS } from 'src/constants/notifications/notifications.constants'

import { notifySuccess } from 'src/utils/notifications.utils'

import {
  approvePlan,
  rejectPlan,
  executePlan,
  cancelPlan,
  sendPlanToEdition
} from 'src/utils/workflow.utils'

const route = useRoute()

const role = ref('coordinacion')

const showConfirmation = ref(false)
const pendingAction = ref(null)

const plan = ref(
  PLANES_MOCK.find(
    item => item._id === route.params.id
  )
)

const confirmationConfig = computed(() => {

  return (
    PLAN_ACTIONS_CONFIRMATION[pendingAction.value] ?? {
      title: 'Confirmar acción',
      confirmLabel: 'Confirmar',
      cancelLabel: 'Cancelar',
      variant: 'primary'
    }
  )

})


function handlePlanAction(action) {

  if (PLAN_ACTIONS_CONFIRMATION[action]) {

    pendingAction.value = action
    showConfirmation.value = true

    return
  }

  executePlanAction(action)

}


function confirmPlanAction() {

  executePlanAction(pendingAction.value)

  pendingAction.value = null
  showConfirmation.value = false
}


function executePlanAction(action) {

  switch (action) {
    case PLAN_ACTIONS.APROBAR:
      plan.value = approvePlan(
        plan.value,
        role.value
      )
      break

    case PLAN_ACTIONS.NO_APROBAR:
      plan.value = rejectPlan(
        plan.value,
        role.value
      )
      break

    case PLAN_ACTIONS.EJECUTAR:
      plan.value = executePlan(
        plan.value,
        role.value
      )
      break

    case PLAN_ACTIONS.CANCELAR:
      plan.value = cancelPlan(
        plan.value,
        role.value
      )
      break

    case PLAN_ACTIONS.MANDAR_EDICION:
      plan.value = sendPlanToEdition(
        plan.value,
        role.value
      )
      break

    case PLAN_ACTIONS.EDITAR:
      console.log('Editar plan')
      break

    case PLAN_ACTIONS.IMPRIMIR:
      console.log('Imprimir plan')
      break
  }

  const notification = PLAN_ACTION_NOTIFICATIONS[action]

  if (notification) {
    notifySuccess(notification.successMessage)
  }

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