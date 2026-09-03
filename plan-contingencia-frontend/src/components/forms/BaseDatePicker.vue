<template>

    <q-input class="base-date-picker" :class="{
        'base-date-picker--filter': props.size === 'filter'
    }" :model-value="displayValue" :label="props.label" :placeholder="props.placeholder"
        :disable="props.disable" :rules="props.rules" :required="props.required" readonly outlined dense hide-bottom-space>

        <template #prepend>

            <q-icon name="event" />

        </template>


        <q-popup-proxy ref="datePopup" cover transition-show="scale" transition-hide="scale">

            <q-date :model-value="props.modelValue" mask="YYYY-MM-DD" minimal :min="effectiveMin" :max="effectiveMax"
                :options="isDateAllowed"
                @update:model-value="selectDate" />

        </q-popup-proxy>

    </q-input>

</template>

<script setup>

import { computed, ref } from 'vue'

import { formatDate } from 'src/utils/date.utils'

const props = defineProps({

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
    },

    size: {
        type: String,
        default: 'default'
    }
})

const emit = defineEmits([
    'update:modelValue'
])

const datePopup = ref(null)

const normalizeDate = (value) => value?.replaceAll('-', '/')

const effectiveMin = computed(() => normalizeDate(props.min))
const effectiveMax = computed(() => normalizeDate(props.max))

function isDateAllowed(value) {

    const normalizedValue = normalizeDate(value)

    return (!effectiveMin.value || normalizedValue >= effectiveMin.value) &&
        (!effectiveMax.value || normalizedValue <= effectiveMax.value)
}

const displayValue = computed(() => {

    if (!props.modelValue) {
        return ''
    }
    return formatDate(props.modelValue)
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
    width: 100%;
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

.base-date-picker--filter {
    width: 260px;
    max-width: 100%;
}

.base-date-picker--filter :deep(.q-field__control) {
    min-height: 40px;
    height: 40px;
    background-color: $color-surface;
}

.base-date-picker--filter :deep(.q-field__label) {
    font-size: $font-size-xs;
    color: $color-text-secondary;
    padding-left: 6px;
    padding-top: 1px;
}

.base-date-picker--filter.q-field--focused :deep(.q-field__label),
.base-date-picker--filter.q-field--float :deep(.q-field__label) {
    color: $color-primary;
}

.base-date-picker--filter :deep(.q-field__native) {
    font-size: $font-size-xs;
    line-height: 25px;
    padding-left: 10px;
    padding-top: 16px;
}

.base-date-picker--filter :deep(.q-field__prepend) {
    padding-right: 3px;
    padding-left: 2px;
}

.base-date-picker--filter :deep(.q-field__prepend .q-icon) {
    font-size: 18px;
}
</style>