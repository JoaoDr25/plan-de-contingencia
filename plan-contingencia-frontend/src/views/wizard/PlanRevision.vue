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
          label="Ver detalle"
          class="summary-card__button"
          @click="goToStep(1)"
        />

      </article>

      <article class="summary-card">

        <h3>Contexto académico</h3>

        <div class="summary-checks">

          <div>

            <span>Competencias:</span>

            <q-icon
              :name="
                hasValue(plan.contextoAcademico.competencia)
                  ? 'check_circle'
                  : 'radio_button_unchecked'
              "
              :class="{
                'is-complete': hasValue(
                  plan.contextoAcademico.competencia,
                ),
              }"
            />

          </div>

          <div>

            <span>Resultado de aprendizaje:</span>

            <q-icon
              :name="
                hasValue(plan.contextoAcademico.resultadoAprendizaje)
                  ? 'check_circle'
                  : 'radio_button_unchecked'
              "
              :class="{
                'is-complete': hasValue(
                  plan.contextoAcademico.resultadoAprendizaje,
                ),
              }"
            />
          </div>

          <div>

            <span>Objetivo:</span>

            <q-icon
              :name="
                hasValue(plan.contextoAcademico.objetivo)
                  ? 'check_circle'
                  : 'radio_button_unchecked'
              "
              :class="{
                'is-complete': hasValue(
                  plan.contextoAcademico.objetivo,
                ),
              }"
            />

          </div>

        </div>

        <q-btn
          unelevated
          no-caps
          label="Ver detalle"
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
          label="Ver detalle"
          class="summary-card__button"
          @click="goToStep(3)"
        />

      </article>

      <article class="summary-card">

        <h3>Participantes</h3>

        <div class="summary-data">

          <div>
            <span>Aprendices:</span>
            <strong>{{ plan.aprendicesId.length }}</strong>
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
          label="Ver detalle"
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
          label="Ver detalle"
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
            <span>Seguridad vial:</span>
            <strong>{{ roadSafetySummary }}</strong>
          </div>

        </div>

        <q-btn
          unelevated
          no-caps
          label="Ver detalle"
          class="summary-card__button"
          @click="goToStep(6)"
        />

      </article>

    </div>

    <div class="validation-box">

      <q-checkbox
        v-model="plan.revision.validacionInformacion"
      />

      <div>

        <strong>VALIDAR LA INFORMACIÓN</strong>

        <p>
          Confirme que ha revisado y verificado que toda la
          información registrada en el plan es correcta y cumple
          con los requisitos institucionales.
        </p>

      </div>

    </div>

    <div class="revision-grid">

      <div class="observations-section">

        <div class="subsection-title">

          <strong>OBSERVACIONES</strong>

          <span>
            Registre aquí aspectos relevantes que no están cubiertos
            en otras secciones del plan.
          </span>

        </div>

        <BaseTextarea
          v-model="plan.observaciones"
          placeholder="Escribe sus observaciones aquí..."
          maxlength="1000"
          size="wizard"
        />

      </div>

      <div class="responsibles-section">

        <div class="subsection-title">

          <strong>RESPONSABLES Y FIRMAS</strong>

          <span>
            Confirma la información de los responsables que revisan
            y aprueban el plan.
          </span>

        </div>

        <div class="responsibles-grid">

          <div class="responsible">
            <label>Instructor responsable</label>

            <BaseInput
              :model-value="instructorName"
              readonly
              size="wizard"
            />

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
              <img
                v-if="pedagogiaSignature"
                :src="pedagogiaSignature"
                alt="Firma de Pedagogía"
              />

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

              <img
                v-if="sstSignature"
                :src="sstSignature"
                alt="Firma de SST"
              />

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

import { computed, reactive } from 'vue'

import BaseInput from 'src/components/forms/BaseInput.vue'
import BaseSelect from 'src/components/forms/BaseSelect.vue'
import BaseTextarea from 'src/components/forms/BaseTextarea.vue'

import { ACTIVIDADES_MOCK } from 'src/mocks/modules/actividades.mock'
import { RIESGOS_MOCK } from 'src/mocks/modules/riesgos.mock'
import { USUARIOS_MOCK } from 'src/mocks/modules/usuarios.mock'

import { ROLES } from 'src/constants/system/roles.constants'
import { SECURITY_VIAL_ITEMS } from 'src/constants/system/security.constants'

import { useAuthStore } from 'src/stores/auth.store'

const props = defineProps({
  modelValue: {
    type: Object,
    required: true,
  },
})

const emit = defineEmits([
  'update:modelValue',
  'go-to-step',
])

const authStore = useAuthStore()

const plan = props.modelValue

const currentUser = computed(() => {
  return authStore.currentUser
})

const instructorName = computed(() => {
  return currentUser.value?.nombre || plan.usuarioNombre || '—'
})

const instructorSignature = computed(() => {
  return (
    currentUser.value?.firma ||
    plan.revision?.instructor?.firma ||
    null
  )
})

const generalSummary = computed(() => {
  const actividad = ACTIVIDADES_MOCK.find(
    (item) => item._id === plan.actividadId,
  )

  return {
    programa:
      plan.programaFormacionNombre || '—',

    fecha:
      plan.fecha || '00/00/0000',

    transporte:
      plan.tipoTransporte || '—',

    lugar:
      plan.lugarDestino || '—',

    actividad:
      actividad?.nombre || '—',
  }
})

const selectedRisks = computed(() => {
  return RIESGOS_MOCK.filter((riesgo) =>
    plan.riesgosId.includes(riesgo._id),
  )
})

