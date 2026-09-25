<template>
  <BasePage class="user-detail-page">
    <div class="user-detail detail-grid">
      <section class="detail-card detail-card--user">
        <div class="detail-card__header">
          <div class="detail-card__title">
            <q-icon name="person" />
            <span>Datos del Usuario</span>
          </div>

          <div class="detail-card__status">
            <StatusChip v-if="userData" :status="userData.estado" />
          </div>
        </div>

        <div v-if="userData" class="detail-card__body detail-card__body--user">
          <div class="detail-card__logo">
            <img :src="logoSena" alt="Logo SENA" />
          </div>

          <div class="detail-card__fields detail-card__fields--user">
            <BaseDetailItem label="Nombre del Usuario" :value="fullName" />

            <BaseDetailItem label="" />

            <BaseDetailItem label="Tipo de Documento" :value="userData.tipo" />

            <BaseDetailItem label="N.º Documento" :value="userData.documento" />
          </div>
        </div>

        <div v-else-if="loading" class="detail-card__empty">
          Cargando información del usuario...
        </div>

        <div v-else class="detail-card__empty">
          No se encontró información del usuario.
        </div>
      </section>

      <section class="detail-card detail-card--work">
        <div class="detail-card__header">
          <div class="detail-card__title">
            <q-icon name="badge" />
            <span>Información Laboral</span>
          </div>
        </div>

        <div class="detail-card__fields detail-card__fields--work">
          <BaseDetailItem label="Rol Asignado" :value="userData?.rol || 'No asignado'" />

          <BaseDetailItem
            label="Centro de Formación"
            :value="userData?.centro || 'No registrado'"
          />

          <BaseDetailItem
            label="Red de Conocimiento"
            :value="userData?.redConocimiento || 'No registrada'"
          />

          <BaseDetailItem
            label="Área Temática"
            :value="userData?.areaTematica || 'No registrada'"
          />

          <BaseDetailItem
            label="Tipo de Vinculación"
            :value="userData?.tipoVinculacion || 'No registrado'"
          />

          <BaseDetailItem label="Máximo de Horas" :value="maxHours" />
        </div>
      </section>

      <section class="detail-card detail-card--access">
        <div class="detail-card__header">
          <div class="detail-card__title">
            <q-icon name="contact_phone" />
            <span>Información de Contacto y Acceso</span>
          </div>
        </div>

        <div class="detail-card__fields detail-card__fields--access">
          <BaseDetailItem
            label="Correo Institucional"
            :value="userData?.correo || 'No registrado'"
          />

          <BaseDetailItem
            label="Correo Personal"
            :value="userData?.correoPersonal || 'No registrado'"
          />

          <BaseDetailItem
            label="Teléfono"
            :value="userData?.telefono || 'No registrado'"
          />

          <BaseDetailItem
            label="Último Acceso"
            :value="lastAccess"
          />
        </div>
      </section>

      <div class="user-detail__actions">
        <SecondaryActionButton
          label="Volver"
          icon="arrow_back"
          size="sm"
          @click="goBack"
        />
      </div>
    </div>
  </BasePage>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { formatDate } from 'src/utils/date.utils'
import { notifyError } from 'src/utils/notifications.utils'

import usuarioService from 'src/services/modules/usuarioService.js'

import BasePage from 'src/components/base/BasePage.vue'
import BaseDetailItem from 'src/components/forms/BaseDetailItem.vue'
import SecondaryActionButton from 'src/components/actions/SecondaryActionButton.vue'
import StatusChip from 'src/components/states/StatusChip.vue'

import logoSena from 'src/assets/logos/logo-sena.png'

const route = useRoute()
const router = useRouter()

const userData = ref(null)
const loading = ref(false)

const fullName = computed(() => {
  if (!userData.value) {
    return 'No registrado'
  }

  return `${userData.value.nombre ?? ''} ${userData.value.apellido ?? ''}`.trim() || 'No registrado'
})

const maxHours = computed(() => {
  return userData.value?.maximoHoras
    ? `${userData.value.maximoHoras} horas`
    : 'No registrado'
})

const lastAccess = computed(() => {
  return userData.value?.acceso ? formatDate(userData.value.acceso) : 'No Registrado'
})

async function loadUser() {
  loading.value = true

  try {
    userData.value = await usuarioService.getUsuarioById(route.params.id)
  } catch (error) {
    console.error('Error al cargar usuario:', error)
    userData.value = null
    notifyError(
      error.response?.data?.message ||
      'No fue posible cargar la información del usuario',
    )
  } finally {
    loading.value = false
  }
}

function goBack() {
  router.push({
    name: 'usuarios.list',
  })
}

onMounted(() => {
  loadUser()
})
</script>

<style scoped lang="scss">

@use 'src/css/variables.scss' as *;
@use 'src/css/typography.scss' as *;

.user-detail {
  width: 100%;
  max-width: 1100px;
  margin: 0 auto;
  padding: 18px 0 0;
}

.detail-grid {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
  gap: 20px;
}

.detail-card {
  width: 100%;
  padding: 20px 22px;
  background-color: $color-surface;
  border: 1px solid #fefefe;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.12);
  border-radius: 6px;
  box-sizing: border-box;
}

.detail-card--access {
  grid-column: 1 / -1;
}

.detail-card__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 20px;
}

