<template>

    <div class="plan-work-plan">

        <div v-if="plan.planTrabajo?.length" class="work-plan-table">

            <div class="work-plan-header">

                <span>Hora de inicio</span>

                <span>Actividad</span>

                <span>Duración</span>

                <span>Lugar</span>

            </div>

            <div v-for="(item, index) in plan.planTrabajo" :key="index" class="work-plan-row">

                <span class="work-plan__value">
                    {{ formatHour(item.horaInicio) }}
                </span>

                <span class="work-plan__value">
                    {{ item.actividad || 'No registrado' }}
                </span>

                <span class="work-plan__value">
                    {{ item.duracion || 'No registrado' }}
                </span>

                <span class="work-plan__value">
                    {{ item.lugar || 'No registrado' }}
                </span>

            </div>
        </div>

        <div v-else class="work-plan-empty">
            No hay actividades registradas en el plan de trabajo.
        </div>

    </div>

</template>

<script setup>

import { formatHour } from 'src/utils/date.utils'

defineProps({

    plan: {
        type: Object,
        required: true
    }
})

</script>

<style scoped lang="scss">

@use 'src/css/variables.scss' as *;
@use 'src/css/typography.scss' as *;

.plan-work-plan {
    width: 100%;
    padding-bottom: 8px;
}

.work-plan-table {
    display: grid;
    width: 100%;
}

.work-plan-header,
.work-plan-row {
    display: grid;
    grid-template-columns:
        120px minmax(0, 2.2fr) minmax(75px, 0.5fr) minmax(0, 1.4fr);
    column-gap: 32px;
    align-items: center;
}

.work-plan-header {
    padding-bottom: 8px;
    border-bottom: 1px solid #e0e0e0;
    font-size: $font-size-xs;
    font-weight: 700;
    text-transform: uppercase;
    color: $color-primary;
}

.work-plan-row {
    padding: 10px 0;
    border-bottom: 1px solid #f0f0f0;
}

.work-plan-row:last-child {
    border-bottom: none;
}

.work-plan__value {
    min-width: 0;
    font-size: $font-size-md;
    line-height: 1.4;
    word-break: break-word;
    overflow-wrap: anywhere;
}

.work-plan-empty {
    font-size: $font-size-md;
    line-height: 1.4;
}

@media (max-width: 900px) {

    .work-plan-header {
        display: none;
    }

    .work-plan-table {
        display: flex;
        flex-direction: column;
        gap: 10px;
    }

    .work-plan-row {
        display: grid;
        grid-template-columns: minmax(0, 1fr) minmax(80px, 0.45fr);
        column-gap: 20px;
        row-gap: 12px;
        min-height: auto;
        padding: 12px 14px;
        border: 1px solid #e0e0e0;
        border-radius: 4px;
        background-color: #ffffff;
    }

    .work-plan-row:last-child {
        border-bottom: 1px solid #e0e0e0;
    }

    .work-plan__value {
        display: flex;
        flex-direction: column;
        gap: 3px;
        min-width: 0;
        font-size: $font-size-md;
        line-height: 1.35;
    }

    .work-plan__value::before {
        font-size: $font-size-xs;
        font-weight: 700;
        text-transform: uppercase;
        color: $color-primary;
        line-height: 1.2;
    }

    .work-plan__value:nth-child(1) {
        grid-column: 1;
    }

    .work-plan__value:nth-child(1)::before {
        content: 'Hora de inicio';
    }

    .work-plan__value:nth-child(3) {
        grid-column: 2;
        grid-row: 1;
    }

    .work-plan__value:nth-child(3)::before {
        content: 'Duración';
    }

    .work-plan__value:nth-child(2) {
        grid-column: 1 / -1;
        grid-row: 2;
    }

    .work-plan__value:nth-child(2)::before {
        content: 'Actividad';
    }

    .work-plan__value:nth-child(4) {
        grid-column: 1 / -1;
        grid-row: 3;
    }

    .work-plan__value:nth-child(4)::before {
        content: 'Lugar';
    }

}

@media (max-width: 600px) {

    .work-plan-row {
        grid-template-columns: 1fr;
        padding: 8px;
        gap: 9px;
    }

     .work-plan__value {
        font-size: $font-size-xs;
    }

    .work-plan__value:nth-child(1) {
        grid-column: 1;
        grid-row: 1;
    }

    .work-plan__value:nth-child(3) {
        grid-column: 1;
        grid-row: 2;
    }

    .work-plan__value:nth-child(2) {
        grid-row: 3;
    }

    .work-plan__value:nth-child(4) {
        grid-row: 4;
    }
}

</style>