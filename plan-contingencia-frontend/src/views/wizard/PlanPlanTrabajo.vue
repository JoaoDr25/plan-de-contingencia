<template>

  <section class="plan-trabajo">

    <div class="section-header">
      <h2>Plan de Trabajo</h2>
    </div>

    <div class="plan-info">

      <div class="plan-info__item">

        <span>Fecha de salida</span>

        <div class="plan-info__value">
          <q-icon name="event" />
          <strong>{{ formattedDate }}</strong>
        </div>

      </div>

      <div class="plan-info__item">

        <span>Hora de salida</span>

        <div class="plan-info__value">
          <q-icon name="schedule" />
          <strong>{{ formattedTime(plan.horaSalida) }}</strong>
        </div>

      </div>

      <div class="plan-info__item">

        <span>Hora de regreso prevista</span>

        <div class="plan-info__value">
          <q-icon name="schedule" />
          <strong>{{ formattedTime(plan.horaRegreso) }}</strong>
        </div>

      </div>

    </div>

    <div class="toolbar">

      <PrimaryActionButton
        label="Agregar"
        icon="add_circle_outline"
        size="sm"
        @click="handleAdd"
      />

    </div>

    <BaseTable
      :rows="paginatedRows"
      :columns="columns"
      row-key="numero"
      :current-page="currentPage"
      :total-pages="totalPages"
      :rows-per-page="rowsPerPage"
      :start="startRow"
      :end="endRow"
      :total="filteredRows.length"
      @change-page="currentPage = $event"
      @change-rows-per-page="setRowsPerPage"
    >

      <template #body-cell-numero="props">

        <q-td :props="props">
          {{ props.row.numero }}

        </q-td>

      </template>

      <template #body-cell-duracion="props">

        <q-td :props="props">

          {{ props.row.duracion }} min

        </q-td>

      </template>

      <template #body-cell-opciones="props">

        <q-td :props="props">

          <CrudActions
            :actions="PLAN_TRABAJO_ACTIONS"
            @edit="handleEdit(props.row)"
            @delete="handleDelete(props.row)"
          />

        </q-td>

      </template>

      <template #no-data>

        <div class="empty-state">
          No hay actividades agregadas al plan de trabajo.
        </div>

      </template>

    </BaseTable>

    <PlanesActividadDialog
      v-model="dialogOpen"
      :activity="selectedActivity"
      :hora-salida="plan.horaSalida"
      :hora-regreso="plan.horaRegreso"
      @save="handleSaveActivity"
    />

    <BaseConfirmationDialog
      v-model="deleteDialogOpen"
      title="Eliminar actividad"
      message="¿Está seguro de que desea eliminar esta actividad del plan de trabajo?"
      confirm-label="Eliminar"
      cancel-label="Cancelar"
      @confirm="confirmDelete"
    />

  </section>

</template>

<script setup>

import { computed, ref } from 'vue'

import { PLAN_TRABAJO_COLUMNS } from 'src/constants/tables/planTrabajo.columns.js'
import { useCrudTable } from 'src/composables/useCrudTable'
import { notifyWarning } from 'src/utils/notifications.utils'

import BaseTable from 'src/components/tables/BaseTable.vue'
import CrudActions from 'src/components/actions/CrudActions.vue'
import PrimaryActionButton from 'src/components/actions/PrimaryActionButton.vue'
import BaseConfirmationDialog from 'src/components/base/BaseConfirmationDialog.vue'

import PlanesActividadDialog from '../modals/PlanesActividadDialog.vue'

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

const dialogOpen = ref(false)
const deleteDialogOpen = ref(false)
const selectedActivity = ref(null)

const PLAN_TRABAJO_ACTIONS = ['edit', 'delete']

const columns = PLAN_TRABAJO_COLUMNS;

const sourceRows = computed(() => plan.planTrabajo)

const {
  currentPage,
  rowsPerPage,
  setRowsPerPage,
  filteredRows,
  paginatedRows,
  totalPages,
  startRow,
  endRow,
} = useCrudTable({
  sourceRows,
  defaultRowsPerPage: 8,
})

