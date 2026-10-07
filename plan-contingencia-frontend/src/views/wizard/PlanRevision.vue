<template>
  <section class="plan-revision">
    <div class="section-header">
      <h2>Resumen del plan</h2>
    </div>

    <div class="summary-grid">
      <article class="summary-card">
        <h3>Información general</h3>

        <div class="summary-data">
          <div>
            <span>Programa:</span>
            <strong>{{ generalSummary.programa }}</strong>
          </div>

          <div>
            <span>Fecha salida:</span>
            <strong>{{ generalSummary.fecha }}</strong>
          </div>

          <div>
            <span>Transporte:</span>
            <strong>{{ generalSummary.transporte }}</strong>
          </div>

          <div>
            <span>Lugar:</span>
            <strong>{{ generalSummary.lugar }}</strong>
          </div>
        </div>

        <q-btn
          unelevated
          no-caps
          label="Ver detalles"
          class="summary-card__button"
          @click="goToStep(1)"
        />
      </article>

      <article class="summary-card">
        <h3>Contexto académico</h3>

        <div class="summary-checks">
          <div>
            <span>Competencias:</span>

            <q-checkbox
              class="summary-checkbox"
              :model-value="hasValue(plan.contextoAcademico.competencia)"
              disable
              size="sm"
              dense
            />
          </div>

          <div>
            <span>Resultado de aprendizaje:</span>

            <q-checkbox
              class="summary-checkbox"
              :model-value="hasValue(plan.contextoAcademico.resultadoAprendizaje)"
              disable
              size="sm"
              dense
            />
          </div>

          <div>
            <span>Objetivo:</span>

            <q-checkbox
              class="summary-checkbox"
              :model-value="hasValue(plan.contextoAcademico.objetivo)"
              disable
              size="sm"
              dense
            />
          </div>
        </div>

        <q-btn
          unelevated
          no-caps
          label="Ver detalles"
          class="summary-card__button"
          @click="goToStep(2)"
        />
      </article>

      <article class="summary-card">
        <h3>Plan de trabajo</h3>

        <div class="summary-data">
          <div>
            <span>Actividades:</span>
            <strong>{{ plan.planTrabajo.length }}</strong>
          </div>

          <div>
            <span>Hora salida:</span>
            <strong>{{ formatTime(plan.horaSalida) }}</strong>
          </div>

          <div>
            <span>Hora regreso:</span>
            <strong>{{ formatTime(plan.horaRegreso) }}</strong>
          </div>
        </div>

        <q-btn
          unelevated
          no-caps
          label="Ver detalles"
          class="summary-card__button"
          @click="goToStep(3)"
        />
      </article>

      <article class="summary-card">
        <h3>Participantes</h3>

        <div class="summary-data">
          <div>
            <span>Aprendices:</span>
            <strong>{{ participantsSummary.aprendices }}</strong>
          </div>

          <div>
            <span>Ficha:</span>
            <strong>{{ participantsSummary.ficha }}</strong>
          </div>
        </div>

        <q-btn
          unelevated
          no-caps
          label="Ver detalles"
          class="summary-card__button"
          @click="goToStep(4)"
        />
      </article>

      <article class="summary-card">
        <h3>Riesgos</h3>

        <div class="summary-data">
          <div>
            <span>Riesgos seleccionados:</span>
            <strong>{{ riskSummary.total }}</strong>
          </div>

          <div>
            <span>Nivel alto:</span>
            <strong>{{ riskSummary.alto }}</strong>
          </div>

          <div>
            <span>Nivel medio:</span>
            <strong>{{ riskSummary.medio }}</strong>
          </div>

          <div>
            <span>Nivel bajo:</span>
            <strong>{{ riskSummary.bajo }}</strong>
          </div>
        </div>

        <q-btn
          unelevated
          no-caps
          label="Ver detalles"
          class="summary-card__button"
          @click="goToStep(5)"
        />
      </article>

      <article class="summary-card">
        <h3>Seguridad</h3>

        <div class="summary-data">
          <div>
            <span>EPP seleccionados:</span>
            <strong>{{ plan.epp.length }}</strong>
          </div>

          <div>
            <span>Contactos de emergencia:</span>
            <strong>{{ emergencyContactsCount }}</strong>
          </div>

          <div>
            <span>Seguridad vial:</span>
            <strong>{{ roadSafetySummary }}</strong>
          </div>
        </div>

        <q-btn
          unelevated
          no-caps
          label="Ver detalles"
          class="summary-card__button"
          @click="goToStep(6)"
        />
      </article>
    </div>

    <div class="validation-box">
      <q-checkbox v-model="plan.revision.validacionInformacion" size="sm" dense />

      <div>
        <strong>VALIDAR LA INFORMACIÓN</strong>

        <p>
          Confirme que ha revisado y verificado que toda la información registrada en el plan es
          correcta y cumple con los requisitos institucionales.
        </p>
      </div>
    </div>

    <div class="revision-grid">
      <div class="observations-section">
        <div class="subsection-title">
          <strong>OBSERVACIONES</strong>

          <span>
            Registre aquí aspectos relevantes que no están cubiertos en otras secciones del plan.
          </span>
        </div>

        <BaseTextarea
          v-model="plan.observaciones"
          placeholder="Escribe sus observaciones aquí..."
          maxlength="500"
          counter
          size="wizard"
        />
      </div>

      <div class="responsibles-section">
        <div class="subsection-title">
          <strong>RESPONSABLES Y FIRMAS</strong>

          <span> Confirma la información de los responsables que revisan y aprueban el plan. </span>
        </div>

        <div class="responsibles-grid">
          <div class="responsible">
            <label>Instructor responsable</label>

            <BaseInput :model-value="instructorName" readonly size="wizard" />

            <div class="signature">
              <img
                v-if="instructorSignature"
                :src="instructorSignature"
                alt="Firma del instructor"
              />

              <span v-else>Sin firma registrada</span>
            </div>
          </div>

          <div class="responsible">
            <label>Responsable Pedagogía</label>

            <BaseSelect
              v-model="selectedReviewers.pedagogia"
              :options="pedagogiaOptions"
              option-label="label"
              option-value="value"
              size="wizard"
              @update:model-value="(value) => updateReviewer('pedagogia', value)"
            />

            <div class="signature">
              <img v-if="pedagogiaSignature" :src="pedagogiaSignature" alt="Firma de Pedagogía" />

              <span v-else>Seleccione responsable</span>
            </div>
          </div>

          <div class="responsible">
            <label>Responsable SST</label>

            <BaseSelect
              v-model="selectedReviewers.sst"
              :options="sstOptions"
              option-label="label"
              option-value="value"
              size="wizard"
              @update:model-value="(value) => updateReviewer('sst', value)"
            />

            <div class="signature">
              <img v-if="sstSignature" :src="sstSignature" alt="Firma de SST" />

              <span v-else>Seleccione responsable</span>
            </div>
          </div>

          <div class="responsible">
            <label>Coordinador académico</label>

            <BaseSelect
              v-model="selectedReviewers.coordinacion"
              :options="coordinacionOptions"
              option-label="label"
              option-value="value"
              size="wizard"
              @update:model-value="(value) => updateReviewer('coordinacion', value)"
            />

            <div class="signature">
              <img
                v-if="coordinacionSignature"
                :src="coordinacionSignature"
                alt="Firma de Coordinación"
              />

              <span v-else>Seleccione responsable</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed, onMounted, reactive, ref, watchEffect } from 'vue'

