import { Notify } from "quasar";

export function notifySuccess(message) {
    Notify.create({
        message,
        type: 'positive',
        position: 'bottom',
        timeout: 1800
    })
}

export function notifyWarning(message) {
    Notify.create({
        message,
        type: 'warning',
        position: 'bottom',
        timeout: 1800
    })
}

export function notifyError(message) {
    Notify.create({
        type: 'negative',
        message,
        position: 'bottom',
        timeout: 1800
    })
}