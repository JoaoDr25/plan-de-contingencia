<template>

    <div class="plan-general-info">

        <div class="info-item">
            <span class="info-item__label">
                Programa de Formación
            </span>

            <span class="info-item__value">
                {{ plan.programaFormacionNombre || 'No disponible' }}
            </span>
        </div>


        <div class="info-item">
            <span class="info-item__label">
                Lugar de Salida
            </span>

            <span class="info-item__value">
                {{ plan.lugarSalida || 'No disponible' }}
            </span>
        </div>


        <div class="info-item">
            <span class="info-item__label">
                Clasificación de la Información
            </span>

            <span class="info-item__value">
                {{ formatClassification(plan.clasificacionInformacion) }}
            </span>
        </div>


        <div class="info-item">
            <span class="info-item__label">
                Actividad
            </span>

            <span class="info-item__value">
                {{ plan.descripcionActividad || 'No disponible' }}
            </span>
        </div>


        <div class="info-item">
            <span class="info-item__label">
                Lugar de Destino
            </span>

            <span class="info-item__value">
                {{ plan.lugarDestino || 'No disponible' }}
            </span>
        </div>


        <div class="info-item">
            <span class="info-item__label">
                Transporte
            </span>

            <span class="info-item__value">
                {{ formatTransport(plan.tipoTransporte) }}
            </span>
        </div>


        <div class="info-item">
            <span class="info-item__label">
                Descripción de la Actividad
            </span>

            <span class="info-item__value">
                {{ plan.descripcionActividad || 'No registrada' }}
            </span>
        </div>


        <div class="info-item">
            <span class="info-item__label">
                Fecha de Salida
            </span>

            <span class="info-item__value">
                {{ formatDate(plan.fecha) }}
            </span>
        </div>


        <div class="info-item">
            <span class="info-item__label">
                Hora de Salida
            </span>

            <span class="info-item__value">
                {{ formatHour(plan.horaSalida) }}
            </span>
        </div>
        <!-- 
        <div class="info-item">
            <span class="info-item__label">
                Código del Plan
            </span>

            <span class="info-item__value">
                N.º {{ plan.numero ?? 'No disponible' }}
            </span>
        </div> -->

    </div>

</template>

<script setup>

import { formatDate, formatHour } from 'src/utils/date.utils'

defineProps({

    plan: {
        type: Object,
        required: true
    }
})

function formatTransport(value) {

    const transportTypes = {
        SENA: 'Transporte SENA',
        EXTERNO: 'Transporte externo',
        APRENDIZ: 'Transporte del aprendiz'
    }
    return transportTypes[value] || 'No disponible'
}


function formatClassification(value) {

    const classifications = {
        publica: 'Pública',
        clasificada: 'Clasificada',
        reservada: 'Reservada'
    }
    return classifications[value] || 'No disponible'
}

</script>

<style scoped lang="scss">

.plan-general-info {
    display: grid;
    grid-template-columns:
        repeat(3, minmax(0, 1fr));
    column-gap: 40px;
    row-gap: 22px;
}

.info-item {
    display: flex;
    flex-direction: column;
    gap: 5px;
}

.info-item__label {
    font-size: 11px;
    font-weight: 700;
    text-transform: uppercase;
    color: #287C2D;
}

.info-item__value {
    font-size: 13px;
    line-height: 1.4;
    color: #222222;
    word-break: break-word;
}
</style>