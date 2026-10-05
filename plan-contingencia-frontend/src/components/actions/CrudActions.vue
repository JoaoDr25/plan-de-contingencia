<template>
  <div class="crud-actions">
    <BaseIconButton
      v-for="action in visibleActions"
      :key="action"
      :action="action"
      @click="emit(action)"
    />
  </div>
</template>

<script setup>
import BaseIconButton from 'src/components/base/BaseIconButton.vue'
import { computed } from 'vue'
import { useAuthStore } from 'src/stores/auth.store'
import { ROLES_SOLO_LECTURA } from 'src/constants/system/roles.constants.js'

const { actions } = defineProps({
  actions: {
    type: Array,
    default: () => [],
  },
})

const emit = defineEmits(['view', 'edit', 'delete'])
const authStore = useAuthStore()

const visibleActions = computed(() => {
  if (ROLES_SOLO_LECTURA.includes(authStore.role)) {
    return actions.filter((action) => action === 'view')
  }

  return actions
})
</script>

<style scoped lang="scss">
.crud-actions {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 3px;
}
</style>
