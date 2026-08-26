<template>

    <div class="plan-details-actions">

        <BaseIconButton
            v-for="action in actions"
            :key="action"
            :action="action"
            @click="handleAction(action)"
        />

    </div>

</template>


<script setup>

import { computed } from 'vue'

import BaseIconButton from 'src/components/base/BaseIconButton.vue'

import { getPlanDetailsActions } from 'src/constants/plans/plan.actions'

const props = defineProps({

    role: {
        type: String,
        required: true
    },

    state: {
        type: String,
        required: true
    }
})

const emit = defineEmits([
    'editar',
    'aprobar',
    'no_aprobar',
    'ejecutar',
    'cancelar',
    'mandar_edicion',
    'imprimir'
])

const actions = computed(() => {

    return getPlanDetailsActions(
        props.role,
        props.state
    )
})

function handleAction(action) {
    emit(action)
}

</script>

<style scoped lang="scss">

.plan-details-actions {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 6px;
}

</style>