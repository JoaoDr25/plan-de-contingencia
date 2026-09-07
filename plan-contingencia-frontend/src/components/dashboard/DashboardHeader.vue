<template>

  <section class="dashboard-header" :class="{
    'dashboard-header--without-create': shouldReserveCreateSpace
  }">

    <div v-if="canCreatePlan" class="dashboard-header__actions">

        <PrimaryActionButton 
        label="Crear Plan de Contingencia" icon="add" size="lg" @click="goToCreatePlan"
        />

    </div>

  </section>

</template>

<script setup>

import PrimaryActionButton from '../actions/PrimaryActionButton.vue';

import { computed } from 'vue'
import { useRouter } from 'vue-router';
import { useAuthStore } from 'src/stores/auth.store'
import { ROLES } from 'src/constants/system/roles.constants.js'

const router = useRouter()
const authStore = useAuthStore()

const canCreatePlan = computed(() => {
  return [ROLES.USUARIO, ROLES.ADMINISTRADOR].includes(authStore.role)
})

const shouldReserveCreateSpace = computed(() => {
  return [ROLES.SST, ROLES.PEDAGOGIA, ROLES.COORDINACION].includes(authStore.role)
})

function goToCreatePlan(){
    router.push({
        name: 'planes.create'
    })
}

</script>

<style scoped lang="scss">

.dashboard-header {
    display: flex;
    align-items: center;
    width: 100%;
    padding: 30px 0 20px 0;
}

    .dashboard-header--without-create {
      min-height: 101px;
      box-sizing: border-box;
    }

.dashboard-header__actions {
   margin-left: auto;
   padding-top: 0.5rem;
}

</style>
