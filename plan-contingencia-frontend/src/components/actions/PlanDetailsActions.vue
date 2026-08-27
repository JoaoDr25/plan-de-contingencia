<template>

    <div class="plan-details-actions">

        <template
            v-for="action in actions"
            :key="action"
        >

            <PrimaryActionButton
                v-if="getButtonConfig(action).type === 'primary'"
                :label="getButtonConfig(action).label"
                :icon="getButtonConfig(action).icon"
                size="sm"
                @click="handleAction(action)"
            />

            <SecondaryActionButton
                v-else-if="getButtonConfig(action).type === 'secondary'"
                :label="getButtonConfig(action).label"
                :icon="getButtonConfig(action).icon"
                size="sm"
                @click="handleAction(action)"
            />

            <DangerActionButton
                v-else-if="getButtonConfig(action).type === 'danger'"
                :label="getButtonConfig(action).label"
                :icon="getButtonConfig(action).icon"
                size="sm"
                @click="handleAction(action)"
            />

        </template>

        <SecondaryActionButton
            label="Volver"
            icon="arrow_back"
            size="sm"
            @click="handleBack"
        />

    </div>

</template>


<script setup>

import { computed } from 'vue'
import { useRouter } from 'vue-router'

import PrimaryActionButton from './PrimaryActionButton.vue';
import SecondaryActionButton from './SecondaryActionButton.vue';
import DangerActionButton from './DangerActionButton.vue';

import { getPlanDetailsActions } from 'src/constants/plans/planActions'

import { PLAN_ACTIONS_BUTTONS } from 'src/constants/actions/plan_actions.constants'

const {
    role,
    state
} = defineProps({

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
    'action'
])

const router = useRouter()

const actions = computed(() => {

    return getPlanDetailsActions(
        role,
        state
    )
})

function getButtonConfig(action) {

    return (
        PLAN_ACTIONS_BUTTONS[action]
        || {}
    )
}

function handleAction(action) {
    emit('action', action)
}

function handleBack() {
    router.back()
}

</script>


<style scoped lang="scss">

.plan-details-actions {

    display: flex;
    justify-content: flex-end;
    align-items: center;
    gap: 10px;

    width: 100%;

}

@media (max-width: 600px) {

    .plan-details-actions {

        flex-wrap: wrap;
        justify-content: flex-end;

    }

}

</style>