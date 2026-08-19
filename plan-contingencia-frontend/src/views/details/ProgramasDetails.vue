<template>

    <BaseDetailDialog v-model="dialog" title="Información del Programa de Formación" width="650px">


            <template #column-left>

                <BaseDetailItem label="Código" :value="program.codigo" />

                <BaseDetailItem label="Nombre del Programa" :value="program.nombre" />

                <BaseDetailItem label="Nivel de Formación" :value="program.nivel" />

                <BaseDetailItem label="Centro" :value="program.centro" />

            </template>

            <template #column-right>

                <BaseDetailItem class="status-chip">
                    <StatusChip :status="program.estado" />
                </BaseDetailItem>

                <BaseDetailItem label="Jornada" :value="program.jornada" />

                <BaseDetailItem label="Ficha" :value="program.ficha" />

                <BaseDetailItem label="Fecha de Creación" :value="program.fecha" />

            </template>


    </BaseDetailDialog>

</template>

<script setup>

import { computed } from 'vue'

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

</script>

<style scoped>

.status-chip {
    margin-bottom: 12px;
}
</style>
