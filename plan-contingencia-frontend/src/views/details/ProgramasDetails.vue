<template>

    <BaseDialog v-model="dialog" title="Información del Programa de Formación" width="600px">

        <div v-if="program" class="program-details">

            <div class="program-details__logo">
                <img src="src/assets/logos/logo-sena.png" alt="Logo SENA">
            </div>

            <div class="program-details__column">

                <div class="detail-item">
                    <span class="detail-item__label">
                        Código
                    </span>

                    <span class="detail-item__value">
                        {{ program.codigo }}
                    </span>
                </div>

                <div class="detail-item">
                    <span class="detail-item__label">
                        Nombre del Programa
                    </span>
                    <span class="detail-item__value">
                        {{ program.nombre }}
                    </span>
                </div>

                <div class="detail-item">
                    <span class="detail-item__label">
                        Nivel de Formación
                    </span>

                    <span class="detail-item__value">
                        {{ program.nivel }}
                    </span>
                </div>

                <div class="detail-item">
                    <span class="detail-item__label">
                        Centro
                    </span>

                    <span class="detail-item__value">
                        {{ program.centro }}
                    </span>
                </div>

            </div>

            <div class="program-details__column">

                    <div class="detail-item detail-item--status">
                        <StatusChip :status="program.estado" />
                    </div>

                    <div class="detail-item">
                        <span class="detail-item__label">
                            Jornada
                        </span>

                        <span class="detail-item__value">
                            {{ program.jornada }}
                        </span>
                    </div>

                    <div class="detail-item">
                        <span class="detail-item__label">
                            Ficha
                        </span>

                        <span class="detail-item__value">
                            {{ program.ficha }}
                        </span>
                    </div>

                    <div class="detail-item">
                        <span class="detail-item__label">
                            Fecha de Creación
                        </span>

                        <span class="detail-item__value">
                            {{ program.fecha }}
                        </span>
                    </div>

                </div>

                <div class="program-details__actions">

                    <SecondaryActionButton label="Cerrar" icon="close" size="sm" @click="closeDialog" />

                </div>

        </div>

    </BaseDialog>

</template>

<script setup>

import { computed } from 'vue'

import BaseDialog from 'src/components/forms/BaseDialog.vue'
import SecondaryActionButton from 'src/components/actions/SecondaryActionButton.vue'
import StatusChip from 'src/components/states/StatusChip.vue'

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
    grid-template-columns: 105px minmax(210px, 1.5fr) minmax(150px, 1fr);
    column-gap: 22px;
    padding: 5px 20px 0px;
    align-items: start;
    height: fit-content;
}

.program-details__logo {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
}

.program-details__logo img {
    width: 105px;
    height: auto;
}

.program-details__column {
    display: flex;
    flex-direction: column;
    gap: 4px;
    min-width: 0;
     transform: translateY(4px);
     padding-bottom: 15px;
}

.program-details__column:first-of-type {
    margin-left: 8px;
}

.detail-item {
    display: flex;
    flex-direction: column;
}

.detail-item__label {
    color: $color-primary;
    font-size: 0.65rem;
    font-weight: 700;
    text-transform: uppercase;
}

.detail-item__value {
    color: $color-text-primary;
    font-size: $font-size-xs;
    line-height: 1.3;
}

.detail-item--status {
    align-items: flex-start;
    padding-bottom: 8px;
}

.program-details__actions {
    grid-column: 3;
    display: flex;
    justify-content: flex-start;
    align-self: end;
    margin-top: 1px;
}

</style>