<template>
  
  <BasePage class="plan-create-page">

      <header class="plan-create-header">

        <CrudHeader title="Crear Plan de Contingencia" :uppercase-title="true" />

      </header>

      <wizardStepNav :current-step="currentStep" :completed-steps="completedSteps"
        @update:current-step="handleStepNavigation" />

      <q-form ref="wizardFormRef" class="wizard-form" @submit.prevent>

        <PlanInformacionGeneral v-if="currentStep === 1" ref="currentStepRef" v-model="planForm" />

        <PlanContextoAcademico v-else-if="currentStep === 2" ref="currentStepRef" v-model="planForm" />

        <PlanPlanTrabajo v-else-if="currentStep === 3" ref="currentStepRef" v-model="planForm" />

        <PlanParticipantes v-else-if="currentStep === 4" ref="currentStepRef" v-model="planForm" />

        <PlanRiesgos v-else-if="currentStep === 5" ref="currentStepRef" v-model="planForm" />

        <PlanSeguridad v-else-if="currentStep === 6" ref="currentStepRef" v-model="planForm" />

        <PlanRevision v-else-if="currentStep === 7" ref="currentStepRef" v-model="planForm"
          @go-to-step="handleStepNavigation" />

      </q-form>

      <footer class="wizard-actions">

        <SecondaryActionButton label="Cancelar" icon="cancel" size="sm" @click="handleCancel" />

        <div class="wizard-actions__navigation">
          <SecondaryActionButton v-if="currentStep > 1" class="wizard-actions__button" label="Anterior" icon="arrow_back" size="sm" @click="goToPreviousStep" />

          <PrimaryActionButton v-if="currentStep < TOTAL_STEPS" class="wizard-actions__button" label="Siguiente" size="sm" @click="goToNextStep" />

          <PrimaryActionButton v-else class="wizard-actions__button" label="Generar Plan" size="sm"
            :disable="!canGeneratePlan" @click="showGenerateConfirmation = true" />

        </div>

      </footer>

      <BaseConfirmationDialog v-model="showGenerateConfirmation" title="Generar plan de contingencia"
        confirm-label="Generar" cancel-label="Cancelar" variant="primary" @confirm="generatePlan" />

  </BasePage>

</template>

<script setup>

import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from 'src/stores/auth.store'

import BasePage from 'src/components/base/BasePage.vue'
import CrudHeader from 'src/components/cruds/CrudHeader.vue'
import PrimaryActionButton from 'src/components/actions/PrimaryActionButton.vue'
import SecondaryActionButton from 'src/components/actions/SecondaryActionButton.vue'
import BaseConfirmationDialog from 'src/components/base/BaseConfirmationDialog.vue'
import wizardStepNav from 'src/components/wizard/wizardStepNav.vue'
import PlanInformacionGeneral from '../wizard/PlanInformacionGeneral.vue'
import PlanContextoAcademico from '../wizard/PlanContextoAcademico.vue'
import PlanPlanTrabajo from '../wizard/PlanPlanTrabajo.vue'
import PlanParticipantes from '../wizard/PlanParticipantes.vue'
import PlanRiesgos from '../wizard/PlanRiesgos.vue'
import PlanSeguridad from '../wizard/PlanSeguridad.vue'
import PlanRevision from '../wizard/PlanRevision.vue'

import { createPlanContingenciaModel } from 'src/models/planContingencia.model'
import { PLAN_WIZARD_STEPS } from 'src/constants/plans/planWizard.js'
import { PLANES_MOCK } from 'src/mocks/plans/planes.mock.js'
import { notifySuccess } from 'src/utils/notifications.utils'

const router = useRouter()
const authStore = useAuthStore()

const TOTAL_STEPS = PLAN_WIZARD_STEPS.length

const currentStep = ref(1)
const completedSteps = ref([])

const planForm = ref(createPlanContingenciaModel())

if (authStore.currentUser) {
  planForm.value.usuarioId = authStore.currentUser._id
  planForm.value.usuarioNombre = [
    authStore.currentUser.nombre,
    authStore.currentUser.apellido
  ].filter(Boolean).join(' ')
}

