<template>

  <section class="dashboard-header">

    <div class="dashboard-header__navigation">

        <backButton route-name="dashboard"/>

    </div>

    <div class="dashboard-header__actions">

        <PrimaryActionButton 
        label="Crear Plan de Contingencia" icon="add" route-name="planes.create"
        />

    </div>

  </section>

</template>

<script setup>

import BackButton from '../base/BackButton.vue';
import PrimaryActionButton from '../base/PrimaryActionButton.vue';

</script>

<style scoped lang="scss">

.dashboard-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
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
