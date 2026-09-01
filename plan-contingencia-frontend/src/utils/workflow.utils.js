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


export function cancelPlan(plan, role, observations = '') {

    if (!plan) {
        return plan
    }

    if (role !== ROLES.COORDINACION) {
        return plan
    }

    if (plan.estado !== 'aprobado') {
        return plan
    }

    let updatedObservaciones = plan.observaciones || ''

    if (observations) {
        const timestamp = new Date().toLocaleDateString('es-CO', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit'
        })
        const roleLabel = role ? ` (${role})` : ''
        const newObs = `[${timestamp}] Cancelado${roleLabel}: ${observations}`
        updatedObservaciones = updatedObservaciones
            ? `${updatedObservaciones}\n${newObs}`
            : newObs
    }

    return {
        ...plan,
        estado: 'cancelado',
        observaciones: updatedObservaciones
    }
}

export function rejectPlan(plan, role, observations = '') {

    if (!canRejectPlan(role, plan)) {
        return plan
    }

    let updatedObservaciones = plan.observaciones || ''

    if (observations) {
        const timestamp = new Date().toLocaleDateString('es-CO', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit'
        })
        const newObs = `[${timestamp}] No Aprobado (${role}): ${observations}`
        updatedObservaciones = updatedObservaciones
            ? `${updatedObservaciones}\n${newObs}`
            : newObs
    }

    return {
        ...plan,
        estado: 'borrador',
        observaciones: updatedObservaciones,
        aprobaciones: {
            pedagogia: 'pendiente',
            sst: 'pendiente',
            coordinacion: 'pendiente'
        }
    }
}

export function sendPlanToEdition(plan, role = '', observations = '') {

    if (!plan || plan.estado !== 'aprobado') {
        return plan
    }

    let updatedObservaciones = plan.observaciones || ''

    if (observations) {
        const timestamp = new Date().toLocaleDateString('es-CO', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit'
        })
        const roleLabel = role ? ` (${role})` : ''
        const newObs = `[${timestamp}] Solicitud de Edición${roleLabel}: ${observations}`
        updatedObservaciones = updatedObservaciones
            ? `${updatedObservaciones}\n${newObs}`
            : newObs
    }

    return {
        ...plan,
        estado: 'borrador',
        observaciones: updatedObservaciones,
        aprobaciones: {
            pedagogia: 'pendiente',
            sst: 'pendiente',
            coordinacion: 'pendiente'
        }
    }
}