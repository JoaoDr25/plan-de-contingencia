import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import routerFactory from 'src/router/index'

const { auth } = vi.hoisted(() => ({
  auth: { isAuthenticated: false, role: '', hydrate: vi.fn() },
}))
vi.mock('#q-app/wrappers', () => ({ defineRouter: (factory) => factory }))
vi.mock('src/stores/auth.store', () => ({ useAuthStore: () => auth }))
vi.mock('src/router/routes', async (importOriginal) => {
  const { default: routes } = await importOriginal()
  function stubViews(records) {
    return records.map((record) => ({
      ...record,
      component: { template: '<div />' },
      ...(record.children ? { children: stubViews(record.children) } : {}),
    }))
  }
  return { default: stubViews(routes) }
})
let router
beforeEach(() => {
  vi.resetAllMocks()
  vi.stubEnv('SERVER', 'true')
  auth.isAuthenticated = false
  auth.role = ''
  auth.hydrate.mockResolvedValue()
  router = routerFactory({ store: {} })
})
afterEach(() => vi.unstubAllEnvs())
describe('router: guard real y metadatos de rutas', () => {
  it('login es publico para usuario anonimo', async () => {
    await router.push('/login')
    expect(router.currentRoute.value.name).toBe('login')
    expect(auth.hydrate).toHaveBeenCalled()
  })
  it('ruta protegida redirige a login preservando destino completo', async () => {
    await router.push('/planes/consulta?estado=aprobado')
    expect(router.currentRoute.value.name).toBe('login')
    expect(router.currentRoute.value.query.redirect).toBe('/planes/consulta?estado=aprobado')
  })
  it('autenticado no vuelve a login', async () => {
    auth.isAuthenticated = true
    auth.role = 'CONSULTOR'
    await router.push('/login')
    expect(router.currentRoute.value.name).toBe('dashboard')
  })
  it.each(['CONSULTOR', 'ADMINISTRADOR'])('%s puede crear un plan', async (role) => {
    auth.isAuthenticated = true
    auth.role = role
    await router.push('/planes/crear')
    expect(router.currentRoute.value.name).toBe('planes.create')
  })
  it.each(['SST', 'PEDAGOGIA', 'COORDINACION', 'SUBDIRECCION', 'BIENESTAR'])(
    '%s no accede a crear pero puede consultar',
    async (role) => {
      auth.isAuthenticated = true
      auth.role = role
      await router.push('/planes/crear')
      expect(router.currentRoute.value.name).toBe('dashboard')
      await router.push('/planes/consulta')
      expect(router.currentRoute.value.name).toBe('planes.consultation')
    },
  )
  it('consultor no accede a catalogos restringidos', async () => {
    auth.isAuthenticated = true
    auth.role = 'CONSULTOR'
    await router.push('/programas')
    expect(router.currentRoute.value.name).toBe('dashboard')
  })
  it.each([
    'planes.list',
    'planes.history',
    'planes.consultation',
    'planes.detail',
    'planes.stage',
  ])('administrador puede navegar a %s', async (name) => {
    auth.isAuthenticated = true
    auth.role = 'ADMINISTRADOR'
    await router.push({
      name,
      params: name === 'planes.detail' || name === 'planes.stage' ? { id: 'p1' } : {},
    })
    expect(router.currentRoute.value.name).toBe(name)
  })
  it('espera hidratacion antes de decidir acceso', async () => {
    auth.hydrate.mockImplementationOnce(async () => {
      auth.isAuthenticated = true
      auth.role = 'CONSULTOR'
    })
    await router.push('/planes')
    expect(router.currentRoute.value.name).toBe('planes.list')
  })
  it('rol desconocido no obtiene acceso por estar autenticado', async () => {
    auth.isAuthenticated = true
    auth.role = 'UNKNOWN'
    await router.push('/planes')
    expect(router.currentRoute.value.name).toBe('dashboard')
  })
})
