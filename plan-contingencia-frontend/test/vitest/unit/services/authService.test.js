import { beforeEach, describe, expect, it, vi } from 'vitest'
import api from 'src/services/auth/api.js'
import { login, validarCredenciales, verificarCodigo } from 'src/services/auth/authService'

vi.mock('src/services/auth/api.js', () => ({ default: { post: vi.fn() } }))
beforeEach(() => vi.resetAllMocks())

describe('authService', () => {
  const cases = [
    {
      name: 'validarCredenciales',
      fn: validarCredenciales,
      args: ['123', 'maria@example.test'],
      path: '/auth/validar-credenciales',
      payload: { documento: '123', correoInstitucional: 'maria@example.test' },
      result: { success: true },
    },
    {
      name: 'login',
      fn: login,
      args: ['123', 'maria@example.test'],
      path: '/auth/login',
      payload: { documento: '123', correoInstitucional: 'maria@example.test' },
      result: { success: true, usuarioId: 'u1' },
    },
    {
      name: 'verificarCodigo',
      fn: verificarCodigo,
      args: ['u1', '001234'],
      path: '/auth/verificar-codigo',
      payload: { usuarioId: 'u1', codigo: '001234' },
      result: { success: true, usuarioId: 'u1' },
    },
  ]
  for (const { name, fn, args, path, payload, result } of cases) {
    it(`${name}: envia el contrato correcto`, async () => {
      api.post.mockResolvedValue({ data: { data: { usuarioId: 'u1' } } })
      await expect(fn(...args)).resolves.toEqual(result)
      expect(api.post).toHaveBeenCalledExactlyOnceWith(path, payload)
    })
    it(`${name}: muestra el mensaje del backend`, async () => {
      api.post.mockRejectedValue({ response: { data: { message: 'Credenciales incorrectas' } } })
      await expect(fn(...args)).resolves.toEqual({
        success: false,
        message: 'Credenciales incorrectas',
      })
    })
    it(`${name}: informa un error de red sin fingir autenticacion`, async () => {
      api.post.mockRejectedValue(new Error('Network Error'))
      const result = await fn(...args)
      expect(result.success).toBe(false)
      expect(result.message).toEqual(expect.any(String))
      expect(result.message.length).toBeGreaterThan(0)
    })
  }
})
