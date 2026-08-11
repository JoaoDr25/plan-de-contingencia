<template>

    <BaseDialog v-model="dialog" title="Información del Riesgo" width="650px">

        <div v-if="risk" class="risk-details">

            <div class="risk-details__logo">
                <img src="src/assets/logos/logo-sena.png" alt="Logo SENA">
            </div>

            <div class="risk-details__content">

                <div class="detail-item">
                    <span class="detail-item__label">
                        Código
                    </span>

                    <span class="detail-item__value">
                        {{ risk.codigo }}
                    </span>
                </div>

                <div class="detail-item">
                   
                </div>

                <div class="detail-item">
                    <span class="detail-item__label">
                        Nombre del Riesgo
                    </span>

                    <span class="detail-item__value">
                        {{ risk.riesgo }}
                    </span>
                </div>

                <div class="detail-item">
                    <span class="detail-item__label">
                        Protocolos Asociados
                    </span>

                    <span class="detail-item__value">
                        {{ risk.protocolos }}
                    </span>
                </div>

                <div class="detail-item">
                    <span class="detail-item__label">
                        Consecuencia
                    </span>

                    <span class="detail-item__value">
                        {{ risk.consecuencia }}
                    </span>
                </div>

                <div class="detail-item">
                    <span class="detail-item__label">
                        Fecha de Creación
                    </span>

                    <span class="detail-item__value">
                        {{ risk.fecha }}
                    </span>
                </div>

                <div class="detail-item">
                    <span class="detail-item__label">
                        Descripción
                    </span>

                    <span class="detail-item__value">
                        {{ risk.descripcion }}
                    </span>
                </div>

                <div class="detail-item">
                </div>
            </div>

        </div>

        <template #actions>

            <SecondaryActionButton label="Cerrar" icon="close" @click="closeDialog" />

        </template>

    </BaseDialog>

</template>

<script setup>

import { computed } from 'vue'

import BaseDialog from 'src/components/forms/BaseDialog.vue'
import SecondaryActionButton from 'src/components/actions/SecondaryActionButton.vue'

const props = defineProps({

    modelValue: {
        type: Boolean,
        required: true
    },
    risk: {
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

.risk-details {
    display: flex;
    align-items: center;
    gap: 35px;
    padding: 20px 10px;
}

.risk-details__logo {
    flex: 0 0 150px;
    display: flex;
    justify-content: center;
    align-items: center;
}

.risk-details__logo img {
    width: 130px;
    height: auto;
}

.risk-details__content {
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