<template>

    <BaseDetailDialog v-model="dialog" title="Información del Programa de Formación" width="650px">

        <div v-if="program" class="program-details">

            <div class="program-details__logo">
                <img src="src/assets/logos/logo-sena.png" alt="Logo SENA">
            </div>

            <template >

                <BaseDetailItem label="Código" :value="program.codigo" />

                <BaseDetailItem label="Nombre del Programa" :value="program.nombre" />

                <BaseDetailItem label="Nivel de Formación" :value="program.nivel" />

                <BaseDetailItem label="Centro" :value="program.centro" />

            </template>

            <template>

                <BaseDetailItem label="Estado">
                    <StatusChip :status="program.estado" />
                </BaseDetailItem>

                <BaseDetailItem label="Jornada" :value="program.jornada" />

                <BaseDetailItem label="Ficha" :value="program.ficha" />

                <BaseDetailItem label="Fecha de Creación" :value="program.fecha" />

            </template>

        </div>

            <div class="program-details__actions">
                <SecondaryActionButton label="Cerrar" icon="close" size="sm" @click="closeDialog" />
            </div>

    </BaseDetailDialog>

</template>

<script setup>

import { computed } from 'vue'

import SecondaryActionButton from 'src/components/actions/SecondaryActionButton.vue'
import StatusChip from 'src/components/states/StatusChip.vue'
import BaseDetailItem from '../../components/forms/BaseDetailItem.vue'
import BaseDetailDialog from '../../components/forms/BaseDetailDialog.vue'

const props = defineProps({

    modelValue: {
        type: Boolean,
        required: true
    },
    program: {
        type: Object,
        default: null
    }
})

const emit = defineEmits([
    'update:modelValue'
])

const dialog = computed({
    get: () => props.modelValue,
    set: value => {
        emit('update:modelValue', value)
    }
})

function closeDialog() {
    dialog.value = false
}

</script>

<style scoped lang="scss">
@use 'src/css/variables.scss' as *;
@use 'src/css/typography.scss' as *;

.program-details {
    display: grid;
    grid-template-columns: 120px minmax(210px, 1.5fr) minmax(150px, 1fr);
    column-gap: 22px;
    padding: 1px 20px 0;
    align-items: start;
    height: fit-content;
}

.program-details__logo {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    padding-top: 20px;
}

.program-details__logo img {
    width: 145px;
    height: auto;
}

.program-details__column {
    display: flex;
    flex-direction: column;
    gap: 9px;
    min-width: 0;
    transform: translateY(4px);
}

.program-details__logo+.program-details__column {
    margin-left: 18px;
}

.program-details__column+.program-details__column {
    margin-left: 15px;
}

/*.detail-item {
    display: flex;
    flex-direction: column;
}

.detail-item__label {
    color: $color-primary;
    font-size: $font-size-xs;
    font-weight: 700;
    text-transform: uppercase;
    line-height: 1.4;
}

.detail-item__value {
    color: $color-text-primary;
    font-size: 0.84rem;
    line-height: 1.3;
}

.detail-item--status {
    align-items: flex-start;
    padding-bottom: 8px;
}*/

.program-details__actions {
    display: grid;
    grid-template-columns: 105px minmax(210px, 1.5fr) minmax(150px, 1fr);
    column-gap: 22px;
    height: 35px;
}

.program-details__actions :deep(.secondary-action-button) {
    grid-column: 3;
    justify-self: start;
    margin-left: 26px;
    min-height: 35px;
    min-width: 116px;
}

.program-details__actions :deep(.secondary-action-button .q-btn__wrapper) {
    padding: 0 8px;
    min-height: unset;
}
</style>
