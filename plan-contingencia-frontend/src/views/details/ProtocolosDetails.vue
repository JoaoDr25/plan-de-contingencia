<template>

    <BaseDetailDialog v-model="dialog" title="Información del Protocolo" width="650px">

        <template #column-left>

            <BaseDetailItem label="Código" :value="protocol.codigo" />

            <BaseDetailItem label="Tipo de Emergencia" :value="protocol.tipo" />

            <BaseDetailItem label="Medio de Comunicación" :value="protocol.medio" />

            <BaseDetailItem label="Acción Inmediata" :value="protocol.accion" />

        </template>

        <template #column-right>

            <BaseDetailItem class="status-chip">
                <StatusChip :status="protocol.estado" />
            </BaseDetailItem>

            <BaseDetailItem label="Responsable" :value="protocol.responsable" />

            <BaseDetailItem label="Fecha de Creación" :value="protocol.fecha" />

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
    protocol: {
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

<style scoped>

.status-chip {
    margin-bottom: 12px;
}
</style>
