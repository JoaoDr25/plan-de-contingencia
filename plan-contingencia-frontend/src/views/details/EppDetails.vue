<template>

    <BaseDetailDialog v-model="dialog" title="Información del EPP" width="650px">

        <template #column-left>

            <BaseDetailItem label="Código" :value="epp.codigo" />

            <BaseDetailItem label="Nombre de EPP" :value="epp.nombre" />

            <BaseDetailItem label="Categoría" :value="epp.categoria" />

            <BaseDetailItem label="Descripción" :value="epp.descripcion" />

        </template>

        <template #column-right>

              <BaseDetailItem class="status-chip">
                <StatusChip :status="epp.estado" />
            </BaseDetailItem>

            <BaseDetailItem label="Nivel Protección" :value="epp.nivel" />

            <BaseDetailItem label="Fecha de Creación" :value="epp.fecha ?? 'No disponible'" />


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
    epp: {
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
