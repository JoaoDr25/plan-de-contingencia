import { ROLES } from "../system/roles.constants"

export const PLAN_ACTIONS = {
    EDITAR: 'editar',
    APROBAR: 'aprobar',
    NO_APROBAR: 'no_aprobar',
    EJECUTAR: 'ejecutar',
    CANCELAR: 'cancelar',
    MANDAR_EDICION: 'mandar_edicion',
    IMPRIMIR: 'imprimir'
}

export const PLAN_DETAIL_ACTIONS = {
    [ROLES.USUARIO]: {
        borrador: [
            PLAN_ACTIONS.EDITAR
        ],
        aprobado: [
            PLAN_ACTIONS.IMPRIMIR
        ],
        ejecutado: [
            PLAN_ACTIONS.IMPRIMIR
        ],
        cancelado: [
            PLAN_ACTIONS.IMPRIMIR
        ]
    },

    [ROLES.PEDAGOGIA]: {
        'en revision': [
            PLAN_ACTIONS.APROBAR,
            PLAN_ACTIONS.NO_APROBAR
        ],
        aprobado: [
            PLAN_ACTIONS.IMPRIMIR
        ],
        ejecutado: [
            PLAN_ACTIONS.IMPRIMIR
        ],
        cancelado: [
            PLAN_ACTIONS.IMPRIMIR
        ]
    },

    [ROLES.SST]: {
        'en revision': [
            PLAN_ACTIONS.APROBAR,
            PLAN_ACTIONS.NO_APROBAR
        ],
        aprobado: [
            PLAN_ACTIONS.IMPRIMIR
        ],
        ejecutado: [
            PLAN_ACTIONS.IMPRIMIR
        ],
        cancelado: [
            PLAN_ACTIONS.IMPRIMIR
        ]
    },

    [ROLES.COORDINACION]: {
        'en revision': [
            PLAN_ACTIONS.APROBAR,
            PLAN_ACTIONS.NO_APROBAR
        ],
        aprobado: [
            PLAN_ACTIONS.EJECUTAR,
            PLAN_ACTIONS.CANCELAR,
            PLAN_ACTIONS.MANDAR_EDICION,
            PLAN_ACTIONS.IMPRIMIR
        ],
        ejecutado: [
            PLAN_ACTIONS.IMPRIMIR
        ],
        cancelado: [
            PLAN_ACTIONS.IMPRIMIR
        ]
    }
}

export function getPlanDetailsActions(role, state) {
    return PLAN_DETAIL_ACTIONS[role]?.[state] ?? []
}