import { normalizeAdditionalContacts } from 'src/utils/contacts.utils'
import { notifyError } from 'src/utils/notifications.utils'
import { useAuthStore } from 'src/stores/auth.store'
import { SECURITY_VIAL_ITEMS } from 'src/constants/system/security.constants'

import { ACTIVIDADES_MOCK } from 'src/mocks/modules/actividades.mock'

import BaseInput from 'src/components/forms/BaseInput.vue'
import BaseSelect from 'src/components/forms/BaseSelect.vue'
import BaseTextarea from 'src/components/forms/BaseTextarea.vue'

import riesgoService from 'src/services/modules/riesgoService'
import usuarioService from 'src/services/modules/usuarioService'

const props = defineProps({
  modelValue: {
    type: Object,
    required: true,
  },
})

const emit = defineEmits(['update:modelValue', 'go-to-step'])

const authStore = useAuthStore()

const plan = props.modelValue

const currentUser = computed(() => {
  return authStore.currentUser
})

const instructorName = computed(() => {
  const fullName = [currentUser.value?.nombre, currentUser.value?.apellido]
    .filter(Boolean)
    .join(' ')

  return fullName || plan.usuarioNombre || '—'
})

const instructorSignature = computed(() => {
  return currentUser.value?.firma || null
})

onMounted(async () => {
  try {
    await authStore.refreshCurrentUser()
  } catch {
    notifyError('Error al cargar la firma del instructor')
  }
})

