<template>

    <q-btn round flat class="base-icon-button" :icon="config.icon" :disable="disabled" :style="{
        '--button-color': button.color,
        '--button-size': size
    }" @click="emit('click')" />

</template>

<script setup>

import { computed } from 'vue';

import { ICON_BUTTON_VARIANTS } from 'src/constants/actions/icon_buttons.constants';
import { CRUD_ACTIONS } from 'src/constants/actions/crud_actions.constants';

const {
    action,
    size,
    disabled
} = defineProps({

    action: {
        type: String,
        required: true
    },
    size: {
        type: String,
        default: '22.4px'
    },
    disabled: {
        type: Boolean,
        default: false
    }
})

const emit = defineEmits([
    'click'
])

const config = computed(() => {

    return (
        CRUD_ACTIONS[action]
        ||
        CRUD_ACTIONS.view
    )

})

const button = computed(() => {

    return (
        ICON_BUTTON_VARIANTS[config.value.variant]
        ||
        ICON_BUTTON_VARIANTS.success
    )
})

</script>

<style scoped lang="scss">

.base-icon-button {
    width: var(--button-size);
    height: var(--button-size);
    min-width: var(--button-size);
    min-height: var(--button-size);
    border-radius: 50%;
    background: var(--button-color);
    color: #FFFFFF;
    border: none;
}

.base-icon-button:hover {
    filter: brightness(.92);
    transform: scale(1.1);
}

.base-icon-button :deep(.q-icon) {
    font-size: 15.5px;
}
</style>