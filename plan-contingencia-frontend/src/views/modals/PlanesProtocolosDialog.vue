<template>

    <BaseDialog v-model="dialog" :title="dialogTitle" width="1000px">

        <div class="protocols-dialog">

            <div class="protocols-table-wrapper">

                <table class="protocols-table">

                    <thead>

                        <tr>
                            <th class="protocols-table__number">N</th>
                            <th>TIPO</th>
                            <th>ACCIÓN</th>
                            <th>RESPONSABLE</th>
                            <th>MEDIO</th>
                        </tr>

                    </thead>

                    <tbody>

                        <tr v-for="(protocol, index) in protocols" :key="protocol._id">
                            <td class="protocols-table__number">{{ index + 1 }}</td>
                            <td>{{ protocol.tipo || 'No disponible' }}</td>
                            <td>{{ protocol.accion || 'No disponible' }}</td>
                            <td>{{ protocol.responsable || 'No disponible' }}</td>
                            <td>{{ protocol.medio || 'No disponible' }}</td>
                        </tr>

                        <tr v-if="!protocols.length">
                            <td colspan="5" class="protocols-table__empty">
                                No hay protocolos asociados a este riesgo.
                            </td>
                        </tr>

                    </tbody>

                </table>

            </div>

        </div>

        <template #actions>

            <div class="protocols-dialog__actions">
                <SecondaryActionButton label="Cerrar" icon="close" size="sm" @click="closeDialog" />
            </div>

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
    set: value => emit('update:modelValue', value)
})

const dialogTitle = computed(() => {
    return props.risk?.riesgo || 'Protocolos asociados'
})

const protocols = computed(() => props.risk?.protocolos ?? [])

function closeDialog() {
    dialog.value = false
}

</script>

<style scoped lang="scss">

@use 'src/css/variables.scss' as *;
@use 'src/css/typography.scss' as *;

.protocols-dialog {
    width: 100%;
}

.protocols-table-wrapper {
    width: 100%;
    max-height: min(320px, 45vh);
    overflow-x: auto;
    overflow-y: auto;
}

.protocols-table {
    width: 100%;
    border-collapse: collapse;
}

.protocols-table th {
    position: sticky;
    top: 0;
    z-index: 1;
    padding: 10px 12px;
    border-top: 1px solid #D6D6D6;
    border-bottom: 1px solid #D6D6D6;
    background-color: $color-surface;
    font-size: $font-size-xs;
    font-weight: 600;
    text-align: left;
}

.protocols-table td {
    padding: 12px;
    border-bottom: 1px solid #E2E2E2;
    font-size: $font-size-md;
    line-height: 1.4;
}

.protocols-table tbody tr:last-child td {
    border-bottom: none;
}

.protocols-table tbody tr:hover {
    background-color: $color-surface;
}

.protocols-table__number {
    width: 55px;
    text-align: center !important;
}

.protocols-table__empty {
    padding: 30px !important;
    text-align: center !important;
}

.protocols-dialog__actions {
    display: flex;
    justify-content: flex-end;
    width: 100%;
    padding: 5px 5px 0 0;
}

@media (max-width: 700px) {
    .protocols-table {
        min-width: 720px;
    }
}

</style>
