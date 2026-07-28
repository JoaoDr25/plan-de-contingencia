<template>

  <section class="dashboard-header">

    <div class="dashboard-header__navigation">

        <backButton route-name="dashboard"/>

    </div>

    <div class="dashboard-header__actions">

        <PrimaryActionButton 
        label="Crear Plan de Contingencia" icon="add" size="lg" @click="goToCreatePlan"
        />

    </div>

  </section>

</template>

<script setup>

import BackButton from '../base/BackButton.vue';
import PrimaryActionButton from '../base/PrimaryActionButton.vue';

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
    justify-content: space-between;
    align-items: center;
    width: 100%;
    padding-bottom: 23px;
}

.dashboard-header__navigation {
    display: flex;
    align-items: center;
}

.dashboard-header__actions {
    display: flex;
    align-items: center;
}

</style>
