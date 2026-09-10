<template>
  <q-page class="plan-create-page">

    <div class="plan-create-page__container">

      <header class="plan-create-header">

        <h1 class="plan-create-header__title">
          CREAR PLAN DE CONTINGENCIA
        </h1>

      </header>

      <wizardStepNav :current-step="currentStep" :completed-steps="completedSteps"
        @update:current-step="handleStepNavigation" />

      <q-form ref="wizardFormRef" class="wizard-form" @submit.prevent>

        <PlanInformacionGeneral v-if="currentStep === 1" v-model="planForm" />

        <PlanContextoAcademico v-else-if="currentStep === 2" v-model="planForm" />

        <PlanPlanTrabajo v-else-if="currentStep === 3" v-model="planForm" />

        <PlanParticipantes v-else-if="currentStep === 4" v-model="planForm" />

        <PlanRiesgos v-else-if="currentStep === 5" ref="currentStepRef" v-model="planForm" />

        <PlanSeguridad v-else-if="currentStep === 6" ref="currentStepRef" v-model="planForm" />

        <PlanRevision v-else-if="currentStep === 7" ref="currentStepRef" v-model="planForm"
          @go-to-step="handleStepNavigation" />

        <section v-else class="wizard-placeholder">

          <h3>{{ currentStepData.title }}</h3>

          <p>{{ currentStepData.description }}</p>

        </section>

      </q-form>

      <footer class="wizard-actions">

        <q-btn flat no-caps label="Cancelar" icon="cancel" class="wizard-actions__cancel" @click="handleCancel" />

        <div class="wizard-actions__navigation">
          <q-btn v-if="currentStep > 1" flat no-caps label="Anterior" class="wizard-actions__previous"
            @click="goToPreviousStep" />

          <q-btn v-if="currentStep < TOTAL_STEPS" unelevated no-caps label="Siguiente" class="wizard-actions__next"
            @click="goToNextStep" />

          <q-btn v-else unelevated no-caps label="Generar Plan" class="wizard-actions__next" disable />

        </div>

      </footer>

    </div>

  </q-page>

</template>

<script setup>

import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'

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

const router = useRouter()

const TOTAL_STEPS = PLAN_WIZARD_STEPS.length

const currentStep = ref(1)
const completedSteps = ref([])

const planForm = ref(createPlanContingenciaModel())

const wizardFormRef = ref(null)

const steps = PLAN_WIZARD_STEPS

const currentStepData = computed(() => {
  return (
    steps.find(step => step.number === currentStep.value) ??
    steps[0]
  )
})

function handleStepNavigation(stepNumber) {
  if (stepNumber === currentStep.value) return

  const canNavigate =
    stepNumber < currentStep.value ||
    completedSteps.value.includes(stepNumber) ||
    (stepNumber === currentStep.value + 1 &&
      completedSteps.value.includes(currentStep.value))

  if (!canNavigate) return

  currentStep.value = stepNumber
}

async function goToNextStep() {
  if (currentStep.value >= TOTAL_STEPS) return

  const isValid = await wizardFormRef.value?.validate()

  if (!isValid) {
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
}

function handleCancel() {
  router.back()
}
</script>

<style scoped lang="scss">
@use 'src/css/variables.scss' as *;
@use 'src/css/typography.scss' as *;

.plan-create-page {
  padding: 20px 32px 32px;
}

.plan-create-page__container {
  width: 100%;
  max-width: 1360px;
  margin: 0 auto;
}

/* Encabezado */

.plan-create-header {
  margin-bottom: 18px;
}

.plan-create-header__title {
  margin: 0;
  padding-bottom: 10px;

  border-bottom: 2px solid $color-primary;

  color: #111;
  font-size: 22px;
  font-weight: 700;
  text-align: center;
}

/* Formulario */

.wizard-form {
  padding-top: 24px;
}

/* Placeholder */

.wizard-placeholder {
  display: flex;
  align-items: center;
  gap: 20px;

  min-height: 220px;
  padding: 32px;

  border: 1px solid #dedede;
  border-radius: 4px;

  background-color: #fff;
}

.wizard-placeholder__number {
  display: flex;
  align-items: center;
  justify-content: center;

  flex: 0 0 auto;

  width: 64px;
  height: 64px;

  border-radius: 50%;

  background-color: $color-primary;

  color: #fff;
  font-size: 24px;
  font-weight: 700;
}

.wizard-placeholder h2 {
  margin: 0 0 8px;

  color: #222;
  font-size: 18px;
}

.wizard-placeholder p {
  margin: 0 0 6px;

  color: #666;
  font-size: 13px;
}

.wizard-placeholder__message {
  color: $color-primary !important;
  font-weight: 600;
}

/* Acciones */

.wizard-actions {
  display: flex;
  align-items: center;
  justify-content: space-between;

  margin-top: 24px;
  padding-top: 16px;

  border-top: 1px solid #e5e5e5;
}

.wizard-actions__navigation {
  display: flex;
  align-items: center;
  gap: 10px;
}

.wizard-actions__cancel {
  color: #555;
}

.wizard-actions__previous {
  color: $color-primary;
}

.wizard-actions__next {
  min-width: 110px;

  background-color: $color-primary;
  color: #fff;
}

/* Responsive */

@media (max-width: 900px) {
  .plan-create-page {
    padding: 16px;
  }

  .plan-create-header__title {
    font-size: 19px;
  }
}

@media (max-width: 600px) {
  .plan-create-page {
    padding: 12px;
  }

  .wizard-placeholder {
    flex-direction: column;
    align-items: flex-start;

    min-height: 180px;
    padding: 24px;
  }

  .wizard-actions {
    flex-direction: column-reverse;
    align-items: stretch;
    gap: 12px;
  }

  .wizard-actions__navigation {
    justify-content: flex-end;
  }
}
</style>