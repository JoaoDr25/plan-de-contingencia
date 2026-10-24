<template>
  <q-dialog
    :model-value="modelValue"
    :persistent="persistent"
    @update:model-value="$emit('update:modelValue', $event)"
  >
    <q-card
      class="base-dialog"
      :class="{
        'base-dialog--scrollable': scrollable,
        'base-dialog--tablet-width': tabletWidth,
      }"
      :style="{
        width,
        '--tablet-dialog-width': tabletWidth,
        maxWidth: 'calc(100vw - 32px)',
      }"
    >
      <div class="base-dialog__header">
        {{ title }}
      </div>

      <div class="base-dialog__body">
        <slot />
      </div>

      <div v-if="showFooter" class="base-dialog__footer">
        <slot name="actions" />
      </div>
    </q-card>
  </q-dialog>
</template>

<script setup>
defineProps({
  modelValue: {
    type: Boolean,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  width: {
    type: String,
    default: '600px',
  },
  tabletWidth: {
    type: String,
    default: '',
  },
  persistent: {
    type: Boolean,
    default: false,
  },
  showFooter: {
    type: Boolean,
    default: true,
  },
  scrollable: {
    type: Boolean,
    default: false,
  },
})

defineEmits(['update:modelValue'])
</script>

<style scoped lang="scss">
@use 'src/css/variables.scss' as *;
@use 'src/css/typography.scss' as *;

.base-dialog {
  width: min(100%, 600px);
  max-width: calc(100vw - 32px);
  max-height: calc(100vh - 32px);
  max-height: calc(100dvh - 32px);
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.base-dialog__header {
  padding: 15px;
  background: $color-primary;
  color: white;
  font-weight: 500;
  font-size: $font-size-lg;
  text-transform: uppercase;
  text-align: center;
  letter-spacing: 0.5px;
}

.base-dialog--scrollable {
  overflow-y: auto;
}

.base-dialog__body {
  padding: 15px 22px 15px;
  overflow-y: auto;
  min-height: 0;
}

.base-dialog__footer {
  padding: 0 24px 20px;
  display: flex;
  justify-content: center;
  flex-shrink: 0;
}

@media (max-width: 767px) {
  .base-dialog--tablet-width {
    max-height: min(500px, calc(100vh - 32px));
    max-height: min(500px, calc(100dvh - 32px));
  }
}
</style>

<style lang="scss">
@media (min-width: 768px) and (max-width: 1200px) {
  .base-dialog--tablet-width {
    width: min(var(--tablet-dialog-width), calc(100vw - 32px)) !important;
  }
}
</style>
