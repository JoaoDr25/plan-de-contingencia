<template>

    <q-dialog v-model="dialog">

        <q-card class="risks-dialog">

            <q-card-section class="risks-dialog__header">

                <div>

                    <span class="risks-dialog__label">
                        Peligro identificado
                    </span>

                    <h3 class="risks-dialog__title">
                        {{ danger?.nombre }}
                    </h3>

                </div>

                <q-btn
                    flat
                    round
                    dense
                    icon="close"
                    @click="closeDialog"
                />

            </q-card-section>

            <q-separator />

            <q-card-section class="risks-dialog__body">

                <div class="risks-table-wrapper">

                    <table class="risks-table">

                        <thead>

                            <tr>
                                <th>N.º</th>
                                <th>Riesgo</th>
                                <th>Nivel</th>
                                <th>Consecuencia</th>
                                <th>Prevención</th>
                            </tr>

                        </thead>

                        <tbody>

                            <tr
                                v-for="(risk, index) in risks"
                                :key="risk._id"
                            >

                                <td class="risks-table__number">
                                    {{ index + 1 }}
                                </td>

                                <td>
                                    {{ risk.riesgo || 'No disponible' }}
                                </td>

                                <td>

                                    <span
                                        class="risk-level"
                                        :class="getRiskLevelClass(risk.nivel)"
                                    >
                                        {{ risk.nivel || 'No disponible' }}
                                    </span>

                                </td>

                                <td>
                                    {{ risk.consecuencia || 'No disponible' }}
                                </td>

                                <td>
                                    {{ risk.prevencion || 'No disponible' }}
                                </td>

                            </tr>

                            <tr v-if="!risks.length">

                                <td
                                    colspan="5"
                                    class="risks-table__empty"
                                >
                                    No hay riesgos asociados a este peligro.
                                </td>

                            </tr>

                        </tbody>

                    </table>

                </div>

            </q-card-section>

            <q-card-actions
                align="right"
                class="risks-dialog__actions"
            >

                <q-btn
                    flat
                    label="Cerrar"
                    @click="closeDialog"
                />

            </q-card-actions>

        </q-card>

    </q-dialog>

</template>

<script setup>

import { computed } from 'vue'

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

const risks = computed(() => {

    return props.danger?.riesgos ?? []

})

function closeDialog() {

    dialog.value = false

}

function getRiskLevelClass(level) {

    const normalizedLevel = String(level || '').toLowerCase()

    return {

        'risk-level--high':
            normalizedLevel === 'alto',

        'risk-level--medium':
            normalizedLevel === 'medio',

        'risk-level--low':
            normalizedLevel === 'bajo'

    }

}

</script>

<style scoped lang="scss">

.risks-dialog {
    width: 95vw;
    max-width: 1200px;
}

.risks-dialog__header {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 20px;
}

.risks-dialog__label {
    display: block;
    margin-bottom: 5px;
    font-size: 11px;
    font-weight: 700;
    text-transform: uppercase;
    color: #287C2D;
}

.risks-dialog__title {
    margin: 0;
    font-size: 17px;
    font-weight: 700;
    color: #222222;
}

.risks-dialog__body {
    padding: 20px;
}

.risks-table-wrapper {
    width: 100%;
    overflow-x: auto;
}

.risks-table {
    width: 100%;
    border-collapse: collapse;
    font-size: 13px;
}

.risks-table th {
    padding: 12px;
    text-align: left;
    font-size: 11px;
    font-weight: 700;
    text-transform: uppercase;
    color: #287C2D;
    background: #F5F5F5;
    border-bottom: 1px solid #D9D9D9;
}

.risks-table td {
    padding: 12px;
    vertical-align: top;
    color: #333333;
    border-bottom: 1px solid #E5E5E5;
    line-height: 1.4;
}

.risks-table__number {
    width: 55px;
    text-align: center;
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
    font-size: 10px;
    font-weight: 700;
}

.risk-level--high {
    background: #FDECEC;
    color: #B3261E;
}

.risk-level--medium {
    background: #FFF4D6;
    color: #8A6500;
}

.risk-level--low {
    background: #EAF5EC;
    color: #287C2D;
}

.risks-dialog__actions {
    padding: 12px 20px 18px;
}

</style>