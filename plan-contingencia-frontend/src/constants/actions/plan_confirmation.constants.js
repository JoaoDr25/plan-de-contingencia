import { PLAN_ACTIONS } from "../plans/planActions"

export const PLAN_ACTIONS_CONFIRMATION = {

    [PLAN_ACTIONS.APROBAR]: {
        title: 'Aprobar plan de contingencia',
        confirmLabel: 'Aprobar',
        cancelLabel: 'Cancelar',
        variant: 'primary'
    },

    [PLAN_ACTIONS.NO_APROBAR]: {
        title: 'No aprobar el plan',
        confirmLabel: 'No aprobar',
        cancelLabel: 'Cancelar',
        variant: 'danger'
    },

    [PLAN_ACTIONS.EJECUTAR]: {
        title: 'Ejecutar plan de contingencia',
        confirmLabel: 'Ejecutar',
        cancelLabel: 'Cancelar',
        variant: 'primary'
    },

    [PLAN_ACTIONS.CANCELAR]: {
        title: '¿Desea cancelar el plan?',
        confirmLabel: 'Cancelar',
        cancelLabel: 'Cerrar',
        variant: 'danger'
    },
    
    [PLAN_ACTIONS.MANDAR_EDICION]: {
        title: 'Enviar el plan a edición',
        confirmLabel: 'Enviar',
        cancelLabel: 'Cancelar',
        variant: 'primary'
    }
}