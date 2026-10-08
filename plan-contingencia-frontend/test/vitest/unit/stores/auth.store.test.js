import { beforeEach, describe, expect, it, vi } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'
import { useAuthStore } from 'src/stores/auth.store'
import * as authService from 'src/services/auth/authService'
import api from 'src/services/auth/api.js'

vi.mock('src/services/auth/authService', () => ({
  validarCredenciales: vi.fn(),
  login: vi.fn(),
  verificarCodigo: vi.fn(),
}))
vi.mock('src/services/auth/api.js', () => ({ default: { get: vi.fn() } }))

const storageKey = 'plan-contingencia.auth'
const user = { id: 'u1', nombre: 'Maria', rol: ' consultor ' }
beforeEach(() => {
  vi.resetAllMocks()
  localStorage.clear()
  setActivePinia(createPinia())
})

describe('auth.store', () => {
  it('inicia sin autenticar y sin rol', () => {
    const store = useAuthStore()
    expect(store.currentUser).toBeNull()
    expect(store.isAuthenticated).toBe(false)
    expect(store.role).toBe('')
  })
  it('validacion y login no autentican antes de verificar el codigo', async () => {
    const store = useAuthStore()
    authService.validarCredenciales.mockResolvedValue({ success: true })
    authService.login.mockResolvedValue({ success: true, usuarioId: 'u1' })
    expect(await store.validarCredenciales('123', 'maria@example.test')).toEqual({ success: true })
    expect(await store.login('123', 'maria@example.test')).toEqual({
      success: true,
      usuarioId: 'u1',
    })
    expect(authService.validarCredenciales).toHaveBeenCalledWith('123', 'maria@example.test')
    expect(authService.login).toHaveBeenCalledWith('123', 'maria@example.test')
    expect(store.isAuthenticated).toBe(false)
    expect(localStorage.getItem(storageKey)).toBeNull()
  })
  it('verifica codigo, normaliza id y rol y persiste sesion', async () => {
    const store = useAuthStore()
    authService.verificarCodigo.mockResolvedValue({
      success: true,
      token: 'test-token',
      usuario: user,
    })
    await store.verificarCodigo('u1', '001234')
    expect(authService.verificarCodigo).toHaveBeenCalledWith('u1', '001234')
    expect(store.currentUser).toEqual({ ...user, _id: 'u1' })
    expect(store.isAuthenticated).toBe(true)
    expect(store.hasRole('CONSULTOR')).toBe(true)
    expect(store.hasRole('ADMINISTRADOR')).toBe(false)
    expect(JSON.parse(localStorage.getItem(storageKey))).toEqual({
      token: 'test-token',
      user: { ...user, _id: 'u1' },
    })
  })
  it('un codigo incorrecto no crea sesion', async () => {
    const store = useAuthStore()
    authService.verificarCodigo.mockResolvedValue({ success: false, message: 'Codigo invalido' })
    expect(await store.verificarCodigo('u1', 'wrong')).toEqual({
      success: false,
      message: 'Codigo invalido',
    })
    expect(store.isAuthenticated).toBe(false)
    expect(localStorage.getItem(storageKey)).toBeNull()
  })
  it('hidrata desde /auth/me y no confia en el rol almacenado', async () => {
    localStorage.setItem(
      storageKey,
      JSON.stringify({ token: 'test-token', user: { rol: 'ADMINISTRADOR' } }),
    )
    api.get.mockResolvedValue({ data: { data: { _id: 'u1', rol: 'SST' } } })
    const store = useAuthStore()
    await store.hydrate()
    await store.hydrate()
    expect(api.get).toHaveBeenCalledExactlyOnceWith('/auth/me')
    expect(store.isAuthenticated).toBe(true)
    expect(store.role).toBe('SST')
    expect(JSON.parse(localStorage.getItem(storageKey)).user.rol).toBe('SST')
  })
  it.each(['invalid-json', '{}', '{"user":{"rol":"ADMINISTRADOR"}}'])(
    'descarta sesion corrupta: %s',
    async (stored) => {
      localStorage.setItem(storageKey, stored)
      const store = useAuthStore()
      await store.hydrate()
      expect(store.isAuthenticated).toBe(false)
      expect(localStorage.getItem(storageKey)).toBeNull()
      expect(api.get).not.toHaveBeenCalled()
    },
  )
  it('limpia sesion cuando el servidor rechaza la hidratacion', async () => {
    localStorage.setItem(storageKey, JSON.stringify({ token: 'test-token' }))
    api.get.mockRejectedValue(new Error('Unauthorized'))
    const store = useAuthStore()
    await store.hydrate()
    expect(store.isAuthenticated).toBe(false)
    expect(localStorage.getItem(storageKey)).toBeNull()
  })
  it('sin sesion no hace solicitudes de hidratacion ni refresh', async () => {
    const store = useAuthStore()
    await store.hydrate()
    expect(await store.refreshCurrentUser()).toBeNull()
    expect(api.get).not.toHaveBeenCalled()
  })
  it('actualiza el usuario autenticado y logout limpia almacenamiento', async () => {
    const store = useAuthStore()
    authService.verificarCodigo.mockResolvedValue({
      success: true,
      token: 'test-token',
      usuario: user,
    })
    await store.verificarCodigo('u1', '001234')
    const updated = { _id: 'u1', rol: 'PEDAGOGIA', nombre: 'Maria' }
    api.get.mockResolvedValue({ data: { data: updated } })
    expect(await store.refreshCurrentUser()).toEqual(updated)
    expect(store.role).toBe('PEDAGOGIA')
    store.logout()
    expect(store.currentUser).toBeNull()
    expect(store.isAuthenticated).toBe(false)
    expect(localStorage.getItem(storageKey)).toBeNull()
  })
  it('propaga errores de refresh sin reemplazar el usuario por un resultado falso', async () => {
    const store = useAuthStore()
    authService.verificarCodigo.mockResolvedValue({
      success: true,
      token: 'test-token',
      usuario: user,
    })
    await store.verificarCodigo('u1', '001234')
    const error = new Error('Network Error')
    api.get.mockRejectedValue(error)
    await expect(store.refreshCurrentUser()).rejects.toBe(error)
    expect(store.currentUser._id).toBe('u1')
  })
})
