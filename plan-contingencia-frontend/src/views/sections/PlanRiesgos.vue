<template>
  <div class="plan-risks">
    <div v-if="!dangers.length" class="plan-risks__empty">No hay riesgos asociados al plan.</div>

    <div v-for="danger in dangers" :key="danger.id" class="danger-item">
      <div class="danger-item__content">
        <span class="danger-item__label"> Peligro identificado </span>

        <span class="danger-item__value">
          {{ danger.nombre }}
        </span>
      </div>

      <button
        type="button"
        class="danger-item__action"
        :aria-label="`Ver riesgos asociados a ${danger.nombre}`"
        @click="openRisks(danger)"
      >
        <q-icon name="open_in_new" size="18px" class="danger-item__action-icon" />
      </button>
    </div>
  </div>

  <PlanesRiesgosDialog
    v-model="showModal"
    class="plan-detail-risks-dialog"
    :danger="selectedDanger"
  />
</template>

<script setup>
import { computed, ref, watch } from 'vue'

import PlanesRiesgosDialog from '../modals/PlanesRiesgosDialog.vue'
import actividadService from 'src/services/modules/actividadService'
import peligroService from 'src/services/modules/peligroService'

const props = defineProps({
  plan: {
    type: Object,
    required: true,
  },
})

const showModal = ref(false)

const selectedDanger = ref(null)

const actividadPeligros = ref(null)

const actividadId = computed(() => {
  const actividad = props.plan.actividadId

  return actividad && typeof actividad === 'object' ? actividad._id : actividad
})

watch(
  actividadId,
  async (id) => {
    actividadPeligros.value = null

    if (!id) {
      return
    }

    try {
      const [actividad, peligros] = await Promise.all([
        actividadService.getActividadById(id),
        peligroService.getPeligros(),
      ])
      const peligrosIds = new Set((actividad.peligrosIds ?? []).map(String))

      actividadPeligros.value = peligros.filter((peligro) => peligrosIds.has(String(peligro._id)))
    } catch (error) {
      console.error('Error cargando los peligros de la actividad:', error)
    }
  },
  { immediate: true },
)

const planRisks = computed(() => {
  const risks = Array.isArray(props.plan.riesgosId) ? props.plan.riesgosId : []

  return risks.filter((risk) => risk && typeof risk === 'object')
})

// Igual que en el wizard: cada riesgo seleccionado se agrupa bajo los peligros de la actividad que lo contienen.
const dangers = computed(() => {
  if (actividadPeligros.value) {
    return actividadPeligros.value
      .map((peligro) => {
        const riesgosIds = new Set((peligro.riesgosIds ?? []).map(String))

        return {
          id: peligro._id,
          nombre: peligro.nombre,
          riesgos: planRisks.value.filter((risk) => riesgosIds.has(String(risk._id))),
        }
      })
      .filter((danger) => danger.riesgos.length > 0)
  }

  const grouped = {}

  planRisks.value.forEach((risk) => {
    const peligros = (Array.isArray(risk.peligroId) ? risk.peligroId : [risk.peligroId]).filter(
      (peligro) => peligro && typeof peligro === 'object',
    )

    const targets = peligros.length ? peligros : [{ _id: 'sin-peligro', nombre: 'Sin peligro' }]

    targets.forEach((peligro) => {
      if (!grouped[peligro._id]) {
        grouped[peligro._id] = {
          id: peligro._id,
          nombre: peligro.nombre,
          riesgos: [],
        }
      }

      grouped[peligro._id].riesgos.push(risk)
    })
  })

  return Object.values(grouped)
})

function openRisks(danger) {
  selectedDanger.value = danger
  showModal.value = true
}
</script>

<style scoped lang="scss">
@use 'src/css/variables.scss' as *;
@use 'src/css/typography.scss' as *;

.plan-risks {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  column-gap: 40px;
  row-gap: 22px;
  padding-bottom: 8px;
}

.plan-risks__empty {
  grid-column: 1 / -1;
  font-size: $font-size-md;
}

.danger-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  min-width: 0;
  padding: 14px 16px;
  border: 1px solid #e0e0e0;
  border-radius: 6px;
  background: $color-surface;
}

.danger-item__content {
  display: flex;
  flex-direction: column;
  gap: 5px;
  min-width: 0;
  flex: 1;
}

.danger-item__label {
  font-size: $font-size-xs;
  font-weight: 700;
  text-transform: uppercase;
  color: $color-primary;
}

.danger-item__value {
  min-width: 0;
  font-size: $font-size-xs;
  line-height: 1.2;
  overflow-wrap: break-word;
  word-break: break-word;
  text-transform: uppercase;
}

.danger-item__action {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  padding: 0;
  border: none;
  background: transparent;
  color: $color-primary;
  cursor: pointer;
  transition: transform 0.2s ease;
}

.danger-item__action-icon {
  color: $color-primary;
  transition:
    color 0.2s ease,
    transform 0.2s ease;
}

.danger-item__action:hover {
  color: $color-primary;
}

.danger-item__action:hover .danger-item__action-icon {
  color: $color-primary;
  transform: scale(1.08);
}

@media (max-width: 1210px) {
  .plan-risks {
    grid-template-columns: repeat(3, minmax(0, 1fr));
    column-gap: 24px;
    row-gap: 16px;
  }
}

@media (max-width: 700px) {
  .plan-risks {
    grid-template-columns: 1fr 1fr;
    row-gap: 12px;
  }

  .danger-item {
    padding: 13px 14px;
  }
}

@media (max-width: 600px) {
  .plan-risks {
    grid-template-columns: 1fr;
    row-gap: 10px;
  }

  .danger-item {
    gap: 12px;
    padding: 12px;
  }

  .danger-item__label {
    font-size: $font-size-xs;
  }

  .danger-item__value {
    font-size: $font-size-xs;
  }
}
</style>

<style lang="scss">
@use 'src/css/typography.scss' as *;

.plan-detail-risks-dialog table.risks-table th {
  font-size: $font-size-xs;
}

.plan-detail-risks-dialog table.risks-table td {
  font-size: $font-size-xs;
}
</style>
