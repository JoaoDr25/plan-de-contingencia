import { Notify } from 'quasar'

export function notifySuccess(message) {
  Notify.create({
    message,
    type: 'positive',
    icon: false,
    position: 'bottom',
    timeout: 1800,
  })
}

export function notifyWarning(message) {
  Notify.create({
    message,
    type: 'warning',
    icon: false,
    position: 'bottom',
    timeout: 1800,
  })
}

function getErrorMessage(error) {
  if (typeof error === 'string') return error

  return (
    error?.response?.data?.message ||
    error?.response?.data?.error ||
    error?.message ||
    'Ocurrió un error inesperado'
  )
}

export function notifyError(error) {
  Notify.create({
    type: 'negative',
    message: getErrorMessage(error),
    icon: false,
    position: 'bottom',
    timeout: 1800,
  })
}
