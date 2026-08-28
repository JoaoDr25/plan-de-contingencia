import { Notify } from "quasar";

export function notifySuccess(message) {
    Notify.create({
        message,
        type: 'positive',
        position: 'bottom',
        timeout: 1800
    })
}