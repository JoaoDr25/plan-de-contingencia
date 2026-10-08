<template>
  <BaseDialog v-model="dialog" :title="dialogTitle" width="900px" scrollable>
    <div class="dangers-dialog">
      <div class="dangers-table-wrapper">
        <table class="dangers-table">
          <thead>
            <tr>
              <th class="dangers-table__number">N</th>
              <th>PELIGRO</th>
              <th>CATEGORÍA</th>
              <th>DESCRIPCIÓN</th>
            </tr>
          </thead>

          <tbody>
            <tr v-for="(danger, index) in paginatedRows" :key="danger._id">
              <td class="dangers-table__number">{{ startRow + index }}</td>
              <td>{{ danger.nombre || 'No disponible' }}</td>
              <td>{{ danger.categoria || 'No disponible' }}</td>
              <td>{{ danger.descripcion || 'No disponible' }}</td>
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
        <q-pagination class="dangers-dialog__pagination" v-if="totalPages > 1" v-model="currentPage" :max="totalPages"
          :max-pages="5" direction-links boundary-links size="sm" color="primary" />
        <SecondaryActionButton class="dangers-dialog__close" label="Cerrar" icon="close" size="sm"
          @click="closeDialog" />
      </div>
    </template>
  </BaseDialog>
</template>

<script setup>
import { computed, watch } from 'vue'

import BaseDialog from 'src/components/forms/BaseDialog.vue'
import SecondaryActionButton from 'src/components/actions/SecondaryActionButton.vue'
import { useCrudTable } from 'src/composables/useCrudTable'

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

const dangers = computed(() => props.activity?.peligros ?? [])

const { currentPage, paginatedRows, totalPages, startRow } = useCrudTable({
  sourceRows: dangers,
  defaultRowsPerPage: 4,
})

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
  border-collapse: collapse;
  font-size: $font-size-xs;
  text-transform: uppercase;
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
}

.dangers-table td {
  padding: 8px 12px;
  border-bottom: 1px solid #e2e2e2;
  line-height: 1.4;
  overflow-wrap: anywhere;
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
}

.dangers-dialog__close {
  margin-left: auto;
  flex-shrink: 0;
}

@media (max-width: 700px) {
  .dangers-table {
    min-width: 800px;
  }
}
</style>
