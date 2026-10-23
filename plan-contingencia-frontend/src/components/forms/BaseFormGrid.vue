<template>
  <div class="base-form-grid" :style="gridStyle">
    <slot />
  </div>
</template>

<script setup>
import { computed } from 'vue'

const { columns, gap } = defineProps({
  columns: {
    type: Number,
    default: 1,
  },
  gap: {
    type: String,
    default: '14px',
  },
})

const gridStyle = computed(() => ({
  '--grid-columns': columns,
  '--grid-gap': gap,
}))
</script>

<style scoped>
.base-form-grid {
  display: grid;
  grid-template-columns: repeat(var(--grid-columns), minmax(0, 1fr));
  gap: var(--grid-gap);
}

.base-form-grid > * {
  min-width: 0;
  width: 100%;
}

@media (max-width: 768px) {
  .base-form-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .base-form-grid :deep(.base-input--textarea:not(.base-input--wizard) .q-field__control) {
    min-height: 50px;
    height: 50px;
  }

  .base-form-grid :deep(.base-input--textarea:not(.base-input--wizard) .q-field__native) {
    min-height: 0;
    height: 26px;
    line-height: 20px;
    padding-top: 4px;
  }

  .base-form-grid :deep(.base-input--textarea:not(.base-input--wizard):not(.q-field--float) .q-field__label) {
    top: 50%;
    transform: translateY(-50%);
  }
}
</style>
