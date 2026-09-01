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

            <button
                type="button"
                class="danger-item__action"
                :aria-label="`Ver riesgos asociados a ${danger.nombre}`"
                @click="openRisks(danger)"
            >
                <q-icon name="open_in_new" size="18px" class="danger-item__action-icon" />
            </button>

        </div>

    </div>

    <PlanesRiesgosDialog
        v-model="showModal"
        :danger="selectedDanger"
    />

</template>

<script setup>

import { computed, ref } from 'vue'

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
    padding-bottom: 8px;
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
    background: $color-surface;
}

.danger-item__content {
    display: flex;
    flex-direction: column;
    gap: 5px;
    min-width: 0;
    flex: 1;
}

.danger-item__label {
    font-size: $font-size-xs;
    font-weight: 700;
    text-transform: uppercase;
    color: $color-primary;
}

.danger-item__value {
    min-width: 0;
    font-size: $font-size-md;
    line-height: 1.4;
    overflow-wrap: break-word;
    word-break: break-word;
}

.danger-item__action {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 20px;
    height: 20px;
    padding: 0;
    border: none;
    background: transparent;
    color: $color-primary;
    cursor: pointer;
    transition: transform 0.2s ease;
}

.danger-item__action-icon {
    color: $color-primary;
    transition: color 0.2s ease, transform 0.2s ease;
}

.danger-item__action:hover {
    color: $color-primary;
}

.danger-item__action:hover .danger-item__action-icon {
    color: $color-primary;
    transform: scale(1.08);
}

@media (max-width: 1210px) {

    .plan-risks {
        grid-template-columns: repeat(3, minmax(0, 1fr));
        column-gap: 24px;
        row-gap: 16px;
    }

}

@media (max-width: 700px) {

    .plan-risks {
        grid-template-columns: 1fr 1fr;
        row-gap: 12px;
    }

    .danger-item {
        padding: 13px 14px;
    }
}

@media (max-width: 600px) {

    .plan-risks {
        grid-template-columns: 1fr;
        row-gap: 10px;
    }

    .danger-item {
        gap: 12px;
        padding: 12px;
    }

    .danger-item__label {
        font-size: $font-size-xs;
    }

    .danger-item__value {
        font-size: $font-size-xs;
    }
}

</style>