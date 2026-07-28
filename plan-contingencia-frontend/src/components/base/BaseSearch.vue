<template>

    <div class="base-search">

        <q-input v-model="search" outline dense :debounce="debounce" :placeholder="placeholder">

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
    set: (value) => emit('update:modelvalue', value)
})

</script>


<style scoped lang="scss">

.base-search {
    width: 280px;
    // border: 1px solid gray;
    // border-radius: 10px;
}
</style>