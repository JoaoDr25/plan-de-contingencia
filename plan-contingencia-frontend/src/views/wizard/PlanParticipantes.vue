<template>
  <section class="plan-participantes">
    <div class="section-header">
      <h2>Participantes del Plan</h2>
    </div>

    <div class="program-info">
      <div class="program-info__item program-info__item--programa">
        <span>Programa de formación</span>

        <div class="program-info__value">
          <!-- <q-icon name="school" /> -->
          <strong>{{ programaNombre }}</strong>
        </div>
      </div>

      <div class="program-info__item">
        <span>Ficha</span>

        <div class="program-info__value">
          <!-- <q-icon name="description" /> -->
          <strong>{{ ficha }}</strong>
        </div>
      </div>

      <div class="program-info__item">
        <span>Total Aprendices de la Ficha</span>

        <div class="program-info__value">
          <!-- <q-icon name="groups" /> -->
          <strong>{{ filteredAprendices.length }}</strong>
        </div>
      </div>
    </div>

    <div class="participants-toolbar">
      <BaseSearch
        v-model="search"
        placeholder="Buscar aprendiz por nombre o documento..."
        icon="search"
        clearable
      />

      <div class="participants-toolbar__actions">
        <q-btn
          class="participant-action-btn participant-action-btn--select"
          flat
          no-caps
          icon="check_box"
          label="Seleccionar todos"
          @click="selectAll"
        />

        <q-btn
          class="participant-action-btn"
          flat
          no-caps
          icon="clear_all"
          label="Limpiar selección"
          @click="clearSelection"
        />
      </div>
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
      <template #body-cell-nombre="props">
        <q-td :props="props">
          {{ props.row.nombre }}
        </q-td>
      </template>

      <template #body-cell-apellido="props">
        <q-td :props="props">
          {{ props.row.apellido }}
        </q-td>
      </template>

      <template #body-cell-documento="props">
        <q-td :props="props">
          {{ props.row.documento }}
        </q-td>
      </template>

      <template #body-cell-eps="props">
        <q-td :props="props">
          {{ props.row.eps }}
        </q-td>
      </template>

      <template #body-cell-telefono="props">
        <q-td :props="props">
          {{ props.row.telefono }}
        </q-td>
      </template>

      <template #body-cell-estado="props">
        <q-td :props="props">
          <StatusChip :status="props.value" />
        </q-td>
      </template>

      <template #body-cell-marcar="props">
        <q-td :props="props">
          <q-checkbox
            class="checkbox-selection"
            :model-value="isSelected(props.row._id)"
            :disable="props.row.estado !== 'Activo'"
            @update:model-value="(value) => handleSelection(props.row._id, value)"
          />
        </q-td>
      </template>

      <template #no-data>
        <div class="empty-state">No se encontraron aprendices.</div>
      </template>

      <template #footer-left>
        <div class="selection-summary">
          <strong>
            N.º de Aprendices Seleccionados:
            {{ selectedCount }}
          </strong>
        </div>
      </template>
    </BaseTable>
  </section>
</template>

<script setup>
import { computed, ref } from 'vue'

import BaseSearch from 'src/components/forms/BaseSearch.vue'
import BaseTable from 'src/components/tables/BaseTable.vue'
import StatusChip from 'src/components/states/StatusChip.vue'

import { useCrudTable } from 'src/composables/useCrudTable'
import { notifyWarning } from 'src/utils/notifications.utils'

import { APRENDICES_MOCK } from 'src/mocks/modules/aprendices.mock'
import { PROGRAMAS_MOCK } from 'src/mocks/modules/programas.mock'
import { PLAN_APRENDICES_COLUMNS } from 'src/constants/tables/planAprendices.columns'

const props = defineProps({
  modelValue: {
    type: Object,
    required: true,
  },
})

const emit = defineEmits(['update:modelValue'])

const plan = props.modelValue

const search = ref('')

const columns = PLAN_APRENDICES_COLUMNS

const programa = computed(() => {
  return PROGRAMAS_MOCK.find((item) => item._id === plan.programaFormacionId)
})

const programaNombre = computed(() => {
  return plan.programaFormacionNombre || programa.value?.nombre || '—'
})

