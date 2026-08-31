<template>

    <div class="plan-participants">

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
                    Nivel de formación
                </span>

                <span class="summary-item__value">
                    {{ plan.programaFormacionNivel || 'No registrado' }}
                </span>

            </div>


            <div class="summary-item">

                <span class="summary-item__label">
                    Total aprendices
                </span>

                <div class="participants-count">

                    <span class="summary-item__value">
                        {{ participants.length }}
                    </span>

                    <button v-if="participants.length" type="button" class="participants-action__button"
                        aria-label="Ver participantes" @click="showDialog = true">
                        <q-icon name="open_in_new" size="18px" class="participants-action__icon" />
                    </button>

                    <span v-else class="participants-action__empty">
                        No hay aprendices registrados en el plan.
                    </span>

                </div>

            </div>
        </div>

        <ParticipantesDialog v-model="showDialog" :plan="plan" :participants="participants" />

    </div>

</template>


<script setup>

import { computed, ref } from 'vue'

import { MOCK_APRENDICES } from 'src/mocks/planes.mock'

import ParticipantesDialog from '../modals/ParticipantesDialog.vue'

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

</script>

<style scoped lang="scss">

@use 'src/css/variables.scss' as *;
@use 'src/css/typography.scss' as *;

.plan-participants {
    display: flex;
    flex-direction: column;
    gap: 18px;
    padding-bottom: 8px;
}

.participants-summary {
    display: grid;
    grid-template-columns:
        1.2fr 1fr 1fr 1fr;
    column-gap: 40px;
}

.summary-item {
    display: flex;
    flex-direction: column;
    gap: 5px;
    line-height: 1.4;
}

.summary-item:nth-child(4) {
    display: flex;
    flex-direction: column;
    gap: 5px;
}

.participants-count {
    display: inline-flex;
    align-items: center;
    gap: 5px;
}

.summary-item__label {
    font-size: $font-size-xs;
    font-weight: 700;
    text-transform: uppercase;
    color: #287C2D;
}

.summary-item__value {
    font-size: $font-size-md;
    color: #222222;
}

.participants-action__button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 20px;
    height: 20px;
    padding: 0;
    border: none;
    background: transparent;
    color: #2e7d32;
    cursor: pointer;
    transition: transform 0.2s ease;
}

.participants-action__icon {
    color: #2e7d32;
    transition: color 0.2s ease, transform 0.2s ease;
}

.participants-action__button:hover {
    color: #287C2D;
}

.participants-action__button:hover .participants-action__icon {
    color: #287C2D;
    transform: scale(1.08);
}

.participants-action__empty {
    font-size: 13px;
    color: #666666;
}


@media (max-width: 900px) {

    .participants-summary {
        grid-template-columns: 1fr 1fr;
        row-gap: 15px;
    }

}

@media (max-width: 600px) {

    .participants-summary {
        grid-template-columns: 1fr;
        row-gap: 15px;
    }

    .summary-item__value {
        font-size: $font-size-xs;
    }
}
</style>