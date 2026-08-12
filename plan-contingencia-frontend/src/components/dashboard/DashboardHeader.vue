<template>

  <section class="dashboard-header">

    <div class="dashboard-header__actions">

        <PrimaryActionButton 
        label="Crear Plan de Contingencia" icon="add" size="lg" @click="goToCreatePlan"
        />

    </div>

  </section>

</template>

<script setup>

import PrimaryActionButton from '../actions/PrimaryActionButton.vue';

import { useRouter } from 'vue-router';
const router = useRouter()

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
    padding-bottom: 30px;
}

.dashboard-header__actions {
   margin-left: auto;
   padding-top: 0.5rem;
}

</style>
