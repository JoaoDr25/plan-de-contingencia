<template>

  <BasePage>

    <CrudHeader title="Plan de Contingencia" :uppercase-title="true" />

    <div v-if="plan" class="plan-detail">

      <div class="plan-detail__header">
        <StatusChip class="plan-detail-status" :status="plan.estado" />
      </div>


      <PlanSection number="1" title="Información General" icon="description">
        <PlanInformacionGeneral v-if="plan" :plan="plan" />
      </PlanSection>


      <PlanSection :number="2" title="Contexto Académico" icon="school">
        <PlanContextoAcademico :plan="plan" />
      </PlanSection>

      <PlanSection :number="3" title="Soportes Académicos" icon="attach_file">
        <PlanSoportesAcademicos :plan="plan" />
      </PlanSection>

      <PlanSection :number="4" title="Plan de Trabajo" icon="schedule">
        <PlanPlanTrabajo :plan="plan" />
      </PlanSection>

      <PlanSection :number="5" title="Participantes" icon="groups">
        <PlanParticipantes :plan="plan" />
      </PlanSection>

      <PlanSection :number="6" title="Riesgos Asociados" icon="warning">
        <PlanRiesgos :plan="plan" />
      </PlanSection>

      <PlanSection :number="7" title="Seguridad y recursos" icon="security">
        <PlanRecursosSeguridad :plan="plan" />
      </PlanSection>

      <PlanSection :number="8" title="Flujo de Revisión y Aprobación" icon="sync">
        <PlanRevision :plan="plan" />
      </PlanSection>

    </div>

    <div class="plan-footer">
      <PlanDetailsActions :role="role" :plan="plan" @action="handlePlanAction" />
    </div>

    <BaseConfirmationDialog v-model="showConfirmation" :title="confirmationConfig.title"
      :confirm-label="confirmationConfig.confirmLabel" :cancel-label="confirmationConfig.cancelLabel"
      :variant="confirmationConfig.variant"
      :show-observations="pendingAction === PLAN_ACTIONS.NO_APROBAR || pendingAction === PLAN_ACTIONS.MANDAR_EDICION || pendingAction === PLAN_ACTIONS.CANCELAR"
      @confirm="confirmPlanAction" />

  </BasePage>

</template>


<script setup>

import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import BasePage from 'src/components/base/BasePage.vue'
import CrudHeader from 'src/components/cruds/CrudHeader.vue'
import StatusChip from 'src/components/states/StatusChip.vue'
import PlanSection from 'src/components/plans/PlanSection.vue'
import PlanDetailsActions from 'src/components/actions/PlanDetailsActions.vue'
import BaseConfirmationDialog from 'src/components/base/BaseConfirmationDialog.vue'

import PlanInformacionGeneral from '../sections/PlanInformacionGeneral.vue'
import PlanContextoAcademico from '../sections/PlanContextoAcademico.vue'
import PlanSoportesAcademicos from '../sections/PlanSoportesAcademicos.vue'
import PlanPlanTrabajo from '../sections/PlanPlanTrabajo.vue'
import PlanParticipantes from '../sections/PlanParticipantes.vue'
import PlanRiesgos from '../sections/PlanRiesgos.vue'
import PlanRecursosSeguridad from '../sections/PlanRecursosSeguridad.vue'
import PlanRevision from '../sections/PlanRevision.vue'

import { PLANES_MOCK } from 'src/mocks/planes.mock'
import { PLAN_ACTIONS } from 'src/constants/plans/planActions'
import { PLAN_ACTIONS_CONFIRMATION } from 'src/constants/actions/plan_confirmation.constants'
import { PLAN_ACTION_NOTIFICATIONS } from 'src/constants/notifications/notifications.constants'

import { notifySuccess, notifyWarning } from 'src/utils/notifications.utils'

import {
  approvePlan,
  rejectPlan,
  executePlan,
  cancelPlan,
  sendPlanToEdition
} from 'src/utils/workflow.utils'


const route = useRoute()
const router = useRouter()

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


function confirmPlanAction(payload) {
  const currentAction = pendingAction.value
  executePlanAction(currentAction, payload?.observations)
  pendingAction.value = null
  showConfirmation.value = false

  if (currentAction === PLAN_ACTIONS.APROBAR && plan.value) {
    router.push({
      name: 'planes.stage',
      params: { id: plan.value._id }
    })
  }
}


function executePlanAction(action, observations = '') {

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
        role.value,
        observations
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
        role.value,
        observations
      )
      break

    case PLAN_ACTIONS.MANDAR_EDICION:
      plan.value = sendPlanToEdition(
        plan.value,
        role.value,
        observations
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
    if (notification.type === 'warning') {
      notifyWarning(notification.successMessage)
    } else {
      notifySuccess(notification.successMessage)
    }
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
  align-items: center;
  width: 90%;
  margin: 40px auto 10px;
}

.plan-detail__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  margin-bottom: 10px;
  width: 100%;
}

.plan-detail-status {
  padding: 13px;
  font-weight: 500;
  font-size: $font-size-sm;
}

.plan-footer {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 95%;
  margin: 5px 0 50px 0;
  box-sizing: border-box;
}

@media (max-width: 1000px) {

  .plan-detail {
    width: 94%;
    margin-top: 32px;
  }

  .plan-footer {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    width: 97%;
  }
}

@media (max-width: 700px) {

  .plan-detail {
    width: calc(100% - 24px);
    margin: 28px auto 10px;
    gap: 10px;
  }

  .plan-detail__header {
    margin-bottom: 6px;
  }

  .plan-footer {
    display: flex;
    justify-content: center;
    align-items: center;
    width: calc(100% - 24px);
    margin: 10px auto 30px 0;
    width: 100%;
  }
}

@media (max-width: 450px) {

  .plan-detail {
    width: calc(100%);
    margin-top: 22px;
    gap: 8px;
  }

  .plan-footer {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
  }

}
</style>