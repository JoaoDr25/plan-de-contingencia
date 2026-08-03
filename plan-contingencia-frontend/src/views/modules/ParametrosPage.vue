<template>
  <q-page class="flex flex-center">
 <StatusChip status="Activo" />

<StatusChip status="Inactivo" />

<StatusChip status="Borrador" />

<StatusChip status="En revisión" />

<StatusChip status="Aprobado" />

<StatusChip status="Ejecutado" />

<StatusChip status="Cancelado" />
  </q-page>
</template>

<script setup>

import StatusChip from 'src/components/base/StatusChip.vue'
</script>