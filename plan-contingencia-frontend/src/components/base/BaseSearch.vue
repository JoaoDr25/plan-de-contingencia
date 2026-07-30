<template>

    <div class="base-search">

        <q-input v-model="search"  v-bind="$attrs" outline dense :debounce="debounce" :placeholder="placeholder">

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

    'update:modelvalue'

])

const search = computed({
    get: () => props.modelValue,
    set: (value) => emit('update:modelValue', value)
})

</script>


<style scoped lang="scss">

.base-search {
    width: 280px;
    flex-shrink:0;
}
</style>