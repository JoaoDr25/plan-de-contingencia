<template>

    <div class="plan-academic-supports">

        <div class="support-item">

            <span class="support-item__label">
                Planeación Pedagógica
            </span>

            <a v-if="plan.contextoAcademico?.planeacionPedagogicaLink"
                :href="plan.contextoAcademico.planeacionPedagogicaLink" target="_blank" rel="noopener noreferrer"
                class="support-item__link">
                <span class="support-item__icon">
                    <q-icon name="open_in_new" size="14px" />
                </span>

                <span class="support-item__name">
                    {{ getSupportName(plan.contextoAcademico.planeacionPedagogicaLink) }}
                </span>
            </a>

            <span v-else class="support-item__empty">
                No registrado
            </span>

        </div>

        <div class="support-item">

            <span class="support-item__label">
                Guía de Aprendizaje
            </span>

            <a v-if="plan.contextoAcademico?.guiaAprendizajeLink" :href="plan.contextoAcademico.guiaAprendizajeLink"
                target="_blank" rel="noopener noreferrer" class="support-item__link">
                <span class="support-item__icon">
                    <q-icon name="open_in_new" size="14px" />
                </span>

                <span class="support-item__name">
                    {{ getSupportName(plan.contextoAcademico.guiaAprendizajeLink) }}
                </span>
            </a>

            <span v-else class="support-item__empty">
                No registrado
            </span>

        </div>

        <div class="support-item">

            <span class="support-item__label">
                Otros Soportes
            </span>

            <a v-if="plan.contextoAcademico?.otrosSoportesLink" :href="plan.contextoAcademico.otrosSoportesLink"
                target="_blank" rel="noopener noreferrer" class="support-item__link">
                <span class="support-item__icon">
                    <q-icon name="open_in_new" size="14px" />
                </span>

                <span class="support-item__name">
                    {{ getSupportName(plan.contextoAcademico.otrosSoportesLink) }}
                </span>
            </a>

            <span v-else class="support-item__empty">
                No registrado
            </span>

        </div>

        <div class="support-item">

            <span class="support-item__label">
                Acta de Comportamiento
            </span>

            <a v-if="plan.contextoAcademico?.actasComportamientoLink"
                :href="plan.contextoAcademico.actasComportamientoLink" target="_blank" rel="noopener noreferrer"
                class="support-item__link">
                <span class="support-item__icon">
                    <q-icon name="open_in_new" size="14px" />
                </span>

                <span class="support-item__name">
                    {{ getSupportName(plan.contextoAcademico.actasComportamientoLink) }}
                </span>
            </a>

            <span v-else class="support-item__empty">
                No registrado
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

function getSupportName(link) {

    if (!link) {
        return 'Soporte'
    }

    try {

        const url = new URL(link)

        const fileName = url.pathname
            .split('/')
            .filter(Boolean)
            .pop()

        if (!fileName) {
            return url.hostname
        }

        const decodedName = decodeURIComponent(fileName)

        return decodedName

    } catch {

        return link
    }
}

</script>

<style scoped lang="scss">
@use 'src/css/variables.scss' as *;
@use 'src/css/typography.scss' as *;

.plan-academic-supports {
    display: grid;
    grid-template-columns:
        1fr 1fr 1fr 1fr;
    column-gap: 40px;
    row-gap: 22px;
    padding-bottom: 8px;
    width: 100%;
}

.support-item {
    display: flex;
    flex-direction: column;
    gap: 7px;
    min-width: 0;
    line-height: 1.3;
}

.support-item__label {
    font-size: $font-size-xs;
    font-weight: 700;
    text-transform: uppercase;
    color: $color-primary;
    line-height: 1.2;
}

.support-item__link {
    display: flex;
    align-items: center;
    align-self: flex-start;
    gap: 7px;
    max-width: 100%;
    min-width: 0;
    font-weight: 400;
    color: #333333;
    text-decoration: none;
    font-size: $font-size-md;
    line-height: 1.4;
}

.support-item__link:hover {
    color: $color-primary;
}

.support-item__icon {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 22px;
    height: 22px;
    flex-shrink: 0;
    border: none;
    border-radius: 0;
    color: $color-primary;
    background-color: transparent;
    padding: 0;
}

.support-item__icon :deep(.q-icon) {
    font-size: 20px;
}

.support-item__name {
    min-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.support-item__empty {
    font-size: $font-size-md;
    color: #666666;
    line-height: 1.4;
}

@media (max-width: 1250px) {

    .plan-academic-supports {
        grid-template-columns: repeat(3, minmax(0, 1fr));
    }
}

@media (max-width: 900px) {

    .plan-academic-supports {
        grid-template-columns: repeat(2, minmax(0, 1fr));
        column-gap: 30px;
        row-gap: 22px;
    }
}

@media (max-width: 600px) {

    .plan-academic-supports {
        grid-template-columns: 1fr;
        column-gap: 0;
        row-gap: 18px;
    }

    .support-item {
        gap: 6px;
    }

    .support-item__link {
        width: 100%;
        max-width: 100%;
        font-size: $font-size-xs;
    }
}
</style>