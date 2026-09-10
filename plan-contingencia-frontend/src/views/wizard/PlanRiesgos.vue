<template>

  <section class="plan-riesgos">

    <div class="section-header">

      <h2>Riesgos Asociados</h2>

    </div>

    <div class="plan-info">

      <div class="plan-info__item">

        <span>Actividad a realizar</span>

        <strong>{{ actividadNombre }}</strong>

      </div>

      <div class="plan-info__item">

        <span>Lugar de salida</span>

        <strong>{{ plan.lugarSalida || '—' }}</strong>
      
    </div>

      <div class="plan-info__item">

        <span>Lugar de destino</span>

        <strong>{{ plan.lugarDestino || '—' }}</strong>
      
    </div>

    </div>

    <div class="risks-toolbar">

      <div class="risks-toolbar__actions">

        <q-btn
          flat
          no-caps
          icon="check_box"
          label="Seleccionar todos"
          @click="selectAll"
        />

        <q-btn
          flat
          no-caps
          icon="remove_done"
          label="Limpiar selección"
          @click="clearSelection"
        />
      </div>

    </div>

    <div class="risk-grid">

      <article
        v-for="group in riskGroups"
        :key="group.peligro._id"
        class="risk-card"
      >

        <div class="risk-card__header">

          <div class="risk-card__title">

            <q-icon
              name="expand_more"
              size="20px"
            />

            <span>{{ group.peligro.nombre }}</span>

          </div>

          <span class="risk-card__count">

            {{ group.riesgos.length }} Riesgo{{ group.riesgos.length === 1 ? '' : 's' }}
          
        </span>

        </div>

        <div class="risk-card__columns">

          <span>RIESGO ASOCIADO</span>

          <span>DESCRIPCIÓN</span>

          <span></span>

        </div>

        <div class="risk-card__body">

          <div
            v-for="riesgo in group.riesgos"
            :key="riesgo._id"
            class="risk-row"
          >

            <div class="risk-row__name">

              {{ riesgo.riesgo }}

            </div>

            <div class="risk-row__description">

              {{ riesgo.descripcion }}

            </div>

            <div class="risk-row__selection">
                
              <q-checkbox
                :model-value="isSelected(group.peligro._id, riesgo._id)"
                @update:model-value="
                  (value) => handleSelection(group.peligro._id, riesgo._id, value)
                "
              />

            </div>

          </div>

          <div
            v-if="group.riesgos.length === 0"
            class="risk-empty"
          >

            No hay riesgos asociados a este peligro.
          
        </div>

        </div>

      </article>

    </div>

    <div class="selection-summary">

      <strong>
        N.º de Riesgos Seleccionados:
        {{ selectedCount }}
      </strong>


      <span v-if="selectedCount === 0">
        Debes seleccionar al menos un riesgo para continuar.
      </span>

    </div>

  </section>

</template>

<script setup>

import { computed, ref } from 'vue'

import { ACTIVIDADES_MOCK } from 'src/mocks/modules/actividades.mock'
import { PELIGROS_MOCK } from 'src/mocks/modules/peligros.mock'
import { RIESGOS_MOCK } from 'src/mocks/modules/riesgos.mock'

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

const selectedRiskRelations = ref(new Set())

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
      (riesgo) => riesgo.peligroId.includes(peligro._id),
    ),
  })).filter(
    (group) => group.riesgos.length > 0,
  )
})

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
  return plan.riesgosId.length > 0
}

defineExpose({
  validate,
})
</script>

<style scoped lang="scss">

.plan-riesgos {
  width: 100%;
}

.section-header {
  margin-bottom: 18px;

  h2 {
    margin: 0;
    font-size: 18px;
    font-weight: 700;
  }
}

.plan-info {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr;
  gap: 20px;
  margin-bottom: 12px;
}

.plan-info__item {
  display: flex;
  flex-direction: column;
  gap: 4px;

  span {
    font-size: 11px;
    color: #555;
  }

  strong {
    font-size: 12px;
    font-weight: 500;
  }
}

.risks-toolbar {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 10px;
}

.risks-toolbar__actions {
  display: flex;
  align-items: center;
  gap: 6px;
}

.risk-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 8px;
}

.risk-card {
  height: 205px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  border: 1px solid #d5d5d5;
  border-radius: 5px;
  background: #fff;
}

.risk-card__header {
  min-height: 32px;

  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 10px;
  border-bottom: 1px solid #d5d5d5;
}

.risk-card__title {
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 13px;
  font-weight: 700;
}

.risk-card__count {
  padding: 3px 9px;
  border-radius: 4px;
  background: #e9ebee;
  font-size: 11px;
  font-weight: 600;
}

.risk-card__columns {
  display: grid;
  grid-template-columns: 38% 52% 10%;
  padding: 6px 8px;
  border-bottom: 1px solid #e5e5e5;
  font-size: 10px;
  font-weight: 700;
}

.risk-card__body {
  flex: 1;
  overflow-y: auto;
}

.risk-row {
  display: grid;
  grid-template-columns: 38% 52% 10%;
  min-height: 30px;
  align-items: center;
  border-bottom: 1px solid #eeeeee;
  font-size: 11px;
}

.risk-row:last-child {
  border-bottom: none;
}

.risk-row__name {
  padding: 5px 8px;
  font-weight: 600;
}

.risk-row__description {
  padding: 5px 8px;
  line-height: 1.25;
}

.risk-row__selection {
  display: flex;
  align-items: center;
  justify-content: center;
}

.risk-row__selection :deep(.q-checkbox) {
  transform: scale(0.8);
}

.risk-empty {
  padding: 20px;
  text-align: center;
  color: #777;
  font-size: 12px;
}

.selection-summary {
  display: flex;
  align-items: center;
  gap: 18px;
  margin-top: 10px;
  font-size: 13px;
}

.selection-summary span {
  color: #555;
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
  }
}

</style>