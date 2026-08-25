<template>

    <div class="plan-actions">

        <BaseIconButton v-for="action in actions" :key="action" :action="action" @click="emit(action)" />

    </div>

</template>

<script setup>

import BaseIconButton from 'src/components/base/BaseIconButton.vue'

defineProps({

    actions: {
        type: Array,
        default: () => []
    }

})

const emit = defineEmits([
    'view',
    'edit',
    'delete',
])

</script>

<style scoped lang="scss">

.plan-actions {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 3px;
}
</style>