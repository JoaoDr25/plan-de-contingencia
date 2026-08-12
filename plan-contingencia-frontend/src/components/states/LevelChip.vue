<template>

    <BaseChip :label="formattedLabel" :color="chip.color" :text-color="chip.textColor" compact />

</template>

<script setup>

import { computed } from 'vue'

import BaseChip from '../states/BaseChip.vue'
import { LEVEL_MAP } from 'src/constants/states/level.constants.js'

const props = defineProps({

    level: {
        type: String,
        required: true
    }
})

const normalizedLevel = computed(() => {
    return props.level
        .trim()
        .toLowerCase()
})

const chip = computed(() => {

    return (
        LEVEL_MAP[normalizedLevel.value] ||
        {
            color: '#757575',
            textColor: '#FFFFFF'
        }
    )
})

const formattedLabel = computed(() => {

    return props.level
        .trim()
        .toLowerCase()
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ')
})

</script>