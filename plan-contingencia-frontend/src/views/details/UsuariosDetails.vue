<template>

    <BaseDialog v-model="dialog" title="Información del Usuario" width="650px">

        <div v-if="user" class="user-details">

            <div class="user-details__logo">
                <img src="src/assets/logos/logo-sena.png" alt="Logo SENA">
            </div>

            <div class="user-details__content">

                <div class="detail-item">
                    <span class="detail-item__label">
                        Código
                    </span>

                    <span class="detail-item__value">
                        {{ user.codigo }}
                    </span>
                </div>

                <div class="detail-item">
                    <span class="detail-item__label">
                        Rol Asignado
                    </span>

                    <span class="detail-item__value">
                        {{ user.rol }}
                    </span>
                </div>

                <div class="detail-item">
                    <span class="detail-item__label">
                        Nombre Completo
                    </span>

                    <span class="detail-item__value">
                        {{ user.nombre + ' ' + user.apellido }}
                    </span>
                </div>

                 <div class="detail-item">
                    <span class="detail-item__label">
                        Tipo de Documento
                    </span>

                    <span class="detail-item__value">
                        {{ user.tipo }}
                    </span>
                </div>

                <div class="detail-item">
                    <span class="detail-item__label">
                        N° Documento
                    </span>

                    <span class="detail-item__value">
                        {{ user.documento }}
                    </span>
                </div>

                <div class="detail-item">
                    <span class="detail-item__label">
                        Correo Institucional
                    </span>

                    <span class="detail-item__value">
                        {{ user.correo }}
                    </span>
                </div>

                <div class="detail-item">
                    <span class="detail-item__label">
                        Centro de Formación
                    </span>

                    <span class="detail-item__value">
                        {{ user.centro }}
                    </span>
                </div>

                <div class="detail-item">
                    <span class="detail-item__label">
                        Último Acceso
                    </span>

                    <span class="detail-item__value">
                        {{ user.acceso }}
                    </span>
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
    user: {
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

.user-details {
    display: flex;
    align-items: center;
    gap: 35px;
    padding: 20px 10px;
}

.user-details__logo {
    flex: 0 0 150px;
    display: flex;
    justify-content: center;
    align-items: center;
}

.user-details__logo img {
    width: 130px;
    height: auto;
}

.user-details__content {
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