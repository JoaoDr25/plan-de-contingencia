import { PLAN_ACTIONS } from "../plans/planActions"

export const PLAN_ACTIONS_BUTTONS = {

    [PLAN_ACTIONS.EDITAR]: {
        label: 'Editar Plan',
        icon: 'edit',
        type: 'primary'
    },

    [PLAN_ACTIONS.APROBAR]: {
        label: 'Aprobar Plan',
        icon: 'check',
        type: 'primary'
    },

    [PLAN_ACTIONS.NO_APROBAR]: {
        label: 'No Aprobar',
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
        label: 'Enviar a Edición',
        icon: 'edit',
        type: 'secondary'
    },

    [PLAN_ACTIONS.IMPRIMIR]: {
        label: 'Imprimir',
        icon: 'print',
        type: 'secondary'
    }

}