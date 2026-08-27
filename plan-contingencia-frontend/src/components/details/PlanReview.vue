<template>
    <section class="plan-section">

        <div class="review-flow">

            <div
                v-for="step in reviewSteps"
                :key="step.id"
                class="review-step"
            >
                <div class="review-content">

                    <h3>{{ step.title }}</h3>

                    <span
                        class="status-badge"
                        :class="`status-${step.status}`"
                    >
                        {{ step.statusLabel }}
                    </span>

                    <p>
                        {{ step.date }}
                    </p>

                </div>
            </div>

        </div>

    </section>
</template>


<script setup>
import { computed } from 'vue'

const props = defineProps({
    plan: {
        type: Object,
        required: true
    }
})

function getReviewStatus(role) {
    return props.plan.aprobaciones?.[role] ?? 'pendiente'
}

function getReviewStatusLabel(role) {
    return getReviewStatus(role).toUpperCase()
}

const formatDateTime = (value) => {
    if (!value) {
        return '00/00/0000 00:00 a. m.'
    }

    const date = new Date(value)

    if (Number.isNaN(date.getTime())) {
        return '00/00/0000 00:00 a. m.'
    }

    return new Intl.DateTimeFormat('es-CO', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
    }).format(date)
}


const reviewSteps = computed(() => [
    {
        id: 'generacion',
        title: 'GENERACIÓN DEL PLAN',
        status: 'proceso',
        statusLabel: 'EN PROCESO',
        date: formatDateTime(props.plan.createdAt)
    },
    {
        id: 'pedagogia',
        title: 'REVISIÓN POR PEDAGOGÍA',
        status: getReviewStatus('pedagogia'),
        statusLabel: getReviewStatusLabel('pedagogia'),
        date: '00/00/0000 00:00 a. m.'
    },
    {
        id: 'sst',
        title: 'REVISIÓN POR SST',
        status: getReviewStatus('sst'),
        statusLabel: getReviewStatusLabel('sst'),
        date: '00/00/0000 00:00 a. m.'
    },
    {
        id: 'coordinacion',
        title: 'APROBACIÓN POR COORDINACIÓN',
        status: getReviewStatus('coordinacion'),
        statusLabel: getReviewStatusLabel('coordinacion'),
        date: '00/00/0000 00:00 a. m.'
    }
])
</script>

<style scoped lang="scss">

@use 'src/css/variables.scss' as *;
@use 'src/css/typography.scss' as *;

.plan-section {
    width: 100%;
}

.section-header {
    display: flex;
    align-items: center;
    gap: 14px;
    margin-bottom: 20px;
}

.section-icon {
    width: 38px;
    height: 38px;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: $color-background-field;
    color: $color-success;
}

.section-header h2 {
    margin: 0;
    color: $color-success;
}

.review-flow {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
}

.review-step {
    padding: 0 28px;
    min-height: 100px;
}

.review-step:first-child {
    padding-left: 0;
}

.review-step:last-child {
    padding-right: 0;
}

.review-step + .review-step {
    border-left: 1px dotted #999;
}

.review-content h3 {
    margin: 0 0 10px;
    color: $color-success;
    font-size: $font-size-sm;
    font-weight: 700;
}

.status-badge {
    display: inline-block;
    padding: 5px 12px;
    border-radius: 4px;
    font-size: $font-size-xs;
    font-weight: 500;
}

.status-proceso {
    background-color: $color-success;
    color: $color-surface;
}

.status-pendiente {
    background-color: $color-warning;
    color: $color-surface;
}

.status-aprobado {
    background-color: $color-success;
    color: $color-surface;
}

.review-content p {
    margin: 8px 0 0;
    color: #333;
    font-size: $font-size-xs;
}

@media (max-width: 900px) {
    .review-flow {
        grid-template-columns: 1fr 1fr;
        gap: 24px 0;
    }

    .review-step:nth-child(3) {
        border-left: none;
        padding-left: 0;
    }
}

@media (max-width: 600px) {
    .review-flow {
        grid-template-columns: 1fr;
    }

    .review-step,
    .review-step:first-child,
    .review-step:last-child {
        padding: 0;
    }

    .review-step + .review-step {
        border-left: none;
        border-top: 1px dotted #999;
        padding-top: 18px;
    }
}

</style>