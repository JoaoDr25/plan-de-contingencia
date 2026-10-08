import { beforeEach, describe, expect, it, vi } from 'vitest'
import api from 'src/services/auth/api.js'

vi.mock('src/services/auth/api.js', () => ({
  default: { get: vi.fn(), post: vi.fn(), put: vi.fn(), patch: vi.fn(), delete: vi.fn() },
}))

export function testService(service, cases) {
  beforeEach(() => vi.resetAllMocks())

  for (const { name, method, args = [], request, response, expected } of cases) {
    describe(name, () => {
      it('usa el metodo, endpoint y payload exactos y transforma la respuesta', async () => {
        api[method].mockResolvedValue(response)
        await expect(service[name](...args)).resolves.toEqual(expected)
        expect(api[method]).toHaveBeenCalledExactlyOnceWith(...request)
        expect(Object.values(api).reduce((count, mock) => count + mock.mock.calls.length, 0)).toBe(
          1,
        )
      })

      it('propaga el error del backend sin simular exito', async () => {
        const error = new Error('Backend no disponible')
        api[method].mockRejectedValue(error)
        await expect(service[name](...args)).rejects.toBe(error)
      })
    })
  }
}
