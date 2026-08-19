<template>

    <BaseDetailDialog v-model="dialog" title="Información del Contacto de Emergencia" width="650px">

        <template #column-left>

            <BaseDetailItem label="Código" :value="contact.codigo" />

            <BaseDetailItem label="Tipo de Contacto" :value="contact.tipo" />

            <BaseDetailItem label="Nombre de la Entidad" :value="contact.nombre" />

            <BaseDetailItem label="Dirección" :value="contact.direccion ?? 'No disponible'" />

        </template>

        <template #column-right>

            <BaseDetailItem class="status-chip">
                <StatusChip :status="contact.estado" />
            </BaseDetailItem>

            <BaseDetailItem label="Teléfono" :value="contact.telefono" />

            <BaseDetailItem label="Ciudad" :value="contact.ciudad" />



        </template>

    </BaseDetailDialog>

</template>

<script setup>

import { computed } from 'vue'

import BaseDetailItem from '../../components/forms/BaseDetailItem.vue'
import BaseDetailDialog from '../../components/forms/BaseDetailDialog.vue'
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

</script>

<style>

.status-chip {
    margin-bottom: 12px;
}
</style>
