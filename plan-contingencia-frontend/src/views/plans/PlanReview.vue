<template>

    <BasePage class="plan-stage-detail-page">

        <div v-if="planData" class="plan-stage-detail detail-grid">

            <section class="detail-card detail-card--plan">

                <div class="detail-card__header">

                    <div class="detail-card__title">
                        <q-icon name="description" />
                        <span>{{ stageTitle }}</span>
                    </div>

                    <div class="detail-card__status">
                        <StatusChip :status="planData.estado" />
                    </div>

                </div>

                <div class="detail-card__body detail-card__body--plan">

                    <div class="detail-card__logo">
                        <img :src="logoSena" alt="Logo SENA">
                    </div>

                    <div class="detail-card__fields detail-card__fields--plan">

                        <BaseDetailItem label="Código del Plan" :value="`N° ${planData.numero || 'N/A'}`" />

                        <BaseDetailItem label="Programa de Formación"
                            :value="planData.programaFormacionNombre || 'No registrado'" />

                        <BaseDetailItem label="Fecha de Creación" :value="formatCreationDate(planData.createdAt)" />

                        <BaseDetailItem label="Fecha de Salida" :value="formatPlanDate(planData.fecha)" />

                        <BaseDetailItem label="Lugar" :value="planData.lugarDestino || 'No registrado'" />

                        <BaseDetailItem label="Transporte" :value="planData.tipoTransporte || 'No registrado'" />

                        <BaseDetailItem label="Hora de Salida" :value="formatPlanHour(planData.horaSalida)" />

                        <BaseDetailItem label="Hora de Regreso" :value="formatPlanHour(planData.horaRegreso)" />

                    </div>

                </div>

            </section>

            <section class="detail-card detail-card--revision">

                <div class="detail-card__header">

                    <div class="detail-card__title">
                        <q-icon name="sync" />
                        <span>Flujo de Revisión y Aprobación</span>
                    </div>

                </div>

                <div class="detail-card__body--revision">
                    <PlanRevision :plan="planData" />
                </div>

            </section>

            <div class="plan-stage-detail__actions">

                <div class="plan-stage-detail__actions-right">

                    <SecondaryActionButton v-if="canEditPlan" label="Editar Plan" icon="edit" size="sm"
                        @click="editPlan" />

                    <PrimaryActionButton label="Ver Plan" icon="visibility" size="sm" @click="viewFullPlan" />

                </div>

                <SecondaryActionButton label="Cerrar" icon="close" size="sm" @click="goBack" />

            </div>

            <BaseConfirmationDialog v-model="showConfirmation" :title="confirmationConfig.title"
                :confirm-label="confirmationConfig.confirmLabel" :cancel-label="confirmationConfig.cancelLabel"
                :variant="confirmationConfig.variant"
                :show-observations="pendingAction === PLAN_ACTIONS.NO_APROBAR || pendingAction === PLAN_ACTIONS.MANDAR_EDICION || pendingAction === PLAN_ACTIONS.CANCELAR"
                @confirm="confirmPlanAction" />

        </div>

        <div v-else class="plan-stage-detail__empty">
            No se encontró información del plan.
        </div>

    </BasePage>

</template>

<script setup>

import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import BasePage from 'src/components/base/BasePage.vue'
import BaseDetailItem from 'src/components/forms/BaseDetailItem.vue'
import StatusChip from 'src/components/states/StatusChip.vue'
import PrimaryActionButton from 'src/components/actions/PrimaryActionButton.vue'
import SecondaryActionButton from 'src/components/actions/SecondaryActionButton.vue'
import BaseConfirmationDialog from 'src/components/base/BaseConfirmationDialog.vue'
import PlanRevision from 'src/views/sections/PlanRevision.vue'
import logoSena from 'src/assets/logos/logo-sena.png'

import { ROLES } from 'src/constants/system/roles.constants'
import { PLANES_MOCK } from 'src/mocks/planes.mock'
import { PLAN_ACTIONS } from 'src/constants/plans/planActions'
import { PLAN_ACTIONS_CONFIRMATION } from 'src/constants/actions/plan_confirmation.constants'
import { PLAN_ACTION_NOTIFICATIONS } from 'src/constants/notifications/notifications.constants'