watchEffect(() => {
  if (!currentUser.value) {
    return
  }

  plan.revision.usuario = {
    usuarioId: currentUser.value._id,
    nombre: instructorName.value,
    firma: currentUser.value.firma || null,
  }
})

const generalSummary = computed(() => {
  const actividad = ACTIVIDADES_MOCK.find((item) => item._id === plan.actividadId)

  return {
    programa: plan.programaFormacionNombre || '—',

    fecha: plan.fecha || '00/00/0000',

    transporte: plan.tipoTransporte || '—',

    lugar: plan.lugarDestino || '—',

    actividad: actividad?.nombre || '—',
  }
})

const participantsSummary = computed(() => {
  return {
    aprendices: plan.aprendicesId.length,
    ficha: plan.ficha || '—',
  }
})

const riskCatalog = ref([])

async function loadRisks() {
  try {
    riskCatalog.value = await riesgoService.getRiesgos()
  } catch {
    notifyError('Error al cargar los riesgos')
  }
}

onMounted(loadRisks)

const selectedRisks = computed(() => {
  return riskCatalog.value.filter((riesgo) => plan.riesgosId.includes(riesgo._id))
})

function countRisksByLevel(level) {
  return selectedRisks.value.filter(
    (riesgo) => String(riesgo.nivel ?? riesgo.nivelRiesgo ?? '').toUpperCase() === level,
  ).length
}

const riskSummary = computed(() => {
  return {
    total: plan.riesgosId.length,

    alto: countRisksByLevel('ALTO'),

    medio: countRisksByLevel('MEDIO'),

    bajo: countRisksByLevel('BAJO'),
  }
})

const roadSafetySummary = computed(() => {
  if (!plan.seguridadVial?.aplica) {
    return 'No aplica'
  }

  const cumplen = plan.seguridadVial.items.filter((item) => item.cumple === true).length

  return `${cumplen}/${SECURITY_VIAL_ITEMS.length} cumplen`
})

const emergencyContactsCount = computed(() => {
  const baseCount = plan.contactosEmergencia?.contactosBase?.length || 0

  const otros = normalizeAdditionalContacts(plan.contactosEmergencia?.otro)

  return baseCount + otros.length
})

const reviewersByRole = ref({
  pedagogia: [],
  sst: [],
  coordinacion: [],
})

async function loadReviewers() {
  try {
    reviewersByRole.value = await usuarioService.getRevisores()
  } catch {
    notifyError('Error al cargar los responsables de revisión')
  }
}

onMounted(loadReviewers)

function findReviewer(role, userId) {
  return reviewersByRole.value[role]?.find((usuario) => usuario._id === userId) ?? null
}

function getUsersByRole(role) {
  return (reviewersByRole.value[role] ?? []).map((usuario) => ({
    label: usuario.nombreCompleto || usuario.nombre,
    value: usuario._id,
  }))
}

const pedagogiaOptions = computed(() => getUsersByRole('pedagogia'))

const sstOptions = computed(() => getUsersByRole('sst'))

const coordinacionOptions = computed(() => getUsersByRole('coordinacion'))

const selectedReviewers = reactive({
  pedagogia: plan.revision?.pedagogia?.usuarioId || null,

  sst: plan.revision?.sst?.usuarioId || null,

  coordinacion: plan.revision?.coordinacion?.usuarioId || null,
})

function updateReviewer(role, userId) {
  const user = findReviewer(role, userId)

  if (!user) {
    return
  }

  plan.revision[role] = {
    ...plan.revision[role],
    usuarioId: user._id,
    nombre: user.nombreCompleto || user.nombre,
    firma: user.firma || null,
  }

  emit('update:modelValue', plan)
}

const pedagogiaSignature = computed(() => {
  return getReviewerSignature('pedagogia', selectedReviewers.pedagogia)
})

const sstSignature = computed(() => {
  return getReviewerSignature('sst', selectedReviewers.sst)
})

const coordinacionSignature = computed(() => {
  return getReviewerSignature('coordinacion', selectedReviewers.coordinacion)
})

function getReviewerSignature(role, userId) {
  if (!userId) {
    return null
  }

  return findReviewer(role, userId)?.firma || null
}

function goToStep(step) {
  emit('go-to-step', step)
}

function hasValue(value) {
  return Boolean(String(value ?? '').trim())
}

