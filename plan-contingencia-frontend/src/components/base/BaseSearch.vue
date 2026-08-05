<template>

    <div class="base-search">

        <q-input v-model="search"  v-bind="$attrs" outlined dense :debounce="debounce" :placeholder="placeholder">

            <template #prepend>
                <q-icon name="search" />
            </template>

            </q-input>

    </div>

</template>

<script setup>

import { computed } from 'vue';

const props = defineProps({

    modelValue: {
        type: String,
        default: ""
    },
    placeholder: {
        type: String,
        default: "buscar..."
    },
    debounce: {
        type: Number,
        default: 300
    }
})

const emit = defineEmits([
    'update:modelValue'
])

const search = computed({
    get: () => props.modelValue,
    set: (value) => emit('update:modelValue', value)
})

</script>


<style scoped lang="scss">

.base-search {
    width: 300px;
    flex-shrink:0;
}

.base-search :deep(.q-field) {
    font-size: 0.75rem;
}

.base-search :deep(.q-field__control) {
    height: 36px;
    border-radius: 6px;
}

.base-search :deep(.q-field__native) {
    padding-top: 0;
    padding-bottom: 0;
}

.base-search :deep(.q-field__prepend) {
    padding-right: 6px;
}

.base-search :deep(.q-icon) {
    font-size: 17px;
    color: #6b7280;
    padding-bottom: 3px;
}

.base-search :deep(input::placeholder) {
    font-size: 0.72rem;
}

@media (max-width:600px){

    .base-search{
        min-width: 240px;
        width:100%;
    }
}

</style>