<template>

    <BaseDialog
        v-model="dialog"
        title="Información del Contacto de Emergencia"
        width="650px"
    >

        <div v-if="contact" class="contact-details">

            <div class="contact-details__logo">
                <img
                    src="src/assets/logos/logo-sena.png"
                    alt="Logo SENA"
                >
            </div>

            <div class="contact-details__content">

                <div class="detail-item">
                    <span class="detail-item__label">
                        Código
                    </span>

                    <span class="detail-item__value">
                        {{ contact.codigo }}
                    </span>
                </div>

                <div class="detail-item">
                    <StatusChip :status="contact.estado" />
                </div>

                <div class="detail-item">
                    <span class="detail-item__label">
                        Tipo de Contacto
                    </span>

                    <span class="detail-item__value">
                        {{ contact.tipo }}
                    </span>
                </div>

                <div class="detail-item">
                    <span class="detail-item__label">
                        Teléfono
                    </span>

                    <span class="detail-item__value">
                        {{ contact.telefono }}
                    </span>
                </div>

                <div class="detail-item">
                    <span class="detail-item__label">
                        Nombre de la Entidad
                    </span>

                    <span class="detail-item__value">
                        {{ contact.nombre }}
                    </span>
                </div>

                <div class="detail-item">
                    <span class="detail-item__label">
                        Ciudad
                    </span>

                    <span class="detail-item__value">
                        {{ contact.ciudad }}
                    </span>
                </div>

                <div class="detail-item">
                    <span class="detail-item__label">
                        Dirección
                    </span>

                    <span class="detail-item__value">
                        {{ contact.direccion ?? 'No disponible' }}
                    </span>
                </div>

                <div class="detail-item">
                </div></div>

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
    contact: {
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

.contact-details {
    display: flex;
    align-items: center;
    gap: 35px;
    padding: 20px 10px;
}

.contact-details__logo {
    flex: 0 0 150px;
    display: flex;
    justify-content: center;
    align-items: center;
}

.contact-details__logo img {
    width: 130px;
    height: auto;
}

.contact-details__content {
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