function formatTime(value) {
  return value || '00:00 a. m.'
}

function validate() {
  return (
    plan.revision.validacionInformacion === true &&
    Boolean(instructorSignature.value) &&
    Boolean(pedagogiaSignature.value) &&
    Boolean(sstSignature.value) &&
    Boolean(coordinacionSignature.value)
  )
}

defineExpose({
  validate,
})
</script>

<style scoped lang="scss">
@use 'src/css/variables.scss' as *;
@use 'src/css/typography.scss' as *;
@use 'src/css/mixins.scss' as *;

.plan-revision {
  width: 100%;
}

.section-header {
  margin-bottom: $spacing-sm;

  h2 {
    margin: 0;
    font-size: $font-size-2xl;
    font-weight: $font-weight-bold;
    margin: 0 0 22px;
  }
}

.summary-grid {
  display: grid;
  grid-template-columns: repeat(6, minmax(0, 1fr));
  gap: $spacing-md;
}

.summary-card {
  @include card;
  min-height: 165px;
  display: flex;
  flex-direction: column;
  padding: $spacing-md;
  border: 1px solid $color-border;
  border-radius: $radius-md;
}

.summary-card h3 {
  margin: 0 0 $spacing-sm;
  color: $color-primary;
  font-size: $font-size-sm;
  font-weight: 500;
}

.summary-data,
.summary-checks {
  @include flex-column;
  flex: 1;
  gap: 5px;
}

.summary-data div,
.summary-checks div {
  @include flex-between;
  gap: 0;
  font-size: $font-size-xs;
}

.summary-data span,
.summary-checks span {
  color: $color-text-primary;
  font-weight: 400;
}

.summary-data strong {
  font-weight: 300;
  text-align: right;
}

.summary-checks :deep(.summary-checkbox.disabled) {
  opacity: 1;
}

.summary-card__button {
  align-self: center;
  width: 100%;
  max-width: 170px;
  min-height: 30px;
  height: 30px;
  margin-top: $spacing-md;
  border-radius: $radius-md;
  background: $color-primary;
  color: $color-surface;
  font-size: $font-size-md;
  font-weight: 400;
  letter-spacing: 1.4;
}

.validation-box {
  display: flex;
  align-items: center;
  gap: 12px;
  width: 100%;
  min-height: 52px;
  margin: 20px 0 20px 0;
  padding: 10px 14px;
  border-radius: 5px;
  background-color: $color-background-field;
  color: $color-text-secondary;
  font-size: $font-size-xs;
  line-height: 1.4;
  box-sizing: border-box;
}

.validation-box strong {
  display: block;
  color: $color-primary;
  // font-size: 0.71rem;
}

.validation-box p {
  color: $color-text-secondary;
  font-size: $font-size-xs;
  line-height: $line-height-normal;
}

.revision-grid {
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: $spacing-md;
  margin-top: $spacing-sm;
}

.subsection-title {
  @include flex-column;
  gap: 3px;
  margin-bottom: $spacing-sm;
}

.subsection-title strong {
  color: $color-text-primary;
  font-size: $font-size-md;
}

.subsection-title span {
  color: $color-text-secondary;
  font-size: $font-size-xs;
  line-height: $line-height-normal;
}

.responsibles-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: $spacing-sm;
}

.observations-section :deep(.base-textarea .q-field__control) {
  min-height: 129px !important;
}

.observations-section :deep(.base-textarea .q-field__native) {
  min-height: 129px !important;
}

.responsible {
  @include flex-column;
  gap: $spacing-xs;
}

.responsible label {
  color: $color-primary;
  font-size: $font-size-xs;
  font-weight: 500;
}

.signature {
  @include flex-center;
  height: 70px;
  border: 1px solid $color-border;
  border-radius: $radius-sm;
  background: $color-surface;
  overflow: hidden;
}

.signature img {
  max-width: 90%;
  max-height: 42px;
  object-fit: contain;
}

.signature span {
  color: $color-text-secondary;
  font-size: $font-size-xs;
}

@media (max-width: 1200px) {
  .summary-grid {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

  .revision-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 1000px) {
  .summary-grid {
    grid-template-columns: 1fr 1fr;
  }

  .responsibles-grid {
    grid-template-columns: 1fr 1fr;
  }
}

@media (max-width: 600px) {
  .summary-grid {
    grid-template-columns: 1fr;
  }

  .responsibles-grid {
    grid-template-columns: 1fr;
  }
}
</style>
