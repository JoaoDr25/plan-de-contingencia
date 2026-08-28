import { PLAN_ACTIONS } from 'src/constants/plans/planActions'

export const PLAN_ACTION_NOTIFICATIONS = {

    [PLAN_ACTIONS.APROBAR]: {
        type: 'positive',
        successMessage: 'Plan aprobado exitosamente'
    },

    [PLAN_ACTIONS.NO_APROBAR]: {
        type: 'positive',
        successMessage: 'Plan enviado a Borrador'
    },

    [PLAN_ACTIONS.EJECUTAR]: {
        type: 'positive',
        successMessage: 'Plan ejecutado exitosamente'
    },

    [PLAN_ACTIONS.CANCELAR]: {
        type: 'positive',
        successMessage: 'Plan cancelado correctamente'
    },

    [PLAN_ACTIONS.MANDAR_EDICION]: {
        type: 'positive',
        successMessage: 'Plan enviado a Borrador'
    }

}