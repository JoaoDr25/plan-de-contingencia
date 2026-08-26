<template>

    <div class="plan-academic-supports">

        <div class="support-item">

            <span class="support-item__label">
                Planeación Pedagógica
            </span>

            <a
                v-if="plan.contextoAcademico?.planeacionPedagogicaLink"
                :href="plan.contextoAcademico.planeacionPedagogicaLink"
                target="_blank"
                rel="noopener noreferrer"
                class="support-item__link"
            >
                <span class="support-item__icon">
                    <q-icon name="open_in_new" size="14px" />
                </span>

                <span class="support-item__name">
                    {{ getSupportName(plan.contextoAcademico.planeacionPedagogicaLink) }}
                </span>
            </a>

            <span
                v-else
                class="support-item__empty"
            >
                No registrado
            </span>

        </div>

        <div class="support-item">

            <span class="support-item__label">
                Guía de Aprendizaje
            </span>

            <a
                v-if="plan.contextoAcademico?.guiaAprendizajeLink"
                :href="plan.contextoAcademico.guiaAprendizajeLink"
                target="_blank"
                rel="noopener noreferrer"
                class="support-item__link"
            >
                <span class="support-item__icon">
                    <q-icon name="open_in_new" size="14px" />
                </span>

                <span class="support-item__name">
                    {{ getSupportName(plan.contextoAcademico.guiaAprendizajeLink) }}
                </span>
            </a>

            <span
                v-else
                class="support-item__empty"
            >
                No registrado
            </span>

        </div>

        <div class="support-item">

            <span class="support-item__label">
                Otros Soportes
            </span>

            <a
                v-if="plan.contextoAcademico?.otrosSoportesLink"
                :href="plan.contextoAcademico.otrosSoportesLink"
                target="_blank"
                rel="noopener noreferrer"
                class="support-item__link"
            >
                <span class="support-item__icon">
                    <q-icon name="open_in_new" size="14px" />
                </span>

                <span class="support-item__name">
                    {{ getSupportName(plan.contextoAcademico.otrosSoportesLink) }}
                </span>
            </a>

            <span
                v-else
                class="support-item__empty"
            >
                No registrado
            </span>

        </div>

        <div class="support-item">

            <span class="support-item__label">
                Acta de Comportamiento
            </span>

            <a
                v-if="plan.contextoAcademico?.actasComportamientoLink"
                :href="plan.contextoAcademico.actasComportamientoLink"
                target="_blank"
                rel="noopener noreferrer"
                class="support-item__link"
            >
                <span class="support-item__icon">
                    <q-icon name="open_in_new" size="14px" />
                </span>

                <span class="support-item__name">
                    {{ getSupportName(plan.contextoAcademico.actasComportamientoLink) }}
                </span>
            </a>

            <span
                v-else
                class="support-item__empty"
            >
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

.plan-academic-supports {
    display: grid;
    grid-template-columns:
        repeat(3, minmax(0, 1fr));
    column-gap: 40px;
    row-gap: 22px;
}

.support-item {
    display: flex;
    flex-direction: column;
    gap: 5px;
}

.support-item__label {
    font-size: 11px;
    font-weight: 700;
    text-transform: uppercase;
    color: #287C2D;
}

.support-item__link {
    display: inline-flex;
    align-items: center;
    align-self: flex-start;
    gap: 7px;
    max-width: 100%;
    font-size: 13px;
    font-weight: 400;
    color: #333333;
    text-decoration: none;
}


.support-item__link:hover {
    color: #287C2D;
}


.support-item__icon {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 20px;
    height: 20px;
    flex-shrink: 0;
    border: 1px solid #BDBDBD;
    border-radius: 4px;
    color: #555555;
    background-color: #F7F7F7;
}

.support-item__name {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.support-item__empty {
    font-size: 13px;
    color: #666666;
}

</style>