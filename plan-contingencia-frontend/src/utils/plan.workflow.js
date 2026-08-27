import { ROLES } from "src/constants/system/roles.constants"

export function canReviewPlan(role, plan) {

    if (!plan) {
        return false
    }

    if (plan.estado !== 'en revision') {
        return false
    }

    if (
        role === ROLES.PEDAGOGIA ||
        role === ROLES.SST
    ) {
        return plan.aprobaciones?.[role] !== 'aprobado'
    }

    if (
        role === ROLES.COORDINACION
    ) {

        return (
            plan.aprobaciones?.pedagogia === 'aprobado' &&
            plan.aprobaciones?.sst === 'aprobado' &&
            plan.aprobaciones?.coordinacion !== 'aprobado'
        )
    }
    return false
}

export function canApprovePlan(role, plan) {

    return canReviewPlan(role, plan)
}

export function canRejectPlan(role, plan) {

    return canReviewPlan(role, plan)
}

export function approvePlan(plan, role) {

    if (!canApprovePlan(role, plan)) {
        return plan
    }

    const updatedPlan = {
        ...plan,
        aprobaciones: {
            ...plan.aprobaciones,
            [role]: 'aprobado'
        }
    }

    if (
        updatedPlan.aprobaciones.pedagogia === 'aprobado' &&
        updatedPlan.aprobaciones.sst === 'aprobado' &&
        updatedPlan.aprobaciones.coordinacion === 'aprobado'
    ) {
        updatedPlan.estado = 'aprobado'
    }

    return updatedPlan
}

export function executePlan(plan, role) {

    if (!plan) {
        return plan
    }

    if (role !== ROLES.COORDINACION) {
        return plan
    }

    if (plan.estado !== 'aprobado') {
        return plan
    }

    return {
        ...plan,
        estado: 'ejecutado'
    }
}


export function cancelPlan(plan, role) {

    if (!plan) {
        return plan
    }

    if (role !== ROLES.COORDINACION) {
        return plan
    }

    if (plan.estado !== 'aprobado') {
        return plan
    }

    return {
        ...plan,
        estado: 'cancelado'
    }
}

export function rejectPlan(plan, role) {

    if (!canRejectPlan(role, plan)) {
        return plan
    }

    return {
        ...plan,
        estado: 'borrador',
        aprobaciones: {
            pedagogia: 'pendiente',
            sst: 'pendiente',
            coordinacion: 'pendiente'
        }
    }
}

export function sendPlanToEdition(plan) {

    if (!plan || plan.estado !== 'aprobado') {
        return plan
    }

    return {
        ...plan,
        estado: 'borrador',
        aprobaciones: {
            pedagogia: 'pendiente',
            sst: 'pendiente',
            coordinacion: 'pendiente'
        }
    }
}