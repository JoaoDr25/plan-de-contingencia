<template>
  <BaseDialog v-model="dialog" :title="title" :width="width">
    <div class="base-details__scroll">
      <div class="base-details">
        <div class="base-details__logo">
          <img :src="logo" :alt="logoAlt" />
        </div>

        <div class="base-details__column">
          <slot name="column-left" />
        </div>

        <div class="base-details__column">
          <slot name="column-right" />
        </div>
      </div>
    </div>

    <template #actions>
      <div class="base-details__actions">
        <SecondaryActionButton label="Cerrar" icon="close" size="sm" @click="closeDialog" />
      </div>
    </template>
  </BaseDialog>
</template>

<script setup>
import { computed } from 'vue'

import BaseDialog from 'src/components/forms/BaseDialog.vue'
import SecondaryActionButton from 'src/components/actions/SecondaryActionButton.vue'

import logoSena from 'src/assets/logos/logo-sena.png'

const props = defineProps({
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
    default: '650px',
  },
  logo: {
    type: String,
    default: logoSena,
  },
  logoAlt: {
    type: String,
    default: 'Logo SENA',
  },
})

const emit = defineEmits(['update:modelValue'])

const dialog = computed({
  get: () => props.modelValue,
  set: (value) => {
    emit('update:modelValue', value)
  },
})

function closeDialog() {
  dialog.value = false
}
</script>

<style scoped lang="scss">
@use 'src/css/variables.scss' as *;
@use 'src/css/typography.scss' as *;

.base-details {
  display: grid;
  grid-template-columns: 145px minmax(220px, 1.4fr) minmax(150px, 1.12fr);
  column-gap: 22px;
  padding: 0 22px;
  align-items: start;
  height: fit-content;
}

.base-details__logo {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}

.base-details__logo img {
  width: 150px;
  height: auto;
}

.base-details__column {
  display: flex;
  flex-direction: column;
  gap: 9px;
  min-width: 0;
  transform: translateY(4px);
}

.base-details__logo + .base-details__column {
  margin-left: 18px;
}

.base-details__column + .base-details__column {
  margin-left: 15px;
}

.base-details__actions {
  display: grid;
  grid-template-columns: 105px minmax(210px, 1.5fr) minmax(150px, 1fr);
  column-gap: 22px;
  padding: 0 20px;
}

.base-details__actions :deep(.secondary-action-button) {
  grid-column: 3;
  justify-self: start;
  margin-left: 24px;
}

@media (max-width: 600px) {
  .base-details__scroll {
    width: 100%;
    overflow-x: auto;
    scrollbar-width: thin;
  }

  .base-details {
    min-width: 620px;
  }

  .base-details__actions {
    grid-template-columns: 1fr;
    padding: 0 16px;
  }

  .base-details__actions :deep(.secondary-action-button) {
    grid-column: 1;
    justify-self: center;
    margin-left: 0;
    margin-top: 10px;
  }
}

@media (max-width: 500px) {
  .base-details {
    min-width: 450px;
    grid-template-columns: minmax(220px, 1.4fr) minmax(150px, 1.12fr);
  }

  .base-details__logo {
    display: none;
  }

  .base-details__logo + .base-details__column {
    grid-column: 1;
    margin-left: 0;
  }

  .base-details__column + .base-details__column {
    grid-column: 2;
  }

  :deep(.base-dialog__header) {
    padding: 10px 15px;
  }

  :deep(.base-dialog__body) {
    padding: 8px 16px;
  }

  :deep(.base-dialog__footer) {
    padding: 0 16px 12px;
  }
}
</style>