import { formatDate, formatHour } from 'src/utils/date.utils'
import { notifySuccess, notifyWarning } from 'src/utils/notifications.utils'

import {
    approvePlan,
    rejectPlan,
    executePlan,
    cancelPlan,
    sendPlanToEdition
} from 'src/utils/workflow.utils'

const props = defineProps({
    id: {
        type: String,
        default: ''
    },
    plan: {
        type: Object,
        default: null
    },
    role: {
        type: String,
        default: ROLES.USUARIO
    }
})

const route = useRoute()
const router = useRouter()

const internalRole = ref(ROLES.USUARIO)

const showConfirmation = ref(false)
const pendingAction = ref(null)

const localPlan = ref(
    PLANES_MOCK.find(item => item._id === (props.id || route.params.id)) || PLANES_MOCK[0]
)

const planData = computed(() => props.plan || localPlan.value)

const activeRole = computed(() => props.role || internalRole.value)

const canEditPlan = computed(() => {
    const isBorrador = String(planData.value?.estado || '').toLowerCase() === 'borrador'
    return isBorrador && activeRole.value === ROLES.USUARIO
})

const stageTitle = computed(() => {

    if (!planData.value) {
        return 'PLAN DE CONTINGENCIA'
    }

    const status = String(planData.value.estado || '').toLowerCase()

    switch (status) {
        case 'en revision':
        case 'en revisión':
            return 'PLAN DE CONTINGENCIA ENVIADO A REVISIÓN'
        case 'borrador':
            return 'PLAN DE CONTINGENCIA EN BORRADOR'
        case 'aprobado':
            return 'PLAN DE CONTINGENCIA APROBADO'
        case 'ejecutado':
            return 'PLAN DE CONTINGENCIA EJECUTADO'
        case 'cancelado':
            return 'PLAN DE CONTINGENCIA CANCELADO'
        default:
            return 'PLAN DE CONTINGENCIA'
    }
})

function formatCreationDate(value) {

    if (!value) {
        return '00/00/0000 00:00 a.m.'
    }

    const date = new Date(value)

    if (Number.isNaN(date.getTime())) {
        return '00/00/0000 00:00 a.m.'
    }

    return new Intl.DateTimeFormat('es-CO', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
    }).format(date)
}

function formatPlanDate(value) {
    return formatDate(value) || '00/00/0000'
}

function formatPlanHour(value) {
    return formatHour(value) || '00:00 a.m.'
}

const confirmationConfig = computed(() => {

    return (
        PLAN_ACTIONS_CONFIRMATION[pendingAction.value] ?? {
            title: 'Confirmar acción',
            confirmLabel: 'Confirmar',
            cancelLabel: 'Cancelar',
            variant: 'primary'
        }
    )
})

function confirmPlanAction(payload) {
    executePlanAction(pendingAction.value, payload?.observations)
    pendingAction.value = null
    showConfirmation.value = false
}

function executePlanAction(action, observations = '') {

    let updatedPlan = { ...planData.value }

    switch (action) {

        case PLAN_ACTIONS.APROBAR:
            updatedPlan = approvePlan(updatedPlan, activeRole.value)
            break

        case PLAN_ACTIONS.NO_APROBAR:
            updatedPlan = rejectPlan(updatedPlan, activeRole.value, observations)
            break

        case PLAN_ACTIONS.EJECUTAR:
            updatedPlan = executePlan(updatedPlan, activeRole.value)
            break

        case PLAN_ACTIONS.CANCELAR:
            updatedPlan = cancelPlan(updatedPlan, activeRole.value, observations)
            break

        case PLAN_ACTIONS.MANDAR_EDICION:
            updatedPlan = sendPlanToEdition(updatedPlan, activeRole.value, observations)
            break
    }

    localPlan.value = updatedPlan

    const notification = PLAN_ACTION_NOTIFICATIONS[action]

    if (notification) {

        if (notification.type === 'warning') {
            notifyWarning(notification.successMessage)
        } else {
            notifySuccess(notification.successMessage)
        }
    }
}

