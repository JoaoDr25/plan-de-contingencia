import { PLAN_ACTIONS } from "../plans/planActions"

export const PLAN_ACTIONS_BUTTONS = {

    [PLAN_ACTIONS.EDITAR]: {
        label: 'Editar',
        icon: 'edit',
        type: 'primary'
    },

    [PLAN_ACTIONS.APROBAR]: {
        label: 'Aprobar',
        icon: 'check',
        type: 'primary'
    },

    [PLAN_ACTIONS.NO_APROBAR]: {
        label: 'No aprobar',
        icon: 'close',
        type: 'danger'
    },

    [PLAN_ACTIONS.EJECUTAR]: {
        label: 'Ejecutar Plan',
        icon: 'play_arrow',
        type: 'primary'
    },

    [PLAN_ACTIONS.CANCELAR]: {
        label: 'Cancelar Plan',
        icon: 'cancel',
        type: 'danger'
    },

    [PLAN_ACTIONS.MANDAR_EDICION]: {
        label: 'Mandar a edición',
        icon: 'edit',
        type: 'secondary'
    },

    [PLAN_ACTIONS.IMPRIMIR]: {
        label: 'Imprimir',
        icon: 'print',
        type: 'secondary'
    }

}