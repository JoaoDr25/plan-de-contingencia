<template>

    <BaseDialog
        v-model="dialog"
        title="Información del Programa"
        width="650px"
    >

        <div v-if="program" class="program-details">

            <div class="program-details__logo">
                <img
                    src="src/assets/logos/logo-sena.png"
                    alt="Logo SENA"
                >
            </div>

            <div class="program-details__content">

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
                        Centro de Formación
                    </span>

                    <span class="detail-item__value">
                        {{ program.centro }}
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

                <div class="detail-item">

                    <span class="detail-item__label">
                        Estado
                    </span>

                    <StatusChip :status="program.estado" />

                </div>

            </div>

        </div>

        <template #actions>

            <SecondaryActionButton
                label="Cerrar"
                icon="close"
                @click="closeDialog"
            />

        </template>

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
    display: flex;
    align-items: center;
    gap: 35px;
    padding: 20px 10px;
}

.program-details__logo {
    flex: 0 0 150px;
    display: flex;
    justify-content: center;
    align-items: center;
}

.program-details__logo img {
    width: 130px;
    height: auto;
}

.program-details__content {
    flex: 1;
    display: grid;
    grid-template-columns: 1fr 1fr;
    column-gap: 35px;
    row-gap: 18px;
}

.detail-item {
    display: flex;
    flex-direction: column;
    gap: 4px;
}

.detail-item__label {
    color: $color-primary;
    font-size: 0.72rem;
    font-weight: 700;
    text-transform: uppercase;
}

.detail-item__value {
    color: $color-text-primary;
    font-size: 0.82rem;
}

</style>