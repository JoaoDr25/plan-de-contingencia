<template>

    <BaseDetailDialog v-model="dialog" title="Información del Riesgo" width="650px">

        <template #column-left>

            <BaseDetailItem label="Código" :value="risk.codigo" />

            <BaseDetailItem label="Nombre del Riesgo" :value="risk.riesgo" />

            <BaseDetailItem label="Consecuencia" :value="risk.consecuencia" />

             <BaseDetailItem label="Descripción" :value="risk.descripcion" />
       
            </template>

        <template #column-right>

            <BaseDetailItem class="risk-details__right-offset" label="Protocolos Asociados" :value="associatedProtocols" />

            <BaseDetailItem label="Fecha de Creación" :value="risk.fecha" />

        </template>

    </BaseDetailDialog>

</template>

<script setup>

import { computed } from 'vue'

import BaseDetailItem from '../../components/forms/BaseDetailItem.vue'
import BaseDetailDialog from '../../components/forms/BaseDetailDialog.vue'

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

const associatedProtocols = computed(() => {
    const count = Array.isArray(props.risk?.protocolos)
        ? props.risk.protocolos.length
        : 0

    return `${count} ${count === 1 ? 'Protocolo' : 'Protocolos'}`
})

</script>

<style scoped>

.risk-details__right-offset {
    margin-top: 46px;
}

@media (max-width: 600px) {

    .risk-details__right-offset {
        margin-top: 0;
    }
}
</style>