<template>

  <section class="plan-trabajo">

    <div class="section-header">
      <h2>Plan de Trabajo</h2>
    </div>

    <div class="plan-info">

      <div class="plan-info__item">

        <span>Fecha de salida</span>

        <strong>{{ formattedDate }}</strong>

      </div>

      <div class="plan-info__item">

        <span>Hora de salida</span>

        <strong>{{ formattedTime(plan.horaSalida) }}</strong>

      </div>

      <div class="plan-info__item">

        <span>Hora de regreso prevista</span>

        <strong>{{ formattedTime(plan.horaRegreso) }}</strong>

      </div>

    </div>

    <div class="toolbar">

      <q-btn
        unelevated
        color="primary"
        icon="add_circle_outline"
        label="Agregar"
        @click="handleAdd"
      />

    </div>

    <BaseTable
      :rows="plan.planTrabajo"
      :columns="columns"
      row-key="numero"
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

    <PlanActivityDialog
      v-model="dialogOpen"
      :activity="selectedActivity"
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

import BaseTable from 'src/components/tables/BaseTable.vue'
import CrudActions from 'src/components/actions/CrudActions.vue'
import BaseConfirmationDialog from 'src/components/base/BaseConfirmationDialog.vue'

import PlanActivityDialog from '../modals/PlanActivityDialog.vue'

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

const columns = [
  {
    name: 'numero',
    label: 'Orden',
    field: 'numero',
    align: 'center',
  },
  {
    name: 'actividad',
    label: 'Actividad',
    field: 'actividad',
    align: 'left',
  },
  {
    name: 'descripcion',
    label: 'Descripción',
    field: 'descripcion',
    align: 'left',
  },
  {
    name: 'horaInicio',
    label: 'Hora inicio',
    field: 'horaInicio',
    align: 'center',
  },
  {
    name: 'horaFin',
    label: 'Hora fin',
    field: 'horaFin',
    align: 'center',
  },
  {
    name: 'duracion',
    label: 'Duración',
    field: 'duracion',
    align: 'center',
  },
  {
    name: 'lugar',
    label: 'Lugar',
    field: 'lugar',
    align: 'left',
  },
  {
    name: 'opciones',
    label: 'Opciones',
    field: 'opciones',
    align: 'center',
  },
]

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
  plan.planTrabajo.forEach((activity, index) => {
    activity.numero = index + 1
  })
}
</script>

<style scoped lang="scss">
.plan-trabajo {
  width: 100%;
}

.section-header {
  margin-bottom: 16px;

  h2 {
    margin: 0;
    font-size: 18px;
    font-weight: 700;
  }
}

.plan-info {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
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

.toolbar {
  margin-bottom: 16px;
}

.empty-state {
  padding: 28px;
  text-align: center;
  color: #777;
  font-size: 13px;
}

@media (max-width: 800px) {
  .plan-info {
    grid-template-columns: 1fr;
  }
}
</style>