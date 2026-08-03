<template>

    <BaseChip :label="formattedLabel" :color="chip.color" :text-color="chip.textColor" />

</template>

<script setup>

import { computed } from 'vue'

import BaseChip from './BaseChip.vue'
import { STATUS_MAP } from 'src/constants/states/status.constants.js'

const props = defineProps({

    status: {
        type: String,
        required: true
    }

})

const normalizedStatus = computed(() => {

    return props.status
        .trim()
        .toLowerCase()

})

const chip = computed(() => {

    return (
        STATUS_MAP[normalizedStatus.value] ?? {
            color: '#757575',
            textColor: '#FFFFFF'
        }
    )

})

const formattedLabel = computed(() => {

    return props.status
        .trim()
        .toLowerCase()
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ')

})

</script>