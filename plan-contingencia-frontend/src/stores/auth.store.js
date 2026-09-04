import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { login as authenticateUser } from 'src/services/authService'

export const useAuthStore = defineStore('auth', () => {

    const currentUser = ref(null)

    const isAuthenticated = computed(() => {
        return currentUser.value !== null
    })

    const role = computed(() => {
        return currentUser.value?.rol ?? null
    })

    async function login(documento, correo) {

        const result = authenticateUser(documento, correo)

        if (!result.success) {
            return result
        }

        currentUser.value = result.user

        return result
    }

    function logout() {
        currentUser.value = null
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
        hasRole
    }
})