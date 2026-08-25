import { PLAN_ROLES } from 'src/constants/actions/plan.constants'

export function getPlanActions(plan, role) {

    if (!plan) {
        return []
    }

    const actions = []

    const status = String(plan.estado || '').toLowerCase()
    const currentRole = String(role || '').toLowerCase()

    if (currentRole === PLAN_ROLES.USUARIO) {

        if (status === 'borrador') {
            actions.push(
                'view',
                'edit',
                'delete'
            )
            return actions
        }
        actions.push('view')
        return actions
    }

    if (currentRole === PLAN_ROLES.PEDAGOGIA) {

        actions.push('view')
        return actions
    }

    if (currentRole === PLAN_ROLES.SST) {

        actions.push('view')
        return actions
    }

    if (currentRole === PLAN_ROLES.COORDINACION) {

        actions.push('view')
        return actions
    }

    return actions
}