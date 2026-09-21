<template>

  <section class="plan-riesgos">

    <div class="section-header">

      <h2>Riesgos Asociados</h2>

    </div>

    <div class="plan-info">

      <div class="plan-info__item">

        <span>Actividad a realizar</span>

        <div class="plan-info__value">
          <!-- <q-icon name="event_note" /> -->
          <strong>{{ actividadNombre }}</strong>
        </div>

      </div>

      <div class="plan-info__item">

        <span>Lugar de salida</span>

        <div class="plan-info__value">
          <!-- <q-icon name="location_on" /> -->
          <strong>{{ plan.lugarSalida || '—' }}</strong>
        </div>

      </div>

      <div class="plan-info__item">

        <span>Lugar de destino</span>

        <div class="plan-info__value">
          <!-- <q-icon name="location_on" /> -->
          <strong>{{ plan.lugarDestino || '—' }}</strong>
        </div>

      </div>

    </div>

    <div class="risks-toolbar">

      <div class="risks-toolbar__actions">

        <q-btn class="risk-action-btn risk-action-btn--select" flat no-caps icon="check_box" label="Seleccionar todos" @click="selectAll" />

        <q-btn class="risk-action-btn" flat no-caps icon="clear_all" label="Limpiar selección" @click="clearSelection" />
      </div>

    </div>

    <div class="risk-grid">

      <BaseDataCard v-for="group in riskGroups" :key="group.peligro._id" class="risk-card" :title="group.peligro.nombre"
        :columns="riskCardColumns" :rows="group.riesgos" column-template="38% 52% 10%">

        <template #header-icon>

          <q-icon name="expand_more" size="20px" />

        </template>

        <template #body="{ rows, gridStyle }">

          <div v-for="riesgo in rows" :key="riesgo._id" class="risk-row" :style="gridStyle">

            <div class="risk-row__name">

              {{ riesgo.riesgo }}

            </div>

            <div
              class="risk-row__description"
              @mouseenter="onDescriptionHover"
              @mouseleave="onDescriptionLeave"
            >

              <span class="risk-row__description-text">
                {{ riesgo.descripcion }}
              </span>

            </div>

            <div class="risk-row__selection">

              <q-checkbox :model-value="isSelected(
                group.peligro._id,
                riesgo._id
              )
                " @update:model-value="
                  (value) =>
                    handleSelection(
                      group.peligro._id,
                      riesgo._id,
                      value
                    )
                " />

            </div>

          </div>

        </template>

        <template #empty>

          <div class="risk-empty">

            No hay riesgos asociados a este peligro.

          </div>

        </template>

      </BaseDataCard>

    </div>

    <div class="selection-summary">

      <strong>
        N.º de Riesgos Seleccionados:
        {{ selectedCount }}
      </strong>

    </div>

  </section>

</template>

<script setup>

import { computed, ref } from 'vue'

import { ACTIVIDADES_MOCK } from 'src/mocks/modules/actividades.mock'
import { PELIGROS_MOCK } from 'src/mocks/modules/peligros.mock'
import { RIESGOS_MOCK } from 'src/mocks/modules/riesgos.mock'
import { notifyWarning } from 'src/utils/notifications.utils'

import BaseDataCard from 'src/components/base/BaseDataCard.vue'

const props = defineProps({
  modelValue: {
    type: Object,
    required: true,
  },
})

const emit = defineEmits([
  'update:modelValue',
])

const plan = props.modelValue

if (!Array.isArray(plan.riesgosId)) {
  plan.riesgosId = []
}

const riskCardColumns = [
  {
    key: 'riesgo',
    label: 'RIESGO ASOCIADO',
  },
  {
    key: 'descripcion',
    label: 'DESCRIPCIÓN',
  },
  {
    key: 'selection',
    label: '',
  },
]

const selectedRiskRelations = ref(new Set())

function onDescriptionHover(event) {
  const container = event.currentTarget
  const textEl = container.querySelector('.risk-row__description-text')

  const overflow = textEl.scrollWidth - container.clientWidth

  if (overflow <= 0) {
    return
  }

  textEl.style.transitionDuration = `${Math.max(1, overflow / 40)}s`
  textEl.style.setProperty('--marquee-distance', `-${overflow}px`)
  textEl.classList.add('is-marquee')
}

function onDescriptionLeave(event) {
  const textEl = event.currentTarget.querySelector('.risk-row__description-text')

  textEl.classList.remove('is-marquee')
}

const actividadNombre = computed(() => {
  const actividad = ACTIVIDADES_MOCK.find(
    (item) => item._id === plan.actividadId,
  )

  return actividad?.nombre || '—'
})

const riskGroups = computed(() => {
  return PELIGROS_MOCK.map((peligro) => ({
    peligro,
    riesgos: RIESGOS_MOCK.filter(
      (riesgo) => {
        const peligroIds = Array.isArray(riesgo.peligroId)
          ? riesgo.peligroId
          : [riesgo.peligroId]

        return peligroIds.includes(peligro._id)
      },
    ),
  })).filter(
    (group) => group.riesgos.length > 0,
  )
})

function restoreSelectedRiskRelations() {
  const selectedIds = new Set(plan.riesgosId)
  const relations = new Set()

  riskGroups.value.forEach((group) => {
    group.riesgos.forEach((riesgo) => {
      if (selectedIds.has(riesgo._id)) {
        relations.add(getRelationKey(group.peligro._id, riesgo._id))
      }
    })
  })

  selectedRiskRelations.value = relations
}

restoreSelectedRiskRelations()

const selectedCount = computed(() => {
  return selectedRiskRelations.value.size
})

