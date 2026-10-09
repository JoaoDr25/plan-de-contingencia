<template>
  <BaseDialog v-model="dialog" :title="dialogTitle" width="1000px" scrollable>
    <div class="protocols-dialog">
      <div class="protocols-table-wrapper">
        <table class="protocols-table">
          <thead>
            <tr>
              <th class="protocols-table__number">N</th>
              <th>TIPO</th>
              <th>ACCIÓN</th>
              <th>RESPONSABLE</th>
              <th>MEDIO</th>
            </tr>
          </thead>

          <tbody>
            <tr v-for="(protocol, index) in paginatedRows" :key="protocol._id">
              <td class="protocols-table__number">{{ startRow + index }}</td>
              <td>{{ protocol.tipo || 'No disponible' }}</td>
              <td>{{ protocol.accion || 'No disponible' }}</td>
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

const $q = useQuasar()

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

const { currentPage, paginatedRows, totalPages, startRow } = useCrudTable({
  sourceRows: protocols,
  defaultRowsPerPage: 4,
})

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
  border-collapse: collapse;
  font-size: $font-size-xs;
  text-transform: uppercase;
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
}

.protocols-table td {
  padding: 8px 12px;
  border-bottom: 1px solid #e2e2e2;
  line-height: 1.4;
  overflow-wrap: anywhere;
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

@media (max-width: 700px) {
  .protocols-table {
    min-width: 720px;
  }
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
