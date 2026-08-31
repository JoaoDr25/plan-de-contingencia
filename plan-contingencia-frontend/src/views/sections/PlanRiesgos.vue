<template>

    <div class="plan-risks">

        <div
            v-for="danger in dangers"
            :key="danger.id"
            class="danger-item"
        >

            <div class="danger-item__content">

                <span class="danger-item__label">
                    Peligro identificado
                </span>

                <span class="danger-item__value">
                    {{ danger.nombre }}
                </span>

            </div>

            <BaseIconButton
                action="view"
                :aria-label="`Ver riesgos asociados a ${danger.nombre}`"
                @click="openRisks(danger)"
            />

        </div>

    </div>

    <PlanesRiesgosDialog
        v-model="showModal"
        :danger="selectedDanger"
    />

</template>

<script setup>

import { computed, ref } from 'vue'

import BaseIconButton from 'src/components/base/BaseIconButton.vue'
import PlanesRiesgosDialog from '../modals/PlanesRiesgosDialog.vue'

const props = defineProps({

    plan: {
        type: Object,
        required: true
    }

})

const showModal = ref(false)

const selectedDanger = ref(null)

const planRisks = computed(() => {

    if (!Array.isArray(props.plan.riesgos)) {
        return []
    }

    const selectedIds = Array.isArray(props.plan.riesgosId)
        ? props.plan.riesgosId
        : []

    return props.plan.riesgos.filter(risk =>
        selectedIds.length === 0 ||
        selectedIds.includes(risk._id)
    )

})

const dangers = computed(() => {

    const grouped = {}

    planRisks.value.forEach(risk => {

        if (!grouped[risk.peligroId]) {

            grouped[risk.peligroId] = {
                id: risk.peligroId,
                nombre: risk.peligroNombre,
                riesgos: []
            }

        }

        grouped[risk.peligroId].riesgos.push(risk)

    })

    return Object.values(grouped)

})

function openRisks(danger) {

    selectedDanger.value = danger
    showModal.value = true

}

</script>

<style scoped lang="scss">

@use 'src/css/variables.scss' as *;
@use 'src/css/typography.scss' as *;

.plan-risks {
    display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    column-gap: 40px;
    row-gap: 22px;
}

.danger-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
    min-width: 0;
    padding: 14px 16px;
    border: 1px solid #E0E0E0;
    border-radius: 6px;
    background: #FFFFFF;
}

.danger-item__content {
    display: flex;
    flex-direction: column;
    gap: 5px;
    min-width: 0;
    flex: 1;
}

.danger-item__label {
    font-size: 11px;
    font-weight: 700;
    text-transform: uppercase;
    color: #287C2D;
}

.danger-item__value {
    min-width: 0;

    font-size: 13px;
    line-height: 1.4;
    color: #222222;

    overflow-wrap: break-word;
    word-break: break-word;
}

@media (max-width: 1210px) {

    .plan-risks {
        grid-template-columns: repeat(2, minmax(0, 1fr));
        column-gap: 24px;
        row-gap: 16px;
    }

}

@media (max-width: 700px) {

    .plan-risks {
        grid-template-columns: 1fr;
        row-gap: 12px;
    }

    .danger-item {
        padding: 13px 14px;
    }
}

@media (max-width: 450px) {

    .plan-risks {
        row-gap: 10px;
    }

    .danger-item {
        gap: 12px;
        padding: 12px;
    }

    .danger-item__label {
        font-size: 10px;
    }

    .danger-item__value {
        font-size: $font-size-md;
    }
}

</style>