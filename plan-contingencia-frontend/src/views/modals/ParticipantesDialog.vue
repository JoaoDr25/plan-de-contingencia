<template>

    <BaseDialog v-model="dialog" title="Participantes del plan" width="850px">

        <div class="participants-dialog">

            <div class="participants-dialog__info">

                <div class="info-item">

                    <span class="info-label">
                        Programa de formación
                    </span>

                    <span class="info-value">
                        {{ plan.programaFormacionNombre || 'No registrado' }}
                    </span>

                </div>


                <div class="info-item">

                    <span class="info-label">
                        Nivel de formación
                    </span>

                    <span class="info-value">
                        {{ plan.programaFormacionNivel || 'No registrado' }}
                    </span>

                </div>


                 <div class="info-item">

                    <span class="info-label">
                        Ficha
                    </span>

                    <span class="info-value">
                        {{ plan.ficha || 'No registrada' }}
                    </span>

                </div>


                <div class="info-item">

                    <span class="info-label">
                        Total aprendices
                    </span>

                    <span class="info-value">
                        {{ participants.length }}
                    </span>

                </div>

            </div>

            <div class="participants-table-wrapper">

                <table class="participants-table">

                    <thead>

                        <tr>
                            <th class="participants-table__number">
                                N
                            </th>

                            <th>
                                TIPO DE DOCUMENTO
                            </th>

                            <th>
                                DOCUMENTO
                            </th>

                            <th>
                                NOMBRE COMPLETO
                            </th>

                            <th class="participants-table__status">
                                ESTADO
                            </th>
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
                                {{ participant.nombreCompleto || 'No disponible' }}
                            </td>

                            <td class="participants-table__status">

                                <StatusChip :status="participant.estado" />

                            </td>

                        </tr>

                        <tr v-if="!participants.length">

                            <td colspan="4" class="participants-table__empty">
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
import StatusChip from 'src/components/states/StatusChip.vue'

const props = defineProps({

    modelValue: {
        type: Boolean,
        required: true
    },
    plan: {
        type: Object,
        required: true
    },
    participants: {
        type: Array,
        default: () => []
    }
})

const emit = defineEmits([
    'update:modelValue'
])

const dialog = computed({

    get() {
        return props.modelValue
    },
    set(value) {
        emit('update:modelValue', value)
    }
})

function closeDialog() {
    dialog.value = false
}

</script>

<style scoped lang="scss">

@use 'src/css/variables.scss' as *;
@use 'src/css/typography.scss' as *;

.participants-dialog {
    width: 100%;
}

.participants-dialog__info {
    display: grid;
    // grid-template-columns:
    //     repeat(4, minmax(0, 1fr));
        grid-template-columns:
        1.5fr 1.5fr 1fr 1fr;
    gap: 15px;
    margin: 20px 5px 35px 5px;
    // margin: 10px 0 20px 0;
    justify-items: center;
    text-align: center;
}

.info-item {
    display: flex;
    flex-direction: column;
    gap: 4px;
    min-width: 0;
    align-items: center;
    text-align: center;
}

.info-label {
    font-size: $font-size-sm;
    font-weight: 600;
    text-transform: uppercase;
    color: #287C2D;
}

.info-value {
    font-size: $font-size-md;
    line-height: 1.2;
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
    font-size: 13px;
}

.participants-table th {
    position: sticky;
    top: 0;
    z-index: 1;
    padding: 10px 12px;
    border-top: 1px solid #D6D6D6;
    border-bottom: 1px solid #D6D6D6;
    background-color: #FAFAFA;
    font-size: $font-size-xs;
    font-weight: 600;
    text-align: left;
}

.participants-table td {
    padding: 12px 12px;
    border-bottom: 1px solid #E2E2E2;
    line-height: 1.4;
    font-size: $font-size-md;
}

.participants-table tbody tr:last-child td {
    border-bottom: none;
}

.participants-table tbody tr:hover {
    background-color: #FAFAFA;
}

.participants-table__number {
    width: 55px;
    text-align: center !important;
}

.participants-table__status {
    width: 110px;
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

    .participants-dialog__info {
        grid-template-columns: 1fr;
        gap: 0;
        text-align: center;
        margin-bottom: 0;
    }

    .info-item {
        align-items: center;
        margin-bottom: 10px;
    }

    .participants-table {
        min-width: 650px;
    }
}
</style>