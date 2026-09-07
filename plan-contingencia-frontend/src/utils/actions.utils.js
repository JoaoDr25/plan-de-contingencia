import { ROLES } from "src/constants/system/roles.constants"

function normalizeValue(value) {
    return String(value ?? '').trim().toLowerCase()
}

export function isPlanOwner(plan, currentUser) {
    if (!plan || !currentUser) {
        return false
    }

    const planOwnerId = plan.usuarioId ?? plan.usuario?._id
    const currentUserId = currentUser._id ?? currentUser.id ?? currentUser.codigo

    if (planOwnerId && currentUserId && normalizeValue(planOwnerId) === normalizeValue(currentUserId)) {
        return true
    }

    const currentUserName = [currentUser.nombre, currentUser.apellido]
        .filter(Boolean)
        .join(' ')

    return normalizeValue(plan.usuarioNombre) === normalizeValue(currentUserName)
}

export function getPlanActions(plan, role, currentUser) {

    if (!plan) {
        return []
    }

    const actions = []

    const status = String(plan.estado || '').toLowerCase()
    const currentRole = String(role || '').toLowerCase()

    if (status === 'borrador' && isPlanOwner(plan, currentUser)) {
        actions.push(
            'view',
            'edit',
            'delete'
        )
        return actions
    }

    if (currentRole === ROLES.USUARIO || currentRole === ROLES.PEDAGOGIA ||
        currentRole === ROLES.SST || currentRole === ROLES.COORDINACION ||
        currentRole === ROLES.ADMINISTRADOR) {
        actions.push('view')
        return actions
    }

    return actions
}