function getRelationKey(peligroId, riesgoId) {
  return `${peligroId}:${riesgoId}`
}

function isSelected(peligroId, riesgoId) {
  return selectedRiskRelations.value.has(
    getRelationKey(peligroId, riesgoId),
  )
}

function handleSelection(peligroId, riesgoId, selected) {
  const relationKey = getRelationKey(peligroId, riesgoId)

  if (selected) {
    selectedRiskRelations.value.add(relationKey)

    if (!plan.riesgosId.includes(riesgoId)) {
      plan.riesgosId.push(riesgoId)
    }
  } else {
    selectedRiskRelations.value.delete(relationKey)

    const isSelectedInAnotherDanger = Array.from(
      selectedRiskRelations.value,
    ).some((key) => key.endsWith(`:${riesgoId}`))

    const index = plan.riesgosId.indexOf(riesgoId)

    if (index !== -1 && !isSelectedInAnotherDanger) {
      plan.riesgosId.splice(index, 1)
    }
  }

  emit('update:modelValue', plan)
}

function selectAll() {
  const allIds = []

  riskGroups.value.forEach((group) => {
    group.riesgos.forEach((riesgo) => {
      selectedRiskRelations.value.add(
        getRelationKey(group.peligro._id, riesgo._id),
      )

      if (!allIds.includes(riesgo._id)) {
        allIds.push(riesgo._id)
      }
    })
  })

  plan.riesgosId = [...allIds]

  emit('update:modelValue', plan)
}

function clearSelection() {
  selectedRiskRelations.value.clear()
  plan.riesgosId = []

  emit('update:modelValue', plan)
}


function validate() {
  if (!plan.riesgosId.length) {
    notifyWarning('Seleccione al menos un riesgo')
    return false
  }

  return true
}

defineExpose({
  validate,
})
</script>

<style scoped lang="scss">

@use 'src/css/variables.scss' as *;
@use 'src/css/typography.scss' as *;

.plan-riesgos {
  width: 100%;
}

.section-header {
  margin-bottom: 18px;

  h2 {
    margin: 0;
    font-size: $font-size-2xl;
    font-weight: 700;
  }
}

.plan-info {
  display: grid;
  grid-template-columns: 1.5fr 1fr 1fr;
  gap: 18px;
  margin-bottom: 16px;
}

.plan-info__item {
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding-bottom: 2px;
  border-bottom: 1px solid #D1D5DB;

  span {
    font-size: $font-size-sm;
  }

  .plan-info__value {
    display: flex;
    align-items: center;
    gap: 9px;
    min-height: 25px;
    padding-left: 10px;

    .q-icon {
      color: $color-text-secondary;
      font-size: 19px;
      opacity: 0.65;
    }
  }

  strong {
    font-size: $font-size-sm;
    font-weight: 400;
    text-transform: uppercase;
  }
}

.risks-toolbar {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 10px;
  padding-top: 15px;
}

.risks-toolbar__actions {
  display: flex;
  align-items: center;
  gap: 6px;
}

.risk-card :deep(.base-data-card__title span) {
  min-height: 36px;
  padding: 0 6px;
}

.risk-action-btn :deep(.q-icon) {
  font-size: 21px;
}

.risk-action-btn :deep(.q-icon.on-left) {
  margin-right: 10px;
}

.risk-action-btn :deep(.q-btn__content) {
  gap: 0;
}

.risk-action-btn--select :deep(.q-icon) {
  color: $color-primary;
}

.risk-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 20px;
}

.risk-card {
  height: 242px;
}

.risk-card :deep(.base-data-card__title) {
  position: relative;
  flex: 1;
  justify-content: center;
}

.risk-card :deep(.base-data-card__title .q-icon) {
  position: absolute;
  left: 0;
  padding-left: 15px;
}

.risk-card :deep(.base-data-card__title span) {
  font-size: clamp(0.85rem, 0.70vw, 1.125rem);
  display: flex;
  align-items: center;
  text-transform: uppercase;
  font-weight: 400;
}

.risk-row {
  display: grid;
  min-height: 50px;
  align-items: center;
  border-bottom: 1px solid #eeeeee;
  font-size: clamp(0.7rem, 0.72vw, 0.84rem);
}

.risk-row:last-child {
  border-bottom: 1px solid rgba($color-border-table, 0.55);
}

.risk-row__name {
  padding: 5px 8px;
  font-weight: 400;
  font-size: clamp(0.7rem, 0.72vw, 0.84rem);
  text-transform: uppercase;
}

.risk-row__description {
  padding: 5px 8px;
  line-height: 1.4;
  font-size: clamp(0.7rem, 0.72vw, 0.84rem);
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.risk-row__description-text {
  display: inline-block;
  transition: transform 2s linear;
}

.risk-row__description-text.is-marquee {
  transform: translateX(var(--marquee-distance, 0));
}

.risk-row__selection {
  display: flex;
  align-items: center;
  justify-content: end;
}

.risk-row__selection :deep(.q-checkbox) {
  transform: scale(0.8);
}

.risk-empty {
  padding: 20px;
  text-align: center;
  font-size: 12px;
}

.selection-summary {
  display: flex;
  align-items: center;
  gap: 18px;
  margin: 15px 0 0 3px;
  font-size: $font-size-xs;
  color: $color-primary;
  font-weight: 500;
}

@media (max-width: 900px) {

  .risk-grid {
    grid-template-columns: 1fr;
  }

  .risk-card {
    height: auto;
    min-height: 175px;
  }

  .plan-info {
    grid-template-columns: 1fr;
     gap: 14px;
  }

  .plan-info__value {
  padding-left: 0;
  }
}
</style>