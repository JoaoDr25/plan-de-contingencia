<template>
  <BasePage class="plan-create-page">
    <div v-if="loadingPlan" class="plan-create-state">
      <q-spinner color="primary" size="40px" />
      <span>Cargando borrador...</span>
    </div>

    <q-banner v-else-if="planLoadError" class="bg-red-1 text-negative" rounded>
      No se pudo cargar el borrador del plan.
      <template #action>
        <q-btn flat label="Volver" @click="handleCancel" />
      </template>
    </q-banner>

    <template v-else>
      <header class="plan-create-header">
        <CrudHeader :title="planId ? 'Editar Plan de Contingencia' : 'Crear Plan de Contingencia'"
          :uppercase-title="true" />
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
          <SecondaryActionButton v-if="currentStep > 1" class="wizard-actions__button" label="Anterior"
            icon="arrow_back" size="sm" @click="goToPreviousStep" />

          <PrimaryActionButton v-if="currentStep < TOTAL_STEPS" class="wizard-actions__button" label="Siguiente"
            size="sm" @click="goToNextStep" />

          <PrimaryActionButton v-else class="wizard-actions__button" label="Generar Plan" size="sm"
            :disable="!canGeneratePlan" @click="showGenerateConfirmation = true" />
        </div>
      </footer>

      <BaseConfirmationDialog v-model="showGenerateConfirmation" title="Generar plan de contingencia"
        confirm-label="Generar" cancel-label="Cancelar" variant="primary" @confirm="generatePlan" />
    </template>
  </BasePage>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
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
import { notifySuccess, notifyError } from 'src/utils/notifications.utils'
import { PLAN_WIZARD_STEPS } from 'src/constants/plans/planWizard.js'
// import { PLANES_MOCK } from 'src/mocks/plans/planes.mock.js'

import planContingenciaService from 'src/services/plans/planContingenciaService.js'

const router = useRouter()
const route = useRoute()
const authStore = useAuthStore()
const {
  createPlan: crearPlan,
  generarPlan: enviarARevision,
  asociarAprendices,
  asociarRiesgos,
  guardarContactosEmergencia,
  seleccionarEpp,
  registrarSeguridadVial,
  registrarContextoAcademico,
  registrarArticulacionFormativa,
  registrarPlanTrabajo,
  registrarRevision,
} = planContingenciaService

const TOTAL_STEPS = PLAN_WIZARD_STEPS.length

const currentStep = ref(1)
const completedSteps = ref([])
const planId = ref(null)
const savedAprendicesId = ref([])
const loadingPlan = ref(Boolean(route.params.id))
const planLoadError = ref(false)

const planForm = ref(createPlanContingenciaModel())

if (authStore.currentUser) {
  planForm.value.usuarioId = authStore.currentUser._id
  planForm.value.usuarioNombre = [authStore.currentUser.nombre, authStore.currentUser.apellido]
    .filter(Boolean)
    .join(' ')
}

const wizardFormRef = ref(null)
const currentStepRef = ref(null)
const showGenerateConfirmation = ref(false)

function referenceId(value) {
  if (value && typeof value === 'object') {
    return value._id ?? value.id ?? null
  }

  return value ?? null
}

function normalizePlanForForm(plan) {
  const defaults = createPlanContingenciaModel()
  const programa =
    plan.programaFormacionId && typeof plan.programaFormacionId === 'object'
      ? plan.programaFormacionId
      : null
  const contactosEmergencia = plan.contactosEmergencia ?? {}
  const revision = plan.revision ?? {}

  return {
    ...defaults,
    ...plan,
    programaFormacionId: referenceId(plan.programaFormacionId),
    programaFormacionNombre: plan.programaFormacionNombre ?? programa?.nombre ?? '',
    programaFormacionNivel:
      plan.programaFormacionNivel ?? programa?.nivel ?? programa?.nivelFormacion ?? '',
    ficha: plan.ficha ?? programa?.ficha ?? '',
    actividadId: referenceId(plan.actividadId),
    usuarioId: referenceId(plan.usuarioId),
    fecha: plan.fecha ? String(plan.fecha).slice(0, 10) : null,
    aprendicesId: (plan.aprendicesId ?? []).map(referenceId),
    riesgosId: (plan.riesgosId ?? []).map(referenceId),
    epp: (plan.epp ?? []).map(referenceId),
    contactosEmergencia: {
      ...defaults.contactosEmergencia,
      ...contactosEmergencia,
      contactosBase: (contactosEmergencia.contactosBase ?? []).map(referenceId),
      otro: {
        ...defaults.contactosEmergencia.otro,
        ...contactosEmergencia.otro,
      },
    },
    articulacionFormativa: {
      ...defaults.articulacionFormativa,
      ...plan.articulacionFormativa,
    },
    contextoAcademico: {
      ...defaults.contextoAcademico,
      ...plan.contextoAcademico,
    },
    planTrabajo: plan.planTrabajo ?? defaults.planTrabajo,
    seguridadVial: {
      ...defaults.seguridadVial,
      ...plan.seguridadVial,
    },
    revision: {
      ...defaults.revision,
      ...revision,
      usuario: { ...defaults.revision.usuario, ...revision.usuario },
      pedagogia: { ...defaults.revision.pedagogia, ...revision.pedagogia },
      sst: { ...defaults.revision.sst, ...revision.sst },
      coordinacion: { ...defaults.revision.coordinacion, ...revision.coordinacion },
    },
  }
}

