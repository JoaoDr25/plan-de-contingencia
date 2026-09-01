<template>

    <BaseDetailDialog v-model="dialog" title="Información del Usuario" width="780px">

        <template #column-left>

            <BaseDetailItem label="Código" :value="user?.codigo" />

            <BaseDetailItem label="Nombre Completo" :value="user ? `${user.nombre} ${user.apellido}` : ''" />

            <BaseDetailItem label="Correo Institucional" :value="user?.correo" />

            <BaseDetailItem label="Tipo de Documento" :value="user?.tipo" />

            <BaseDetailItem label="Teléfono" :value="user?.telefono || 'No registrado'" />

            <BaseDetailItem label="Área Temática" :value="user?.areaTematica || 'No registrada'" />

            <BaseDetailItem label="Máximo de Horas"
                :value="user?.maximoHoras ? `${user.maximoHoras} horas` : 'No registrado'" />
        </template>

        <template #column-right>

            <BaseDetailItem class="status-chip">
                <StatusChip v-if="user" :status="user.estado" />
            </BaseDetailItem>

            <BaseDetailItem label="Rol Asignado" :value="user?.rol" />

            <!-- <BaseDetailItem label="Centro de Formación" :value="user?.centro" /> -->

            <BaseDetailItem label="Correo Personal" :value="user?.correoPersonal || 'No registrado'" />

            <BaseDetailItem label="N° Documento" :value="user?.documento" />

            <BaseDetailItem label="Tipo de Vinculación" :value="user?.tipoVinculacion || 'No registrado'" />

            <BaseDetailItem label="Red de Conocimiento" :value="user?.redConocimiento || 'No registrada'" />

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
