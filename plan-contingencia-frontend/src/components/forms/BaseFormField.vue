<template>

    <component :is="field.component" :model-value="modelValue" v-bind="componentProps"
        @update:model-value="emit('update:modelValue', $event)" />

</template>

<script setup>

import { computed } from 'vue'

const {
    field,
    modelValue
} = defineProps({

    field: {
        type: Object,
        required: true
    },
    modelValue: {
        required: true
    }
})

const emit = defineEmits([
    'update:modelValue'
])

const EXCLUDED_KEYS = [
    'component',
    'model'
]

const componentProps = computed(() => {

    return Object.fromEntries(
        Object.entries(field).filter(([key]) => {
            return !EXCLUDED_KEYS.includes(key)
        })
    )
})

</script>