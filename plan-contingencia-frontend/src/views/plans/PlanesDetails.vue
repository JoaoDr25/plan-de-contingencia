<template>
  <BasePage>
    <CrudHeader title="Plan de Contingencia" :uppercase-title="true" />

    <div v-if="plan" class="plan-detail">
      <div class="plan-detail__header">
        <StatusChip class="plan-detail-status" :status="plan.estado" />

        <div class="plan-detail__code">
          <span class="plan-detail__code-label">Código del Plan:</span>
          <span class="plan-detail__code-value">N° {{ plan.numero || 'N/A' }}</span>
        </div>
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

    <div v-else-if="loadingPlan" class="plan-detail__empty">Cargando información del plan...</div>

    <div v-else class="plan-detail__empty">No se encontró información del plan.</div>

    <div v-if="plan" class="plan-footer">
      <PlanDetailsActions :role="role" :plan="plan" @action="handlePlanAction" />
    </div>

    <BaseConfirmationDialog
      v-model="showConfirmation"
      :title="confirmationConfig.title"
      :confirm-label="confirmationConfig.confirmLabel"
      :cancel-label="confirmationConfig.cancelLabel"
      :variant="confirmationConfig.variant"
      :show-observations="
        pendingAction === PLAN_ACTIONS.NO_APROBAR ||
        pendingAction === PLAN_ACTIONS.MANDAR_EDICION ||
        pendingAction === PLAN_ACTIONS.CANCELAR
      "
      @confirm="confirmPlanAction"
    />
  </BasePage>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuthStore } from 'src/stores/auth.store'

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

import { PLAN_ACTIONS } from 'src/constants/plans/planActions'
import { PLAN_ACTIONS_CONFIRMATION } from 'src/constants/actions/plan_confirmation.constants'
import { PLAN_ACTION_NOTIFICATIONS } from 'src/constants/notifications/notifications.constants'
import { ROLES } from 'src/constants/system/roles.constants'

import { notifyError, notifySuccess, notifyWarning } from 'src/utils/notifications.utils'

import planContingenciaService from 'src/services/plans/planContingenciaService.js'

const route = useRoute()
const router = useRouter()
const authStore = useAuthStore()

const role = computed(() => authStore.role || ROLES.CONSULTOR)

const showConfirmation = ref(false)
const pendingAction = ref(null)
const actionInProgress = ref(false)

const plan = ref(null)
const loadingPlan = ref(false)

async function loadPlan() {
  const id = route.params.id

  if (!id) {
    return
  }

  loadingPlan.value = true

  try {
    plan.value = await planContingenciaService.getPlanById(id)
  } catch (error) {
    plan.value = null
    notifyError(error)
  } finally {
    loadingPlan.value = false
  }
}

onMounted(loadPlan)

const confirmationConfig = computed(() => {
  return (
    PLAN_ACTIONS_CONFIRMATION[pendingAction.value] ?? {
      title: 'Confirmar acción',
      confirmLabel: 'Confirmar',
      cancelLabel: 'Cancelar',
      variant: 'primary',
    }
  )
})

function handlePlanAction(action) {
  if (actionInProgress.value) {
    return
  }

  if (PLAN_ACTIONS_CONFIRMATION[action]) {
    pendingAction.value = action
    showConfirmation.value = true

    return
  }
  executePlanAction(action)
}

async function confirmPlanAction(payload) {
  const currentAction = pendingAction.value
  pendingAction.value = null
  showConfirmation.value = false

  const planId = plan.value?._id
  const success = await executePlanAction(currentAction, payload?.observations)

  if (success && currentAction === PLAN_ACTIONS.APROBAR && planId) {
    router.push({
      name: 'planes.stage',
      params: { id: planId },
    })
  }
}

const STATE_BY_ACTION = {
  [PLAN_ACTIONS.EJECUTAR]: 'ejecutado',
  [PLAN_ACTIONS.CANCELAR]: 'cancelado',
  [PLAN_ACTIONS.MANDAR_EDICION]: 'borrador',
}

async function refreshPlan(id) {
  try {
    plan.value = await planContingenciaService.getPlanById(id)
  } catch (error) {
    notifyError(error)
  }
}

async function executePlanAction(action, observations = '') {
  const id = plan.value?._id

  if (!id || actionInProgress.value) {
    return false
  }

  actionInProgress.value = true

  try {
    switch (action) {
      case PLAN_ACTIONS.APROBAR:
        await planContingenciaService.registrarRevision(id, { estado: 'aprobado' })
        break

      case PLAN_ACTIONS.NO_APROBAR:
        await planContingenciaService.registrarRevision(id, {
          estado: 'no aprobado',
          observaciones: observations,
        })
        break

      case PLAN_ACTIONS.EJECUTAR:
      case PLAN_ACTIONS.CANCELAR:
      case PLAN_ACTIONS.MANDAR_EDICION:
        await planContingenciaService.changeEstadoPlan(id, STATE_BY_ACTION[action])
        break

      case PLAN_ACTIONS.EDITAR:
        router.push({ name: 'planes.create', params: { id } })
        return true

      case PLAN_ACTIONS.IMPRIMIR:
        await printPlan(id)
        return true

      default:
        return false
    }
  } catch (error) {
    notifyError(error)
    // Sincroniza la vista con el estado real (p. ej. si la revisión ya había sido registrada).
    await refreshPlan(id)
    return false
  } finally {
    actionInProgress.value = false
  }

  const notification = PLAN_ACTION_NOTIFICATIONS[action]

  if (notification) {
    if (notification.type === 'warning') {
      notifyWarning(notification.successMessage)
    } else {
      notifySuccess(notification.successMessage)
    }
  }

  if (action !== PLAN_ACTIONS.APROBAR) {
    await refreshPlan(id)
  }

  return true
}

async function printPlan(id) {
  const blob = await planContingenciaService.generarPdf(id)
  const url = URL.createObjectURL(new Blob([blob], { type: 'application/pdf' }))

  window.open(url, '_blank', 'noopener')
  setTimeout(() => URL.revokeObjectURL(url), 60000)
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

.plan-detail__empty {
  width: 90%;
  margin: 40px auto 10px;
  font-size: $font-size-md;
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

.plan-detail__code {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 0 15px 0 0;
  white-space: nowrap;
}

.plan-detail__code-label {
  font-size: $font-size-xs;
  font-weight: 700;
  text-transform: uppercase;
  color: $color-primary;
}

.plan-detail__code-value {
  font-size: $font-size-md;
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