.detail-card__title {
  display: flex;
  align-items: center;
  gap: 10px;
  color: $color-primary;
  font-size: $font-size-lg;
  font-weight: 700;
  text-transform: uppercase;
  padding-left: 25px;
}

.detail-card__title :deep(.q-icon) {
  font-size: 22px;
  padding-bottom: 5px;
}

.detail-card__status {
  padding-right: 10px;
}

.detail-card__body--user {
  display: grid;
  grid-template-columns: 95px minmax(0, 1fr);
  gap: 48px;
  align-items: center;
  padding: 10px;
  padding-left: 40px;
}

.detail-card__logo {
  display: flex;
  justify-content: center;
  align-items: center;
}

.detail-card__logo img {
  width: 140px;
  height: auto;
}

.detail-card__fields {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  column-gap: 14px;
  row-gap: 16px;
}

.detail-card__fields--user {
  grid-template-columns: minmax(0, 1.5fr) minmax(0, 0.8fr);
}

.detail-card__fields--work {
  grid-template-columns: repeat(2, minmax(0, 1fr));
  column-gap: 22px;
  row-gap: 16px;
  padding: 10px;
  padding-left: 30px;
}

.detail-card__fields--access {
  display: flex;
  flex-wrap: wrap;
  // display: grid;
  // grid-template-columns: 1fr 1fr 1fr 1fr;
  gap: 16px 32px;
  padding: 10px;
  padding-left: 30px;
}

.detail-card__fields--access > * {
  flex: 0 0 calc((100% - 64px) / 3);
}

.detail-card__empty {
  padding: 12px 0;
  color: $color-text-secondary;
  font-size: $font-size-sm;
}

.user-detail__actions {
  display: flex;
  grid-column: 1 / -1;
  justify-content: flex-end;
  align-items: center;
  flex-wrap: wrap;
  gap: 10px;
  box-sizing: border-box;
  padding-bottom: 18px;
}

@media (max-width: 1254px) {
  .user-detail {
    padding: 16px;
  }

  .detail-grid {
    grid-template-columns: 1fr;
  }

  .detail-card {
    text-align: center;
  }

  .detail-card__header {
    justify-self: center;
    margin-bottom: 0;
  }

  .detail-card__status {
    padding-left: 35px;
  }

  .detail-card__body--user {
    display: flex;
    flex-direction: column;
    gap: 0;
    align-items: stretch;
  }

  .detail-card__logo {
    justify-content: center;
    width: 100%;
  }

  .detail-card__logo img {
    width: 140px;
  }

  .detail-card__fields--user,
  .detail-card__fields--work,
  .detail-card__fields--access {
    width: 100%;
    box-sizing: border-box;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    column-gap: 22px;
    margin-top: 10px;
  }

  .detail-card__fields--access > * {
    flex-basis: calc((100% - 44px) / 3);
  }

  .detail-card__fields--user > :first-child {
    grid-column: 1 / -1;
    text-align: center;
  }
}

@media (min-width: 721px) and (max-width: 1252px) {
  .detail-card {
    padding: 14px 16px;
  }

  .detail-card__header {
    margin-bottom: 12px;
  }

  .detail-card__title {
    gap: 7px;
    padding-left: 0;
    font-size: $font-size-md;
  }

  .detail-card__title :deep(.q-icon) {
    font-size: 18px;
    padding-bottom: 3px;
  }

  .detail-card :deep(.base-detail-item__label) {
    font-size: 0.68rem;
  }

  .detail-card :deep(.base-detail-item__value) {
    font-size: 0.75rem;
  }

  .detail-card__logo img {
    width: 110px;
  }

  .detail-card__body--user {
    padding: 6px 0;
  }

  .detail-card__fields--user,
  .detail-card__fields--work,
  .detail-card__fields--access {
    row-gap: 10px;
    column-gap: 18px;
    padding: 6px 0 6px 18px;
  }
}

@media (max-width: 720px) {
  .user-detail {
    padding: 14px;
  }

  .user-detail-page {
    max-width: 90%;
    padding: 8px;
  }

  .detail-card {
    padding: 16px;
    text-align: center;
  }

  .detail-card__header {
    display: flex;
    flex-direction: column;
  }

  .detail-card__title {
    padding-left: 0;
  }

  .detail-card__fields--user,
  .detail-card__fields--work,
  .detail-card__fields--access {
    grid-template-columns: 1fr;
  }

  .detail-card__fields--access {
    flex-direction: column;
  }

  .detail-card__fields--access > * {
    flex-basis: 100%;
  }

  .user-detail__actions {
    justify-content: flex-end;
    padding-bottom: 28px;
  }
}

@media (max-width: 449px) {
  .user-detail-page {
    max-width: 90%;
    padding: 8px;
  }

  .user-detail {
    padding: 0;
  }

  .detail-card__header {
    display: flex;
    flex-direction: column;
  }

  .detail-card__title {
    gap: 3px;
    display: flex;
    flex-direction: column;
  }

  .detail-card__status {
    padding-left: 0;
  }

  .detail-card__body--user,
  .detail-card__fields--user,
  .detail-card__fields--work,
  .detail-card__fields--access {
    padding-left: 0;
  }

  .user-detail__actions {
    width: 100%;
    padding-bottom: 28px;
  }
}
</style>
