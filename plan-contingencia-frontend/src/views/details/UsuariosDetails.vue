<template>

    <BaseDetailDialog v-model="dialog" title="Información del Usuario" width="650px">

        <template #column-left>

            <BaseDetailItem label="Código" :value="user.codigo" />

            <BaseDetailItem label="Nombre Completo" :value="user.nombre + ' ' + user.apellido" />

            <BaseDetailItem label="Correo Institucional" :value="user.correo" />

            <BaseDetailItem label="Tipo de Documento" :value="user.tipo" />

            <BaseDetailItem label="Último Acceso" :value="user.acceso" />

        </template>

        <template #column-right>

            <BaseDetailItem class="status-chip">
                <StatusChip :status="user.estado" />
            </BaseDetailItem>

            <BaseDetailItem label="Rol Asignado" :value="user.rol" />

            <BaseDetailItem label="Centro de Formación" :value="user.centro" />

            <BaseDetailItem label="N° Documento" :value="user.documento" />

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

</script>

<style scoped>

.status-chip {
    margin-bottom: 12px;
}
</style>
