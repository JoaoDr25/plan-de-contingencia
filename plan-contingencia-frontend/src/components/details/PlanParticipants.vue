<template>

    <div class="plan-participants">

        <!-- Resumen -->
        <div class="participants-summary">

            <div class="summary-item">

                <span class="summary-item__label">
                    Programa de formación
                </span>

                <span class="summary-item__value">
                    {{ plan.programaFormacionNombre || 'No registrado' }}
                </span>

            </div>


            <div class="summary-item">

                <span class="summary-item__label">
                    Ficha
                </span>

                <span class="summary-item__value">
                    {{ plan.ficha || 'No registrada' }}
                </span>

            </div>


            <div class="summary-item">

                <span class="summary-item__label">
                    Total aprendices
                </span>

                <span class="summary-item__value">
                    {{ participants.length }}
                </span>

            </div>

            <div class="participants-action">

                <button v-if="participants.length" type="button" class="participants-action__button"
                    @click="showDialog = true">

                    <span>
                        Ver participantes
                    </span>

                    <span class="participants-action__icon">
                        <q-icon name="group" size="15px" />
                    </span>

                </button>

                <span v-else class="participants-action__empty">
                    No hay aprendices registrados en el plan.
                </span>

            </div>

        </div>

        <q-dialog v-model="showDialog">

            <q-card class="participants-dialog">

                <q-card-section class="participants-dialog__header">

                    <div class="participants-dialog__title">
                        Participantes del plan
                    </div>

                    <q-btn flat round dense icon="close" class="participants-dialog__close"
                        @click="showDialog = false" />

                </q-card-section>


                <q-separator />


                <q-card-section class="participants-dialog__content">

                    <div class="participants-dialog__info">

                        <div>

                            <span class="info-label">
                                Programa de formación
                            </span>

                            <span class="info-value">
                                {{ plan.programaFormacionNombre || 'No registrado' }}
                            </span>

                        </div>


                        <div>

                            <span class="info-label">
                                Ficha
                            </span>

                            <span class="info-value">
                                {{ plan.ficha || 'No registrada' }}
                            </span>

                        </div>


                        <div>

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
                                        N.º
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
                                        {{ participant.numeroDocumento }}
                                    </td>

                                    <td>
                                        {{ participant.nombreCompleto }}
                                    </td>

                                    <td class="participants-table__status">

                                        <span class="status" :class="{
                                            'status--active':
                                                participant.estado === 'activo',
                                            'status--inactive':
                                                participant.estado !== 'activo'
                                        }">
                                            {{ formatStatus(participant.estado) }}
                                        </span>

                                    </td>

                                </tr>

                            </tbody>

                        </table>

                    </div>

                </q-card-section>


                <q-separator />


                <q-card-actions align="right" class="participants-dialog__actions">

                    <q-btn flat label="Cerrar" class="participants-dialog__close-button" @click="showDialog = false" />

                </q-card-actions>

            </q-card>

        </q-dialog>

    </div>

</template>


<script setup>

import { ref, computed } from 'vue'

import { MOCK_APRENDICES } from 'src/mocks/planes.mock'

const props = defineProps({

    plan: {
        type: Object,
        required: true
    }
})

const showDialog = ref(false)

const participants = computed(() => {

    const ids = props.plan.aprendicesId || []

    return ids
        .map(id =>
            MOCK_APRENDICES.find(
                aprendiz => aprendiz._id === id
            )
        )
        .filter(Boolean)

})

function formatStatus(status) {

    if (status === 'activo') {
        return 'Activo'
    }

    if (status === 'inactivo') {
        return 'Inactivo'
    }

    return status || 'No registrado'
}

</script>

<style scoped lang="scss">
.plan-participants {
    display: flex;
    flex-direction: column;
    gap: 18px;
}

.participants-summary {
    display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    column-gap: 40px;
}

.summary-item {
    display: flex;
    flex-direction: column;
    gap: 5px;
}

.summary-item__label {
    font-size: 11px;
    font-weight: 700;
    text-transform: uppercase;
    color: #287C2D;
}

.summary-item__value {
    font-size: 13px;
    color: #222222;
}

.participants-action {
    display: flex;
    align-items: center;
}

.participants-action__button {
    display: inline-flex;
    align-items: center;
    gap: 7px;
    padding: 0;
    border: none;
    background: transparent;
    color: #444444;
    font-size: 13px;
    font-weight: 600;
    cursor: pointer;
}

.participants-action__button:hover {
    color: #287C2D;
}

.participants-action__icon {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 22px;
    height: 22px;
    border: 1px solid #BDBDBD;
    border-radius: 3px;
    color: #555555;
}

.participants-action__button:hover .participants-action__icon {
    border-color: #287C2D;
    color: #287C2D;
}

.participants-action__empty {
    font-size: 13px;
    color: #666666;
}

.participants-dialog {
    width: 850px;
    max-width: 90vw;
    border-radius: 6px;
}

.participants-dialog__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 16px 20px;
}

.participants-dialog__title {
    font-size: 17px;
    font-weight: 700;
    color: #222222;
}

.participants-dialog__close {
    color: #555555;
}

.participants-dialog__content {
    padding: 20px;
}

.participants-dialog__info {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 25px;
    margin-bottom: 20px;
}

.participants-dialog__info>div {
    display: flex;
    flex-direction: column;
    gap: 4px;
}

.info-label {
    font-size: 10px;
    font-weight: 700;
    text-transform: uppercase;
    color: #287C2D;
}

.info-value {
    font-size: 13px;
    color: #222222;
}

.participants-table-wrapper {
    width: 100%;
    overflow-x: auto;
}

.participants-table {
    width: 100%;
    border-collapse: collapse;
    font-size: 13px;
}

.participants-table th {
    padding: 10px 12px;
    border-top: 1px solid #D6D6D6;
    border-bottom: 1px solid #D6D6D6;
    background-color: #FAFAFA;
    color: #287C2D;
    font-size: 10px;
    font-weight: 700;
    text-align: left;
}

.participants-table td {
    padding: 11px 12px;
    border-bottom: 1px solid #E2E2E2;
    color: #333333;
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

.status {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-width: 70px;
    padding: 4px 10px;
    border-radius: 4px;
    font-size: 10px;
    font-weight: 700;
}

.status--active {
    background-color: #DFF0E1;
    color: #287C2D;
}

.status--inactive {
    background-color: #F8D7DA;
    color: #B42318;
}

.participants-dialog__actions {
    padding: 10px 20px;
}

.participants-dialog__close-button {
    color: #555555;
}

@media (max-width: 700px) {

    .participants-summary {
        grid-template-columns: 1fr;
        row-gap: 15px;
    }

    .participants-dialog__info {
        grid-template-columns: 1fr;
    }
}
</style>