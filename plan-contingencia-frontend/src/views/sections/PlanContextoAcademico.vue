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

@use 'src/css/variables.scss' as *;
@use 'src/css/typography.scss' as *;

.plan-academic-context {
    display: grid;
    grid-template-columns:
        1.2fr 1fr 1fr;
    column-gap: 40px;
    row-gap: 24px;
    padding-bottom: 8px;
    padding-right: 8px;
}

.info-item {
    display: flex;
    flex-direction: column;
    gap: 7px;
    line-height: 1.3;
    min-width: 0;
}

.info-item__label {
    font-size: $font-size-xs;
    font-weight: 700;
    text-transform: uppercase;
    color: #287C2D;
    line-height: 1.2;
}

.info-item__value {
    font-size: $font-size-md;
    line-height: 1.4;
    color: #222222;
    word-break: break-word;
}

@media (max-width: 1000px) {

    .plan-academic-context {
        grid-template-columns: repeat(2, minmax(0, 1fr));
        column-gap: 30px;
        row-gap: 22px;
    }

}

@media (max-width: 600px) {

    .plan-academic-context {
        grid-template-columns: 1fr;
        column-gap: 0;
        row-gap: 18px;
    }

    .info-item {
        gap: 6px;
    }

    .info-item__label {
        font-size: $font-size-xs;
        line-height: 1.25;
    }

    .info-item__value {
        font-size: $font-size-xs;
        line-height: 1.4;
    }
}
</style>