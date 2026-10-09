<template>
  <BaseDialog v-model="dialog" title="Participantes del plan" width="850px">
    <div class="participants-dialog">
      <div class="participants-table-wrapper">
        <table class="participants-table">
          <colgroup>
            <col class="participants-table__number-column" />
            <col span="4" class="participants-table__data-column" />
          </colgroup>

          <thead>
            <tr>
              <th class="participants-table__number">N</th>

              <th>TIPO DE DOCUMENTO</th>

              <th>DOCUMENTO</th>

              <th>NOMBRES</th>

              <th>APELLIDOS</th>
            </tr>
          </thead>

          <tbody>
            <tr v-for="(participant, index) in paginatedRows" :key="participant._id">
              <td class="participants-table__number">
                {{ startRow + index }}
              </td>

              <td>
                <span
                  class="participants-table__cell-content"
                  :title="getDocumentTypeLabel(participant.tipo || participant.tipoDocumento)"
                  tabindex="0"
                >
                  {{ getDocumentTypeLabel(participant.tipo || participant.tipoDocumento) }}
                </span>
              </td>

              <td>
                <span
                  class="participants-table__cell-content"
                  :title="participant.numeroDocumento || 'No disponible'"
                  tabindex="0"
                >
                  {{ participant.numeroDocumento || 'No disponible' }}
                </span>
              </td>

              <td>
                <span
                  class="participants-table__cell-content"
                  :title="getParticipantNames(participant).names"
                  tabindex="0"
                >
                  {{ getParticipantNames(participant).names }}
                </span>
              </td>

              <td>
                <span
                  class="participants-table__cell-content"
                  :title="getParticipantNames(participant).surnames"
                  tabindex="0"
                >
                  {{ getParticipantNames(participant).surnames }}
                </span>
              </td>
            </tr>

            <tr v-if="!participants.length">
              <td colspan="5" class="participants-table__empty">
                No hay aprendices registrados en el plan.
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <template #actions>
      <div class="participants-dialog__actions">
        <q-pagination
          v-if="totalPages > 1"
          class="participants-dialog__pagination"
          v-model="currentPage"
          :max="totalPages"
          :max-pages="paginationMaxPages"
          direction-links
          boundary-links
          size="sm"
          color="primary"
        />
        <SecondaryActionButton
          class="participants-dialog__close"
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
  plan: {
    type: Object,
    required: true,
  },
  participants: {
    type: Array,
    default: () => [],
  },
})

const paginationMaxPages = computed(() => {
  if ($q.screen.width <= 400) return 1
  if ($q.screen.width <= 600) return 3
  return 5
})

const { currentPage, paginatedRows, totalPages, startRow } = useCrudTable({
  sourceRows: computed(() => props.participants),
  defaultRowsPerPage: 4,
})

watch([() => props.modelValue, () => props.plan, () => props.participants], () => {
  currentPage.value = 1
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

function closeDialog() {
  dialog.value = false
}

function getDocumentTypeLabel(value) {
  const type = String(value ?? '').trim()
  const labels = {
    CC: 'Cédula de Ciudadanía',
    TI: 'Tarjeta de Identidad',
    CE: 'Cédula de Extranjería',
  }

  return labels[type.toUpperCase()] || type || 'No disponible'
}

function getParticipantNames(participant) {
  if (participant.nombre || participant.apellido) {
    return {
      names: participant.nombre || 'No disponible',
      surnames: participant.apellido || 'No disponible',
    }
  }

  const fullName = String(participant.nombreCompleto || '').trim()
  const nameParts = fullName.split(/\s+/).filter(Boolean)

  if (nameParts.length < 3) {
    return {
      names: fullName || 'No disponible',
      surnames: 'No disponible',
    }
  }

  return {
    names: nameParts.slice(0, -2).join(' '),
    surnames: nameParts.slice(-2).join(' '),
  }
}
</script>

<style scoped lang="scss">
@use 'src/css/variables.scss' as *;
@use 'src/css/typography.scss' as *;

.participants-dialog {
  width: 100%;
}

.participants-table-wrapper {
  width: 100%;
  max-height: min(320px, 45vh);
  overflow-x: auto;
  overflow-y: auto;
}

.participants-table {
  width: 100%;
  border-collapse: collapse;
  table-layout: fixed;
  font-size: $font-size-xs;
  text-transform: uppercase;
}

.participants-table__number-column {
  width: 55px;
}

.participants-table__data-column {
  width: calc((100% - 55px) / 4);
}

.participants-table th {
  position: sticky;
  top: 0;
  z-index: 1;
  padding: 10px 12px;
  border-top: 1px solid #d6d6d6;
  border-bottom: 1px solid #d6d6d6;
  background-color: $color-surface;
  font-size: $font-size-xs;
  font-weight: 600;
  text-align: center;
}

.participants-table td {
  padding: 12px 12px;
  border-bottom: 1px solid #e2e2e2;
  line-height: 1.4;
  font-size: $font-size-xs;
  text-align: center;
}

.participants-table__cell-content {
  display: block;
  max-width: 100%;
  overflow-x: auto;
  overflow-y: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  scrollbar-width: none;
  -ms-overflow-style: none;
}

.participants-table__cell-content::-webkit-scrollbar {
  display: none;
}

.participants-table__cell-content:focus-visible {
  outline: 2px solid $color-primary;
  outline-offset: 2px;
}

.participants-table th:nth-child(4),
.participants-table th:nth-child(5),
.participants-table td:nth-child(4),
.participants-table td:nth-child(5) {
  text-align: left;
}

.participants-table tbody tr:last-child td {
  border-bottom: none;
}

.participants-table tbody tr:hover {
  background-color: rgba(0, 0, 0, 0.03);
}

.participants-table__number {
  width: 55px;
}

.participants-table__empty {
  padding: 30px !important;
  text-align: center !important;
}

.participants-dialog__actions {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  width: 100%;
  padding: 5px 15px 0 0;
}

.participants-dialog__pagination {
  flex-shrink: 0;
  margin-left: 18px;
  padding-bottom: 5px;
}

.participants-dialog__close {
  flex-shrink: 0;
  margin-left: auto;
}

@media (max-width: 700px) {
  .participants-table {
    min-width: 650px;
  }

  .participants-table-wrapper .participants-table thead th {
    background-color: $color-surface;
  }
}

@media (max-width: 600px) {
  .participants-dialog__actions {
    flex-direction: column;
    align-items: center;
  }

  .participants-dialog__pagination,
  .participants-dialog__close {
    margin-left: 0;
  }
}
</style>
