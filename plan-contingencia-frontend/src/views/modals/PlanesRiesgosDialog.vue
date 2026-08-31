<template>

    <BaseDialog v-model="dialog" :title="dialogTitle" width="1200px">

        <div class="risks-table-wrapper">

            <table class="risks-table">

                <thead>

                    <tr>

                        <th class="risks-table__number">
                            N
                        </th>

                        <th>
                            Riesgo
                        </th>

                        <th class="risks-table__level">
                            Nivel
                        </th>

                        <th>
                            Consecuencia
                        </th>

                        <th>
                            Prevención
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
 
.risks-table-wrapper {
    width: 100%;
    overflow-x: auto;
}

.risks-table {
    width: 100%;
    border-collapse: collapse;
    font-size: 12px;
    table-layout: auto;
}

.risks-table th {
    padding: 15px 12px;
    text-align: left;
    font-size: 10px;
    font-weight: 700;
    text-transform: uppercase;
    color: #287C2D;
    background: #F5F5F5;
    border-top: 1px solid #D9D9D9;
    border-bottom: 1px solid #D9D9D9;
}

.risks-table td {
    padding: 12px 12px;
    vertical-align: top;
    color: #333333;
    border-bottom: 1px solid #E5E5E5;
    line-height: 1.4;
}

.risks-table tbody tr:last-child td {
    border-bottom: none;
}

.risks-table tbody tr:hover {
    background: #FAFAFA;
}

.risks-table__number {
    width: 55px;
    text-align: center !important;
}

.risks-table__level {
    width: 80px;
    text-align: center !important;
}

.risks-table__empty {
    padding: 30px !important;
    text-align: center !important;
    color: #666666 !important;
}

.risk-level {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-width: 55px;
    padding: 4px 8px;
    border-radius: 4px;
    font-size: 100px;
    text-align: center !important;
}

.risks-table__empty {
    padding: 30px !important;
    text-align: center !important;
    color: #666666 !important
}

.risks-dialog__actions {
    display: flex;
    justify-content: flex-end;
    width: 100%;
    padding-right: 0;
}

@media (max-width: 700px) {

    .risks-table {
        min-width: 650px;
    }
}

</style>