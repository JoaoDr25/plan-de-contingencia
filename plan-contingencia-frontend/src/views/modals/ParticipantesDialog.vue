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
            <tr v-for="(participant, index) in participants" :key="participant._id">
              <td class="participants-table__number">
                {{ index + 1 }}
              </td>

              <td>
                {{ participant.tipo || participant.tipoDocumento || 'No disponible' }}
              </td>

              <td>
                {{ participant.numeroDocumento || 'No disponible' }}
              </td>

              <td>
                {{ getParticipantNames(participant).names }}
              </td>

              <td>
                {{ getParticipantNames(participant).surnames }}
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
        <SecondaryActionButton label="Cerrar" icon="close" size="sm" @click="closeDialog" />
      </div>
    </template>
  </BaseDialog>
</template>

<script setup>
import { computed } from 'vue'

import BaseDialog from 'src/components/forms/BaseDialog.vue'
import SecondaryActionButton from 'src/components/actions/SecondaryActionButton.vue'

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
  font-size: 13px;
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
  background-color: #fafafa;
  font-size: $font-size-xs;
  font-weight: 600;
  text-align: left;
}

.participants-table td {
  padding: 12px 12px;
  border-bottom: 1px solid #e2e2e2;
  line-height: 1.4;
  font-size: $font-size-md;
}

.participants-table tbody tr:last-child td {
  border-bottom: none;
}

.participants-table tbody tr:hover {
  background-color: #fafafa;
}

.participants-table__number {
  width: 55px;
  text-align: center !important;
}

.participants-table__empty {
  padding: 30px !important;
  text-align: center !important;
}

.participants-dialog__actions {
  display: flex;
  justify-content: flex-end;
  width: 100%;
  padding: 5px 28px 0 0;
}

@media (max-width: 700px) {
  .participants-table {
    min-width: 650px;
  }
}
</style>
