import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { openPdf } from 'src/utils/pdf.utils'

let popup
beforeEach(() => {
  vi.useFakeTimers()
  popup = {
    opener: {},
    closed: false,
    document: { title: '', body: { textContent: '' } },
    location: { replace: vi.fn() },
    close: vi.fn(),
  }
  vi.spyOn(window, 'open').mockReturnValue(popup)
  vi.spyOn(URL, 'createObjectURL').mockReturnValue('blob:test-pdf')
  vi.spyOn(URL, 'revokeObjectURL').mockImplementation(() => {})
})
afterEach(() => {
  vi.useRealTimers()
  vi.restoreAllMocks()
})
describe('openPdf', () => {
  it('abre antes de cargar, aísla opener y libera URL despues de 60 segundos', async () => {
    const load = vi.fn(async () => {
      expect(window.open).toHaveBeenCalledWith('about:blank', '_blank')
      return new Blob(['PDF'])
    })
    await openPdf(load)
    expect(popup.opener).toBeNull()
    expect(popup.location.replace).toHaveBeenCalledWith('blob:test-pdf')
    expect(URL.revokeObjectURL).not.toHaveBeenCalled()
    vi.advanceTimersByTime(59999)
    expect(URL.revokeObjectURL).not.toHaveBeenCalled()
    vi.advanceTimersByTime(1)
    expect(URL.revokeObjectURL).toHaveBeenCalledExactlyOnceWith('blob:test-pdf')
  })
  it('informa popup bloqueado y no solicita el PDF', async () => {
    window.open.mockReturnValue(null)
    const load = vi.fn()
    await expect(openPdf(load)).rejects.toThrow('Permita las ventanas emergentes')
    expect(load).not.toHaveBeenCalled()
  })
  it('si el usuario cierra la ventana no crea URLs', async () => {
    popup.closed = true
    await openPdf(async () => new Blob(['PDF']))
    expect(URL.createObjectURL).not.toHaveBeenCalled()
  })
  it('cierra la ventana y propaga fallas del servicio', async () => {
    const error = new Error('Backend no disponible')
    await expect(
      openPdf(async () => {
        throw error
      }),
    ).rejects.toBe(error)
    expect(popup.close).toHaveBeenCalledOnce()
  })
  it('extrae mensaje de error JSON recibido como Blob', async () => {
    const error = {
      response: {
        data: new Blob([JSON.stringify({ message: 'Plan no aprobado' })], {
          type: 'application/json',
        }),
      },
    }
    await expect(
      openPdf(async () => {
        throw error
      }),
    ).rejects.toThrow('Plan no aprobado')
    expect(popup.close).toHaveBeenCalledOnce()
  })
})
