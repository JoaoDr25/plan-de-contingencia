import { beforeEach, describe, expect, it, vi } from 'vitest'
import { Notify } from 'quasar'
import { notifyError, notifySuccess, notifyWarning } from 'src/utils/notifications.utils'

vi.mock('quasar', () => ({ Notify: { create: vi.fn() } }))
beforeEach(() => vi.clearAllMocks())
describe('notifications.utils', () => {
  it.each([
    [notifySuccess, 'positive'],
    [notifyWarning, 'warning'],
  ])('emite notificacion %s', (notify, type) => {
    notify('Mensaje')
    expect(Notify.create).toHaveBeenCalledExactlyOnceWith({
      type,
      message: 'Mensaje',
      icon: false,
      position: 'bottom',
      timeout: 1800,
    })
  })
  it.each([
    ['Texto de error', 'Texto de error'],
    [
      { response: { data: { message: 'Backend', error: 'Secundario' } }, message: 'Local' },
      'Backend',
    ],
    [{ response: { data: { error: 'Backend error' } } }, 'Backend error'],
    [new Error('Network Error'), 'Network Error'],
    [undefined, 'Ocurrió un error inesperado'],
  ])('extrae el mensaje de error correcto', (error, message) => {
    notifyError(error)
    expect(Notify.create).toHaveBeenCalledExactlyOnceWith({
      type: 'negative',
      message,
      icon: false,
      position: 'bottom',
      timeout: 1800,
    })
  })
})