onMounted(async () => {
  const id = route.params.id
  if (!id) return

  loadingPlan.value = true

  try {
    const existingPlan = await planContingenciaService.getPlanById(id)
    planId.value = existingPlan._id ?? id
    const normalizedPlan = normalizePlanForForm(existingPlan)
    Object.assign(planForm.value, normalizedPlan)
    savedAprendicesId.value = [...normalizedPlan.aprendicesId]
    completedSteps.value = [1]
  } catch (error) {
    planLoadError.value = true
    notifyError(error)
  } finally {
    loadingPlan.value = false
  }
})

const canGeneratePlan = computed(() => {
  const requiredStepsCompleted = [1, 2, 3, 4, 5, 6].every((step) =>
    completedSteps.value.includes(step),
  )
  const revision = planForm.value.revision

  return (
    currentStep.value === TOTAL_STEPS &&
    requiredStepsCompleted &&
    revision.validacionInformacion === true &&
    Boolean(revision.usuario?.firma) &&
    Boolean(revision.pedagogia?.firma) &&
    Boolean(revision.sst?.firma) &&
    Boolean(revision.coordinacion?.firma)
  )
})

function handleStepNavigation(stepNumber) {
  if (stepNumber === currentStep.value) return

  const previousStep = currentStep.value

  const canNavigate =
    stepNumber < currentStep.value ||
    completedSteps.value.includes(stepNumber) ||
    (stepNumber === currentStep.value + 1 && completedSteps.value.includes(currentStep.value))

  if (!canNavigate) return

  currentStep.value = stepNumber
  if (stepNumber < previousStep) {
    completedSteps.value = completedSteps.value.filter((step) => step < stepNumber)
  }
}

async function goToNextStep() {
  if (currentStep.value >= TOTAL_STEPS) return

  const formIsValid = await wizardFormRef.value?.validate()

  const stepsWithCustomValidation = [2, 3, 4, 5, 6, 7]

  const stepValidator = currentStepRef.value?.validate

  const stepIsValid = stepsWithCustomValidation.includes(currentStep.value)
    ? typeof stepValidator === 'function' && stepValidator() === true
    : true

  if (!formIsValid || !stepIsValid) {
    return
  }
  const saved = await saveCurrentStep()

  if (!saved) {
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
  completedSteps.value = completedSteps.value.filter((step) => step < currentStep.value)
}

async function saveCurrentStep() {
  switch (currentStep.value) {
    case 1:
      return await saveStep1()

    case 2:
      return await saveStep2()

    case 3:
      return await saveStep3()

    case 4:
      return await saveStep4()

    case 5:
      return await saveStep5()

    case 6:
      return await saveStep6()

    case 7:
      return await saveStep7()

    default:
      return true
  }
}

async function saveStep1() {
  try {
    const createdPlan = planId.value
      ? await planContingenciaService.updatePlan(planId.value, planForm.value)
      : await crearPlan(planForm.value)

    planId.value = createdPlan._id

    Object.assign(planForm.value, normalizePlanForForm(createdPlan))
    return true
  } catch (error) {
    notifyError(error)
    return false
  }
}

async function saveStep2() {
  if (!planId.value) return false

  try {
    await registrarContextoAcademico(
      planId.value,
      planForm.value.contextoAcademico,
    )

    await registrarArticulacionFormativa(
      planId.value,
      planForm.value.articulacionFormativa,
    )
    return true
  } catch (error) {
    notifyError(error)
    return false
  }
}

async function saveStep3() {
  if (!planId.value) return false

  try {
    await registrarPlanTrabajo(planId.value, {
      planTrabajo: planForm.value.planTrabajo,
    })

    return true
  } catch (error) {
    notifyError(error)
    return false
  }
}

async function saveStep4() {
  if (!planId.value) return false

  const selectedIds = planForm.value.aprendicesId.map(String)
  const savedIds = new Set(savedAprendicesId.value.map(String))
  const selectionUnchanged =
    selectedIds.length === savedIds.size && selectedIds.every((id) => savedIds.has(id))

  if (selectionUnchanged) return true

  try {
    await asociarAprendices(planId.value, selectedIds)
    savedAprendicesId.value = selectedIds
    return true
  } catch (error) {
    notifyError(error)
    return false
  }
}

async function saveStep5() {
  if (!planId.value) return false

  try {
    await asociarRiesgos(
      planId.value,
      planForm.value.riesgosId,
    )
    return true
  } catch (error) {
    notifyError(error)
    return false
  }
}

async function saveStep6() {
  if (!planId.value) return false

  try {
    await seleccionarEpp(
      planId.value,
      planForm.value.epp,
    )

    await registrarSeguridadVial(
      planId.value,
      planForm.value.seguridadVial,
    )

    await guardarContactosEmergencia(
      planId.value,
      planForm.value.contactosEmergencia,
    )
    return true
  } catch (error) {
    notifyError(error)
    return false
  }
}

async function saveStep7() {
  if (!planId.value) return false

  try {
    await registrarRevision(
      planId.value,
      planForm.value.revision,
    )
    return true
  } catch (error) {
    notifyError(error)
    return false
  }
}

async function generatePlan() {
  showGenerateConfirmation.value = false

  if (!canGeneratePlan.value || !planId.value) {
    return
  }

  try {
    const revisionSaved = await saveStep7()

    if (!revisionSaved) {
      return
    }
    await enviarARevision(planId.value)

    notifySuccess('Plan generado correctamente')

    router.push({
      name: 'planes.stage',
      params: {
        id: planId.value,
      },
    })
  } catch (error) {
    console.error('Error al generar el plan:', error)
  }
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

.plan-create-state {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  min-height: 240px;
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
