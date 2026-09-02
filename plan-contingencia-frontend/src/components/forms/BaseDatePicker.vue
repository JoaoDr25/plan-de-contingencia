<template>

    <q-input class="base-date-picker" :model-value="displayValue" :label="label" :placeholder="placeholder"
        :disable="disable" :rules="rules" :required="required" readonly outlined dense hide-bottom-space>

        <template #prepend>

            <q-icon name="event" />

        </template>


        <q-popup-proxy ref="datePopup" cover transition-show="scale" transition-hide="scale">

            <q-date :model-value="modelValue" mask="YYYY-MM-DD" :min="min" :max="max"
                @update:model-value="selectDate" />

        </q-popup-proxy>

    </q-input>

</template>

<script setup>

import { computed, ref } from 'vue'

import { formatDate } from 'src/utils/date.utils'

const {
    modelValue,
    label,
    placeholder,
    min,
    max,
    disable,
    rules,
    required
} = defineProps({

    modelValue: {
        type: String,
        default: ''
    },

    label: {
        type: String,
        required: true
    },

    placeholder: {
        type: String,
        default: '00/00/0000'
    },

    min: {
        type: String,
        default: undefined
    },

    max: {
        type: String,
        default: undefined
    },

    disable: {
        type: Boolean,
        default: false
    },

    rules: {
        type: Array,
        default: () => []
    },

    required: {
        type: Boolean,
        default: false
    }
})

const emit = defineEmits([
    'update:modelValue'
])

const datePopup = ref(null)

const displayValue = computed(() => {

    if (!modelValue) {
        return ''
    }

    return formatDate(modelValue)
})

function selectDate(value) {

    emit('update:modelValue', value)

    datePopup.value?.hide()
}

</script>

<style scoped lang="scss">

@use 'src/css/variables.scss' as *;
@use 'src/css/typography.scss' as *;

.base-date-picker {
    width: 105px;
}

.base-date-picker :deep(.q-field__control) {
    min-height: 28px;
    height: 28px;
    border-radius: 4px;
    background-color: transparent;
}

.base-date-picker :deep(.q-field__control:before) {
    border: 1px solid #d1d5db;
}

.base-date-picker :deep(.q-field__control:hover:before) {
    border-color: $color-primary;
}

.base-date-picker :deep(.q-field__control:after) {
    display: none;
}

.base-date-picker :deep(.q-field__label) {
    font-size: 0.65rem;
    color: $color-text-secondary;
}

.base-date-picker :deep(.q-field__native) {
    padding-top: 0;
    padding-bottom: 0;
    font-size: 0.72rem;
    color: $color-text-primary;
    line-height: 20px;
}

.base-date-picker :deep(.q-field__prepend) {
    padding-right: 4px;
    color: $color-text-secondary;
}

.base-date-picker :deep(.q-field__prepend .q-icon) {
    font-size: 15px;
}
</style>