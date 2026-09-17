<template>

    <BaseDialog v-model="dialog" :title="dialogTitle" width="900px">

        <div class="dangers-dialog">

            <div class="dangers-table-wrapper">

                <table class="dangers-table">

                    <thead>

                        <tr>
                            <th class="dangers-table__number">N</th>
                            <th>PELIGRO</th>
                            <th>CATEGORÍA</th>
                            <th>DESCRIPCIÓN</th>
                        </tr>

                    </thead>

                    <tbody>

                        <tr v-for="(danger, index) in dangers" :key="danger._id">
                            <td class="dangers-table__number">{{ index + 1 }}</td>
                            <td>{{ danger.nombre || 'No disponible' }}</td>
                            <td>{{ danger.categoria || 'No disponible' }}</td>
                            <td>{{ danger.descripcion || 'No disponible' }}</td>
                        </tr>

                        <tr v-if="!dangers.length">
                            <td colspan="5" class="dangers-table__empty">
                                No hay peligros asociados a esta actividad.
                            </td>
                        </tr>

                    </tbody>

                </table>

            </div>

        </div>

        <template #actions>

            <div class="dangers-dialog__actions">
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
    activity: {
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
    return props.activity?.nombre || 'Peligros asociados'
})

const dangers = computed(() => props.activity?.peligros ?? [])

function closeDialog() {
    dialog.value = false
}

</script>

<style scoped lang="scss">

@use 'src/css/variables.scss' as *;
@use 'src/css/typography.scss' as *;

.dangers-dialog {
    width: 100%;
}

.dangers-table-wrapper {
    width: 100%;
    max-height: min(320px, 45vh);
    overflow-x: auto;
    overflow-y: auto;
}

.dangers-table {
    width: 100%;
    border-collapse: collapse;
}

.dangers-table th {
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

.dangers-table td {
    padding: 12px;
    border-bottom: 1px solid #E2E2E2;
    font-size: $font-size-md;
    line-height: 1.4;
}

.dangers-table tbody tr:last-child td {
    border-bottom: none;
}

.dangers-table tbody tr:hover {
    background-color: $color-surface;
}

.dangers-table__number {
    width: 55px;
    text-align: center !important;
}

.dangers-table__empty {
    padding: 30px !important;
    text-align: center !important;
}

.dangers-dialog__actions {
    display: flex;
    justify-content: flex-end;
    width: 100%;
    padding: 5px 5px 0 0;
}

@media (max-width: 700px) {
    .dangers-table {
        min-width: 800px;
    }
}

</style>
