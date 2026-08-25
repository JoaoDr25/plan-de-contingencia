<template>

    <div class="plan-academic-context">

        <div class="info-item">
            <span class="info-item__label">
                Objetivo de la actividad
            </span>

            <span class="info-item__value">
                {{ plan.contextoAcademico?.objetivo || 'No disponible' }}
            </span>
        </div>


        <div class="info-item">
            <span class="info-item__label">
                Competencias a desarrollar
            </span>

            <span class="info-item__value">
                {{ plan.contextoAcademico?.competencia || 'No disponible' }}
            </span>
        </div>


        <div class="info-item">
            <span class="info-item__label">
                Resultados de aprendizaje esperados
            </span>

            <span class="info-item__value">
                {{ plan.contextoAcademico?.resultadoAprendizaje || 'No disponible' }}
            </span>
        </div>

    </div>

</template>

<script setup>

defineProps({

    plan: {
        type: Object,
        required: true
    }
})

</script>

<style scoped lang="scss">

.plan-academic-context {
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