function goBack() {
    router.push({ name: 'planes.list' })
}

function editPlan() {
    router.push({
        name: 'planes.create',
        query: { id: planData.value?._id }
    })
}

function viewFullPlan() {
    router.push({
        name: 'planes.detail',
        params: { id: planData.value?._id }
    })
}

</script>

<style scoped lang="scss">
@use 'src/css/variables.scss' as *;
@use 'src/css/typography.scss' as *;

.plan-stage-detail-page {
    width: 100%;
}

.plan-stage-detail {
    width: 100%;
    max-width: 1100px;
    margin: 0 auto;
    padding: 18px 0 0;
}

.detail-grid {
    display: grid;
    grid-template-columns: minmax(0, 1fr);
    gap: 20px;
}

.detail-card {
    width: 100%;
    padding: 20px 22px;
    background-color: $color-surface;
    border: 1px solid #fefefe;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.12);
    border-radius: 6px;
    box-sizing: border-box;
}

.detail-card--plan,
.detail-card--revision {
    grid-column: 1 / -1;
}

.detail-card__header {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 20px;
}

.detail-card__title {
    display: flex;
    align-items: center;
    gap: 10px;
    color: $color-primary;
    font-size: $font-size-lg;
    font-weight: 700;
    text-transform: uppercase;
    padding-left: 15px;
}

.detail-card__title :deep(.q-icon) {
    font-size: 22px;
    padding-bottom: 3px;
}

.detail-card__status {
    padding-left: 50px;
}

.detail-card__body--plan {
    display: grid;
    grid-template-columns: 140px minmax(0, 1fr);
    gap: 36px;
    align-items: center;
    padding: 10px 15px;
}

.detail-card__logo {
    display: flex;
    justify-content: center;
    align-items: center;
}

.detail-card__logo img {
    width: 140px;
    height: auto;
    margin-left: 20px;
}

.detail-card__fields--plan {
    display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    column-gap: 50px;
    row-gap: 16px;
    padding-left: 20px;
}

.detail-card__body--revision {
    padding: 5px 15px 10px;
}

.detail-card__empty,
.plan-stage-detail__empty {
    padding: 30px;
    text-align: center;
    color: $color-text-secondary;
    font-size: $font-size-sm;
}

.plan-stage-detail__actions {
    display: flex;
    grid-column: 1 / -1;
    justify-content: flex-end;
    align-items: center;
    flex-wrap: wrap;
    gap: 12px;
    box-sizing: border-box;
}

.plan-stage-detail__actions-right {
    display: flex;
    align-items: center;
    gap: 10px;
    flex-wrap: wrap;
}

@media (max-width: 1050px) {

    .plan-stage-detail {
        padding: 16px;
    }

    .detail-card__fields--plan {
        grid-template-columns: repeat(2, minmax(0, 1fr));
        column-gap: 20px;
    }

    .detail-card__body--plan {
        grid-template-columns: 110px minmax(0, 1fr);
        gap: 24px;
        padding-left: 10px;
    }
}

@media (max-width: 720px) {

    .detail-card {
        padding: 16px;
    }

    .detail-card__header {
        flex-direction: column;
        align-items: center;
        gap: 8px;

        .detail-card__title {
            padding-left: 0;
            text-align: center;
            gap: 10px;
        }

        .detail-card__status {
            padding-left: 0;
        }
    }

    .detail-card__body--plan {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 16px;
        padding-left: 0;
    }

    .detail-card__fields--plan {
        grid-template-columns: 1fr;
        width: 100%;
        text-align: center;
    }

}

@media (max-width: 560px) {

    .detail-card__title {
        gap: 0;
    }

    .plan-stage-detail__actions-right {
        width: auto;
    }

    .plan-stage-detail__actions :deep(.primary-action-button),
    .plan-stage-detail__actions :deep(.secondary-action-button) {
        width: auto !important;
    }
}

@media (max-width: 420px) {

    .plan-stage-detail__actions {
        flex-direction: column;
    }
}
</style>