<template>

    <BaseDetailDialog v-model="dialog" title="Información del Peligro" width="650px">

        <template #column-left>

            <BaseDetailItem label="Código" :value="danger.codigo" />

            <BaseDetailItem label="Nombre del Peligro" :value="danger.nombre" />

            <BaseDetailItem label="Categoría" :value="danger.categoria" />
       
            <BaseDetailItem label="Descripción" :value="danger.descripcion" />
       
        </template>

        <template #column-right>

             <BaseDetailItem  class="danger-details__right-offset" label="Riesgos Asociados" :value="danger.riesgos" />

            <BaseDetailItem label="Fecha de Creación" :value="danger.fecha" />

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
    danger: {
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

.danger-details__right-offset {
    margin-top: 46px;
}

@media (max-width: 600px) {

    .danger-details__right-offset {
        margin-top: 0;
    }
}
</style>
