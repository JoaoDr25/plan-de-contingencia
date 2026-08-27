import { ROLES } from "src/constants/system/roles.constants"

export function getPlanActions(plan, role) {

    if (!plan) {
        return []
    }

    const actions = []

    const status = String(plan.estado || '').toLowerCase()
    const currentRole = String(role || '').toLowerCase()

    if (currentRole === ROLES.USUARIO) {

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

    if (currentRole === ROLES.PEDAGOGIA) {

        actions.push('view')
        return actions
    }

    if (currentRole === ROLES.SST) {

        actions.push('view')
        return actions
    }

    if (currentRole === ROLES.COORDINACION) {

        actions.push('view')
        return actions
    }

    return actions
}