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
        status: 'pendiente',
        statusLabel: 'PENDIENTE',
        date: '00/00/0000 00:00 a. m.'
    },
    {
        id: 'sst',
        title: 'REVISIÓN POR SST',
        status: 'pendiente',
        statusLabel: 'PENDIENTE',
        date: '00/00/0000 00:00 a. m.'
    },
    {
        id: 'coordinacion',
        title: 'APROBACIÓN POR COORDINACIÓN',
        status: 'pendiente',
        statusLabel: 'PENDIENTE',
        date: '00/00/0000 00:00 a. m.'
    }
])
</script>

<style scoped lang="scss">

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
    background-color: #eaf5eb;
    color: #2e7d32;
    font-size: 22px;
}

.section-header h2 {
    margin: 0;
    color: #18732b;
    font-size: 20px;
    font-weight: 700;
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

    color: #18732b;
    font-size: 14px;
    font-weight: 700;
}

.status-badge {
    display: inline-block;

    padding: 5px 12px;
    border-radius: 4px;

    font-size: 12px;
    font-weight: 700;
}

.status-proceso {
    background-color: #4caf50;
    color: #fff;
}

.status-pendiente {
    background-color: #f4b400;
    color: #fff;
}

.review-content p {
    margin: 8px 0 0;

    color: #333;
    font-size: 13px;
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