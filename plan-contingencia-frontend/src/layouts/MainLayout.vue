<template>
  <q-layout view="lHh Lpr lFf">

    <AppHeader @toggleDrawer="toggleDrawer" />

    <AppDrawer v-model="leftDrawerOpen" @closeDrawer="closeDrawer" />

    <div class="layout-back-button">
      <BackButton route-name="dashboard" />
    </div>

    <q-page-container class="page-root">
      <div class="page-content">
        <router-view />
        <FloatingScrollButtons />
      </div>

      <div class="page-footer">
        <AppFooter />
      </div>
    </q-page-container>

  </q-layout>
</template>

<script setup>

import { ref } from 'vue';

import AppHeader from 'src/components/layout/AppHeader.vue';
import AppDrawer from 'src/components/layout/AppDrawer.vue';
import AppFooter from 'src/components/layout/AppFooter.vue';
import FloatingScrollButtons from 'src/components/base/FloatingScrollButtons.vue';
import BackButton from 'src/components/actions/BackButton.vue';

const leftDrawerOpen = ref(false)

function toggleDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value
}

function closeDrawer() {
  leftDrawerOpen.value = false
}

</script>

<style scoped lang="scss">

@use 'src/css/variables.scss' as *;

.q-page-container {
  background-color: $color-surface;
}

.page-root {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.page-content {
  flex: 1 1 auto;
}

.page-footer {
  flex: 0 0 auto;
}

.layout-back-button {
  position: absolute;
  top: 75px;
  left: 20px;
  z-index: 1000;
}
</style>
