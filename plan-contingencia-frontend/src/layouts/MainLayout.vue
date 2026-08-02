<template>
  <q-layout view="lHh Lpr lFf">

    <AppHeader @toggleDrawer="toggleDrawer" />

    <AppDrawer v-model="leftDrawerOpen" @closeDrawer="closeDrawer" />

    <div class="layout-back-button">
      <BackButton route-name="dashboard" />
    </div>

    <q-page-container>
      <router-view />
    </q-page-container>

    <q-page-container>
      <FloatingScrollButtons />
    </q-page-container>


    <q-page-container>
      <AppFooter />
    </q-page-container>

  </q-layout>
</template>

<script setup>

import { ref } from 'vue';

import AppHeader from 'src/components/layout/AppHeader.vue';
import AppDrawer from 'src/components/layout/AppDrawer.vue';
import AppFooter from 'src/components/layout/AppFooter.vue';
import FloatingScrollButtons from 'src/components/base/FloatingScrollButtons.vue';
import BackButton from 'src/components/base/BackButton.vue';

const leftDrawerOpen = ref(false)

function toggleDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value
}

function closeDrawer() {
  leftDrawerOpen.value = false
}

</script>

<style scoped lang="scss">

.layout-back-button{
    position:absolute;
    top: 68px;
    left: 16px;
    z-index: 1000;
}

</style>
