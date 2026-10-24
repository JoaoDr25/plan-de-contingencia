<template>
  <BaseDialog v-model="dialog" :title="dialogTitle" width="1100px" scrollable>
    <div class="risks-dialog">
      <div
        class="risks-table-wrapper"
        @mouseover="onCellHover"
        @mouseleave="resetActiveCell"
      >
        <table class="risks-table">
          <thead>
            <tr>
              <th class="risks-table__number">N</th>

              <th :aria-sort="getSortAria('riesgo')">
                <button type="button" class="risks-table__sort" @click="sortByColumn('riesgo')">
                  RIESGO <q-icon :name="getSortIcon('riesgo')" size="14px" />
                </button>
              </th>

              <th class="risks-table__level" :aria-sort="getSortAria('nivel')">
                <button type="button" class="risks-table__sort" @click="sortByColumn('nivel')">
                  NIVEL <q-icon :name="getSortIcon('nivel')" size="14px" />
                </button>
              </th>

              <th :aria-sort="getSortAria('consecuencia')">
                <button type="button" class="risks-table__sort" @click="sortByColumn('consecuencia')">
                  CONSECUENCIA <q-icon :name="getSortIcon('consecuencia')" size="14px" />
                </button>
              </th>

              <th :aria-sort="getSortAria('descripcion')">
                <button type="button" class="risks-table__sort" @click="sortByColumn('descripcion')">
                  DESCRIPCIÓN <q-icon :name="getSortIcon('descripcion')" size="14px" />
                </button>
              </th>
            </tr>
          </thead>

          <tbody>
            <tr v-for="(risk, index) in paginatedRows" :key="risk._id">
              <td class="risks-table__number">
                {{ startRow + index }}
              </td>

              <td>
                {{ risk.riesgo || 'No disponible' }}
              </td>

              <td class="risks-table__level">
                <LevelChip :level="risk.nivel" context="riesgo" />
              </td>

              <td>
                {{ risk.consecuencia || 'No disponible' }}
              </td>

              <td>
                {{ risk.descripcion || 'No disponible' }}
              </td>
            </tr>

            <tr v-if="!risks.length">
              <td colspan="5" class="risks-table__empty">
                No hay riesgos asociados a este peligro.
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <template #actions>
      <div class="risks-dialog__actions">
        <q-pagination
          class="risks-dialog__pagination"
          v-if="totalPages > 1"
          v-model="currentPage"
          :max="totalPages"
          :max-pages="paginationMaxPages"
          direction-links
          boundary-links
          size="sm"
          color="primary"
        />
        <SecondaryActionButton
          class="risks-dialog__close"
          label="Cerrar"
          icon="close"
          size="sm"
          @click="closeDialog"
        />
      </div>
    </template>
  </BaseDialog>
</template>

<script setup>
import { computed, watch } from 'vue'
import { useQuasar } from 'quasar'

import BaseDialog from 'src/components/forms/BaseDialog.vue'
import SecondaryActionButton from 'src/components/actions/SecondaryActionButton.vue'
import LevelChip from 'src/components/states/LevelChip.vue'
import { useCrudTable } from 'src/composables/useCrudTable'
import { useSortableRows } from 'src/composables/useSortableRows'
import { useTableCellMarquee } from 'src/composables/useTableCellMarquee'

const $q = useQuasar()
const { onCellHover, resetActiveCell } = useTableCellMarquee()

const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true,
  },
  danger: {
    type: Object,
    default: null,
  },
})

const emit = defineEmits(['update:modelValue'])

const dialog = computed({
  get() {
    return props.modelValue
  },
  set(value) {
    emit('update:modelValue', value)
  },
})

const dialogTitle = computed(() => {
  const dangerName = props.danger?.nombre
  return dangerName ? `${dangerName}` : 'No Identificado'
})

const paginationMaxPages = computed(() => {
  if ($q.screen.width <= 400) return 1
  if ($q.screen.width <= 600) return 3
  return 5
})

const risks = computed(() => {
  return props.danger?.riesgos ?? []
})

const { sortedRows, toggleSort, getSortIcon, getSortAria } = useSortableRows({
  sourceRows: risks,
  sortValues: {
    riesgo: (risk) => risk.riesgo || 'No disponible',
    nivel: (risk) => risk.nivel || 'No disponible',
    consecuencia: (risk) => risk.consecuencia || 'No disponible',
    descripcion: (risk) => risk.descripcion || 'No disponible',
  },
})

const { currentPage, paginatedRows, totalPages, startRow } = useCrudTable({
  sourceRows: sortedRows,
  defaultRowsPerPage: 4,
})

function sortByColumn(column) {
  toggleSort(column)
  currentPage.value = 1
}

watch([() => props.modelValue, () => props.danger], () => {
  currentPage.value = 1
})

function closeDialog() {
  dialog.value = false
}
</script>

<style scoped lang="scss">
@use 'src/css/variables.scss' as *;
@use 'src/css/typography.scss' as *;

.risks-dialog {
  width: 100%;
}

.risks-table-wrapper {
  width: 100%;
  overflow-x: auto;
}

.risks-table {
  width: 100%;
  min-width: 850px;
  border-collapse: collapse;
  table-layout: fixed;
}

.risks-table th {
  position: sticky;
  top: 0;
  z-index: 1;
  padding: 10px 12px;
  border-top: 1px solid #d6d6d6;
  border-bottom: 1px solid #d6d6d6;
  background-color: $color-surface;
  font-size: $font-size-xs;
  text-transform: uppercase;
  font-weight: 600;
  text-align: left;
  white-space: nowrap;
  max-width: 260px;
}

.risks-table td {
  padding: 8px 12px;
  border-bottom: 1px solid #e2e2e2;
  line-height: 1.4;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: $font-size-xs;
  max-width: 260px;
}

.risks-table td:not(.risks-table__level) {
  text-transform: uppercase;
}

.risks-table tbody tr:last-child td {
  border-bottom: none;
}

.risks-table tbody tr:hover {
  background-color: rgba(0, 0, 0, 0.03);
}

.risks-table__number {
  width: 55px;
  text-align: center !important;
}

.risks-table__level {
  width: 110px;
  text-align: center !important;
}

.risks-table__sort {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 0;
  border: 0;
  background: transparent;
  color: inherit;
  font: inherit;
  white-space: nowrap;
  cursor: pointer;
}

.risks-table__sort:focus-visible {
  outline: 2px solid $color-primary;
  outline-offset: 2px;
}

.risks-table__empty {
  padding: 30px !important;
  text-align: center !important;
}

.risks-dialog__actions {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  width: 100%;
  padding: 5px 15px 0 0;
}

.risks-dialog__pagination {
  margin-left: 18px;
  padding-bottom: 5px;
  flex-shrink: 0;
}

.risks-dialog__close {
  margin-left: auto;
  flex-shrink: 0;
}

@media (max-width: 600px) {
  .risks-dialog__actions {
    flex-direction: column;
    align-items: center;
  }

  .risks-dialog__pagination,
  .risks-dialog__close {
    margin-left: 0;
  }
}
</style>
