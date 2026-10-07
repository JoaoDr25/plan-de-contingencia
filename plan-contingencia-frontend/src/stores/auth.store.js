import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import {
  validarCredenciales as validateCredentials,
  login as authenticateUser,
  verificarCodigo as verifyCode,
} from 'src/services/auth/authService'
import api from 'src/services/auth/api.js'

const AUTH_STORAGE_KEY = 'plan-contingencia.auth'

function normalizeRole(value) {
  return String(value ?? '')
    .trim()
    .toUpperCase()
}

export const useAuthStore = defineStore('auth', () => {
  const currentUser = ref(null)
  const token = ref(null)
  let hydrated = false

  const isAuthenticated = computed(() => {
    return currentUser.value !== null && token.value !== null
  })

  const role = computed(() => {
    return normalizeRole(currentUser.value?.rol)
  })

  async function validarCredenciales(documento, correo) {
    return validateCredentials(documento, correo)
  }

  async function login(documento, correo) {
    return authenticateUser(documento, correo)
  }

  async function verificarCodigo(usuarioId, codigo) {
    const result = await verifyCode(usuarioId, codigo)
    if (result.success) {
      token.value = result.token
      currentUser.value = { ...result.usuario, _id: result.usuario.id }
      hydrated = true
      persistSession()
    }
    return result
  }

  function logout() {
    currentUser.value = null
    token.value = null

    if (typeof window !== 'undefined') {
      window.localStorage.removeItem(AUTH_STORAGE_KEY)
    }
  }

  async function hydrate() {
    if (hydrated || typeof window === 'undefined') {
      return
    }

    hydrated = true

    const storedSession = window.localStorage.getItem(AUTH_STORAGE_KEY)

    if (!storedSession) {
      return
    }

    try {
      const stored = JSON.parse(storedSession)
      if (!stored?.token) throw new Error('Sesión sin token')
      token.value = stored.token
      const { data } = await api.get('/auth/me')
      currentUser.value = data.data
      persistSession()
    } catch {
      logout()
    }
  }

  function persistSession() {
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(
        AUTH_STORAGE_KEY,
        JSON.stringify({ token: token.value, user: currentUser.value }),
      )
    }
  }

  async function refreshCurrentUser() {
    if (!token.value) {
      return currentUser.value
    }

    const { data } = await api.get('/auth/me')
    currentUser.value = data.data
    persistSession()

    return currentUser.value
  }

  function hasRole(requiredRole) {
    return role.value === requiredRole
  }

  return {
    currentUser,
    isAuthenticated,
    role,
    validarCredenciales,
    login,
    verificarCodigo,
    logout,
    hydrate,
    refreshCurrentUser,
    hasRole,
  }
})
