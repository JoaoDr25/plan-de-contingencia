<template>

  <q-page class="plan-create-page">

    <div class="plan-create-page__container">

      <header class="plan-create-header">

        <h1 class="plan-create-header__title">
          CREAR PLAN DE CONTINGENCIA
        </h1>

      </header>

      <WizardStepNav
        :current-step="currentStep"
        :completed-steps="completedSteps"
        @update:current-step="handleStepNavigation"
      />

      <main class="wizard-content">

        <section class="wizard-content__header">

          <span class="wizard-content__step">
            Paso {{ currentStep }} de {{ TOTAL_STEPS }}
          </span>

          <h2 class="wizard-content__title">
            {{ currentStepData.title }}
          </h2>

          <p class="wizard-content__description">
            {{ currentStepData.description }}
          </p>

        </section>

        <section class="wizard-placeholder">

          <div class="wizard-placeholder__number">
            {{ currentStep }}

          </div>

          <div>
            <h3>{{ currentStepData.title }}</h3>

            <p>
              Aquí se construirá el contenido correspondiente a este paso.
            </p>

            <p v-if="isCompletedStep(currentStep)" class="wizard-placeholder__completed">
              Esta sección ya fue completada.
            </p>

          </div>

        </section>

      </main>

      <footer class="wizard-actions">
        <q-btn
          flat
          no-caps
          label="Cancelar"
          icon="cancel"
          class="wizard-actions__cancel"
          @click="handleCancel"
        />

        <div class="wizard-actions__navigation">
          <q-btn
            v-if="currentStep > 1"
            flat
            no-caps
            label="Anterior"
            class="wizard-actions__previous"
            @click="goToPreviousStep"
          />

          <q-btn
            v-if="currentStep < TOTAL_STEPS"
            unelevated
            no-caps
            label="Siguiente"
            class="wizard-actions__next"
            @click="goToNextStep"
          />

          <q-btn
            v-else
            unelevated
            no-caps
            label="Generar Plan"
            class="wizard-actions__next"
            disable
          />

        </div>

      </footer>

    </div>

  </q-page>

</template>

<script setup>

import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'

import WizardStepNav from 'src/components/wizard/wizardStepNav.vue'

const router = useRouter()

const TOTAL_STEPS = 7

const currentStep = ref(1)
const completedSteps = ref([])

const steps = [
  {
    number: 1,
    title: 'Información general',
    description:
      'Registre la información principal del plan de contingencia.'
  },
  {
    number: 2,
    title: 'Contexto académico',
    description:
      'Registre la información académica y la articulación formativa.'
  },
  {
    number: 3,
    title: 'Plan de trabajo',
    description:
      'Defina las actividades específicas que se desarrollarán durante la salida.'
  },
  {
    number: 4,
    title: 'Participantes',
    description:
      'Seleccione los aprendices que participarán en la actividad.'
  },
  {
    number: 5,
    title: 'Riesgos',
    description:
      'Seleccione los riesgos asociados a la actividad y las medidas de prevención.'
  },
  {
    number: 6,
    title: 'Seguridad',
    description:
      'Registre los elementos de protección, seguridad vial y contactos de emergencia.'
  },
  {
    number: 7,
    title: 'Revisión',
    description:
      'Revise la información, registre observaciones y defina los responsables.'
  }
]

const currentStepData = computed(() => {
  return (
    steps.find(step => step.number === currentStep.value) ?? steps[0]
  )
})

function isCompletedStep(stepNumber) {
  return completedSteps.value.includes(stepNumber)
}

function handleStepNavigation(stepNumber) {
  if (stepNumber === currentStep.value) return

  const canNavigate =
    stepNumber < currentStep.value ||
    completedSteps.value.includes(stepNumber)

  if (!canNavigate) return

  currentStep.value = stepNumber
}

function goToNextStep() {
  if (currentStep.value >= TOTAL_STEPS) return

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

.wizard-content {
  padding: 24px 0 0;
}

.wizard-content__header {
  margin-bottom: 20px;
}

.wizard-content__step {
  display: block;
  margin-bottom: 4px;
  color: $color-primary;
  font-size: 12px;
  font-weight: 600;
}

.wizard-content__title {
  margin: 0 0 6px;
  color: #111;
  font-size: 20px;
  font-weight: 700;
}

.wizard-content__description {
  margin: 0;
  color: #666;
  font-size: 13px;
}

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

.wizard-placeholder h3 {
  margin: 0 0 8px;
  color: #222;
  font-size: 18px;
}

.wizard-placeholder p {
  margin: 0 0 6px;
  color: #666;
  font-size: 13px;
}

.wizard-placeholder__completed {
  color: $color-primary !important;
  font-weight: 600;
}

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

@media (max-width: 900px) {
  .plan-create-page {
    padding: 16px;
  }

  .plan-create-header__title {
    font-size: 19px;
  }

  .wizard-content {
    padding-top: 18px;
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