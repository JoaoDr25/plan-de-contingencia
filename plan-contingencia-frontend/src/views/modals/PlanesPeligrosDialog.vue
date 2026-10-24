<template>
  <BaseDialog v-model="dialog" :title="dialogTitle" width="900px" scrollable>
    <div class="dangers-dialog">
      <div
        class="dangers-table-wrapper"
        @mouseover="onCellHover"
        @mouseleave="resetActiveCell"
      >
        <table class="dangers-table">
          <colgroup>
            <col class="dangers-table__number-column" />
            <col class="dangers-table__danger-column" />
            <col class="dangers-table__category-column" />
            <col class="dangers-table__description-column" />
          </colgroup>
          <thead>
            <tr>
              <th class="dangers-table__number">N</th>
              <th :aria-sort="getSortAria('nombre')">
                <button type="button" class="dangers-table__sort" @click="sortByColumn('nombre')">
                  PELIGRO <q-icon :name="getSortIcon('nombre')" size="14px" />
                </button>
              </th>
              <th :aria-sort="getSortAria('categoria')">
                <button type="button" class="dangers-table__sort" @click="sortByColumn('categoria')">
                  CATEGORÍA <q-icon :name="getSortIcon('categoria')" size="14px" />
                </button>
              </th>
              <th :aria-sort="getSortAria('descripcion')">
                <button type="button" class="dangers-table__sort" @click="sortByColumn('descripcion')">
                  DESCRIPCIÓN <q-icon :name="getSortIcon('descripcion')" size="14px" />
                </button>
              </th>
            </tr>
          </thead>

          <tbody>
            <tr v-for="(danger, index) in paginatedRows" :key="danger._id">
              <td class="dangers-table__number">{{ startRow + index }}</td>
              <td>
                <div class="modal-marquee-cell__content">
                  <span class="modal-marquee-cell__text">{{ danger.nombre || 'No disponible' }}</span>
                </div>
              </td>
              <td>
                <div class="modal-marquee-cell__content">
                  <span class="modal-marquee-cell__text">{{ danger.categoria || 'No disponible' }}</span>
                </div>
              </td>
              <td>
                <div class="modal-marquee-cell__content">
                  <span class="modal-marquee-cell__text">{{ danger.descripcion || 'No disponible' }}</span>
                </div>
              </td>
            </tr>

            <tr v-if="!dangers.length">
              <td colspan="4" class="dangers-table__empty">
                No hay peligros asociados a esta actividad.
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <template #actions>
      <div class="dangers-dialog__actions">
        <q-pagination
          class="dangers-dialog__pagination"
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
          class="dangers-dialog__close"
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
  activity: {
    type: Object,
    default: null,
  },
})

const emit = defineEmits(['update:modelValue'])

const dialog = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value),
})

const dialogTitle = computed(() => {
  return props.activity?.nombre || 'Peligros asociados'
})

const paginationMaxPages = computed(() => {
  if ($q.screen.width <= 400) return 1
  if ($q.screen.width <= 600) return 3
  return 5
})

const dangers = computed(() => props.activity?.peligros ?? [])

const { sortedRows, toggleSort, getSortIcon, getSortAria } = useSortableRows({
  sourceRows: dangers,
  sortValues: {
    nombre: (danger) => danger.nombre || 'No disponible',
    categoria: (danger) => danger.categoria || 'No disponible',
    descripcion: (danger) => danger.descripcion || 'No disponible',
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

watch([() => props.modelValue, () => props.activity], () => {
  currentPage.value = 1
})

function closeDialog() {
  dialog.value = false
}
</script>

<style scoped lang="scss">
@use 'src/css/variables.scss' as *;
@use 'src/css/typography.scss' as *;

.dangers-dialog {
  width: 100%;
}

.dangers-table-wrapper {
  width: 100%;
  overflow-x: auto;
}

.dangers-table {
  width: 100%;
  min-width: 800px;
  border-collapse: collapse;
  table-layout: fixed;
  font-size: $font-size-xs;
  text-transform: uppercase;
}

.dangers-table__number-column {
  width: 55px;
}

.dangers-table__danger-column {
  width: 28%;
}

.dangers-table__category-column {
  width: 12%;
}

.dangers-table__description-column {
  width: 54%;
}

.dangers-table th {
  position: sticky;
  top: 0;
  z-index: 1;
  padding: 10px 12px;
  border-top: 1px solid #d6d6d6;
  border-bottom: 1px solid #d6d6d6;
  background-color: $color-surface;
  font-size: $font-size-xs;
  font-weight: 600;
  text-align: left;
  white-space: nowrap;
  max-width: 260px;
}

.dangers-table td {
  padding: 8px 12px;
  border-bottom: 1px solid #e2e2e2;
  line-height: 1.4;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: 260px;
}

.dangers-table .modal-marquee-cell__content {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.dangers-table .modal-marquee-cell__text {
  display: inline-block;
  transition: transform 2s linear;
}

.dangers-table .modal-marquee-cell__text.is-marquee {
  transform: translateX(var(--marquee-distance, 0));
}

.dangers-table__sort {
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

.dangers-table__sort:focus-visible {
  outline: 2px solid $color-primary;
  outline-offset: 2px;
}

.dangers-table tbody tr:last-child td {
  border-bottom: none;
}

.dangers-table tbody tr:hover {
  background-color: rgba(0, 0, 0, 0.03);
}

.dangers-table__number {
  width: 55px;
  text-align: center !important;
}

.dangers-table__empty {
  padding: 30px !important;
  text-align: center !important;
}

.dangers-dialog__actions {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  width: 100%;
  padding: 5px 15px 0 0;
}

.dangers-dialog__pagination {
  margin-left: 18px;
  padding-bottom: 5px;
  flex-shrink: 0;
}

.dangers-dialog__close {
  margin-left: auto;
  flex-shrink: 0;
}

@media (max-width: 600px) {
  .dangers-dialog__actions {
    flex-direction: column;
    align-items: center;
  }

  .dangers-dialog__pagination,
  .dangers-dialog__close {
    margin-left: 0;
  }
}
</style>
