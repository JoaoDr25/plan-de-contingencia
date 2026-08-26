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
.plan-work-plan {
    width: 100%;
}

.work-plan-table {
    display: grid;
    width: 100%;
}

.work-plan-header,
.work-plan-row {
    display: grid;
    grid-template-columns:
        120px minmax(0, 2fr) minmax(0, 1.5fr) minmax(0, 1.5fr);

    column-gap: 32px;
    align-items: center;
}

.work-plan-header {
    padding-bottom: 8px;
    border-bottom: 1px solid #e0e0e0;

    font-size: 11px;
    font-weight: 700;
    text-transform: uppercase;
    color: #287C2D;
}

.work-plan-row {
    min-height: 38px;
    padding: 9px 0;

    border-bottom: 1px solid #f0f0f0;
}

.work-plan-row:last-child {
    border-bottom: none;
}

.work-plan__value {
    font-size: 13px;
    line-height: 1.4;
    color: #222222;
    word-break: break-word;
}

.work-plan-empty {
    font-size: 13px;
    color: #666666;
}
</style>