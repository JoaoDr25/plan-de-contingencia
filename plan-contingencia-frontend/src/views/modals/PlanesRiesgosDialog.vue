<template>

    <BaseDialog v-model="dialog" :title="dialogTitle" width="1100px">

        <div class="risks-dialog">

            <div class="risks-table-wrapper">

                <table class="risks-table">

                    <thead>

                        <tr>

                            <th class="risks-table__number">
                                N
                            </th>

                            <th>
                                RIESGO
                            </th>

                            <th class="risks-table__level">
                                NIVEL
                            </th>

                            <th>
                                CONSECUENCIA
                            </th>

                            <th>
                                PREVENCIÓN
                            </th>

                        </tr>

                    </thead>

                    <tbody>

                        <tr v-for="(risk, index) in risks" :key="risk._id">

                            <td class="risks-table__number">
                                {{ index + 1 }}
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
                                {{ risk.prevencion || 'No disponible' }}
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
                <SecondaryActionButton label="Cerrar" icon="close" size="sm" @click="closeDialog" />
            </div>

        </template>

    </BaseDialog>

</template>

<script setup>

import { computed } from 'vue'

import BaseDialog from 'src/components/forms/BaseDialog.vue'
import SecondaryActionButton from 'src/components/actions/SecondaryActionButton.vue'
import LevelChip from 'src/components/states/LevelChip.vue'

const props = defineProps({

    modelValue: {
        type: Boolean,
        required: true
    },
    danger: {
        type: Object,
        default: null
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

const dialogTitle = computed(() => {

    const dangerName = props.danger?.nombre
    return dangerName
        ? `${dangerName}`
        : 'No Identificado'
})

const risks = computed(() => {
    return props.danger?.riesgos ?? []
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
    max-height: min(320px, 45vh);
    overflow-x: auto;
    overflow-y: auto;
}

.risks-table {
    width: 100%;
    border-collapse: collapse;
}

.risks-table th {
    position: sticky;
    top: 0;
    z-index: 1;
    padding: 10px 12px;
    border-top: 1px solid #D6D6D6;
    border-bottom: 1px solid #D6D6D6;
    background-color: $color-surface;
    font-size: $font-size-xs;
    font-weight: 600;
    text-align: left;
}

.risks-table td {
    padding: 12px 12px;
    border-bottom: 1px solid #E2E2E2;
    line-height: 1.4;
    font-size: $font-size-md;
}

.risks-table tbody tr:last-child td {
    border-bottom: none;
}

.risks-table tbody tr:hover {
    background-color: $color-surface;
}

.risks-table__number {
    width: 55px;
    text-align: center !important;
}

.risks-table__level {
    width: 110px;
    text-align: center !important;
}

.risks-table__empty {
    padding: 30px !important;
    text-align: center !important;
}

.risks-dialog__actions {
    display: flex;
    justify-content: flex-end;
    width: 100%;
    padding: 5px 5px 0 0;
}

@media (max-width: 700px) {

    .risks-table {
        min-width: 650px;
    }
}

</style>