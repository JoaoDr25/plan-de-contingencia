<template>
  <footer class="app-footer">

    <div class="app-footer__content">

      {{ SYSTEM_NAME }} - {{ ORGANIZATION }} {{ currentYear }} © Todos los derechos reservados

    </div>

  </footer>
</template>

<script setup>

import {
  SYSTEM_NAME,
  ORGANIZATION
} from 'src/constants/app.constants'

const currentYear = new Date().getFullYear()

</script>

<style scoped lang="scss">

@use 'src/css/variables.scss' as *;
@use 'src/css/mixins.scss' as *;
@use 'src/css/typography.scss' as *;

.app-footer {
  background: $color-background-secondary;
  border-top: 1px solid $color-border;
}

.app-footer__content {
  @include flex-center;
  color: black;
  min-height: 50px;
  padding: 0.5rem 1rem;
  font-size: 1rem;
  font-weight: 600;
  text-align: center;
  font-family: $font-family-base;
}

</style>