const ficha = computed(() => {
  return programa.value?.ficha || '—'
})

const aprendices = computed(() => {
  return APRENDICES_MOCK
})

const filteredAprendices = computed(() => {
  const value = search.value.trim().toLowerCase()

  if (!value) {
    return aprendices.value
  }

  return aprendices.value.filter((aprendiz) => {
    const nombre = `${aprendiz.nombre ?? ''} ${aprendiz.apellido ?? ''}`.toLowerCase()

    const tipoDocumento = String(aprendiz.tipo ?? '').toLowerCase()

    const numeroDocumento = String(aprendiz.documento ?? '').toLowerCase()

    return (
      nombre.includes(value) || tipoDocumento.includes(value) || numeroDocumento.includes(value)
    )
  })
})

const sourceRows = computed(() => filteredAprendices.value)

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

const selectedCount = computed(() => {
  return plan.aprendicesId.length
})

function isSelected(id) {
  return plan.aprendicesId.includes(id)
}

function handleSelection(id, selected) {
  if (selected) {
    if (!plan.aprendicesId.includes(id)) {
      plan.aprendicesId.push(id)
    }
  } else {
    const index = plan.aprendicesId.indexOf(id)

    if (index !== -1) {
      plan.aprendicesId.splice(index, 1)
    }
  }

  emit('update:modelValue', plan)
}

function selectAll() {
  const activeIds = filteredAprendices.value
    .filter((aprendiz) => aprendiz.estado === 'Activo')
    .map((aprendiz) => aprendiz._id)

  const selectedIds = new Set(plan.aprendicesId)

  activeIds.forEach((id) => {
    selectedIds.add(id)
  })

  plan.aprendicesId = Array.from(selectedIds)

  emit('update:modelValue', plan)
}

function clearSelection() {
  plan.aprendicesId = []

  emit('update:modelValue', plan)
}

function validate() {
  if (!plan.aprendicesId.length) {
    notifyWarning('Seleccione al menos un aprendiz')
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

.plan-participantes {
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

.program-info {
  display: grid;
  grid-template-columns: 1.5fr 1fr 1fr;
  gap: 18px;
  margin-bottom: 16px;
}

.program-info__item {
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding-bottom: 2px;
  border-bottom: 1px solid #d1d5db;

  span {
    font-size: $font-size-sm;
  }

  .program-info__value {
    display: flex;
    align-items: center;
    gap: 9px;
    min-height: 25px;
    padding-left: 10px;
    text-transform: uppercase;

    .q-icon {
      color: $color-text-secondary;
      font-size: 19px;
      opacity: 0.65;
    }
  }

  strong {
    font-size: $font-size-sm;
    font-weight: 400;
  }
}

.participants-toolbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 10px;
  padding-top: 15px;
}

.participants-toolbar__actions {
  display: flex;
  align-items: center;
  gap: 6px;
}

.participant-action-btn {
  font-size: $font-size-md;
  min-height: 36px;
  padding: 0 6px;
}

.participant-action-btn :deep(.q-icon) {
  font-size: 21px;
}

.participant-action-btn :deep(.q-icon.on-left) {
  margin-right: 10px;
}

.participant-action-btn :deep(.q-btn__content) {
  gap: 0;
}

.participant-action-btn--select :deep(.q-icon) {
  color: $color-primary;
}

.selection-summary {
  display: flex;
  align-items: center;
  gap: 20px;
  font-size: $font-size-xs;
  white-space: nowrap;
  padding-top: 8px;
  padding-left: 11px;

  strong {
    font-weight: 500;
    color: $color-primary;
  }
}

.checkbox-selection :deep(.q-checkbox__inner) {
  font-size: 32px;
}

.empty-state {
  padding: 25px;
  text-align: center;
  font-size: 12px;
}

@media (max-width: 900px) {
  .program-info {
    grid-template-columns: 1fr;
    gap: 14px;
  }

  .participants-toolbar {
    align-items: stretch;
    flex-direction: column;
  }

  .participants-toolbar__actions {
    justify-content: flex-end;
  }

  .selection-summary {
    padding-left: 0;
  }
}
</style>