const wizardFormRef = ref(null)
const currentStepRef = ref(null)
const showGenerateConfirmation = ref(false)

const canGeneratePlan = computed(() => {
  const requiredStepsCompleted = [1, 2, 3, 4, 5, 6]
    .every(step => completedSteps.value.includes(step))
  const revision = planForm.value.revision

  return currentStep.value === TOTAL_STEPS &&
    requiredStepsCompleted &&
    revision.validacionInformacion === true &&
    Boolean(revision.instructor?.firma) &&
    Boolean(revision.pedagogia?.firma) &&
    Boolean(revision.sst?.firma) &&
    Boolean(revision.coordinacion?.firma)
})

function handleStepNavigation(stepNumber) {
  if (stepNumber === currentStep.value) return

  const previousStep = currentStep.value

  const canNavigate =
    stepNumber < currentStep.value ||
    completedSteps.value.includes(stepNumber) ||
    (stepNumber === currentStep.value + 1 &&
      completedSteps.value.includes(currentStep.value))

  if (!canNavigate) return

  currentStep.value = stepNumber
  if (stepNumber < previousStep) {
    completedSteps.value = completedSteps.value.filter(step => step < stepNumber)
  }
}

async function goToNextStep() {
  if (currentStep.value >= TOTAL_STEPS) return

  const formIsValid = await wizardFormRef.value?.validate()
  const stepsWithCustomValidation = [3, 4, 5, 6, 7]
  const stepValidator = currentStepRef.value?.validate
  const stepIsValid = stepsWithCustomValidation.includes(currentStep.value)
    ? typeof stepValidator === 'function' && stepValidator() === true
    : true

  if (!formIsValid || !stepIsValid) {
    return
  }

  if (!completedSteps.value.includes(currentStep.value)) {
    completedSteps.value.push(currentStep.value)
  }

  currentStep.value += 1
}

function goToPreviousStep() {
  if (currentStep.value <= 1) return

  currentStep.value -= 1
  completedSteps.value = completedSteps.value.filter(
    step => step < currentStep.value
  )
}

function generatePlan() {
  showGenerateConfirmation.value = false

  if (!canGeneratePlan.value) {
    return
  }

  const now = new Date().toISOString()
  const nextNumber = Math.max(
    0,
    ...PLANES_MOCK.map(plan => Number(plan.numero) || 0),
  ) + 1

  const newPlan = {
    ...JSON.parse(JSON.stringify(planForm.value)),
    _id: `66a10000000000000000${String(nextNumber).padStart(4, '0')}`,
    numero: nextNumber,
    estado: 'en revision',
    createdAt: now,
    updatedAt: now,
  }

  PLANES_MOCK.push(newPlan)

  notifySuccess('Plan generado correctamente')
  router.push({ name: 'planes.stage', params: { id: newPlan._id } })
}

function handleCancel() {
  router.back()
}
</script>

<style scoped lang="scss">

@use 'src/css/variables.scss' as *;
@use 'src/css/typography.scss' as *;


.plan-create-header {
  margin-bottom: 18px;
}

.plan-create-header__title {
  margin: 0;
  padding-bottom: 10px;
  border-bottom: 2px solid $color-primary;
  font-size: 22px;
  font-weight: 700;
  text-align: center;
}

.wizard-form {
  padding-top: 10px;
}

.wizard-actions {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 10px;
  padding-top: 15px;
  padding-bottom: 15px;
  border-top: 1px solid $color-border;
}

.wizard-actions__navigation {
  display: flex;
  align-items: center;
  gap: 10px;
}

.wizard-actions__button {
  width: 110px;
  min-width: 90px;
  height: 30px;
}

@media (max-width: 900px) {
  .plan-create-header__title {
    font-size: 19px;
  }
}

@media (max-width: 600px) {
  .wizard-actions {
    flex-direction: column-reverse;
    gap: 12px;
  }

  .wizard-actions__navigation {
    justify-content: flex-end;
  }
}
</style>