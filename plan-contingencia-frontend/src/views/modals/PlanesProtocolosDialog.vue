<template>
  <BaseDialog v-model="dialog" :title="dialogTitle" width="1000px" scrollable>
    <div class="protocols-dialog">
      <div
        class="protocols-table-wrapper"
        @mouseover="onCellHover"
        @mouseleave="resetActiveCell"
      >
        <table class="protocols-table">
          <colgroup>
            <col class="protocols-table__number-column" />
            <col class="protocols-table__type-column" />
            <col class="protocols-table__action-column" />
            <col class="protocols-table__responsible-column" />
            <col class="protocols-table__medium-column" />
          </colgroup>
          <thead>
            <tr>
              <th class="protocols-table__number">N</th>
              <th :aria-sort="getSortAria('tipo')">
                <button type="button" class="protocols-table__sort" @click="sortByColumn('tipo')">
                  TIPO <q-icon :name="getSortIcon('tipo')" size="14px" />
                </button>
              </th>
              <th :aria-sort="getSortAria('accion')">
                <button type="button" class="protocols-table__sort" @click="sortByColumn('accion')">
                  ACCIÓN <q-icon :name="getSortIcon('accion')" size="14px" />
                </button>
              </th>
              <th :aria-sort="getSortAria('responsable')">
                <button type="button" class="protocols-table__sort" @click="sortByColumn('responsable')">
                  RESPONSABLE <q-icon :name="getSortIcon('responsable')" size="14px" />
                </button>
              </th>
              <th :aria-sort="getSortAria('medio')">
                <button type="button" class="protocols-table__sort" @click="sortByColumn('medio')">
                  MEDIO <q-icon :name="getSortIcon('medio')" size="14px" />
                </button>
              </th>
            </tr>
          </thead>

          <tbody>
            <tr v-for="(protocol, index) in paginatedRows" :key="protocol._id">
              <td class="protocols-table__number">{{ startRow + index }}</td>
              <td>{{ protocol.tipo || 'No disponible' }}</td>
              <td>
                <div class="modal-marquee-cell__content">
                  <span class="modal-marquee-cell__text">{{ protocol.accion || 'No disponible' }}</span>
                </div>
              </td>
              <td>{{ protocol.responsable || 'No disponible' }}</td>
              <td>{{ protocol.medio || 'No disponible' }}</td>
            </tr>

            <tr v-if="!protocols.length">
              <td colspan="5" class="protocols-table__empty">
                No hay protocolos asociados a este riesgo.
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <template #actions>
      <div class="protocols-dialog__actions">
        <q-pagination
          class="protocols-dialog__pagination"
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
          class="protocols-dialog__close"
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
  risk: {
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
  return props.risk?.riesgo || 'Protocolos asociados'
})

const paginationMaxPages = computed(() => {
  if ($q.screen.width <= 400) return 1
  if ($q.screen.width <= 600) return 3
  return 5
})

const protocols = computed(() => props.risk?.protocolos ?? [])

const { sortedRows, toggleSort, getSortIcon, getSortAria } = useSortableRows({
  sourceRows: protocols,
  sortValues: {
    tipo: (protocol) => protocol.tipo || 'No disponible',
    accion: (protocol) => protocol.accion || 'No disponible',
    responsable: (protocol) => protocol.responsable || 'No disponible',
    medio: (protocol) => protocol.medio || 'No disponible',
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

watch([() => props.modelValue, () => props.risk], () => {
  currentPage.value = 1
})

function closeDialog() {
  dialog.value = false
}
</script>

<style scoped lang="scss">
@use 'src/css/variables.scss' as *;
@use 'src/css/typography.scss' as *;

.protocols-dialog {
  width: 100%;
}

.protocols-table-wrapper {
  width: 100%;
  overflow-x: auto;
}

.protocols-table {
  width: 100%;
  min-width: 720px;
  border-collapse: collapse;
  table-layout: fixed;
  font-size: $font-size-xs;
  text-transform: uppercase;
}

.protocols-table__number-column {
  width: 55px;
}

.protocols-table__type-column {
  width: 16%;
}

.protocols-table__action-column {
  width: 42%;
}

.protocols-table__responsible-column {
  width: 21%;
}

.protocols-table__medium-column {
  width: 21%;
}

.protocols-table th {
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

.protocols-table td {
  padding: 8px 12px;
  border-bottom: 1px solid #e2e2e2;
  line-height: 1.4;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: 260px;
}

.protocols-table th:nth-child(3),
.protocols-table td:nth-child(3) {
  max-width: 420px;
}

.protocols-table .modal-marquee-cell__content {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.protocols-table .modal-marquee-cell__text {
  display: inline-block;
  transition: transform 2s linear;
}

.protocols-table .modal-marquee-cell__text.is-marquee {
  transform: translateX(var(--marquee-distance, 0));
}

.protocols-table__sort {
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

.protocols-table__sort:focus-visible {
  outline: 2px solid $color-primary;
  outline-offset: 2px;
}

.protocols-table tbody tr:last-child td {
  border-bottom: none;
}

.protocols-table tbody tr:hover {
  background-color: rgba(0, 0, 0, 0.03);
}

.protocols-table__number {
  width: 55px;
  text-align: center !important;
}

.protocols-table__empty {
  padding: 30px !important;
  text-align: center !important;
}

.protocols-dialog__actions {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  width: 100%;
  padding: 5px 15px 0 0;
}

.protocols-dialog__pagination {
  margin-left: 18px;
  padding-bottom: 5px;
  flex-shrink: 0;
}

.protocols-dialog__close {
  margin-left: auto;
  flex-shrink: 0;
}

@media (max-width: 600px) {
  .protocols-dialog__actions {
    flex-direction: column;
    align-items: center;
  }

  .protocols-dialog__pagination,
  .protocols-dialog__close {
    margin-left: 0;
  }
}
</style>
