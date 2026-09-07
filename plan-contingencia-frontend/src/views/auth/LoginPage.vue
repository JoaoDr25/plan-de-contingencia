<template>
    <q-layout view="lHh Lpr lFf" class="login-layout">

        <AppHeader :show-menu="false" :show-logout="false" />

        <q-page-container>
            <div class="login-page">
                <div class="login-page__container">

                    <div class="login-page__header">
                        <h1>SISTEMA DE GESTIÓN DE PLANES DE CONTINGENCIA</h1>
                    </div>

                    <q-card class="login-page__card">
                        <q-card-section>

                            <div class="login-page__form-header">
                                <!-- <h2>Inicio de sesión</h2> -->

                                <!-- <p>
                                    Ingrese sus Credenciales Institucionales
                                </p> -->
                                <p>
                                    INGRESE SUS CREDENCIALES INSTITUCIONALES
                                </p>
                            </div>

                            <q-form ref="loginForm" class="login-page__form" @submit.prevent="handleLogin">

                                <BaseInput v-model="form.documento" label="Documento"
                                    :placeholder="focusedField === 'documento' ? 'Ingrese su número de documento' : ''"
                                    type="number" :disable="loading" :rules="[
                                        val => !!val || 'El documento es obligatorio',
                                        val =>
                                            /^\d+$/.test(val) ||
                                            'El documento debe contener únicamente números'
                                    ]" @focus="focusedField = 'documento'" @blur="clearFocusedField" />

                                <BaseInput v-model="form.correo" label="Correo institucional"
                                    :placeholder="focusedField === 'correo' ? 'correo@soy.sena.edu.co' : ''"
                                    type="email" :disable="loading" :rules="[
                                        val => !!val || 'El correo institucional es obligatorio',
                                        val =>
                                            /.+@.+\..+/.test(val) ||
                                            'Ingrese un correo electrónico válido'
                                    ]" @focus="focusedField = 'correo'" @blur="clearFocusedField" />

                                <div class="login-page__submit">
                                    <PrimaryActionButton type="submit" label="CONSULTAR" icon="" size="sm"
                                        :loading="loading" />
                                </div>

                            </q-form>

                        </q-card-section>
                    </q-card>

                </div>
            </div>
        </q-page-container>
    </q-layout>
</template>

<script setup>

import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useRoute } from 'vue-router'
import { useAuthStore } from 'src/stores/auth.store'
import { notifySuccess, notifyWarning, notifyError } from 'src/utils/notifications.utils'
import AppHeader from 'src/components/layout/AppHeader.vue'
import BaseInput from 'src/components/forms/BaseInput.vue'
import PrimaryActionButton from 'src/components/actions/PrimaryActionButton.vue'

const router = useRouter()
const route = useRoute()
const authStore = useAuthStore()

const loginForm = ref(null)

const loading = ref(false)
const focusedField = ref('')

const form = ref({
    documento: '',
    correo: ''
})

function clearFocusedField() {
    focusedField.value = ''
}

async function handleLogin() {
    const isValid = await loginForm.value.validate()

    if (!isValid) {
        notifyWarning('Complete los campos requeridos')
        return
    }

    loading.value = true

    try {
        const result = await authStore.login(
            form.value.documento.trim(),
            form.value.correo.trim()
        )

        if (!result.success && result.message === 'Documento o correo institucional incorrecto') {
            notifyWarning('El documento o correo institucional no coinciden')
            return
        }

        if (!result.success) {
            notifyError(result.message)
            return
        }

        notifySuccess('Inicio de sesión exitoso')

        const redirectPath = typeof route.query.redirect === 'string' && route.query.redirect.startsWith('/')
            ? route.query.redirect
            : '/'

        await router.push(redirectPath)
    } finally {
        loading.value = false
    }
}

</script>

<style scoped lang="scss">

@use 'src/css/variables.scss' as *;
@use 'src/css/typography.scss' as *;

.login-page {
    min-height: calc(100vh - 56px);
    display: flex;
    align-items: start;
    justify-content: center;
    padding: $spacing-xl $spacing-lg;
    background: $color-surface;
}

.login-page__container {
    width: 100%;
    max-width: 560px;
}

.login-page__header {
    text-align: center;
    margin-bottom: 10rem;
}

.login-page__header h1 {
    font-size: $font-size-2xl;
    font-weight: $font-weight-bold;
    line-height: $line-height-tight;
    margin-top: 10px;
    text-transform: uppercase;
    color: #000000;
    white-space: nowrap;
}

.login-page__card {
    border-radius: 5px;
    border: 1px solid $color-border;
    box-shadow: 0 7px 14px rgba(0, 0, 0, 0.2);
    background-color: $color-surface;
}

.login-page__form-header {
    text-align: center;
    margin-bottom: $spacing-lg;
}

.login-page__form-header h2 {
    margin-bottom: $spacing-sm;
    font-size: $font-size-3xl;
    color: $color-text-primary;
}

.login-page__form-header p {
    margin: 10px 0 0 0;
    color: $color-text-secondary;
}

.login-page__form {
    display: flex;
    flex-direction: column;
    gap: $spacing-md;
}

.login-page__submit {
    display: flex;
    justify-content: center;
    padding-top: $spacing-xs;
}

.login-page__submit :deep(.q-icon.on-left) {
    display: none;
}

.login-page__submit :deep(.q-btn__content) {
    justify-content: center;
    width: 100%;
    text-align: center;
}

@media (max-width: 600px) {
    .login-page {
        padding: $spacing-lg $spacing-md;
    }

    .login-page__header h1 {
        font-size: $font-size-md;
        white-space: normal;
    }
}
</style>