const riskSummary = computed(() => {
  return {
    total: selectedRisks.value.length,

    alto: selectedRisks.value.filter(
      (riesgo) => riesgo.nivel === 'Alto',
    ).length,

    medio: selectedRisks.value.filter(
      (riesgo) => riesgo.nivel === 'Medio',
    ).length,

    bajo: selectedRisks.value.filter(
      (riesgo) => riesgo.nivel === 'Bajo',
    ).length,
  }
})

const roadSafetySummary = computed(() => {
  const total = plan.seguridadVial.items.length

  if (!plan.seguridadVial.aplica) {
    return 'No aplica'
  }

  return `${total}/${SECURITY_VIAL_ITEMS.length} cumplen`
})

function getUsersByRole(role) {
  return USUARIOS_MOCK
    .filter(
      (usuario) =>
        usuario.rol === role &&
        usuario.estado === 'Activo',
    )
    .map((usuario) => ({
      label: usuario.nombre,
      value: usuario._id,
    }))
}

const pedagogiaOptions = computed(() =>
  getUsersByRole(ROLES.PEDAGOGIA),
)

const sstOptions = computed(() =>
  getUsersByRole(ROLES.SST),
)

const coordinacionOptions = computed(() =>
  getUsersByRole(ROLES.COORDINACION),
)

const selectedReviewers = reactive({
  pedagogia:
    plan.revision?.pedagogia?.usuarioId || null,

  sst:
    plan.revision?.sst?.usuarioId || null,

  coordinacion:
    plan.revision?.coordinacion?.usuarioId || null,
})

function updateReviewer(role, userId) {
  const user = USUARIOS_MOCK.find(
    (usuario) => usuario._id === userId,
  )

  if (!user) {
    return
  }

  plan.revision[role] = {
    ...plan.revision[role],
    usuarioId: user._id,
    nombre: user.nombre,
    firma: user.firma || null,
  }

  emit('update:modelValue', plan)
}

const pedagogiaSignature = computed(() => {
  return getReviewerSignature(
    selectedReviewers.pedagogia,
    ROLES.PEDAGOGIA,
  )
})

const sstSignature = computed(() => {
  return getReviewerSignature(
    selectedReviewers.sst,
    ROLES.SST,
  )
})

const coordinacionSignature = computed(() => {
  return getReviewerSignature(
    selectedReviewers.coordinacion,
    ROLES.COORDINACION,
  )
})

function getReviewerSignature(userId) {
  if (!userId) {
    return null
  }

  const user = USUARIOS_MOCK.find(
    (usuario) => usuario._id === userId,
  )

  return user?.firma || null
}

function goToStep(step) {
  emit('go-to-step', step)
}

function hasValue(value) {
  return Boolean(
    String(value ?? '').trim(),
  )
}

function formatTime(value) {
  return value || '00:00 a. m.'
}

function validate() {
  return plan.revision.validacionInformacion === true
}

defineExpose({
  validate,
})
</script>

<style scoped lang="scss">

.plan-revision {
  width: 100%;
}

.section-header {
  margin-bottom: 10px;

  h2 {
    margin: 0;
    font-size: 18px;
    font-weight: 700;
  }
}

.summary-grid {
  display: grid;
  grid-template-columns: repeat(6, minmax(0, 1fr));
  gap: 8px;
}

.summary-card {
  min-height: 135px;
  display: flex;
  flex-direction: column;
  padding: 10px;
  border: 1px solid #d8d8d8;
  border-radius: 4px;
  background: #fff;
  box-shadow: 0 1px 3px rgb(0 0 0 / 12%);
}

.summary-card h3 {
  margin: 0 0 10px;
  color: $primary;
  font-size: 10px;
  font-weight: 700;
}

.summary-data,
.summary-checks {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.summary-data div,
.summary-checks div {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 4px;
  font-size: 8px;
}

.summary-data span,
.summary-checks span {
  color: #222;
}

.summary-data strong {
  font-weight: 500;
  text-align: right;
}

.summary-checks q-icon {
  font-size: 13px;
  color: #b5b5b5;
}

.summary-checks q-icon.is-complete {
  color: $primary;
}

.summary-card__button {
  width: 100%;
  min-height: 24px;
  margin-top: 8px;
  background: $primary;
  color: white;
  font-size: 9px;
}

.validation-box {
  display: flex;
  align-items: flex-start;
  gap: 8px;
  margin-top: 10px;
  padding: 8px 12px;
  border-radius: 5px;
  background: #edf5ef;
}

.validation-box strong {
  display: block;
  color: $primary;
  font-size: 9px;
}

.validation-box p {
  margin: 3px 0 0;

  font-size: 9px;
  line-height: 1.35;
}

.revision-grid {
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 14px;
  margin-top: 10px;
}

.subsection-title {
  display: flex;
  flex-direction: column;
  gap: 3px;
  margin-bottom: 7px;
}

.subsection-title strong {
  font-size: 10px;
}

.subsection-title span {
  font-size: 9px;
  line-height: 1.3;
}

.responsibles-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 8px;
}

.responsible {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.responsible label {
  color: $primary;
  font-size: 8px;
  font-weight: 600;
}

.signature {
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #e2e2e2;
  border-radius: 3px;
  background: #fff;
  overflow: hidden;
}

.signature img {
  max-width: 90%;
  max-height: 42px;
  object-fit: contain;
}

.signature span {
  color: #888;
  font-size: 8px;
}

@media (max-width: 1100px) {
  .summary-grid {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

  .revision-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 700px) {
  .summary-grid {
    grid-template-columns: 1fr 1fr;
  }

  .responsibles-grid {
    grid-template-columns: 1fr 1fr;
  }
}

@media (max-width: 500px) {
  .summary-grid {
    grid-template-columns: 1fr;
  }

  .responsibles-grid {
    grid-template-columns: 1fr;
  }
}
</style>