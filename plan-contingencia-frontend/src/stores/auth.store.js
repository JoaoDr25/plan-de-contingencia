import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { login as authenticateUser } from 'src/services/authService'

const AUTH_STORAGE_KEY = 'plan-contingencia.auth'

function normalizeRole(value) {
    return String(value ?? '').trim().toLowerCase()
}

export const useAuthStore = defineStore('auth', () => {

    const currentUser = ref(null)

    const isAuthenticated = computed(() => {
        return currentUser.value !== null
    })

    const role = computed(() => {
        return normalizeRole(currentUser.value?.rol)
    })

    async function login(documento, correo) {

        const result = authenticateUser(documento, correo)

        if (!result.success) {
            return result
        }

        currentUser.value = result.user
        persistSession()

        return result
    }

    function logout() {
        currentUser.value = null

        if (typeof window !== 'undefined') {
            window.localStorage.removeItem(AUTH_STORAGE_KEY)
        }
    }

    function hydrate() {
        if (typeof window === 'undefined') {
            return
        }

        const storedSession = window.localStorage.getItem(AUTH_STORAGE_KEY)

        if (!storedSession) {
            return
        }

        try {
            currentUser.value = JSON.parse(storedSession)
        } catch {
            logout()
        }
    }

    function persistSession() {
        if (typeof window !== 'undefined') {
            window.localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(currentUser.value))
        }
    }

    function hasRole(requiredRole) {
        return role.value === requiredRole
    }

    return {
        currentUser,
        isAuthenticated,
        role,
        login,
        logout,
        hydrate,
        hasRole
    }
})