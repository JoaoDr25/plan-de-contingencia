<template>

    <div class="plan-details-actions">

        <template v-for="action in actions" :key="action">

            <PrimaryActionButton v-if="getButtonConfig(action).type === 'primary'"
                :label="getButtonConfig(action).label" :icon="getButtonConfig(action).icon" size="sm"
                :disable="isActionDisabled(action)" @click="handleAction(action)" />

            <SecondaryActionButton v-else-if="getButtonConfig(action).type === 'secondary'"
                :label="getButtonConfig(action).label" :icon="getButtonConfig(action).icon" size="sm"
                :disable="isActionDisabled(action)" @click="handleAction(action)" />

            <DangerActionButton v-else-if="getButtonConfig(action).type === 'danger'"
                :label="getButtonConfig(action).label" :icon="getButtonConfig(action).icon" size="sm"
                :disable="isActionDisabled(action)" @click="handleAction(action)" />

        </template>

        <SecondaryActionButton label="Volver" icon="arrow_back" size="sm" @click="handleBack" />

    </div>

</template>


<script setup>

import { computed } from 'vue'
import { useRouter } from 'vue-router'

import PrimaryActionButton from './PrimaryActionButton.vue';
import SecondaryActionButton from './SecondaryActionButton.vue';
import DangerActionButton from './DangerActionButton.vue';

import { PLAN_ACTIONS_BUTTONS } from 'src/constants/actions/plan_actions.constants'
import { PLAN_DETAIL_ACTIONS } from 'src/constants/plans/planActions';
import { PLAN_ACTIONS } from 'src/constants/plans/planActions';

import { canApprovePlan, canRejectPlan } from 'src/utils/workflow.utils.js';

const {
    role,
    plan
} = defineProps({

    role: {
        type: String,
        required: true
    },
    plan: {
        type: Object,
        required: true
    }
})

const emit = defineEmits([
    'action'
])

const router = useRouter()

const actions = computed(() => {

    return PLAN_DETAIL_ACTIONS[role]?.[plan.estado] ?? []
})

function getButtonConfig(action) {

    return PLAN_ACTIONS_BUTTONS[action]
}

function isActionDisabled(action) {

    if (!plan) {
        return true
    }

    switch (action) {

        case PLAN_ACTIONS.APROBAR:

            return !canApprovePlan(role, plan)

        case PLAN_ACTIONS.NO_APROBAR:

            return !canRejectPlan(role, plan)

        default:

            return false
    }
}

function handleAction(action) {

    if (isActionDisabled(action)) {
        return
    }
    emit('action', action)
}

function handleBack() {
    router.push({ name: 'planes.list' })
}

</script>

<style scoped lang="scss">

.plan-details-actions {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    gap: 10px;
}

.plan-details-actions :deep(.q-btn) {
    height: 35px !important;
    min-height: 35px !important;
}

@media (max-width: 800px) {

    .plan-details-actions {
        flex-wrap: wrap;
        justify-content: flex-end;

    }
}

@media (max-width: 500px) {

    .plan-details-actions {
        flex-direction: column;
        align-items: center;
        gap: 8px;
    }

    .plan-details-actions :deep(.q-btn) {
        width: 100% !important;
        max-width: none !important;
    }
}
</style>