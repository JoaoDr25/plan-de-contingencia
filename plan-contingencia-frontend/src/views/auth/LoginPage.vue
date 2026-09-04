<template>
    <div class="login-page">
        <div class="login-page__container">

            <div class="login-page__header">
                <img src="src/assets/logos/logo-sena.png" alt="SENA" class="login-page__logo" />

                <p class="login-page__subtitle">
                    PLANES DE CONTINGENCIA
                </p>
            </div>

            <q-card class="login-page__card">
                <q-card-section>

                    <div class="login-page__form-header">
                        <h2>Inicio de sesión</h2>

                        <p>
                            Ingrese sus credenciales institucionales
                        </p>
                    </div>

                    <q-form ref="loginForm" class="login-page__form" @submit.prevent="handleLogin">

                        <q-input v-model="form.documento" label="Documento" placeholder="Ingrese su número de documento"
                            outlined :disable="loading" :rules="[
                                val => !!val || 'El documento es obligatorio',
                                val =>
                                    /^\d+$/.test(val) ||
                                    'El documento debe contener únicamente números'
                            ]" />

                        <q-input v-model="form.correo" label="Correo institucional" placeholder="correo@soy.sena.edu.co"
                            type="email" outlined :disable="loading" :rules="[
                                val => !!val || 'El correo institucional es obligatorio',
                                val =>
                                    /.+@.+\..+/.test(val) ||
                                    'Ingrese un correo electrónico válido'
                            ]" />

                        <q-btn type="submit" label="Ingresar" icon="login" color="primary" unelevated class="full-width"
                            :loading="loading" />

                    </q-form>

                </q-card-section>
            </q-card>

            <div class="login-page__footer">
                Sistema de gestión de Planes de Contingencia
            </div>

        </div>
    </div>
</template>

<script setup>

import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from 'src/stores/auth.store'
import { notifySuccess, notifyError } from 'src/utils/notifications.utils'

const router = useRouter()
const authStore = useAuthStore()

const loginForm = ref(null)

const loading = ref(false)

const form = ref({
    documento: '',
    correo: ''
})

async function handleLogin() {
  const isValid = await loginForm.value.validate()

  if (!isValid) {
    return
  }

  loading.value = true

  try {
    const result = await authStore.login(
      form.value.documento.trim(),
      form.value.correo.trim()
    )

    if (!result.success) {
      notifyError(result.message)
      return
    }

    notifySuccess('Inicio de sesión exitoso')

    await router.push({
      name: 'dashboard'
    })
  } finally {
    loading.value = false
  }
}

</script>

<style scoped lang="scss">

@use 'src/css/variables.scss' as *;
@use 'src/css/typography.scss' as *;

.login-page {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 24px;
    background: $color-background;
}

.login-page__container {
    width: 100%;
    max-width: 420px;
}

.login-page__header {
    text-align: center;
    margin-bottom: 24px;
}

.login-page__logo {
    width: 90px;
    height: auto;
    margin-bottom: 12px;
}

.login-page__title {
    margin: 0;
    font-size: 32px;
    font-weight: 700;
    color: $primary;
}

.login-page__subtitle {
    margin: 4px 0 0;
    color: $color-text-secondary;
}

.login-page__card {
    border-radius: 12px;
}

.login-page__form-header {
    text-align: center;
    margin-bottom: 24px;
}

.login-page__form-header h2 {
    margin: 0 0 8px;
    font-size: 24px;
}

.login-page__form-header p {
    margin: 0;
    color: $color-text-secondary;
}

.login-page__form {
    display: flex;
    flex-direction: column;
    gap: 16px;
}

.login-page__footer {
    margin-top: 24px;
    text-align: center;
    font-size: 13px;
    color: $color-text-secondary;
}
</style>