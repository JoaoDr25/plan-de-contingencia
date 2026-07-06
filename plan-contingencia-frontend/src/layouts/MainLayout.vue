<template>
  <q-layout view="lHh Lpr lFf">
      
    <AppHeader
    @toggleDrawer="toggleDrawer"
    />
  
    <AppDrawer
     v-model="leftDrawerOpen"
     @closeDrawer="closeDrawer"
    />

    <q-page-container>
      <router-view />
    </q-page-container>

    <AppFooter />

  </q-layout>
</template>

<script setup>

import { ref } from 'vue';

import AppHeader from 'src/components/layout/AppHeader.vue';
import AppDrawer from 'src/components/layout/AppDrawer.vue';
import AppFooter from 'src/components/layout/AppFooter.vue';

const leftDrawerOpen = ref(false)

function toggleDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value
}

function closeDrawer() {
  leftDrawerOpen.value = false
}

</script>