const formattedDate = computed(() => {
  if (!plan.fecha) {
    return '—'
  }

  const [year, month, day] = plan.fecha.split('-')

  if (!year || !month || !day) {
    return plan.fecha
  }

  return `${day}/${month}/${year}`
})

function formattedTime(value) {
  if (!value) {
    return '—'
  }

  return value
}

function handleAdd() {
  selectedActivity.value = null
  dialogOpen.value = true
}

function handleEdit(activity) {
  selectedActivity.value = {
    ...activity,
  }

  dialogOpen.value = true
}

function handleSaveActivity(activity) {
  if (selectedActivity.value) {
    const index = plan.planTrabajo.findIndex(
      (item) => item.numero === selectedActivity.value.numero,
    )

    if (index !== -1) {
      plan.planTrabajo[index] = {
        ...activity,
        numero: selectedActivity.value.numero,
      }
    }
  } else {
    const nextNumber =
      plan.planTrabajo.length > 0
        ? Math.max(
            ...plan.planTrabajo.map(
              (item) => Number(item.numero) || 0,
            ),
          ) + 1
        : 1

    plan.planTrabajo.push({
      ...activity,
      numero: nextNumber,
    })
  }

  selectedActivity.value = null

  renumberActivities()

  emit('update:modelValue', plan)
}

function handleDelete(activity) {
  selectedActivity.value = activity
  deleteDialogOpen.value = true
}

function confirmDelete() {
  if (!selectedActivity.value) {
    return
  }

  const index = plan.planTrabajo.findIndex(
    (item) => item.numero === selectedActivity.value.numero,
  )

  if (index !== -1) {
    plan.planTrabajo.splice(index, 1)
  }

  renumberActivities()

  selectedActivity.value = null
  deleteDialogOpen.value = false

  emit('update:modelValue', plan)
}

function renumberActivities() {
  sortActivitiesByTime()

  plan.planTrabajo.forEach((activity, index) => {
    activity.numero = index + 1
  })
}

function sortActivitiesByTime() {
  plan.planTrabajo.sort((a, b) => {
    const startA = timeToMinutes(a.horaInicio)
    const startB = timeToMinutes(b.horaInicio)

    if (startA !== startB) {
      return (startA ?? Infinity) - (startB ?? Infinity)
    }

    const endA = timeToMinutes(a.horaFin)
    const endB = timeToMinutes(b.horaFin)

    return (endA ?? Infinity) - (endB ?? Infinity)
  })
}

function timeToMinutes(value) {
  if (!value || typeof value !== 'string') {
    return null
  }

  const [hours, minutes] = value.split(':').map(Number)

  if (Number.isNaN(hours) || Number.isNaN(minutes)) {
    return null
  }

  return hours * 60 + minutes
}

function validate() {
  if (!plan.planTrabajo.length) {
    notifyWarning('Agregue al menos una actividad')
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

.plan-trabajo {
  width: 100%;
}

.section-header {
  margin-bottom: 16px;

  h2 {
    margin: 0;
    font-size: $font-size-2xl;
    font-weight: 700;
  }
}

.plan-info {
  display: grid;
  grid-template-columns: 1.5fr 1fr 1fr;
  gap: 20px;
  margin-bottom: 12px;
}

.plan-info__item {
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding-bottom: 10px;

  span {
    font-size: $font-size-sm;
  }

  strong {
    font-size: $font-size-sm;
    font-weight: 400;
  }
}

.plan-info__value {
  display: flex;
  align-items: center;
  gap: 8px;
  padding-bottom: 6px;
  border-bottom: 1px solid #D1D5DB;
  padding-left: 10px;

  .q-icon {
    font-size: 18px;
    color: $color-text-secondary;
  }
}

.toolbar {
  margin-bottom: 16px;
}

.empty-state {
  padding: 28px;
  text-align: center;
  font-size: 13px;
}

@media (max-width: 800px) {
  .plan-info {
    grid-template-columns: 1fr;
  }
}
</style>