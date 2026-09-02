<template>

    <q-select class="base-select" :class="{
        'base-select--placeholder': isEmpty,
        'base-select--filter': size === 'filter'
    }" :model-value="modelValue" :label="label" :display-value="displayValue" :options="options"
        :option-label="optionLabel" :option-value="optionValue" :multiple="multiple" :disable="disable"
        :readonly="readonly" :rules="rules" :required="required" outlined dense emit-value map-options hide-bottom-space
        popup-content-class="base-select__popup" @update:model-value="emit('update:modelValue', $event)">

        <template v-if="showIcon && resolvedIcon" #prepend>

            <q-icon :name="resolvedIcon" />

        </template>

    </q-select>

</template>

<script setup>

import { computed } from 'vue';

import { INPUT_ICONS } from 'src/constants/actions/inputs_icons.constants';


const {
    modelValue,
    label,
    options,
    optionLabel,
    optionValue,
    hideSelectedValue,
    multiple,
    disable,
    readonly,
    icon,
    showIcon,
    rules,
    required,
    size
} = defineProps({

    modelValue: {
        type: [String, Number, Array],
        default: null
    },
    label: {
        type: String,
        required: true
    },
    options: {
        type: Array,
        default: () => []
    },
    optionLabel: {
        type: String,
        default: 'label'
    },
    optionValue: {
        type: String,
        default: 'value'
    },
    hideSelectedValue: {
        type: Boolean,
        default: false
    },
    multiple: {
        type: Boolean,
        default: false
    },
    disable: {
        type: Boolean,
        default: false
    },
    readonly: {
        type: Boolean,
        default: false
    },
    icon: {
        type: String,
        default: ''
    },
    showIcon: {
        type: Boolean,
        default: true
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

const resolvedIcon = computed(() => {

    return (
        icon ||
        INPUT_ICONS.select ||
        ''
    )
})

const displayValue = computed(() => {
    if (hideSelectedValue) {
        return label
    }

    if (
        modelValue === null ||
        modelValue === undefined ||
        modelValue === ''
    ) {
        return ''
    }

    const selectedOption = options.find(option => {
        if (typeof option === 'object') {
            return option[optionValue] === modelValue
        }

        return option === modelValue
    })

    if (selectedOption && typeof selectedOption === 'object') {
        return selectedOption[optionLabel]
    }

    return selectedOption ?? modelValue
})

const isEmpty = computed(() => {
    return (
        modelValue === null ||
        modelValue === undefined ||
        modelValue === ''
    )
})

</script>

<style scoped lang="scss">

@use 'src/css/variables.scss' as *;
@use 'src/css/typography.scss' as *;

.base-select {
    width: 100%;
}

.base-select :deep(.q-field__control) {
    min-height: 50px;
    height: 50px;
    border-radius: 4px;
    background-color: $color-background-field;
}

.base-select :deep(.q-field__control:before) {
    border: none;
}

.base-select :deep(.q-field__control:hover:before) {
    border: none;
}

.base-select :deep(.q-field__control:after) {
    display: none;
}

.base-select :deep(.q-field__label) {
    font-size: $font-size-md;
    color: $color-text-secondary;
}

.base-select.q-field--focused :deep(.q-field__label),
.base-select.q-field--float :deep(.q-field__label) {
    color: $color-primary;
    font-size: $font-size-md;
    font-weight: 400;
    letter-spacing: 1px;
    padding-left: 2px;
    padding-top: 2px;
    padding: 2px 0 0 2px;
}

.base-select:not(.q-field--float) :deep(.q-field__label) {
    top: 50%;
    transform: translateY(-50%);
}

.base-select :deep(.q-field__native) {
    padding-top: 0;
    padding-bottom: 0;
    padding-left: 5px;
}

.base-select :deep(.q-field__native::placeholder) {
    font-size: $font-size-sm;
    line-height: 30px;
    color: $color-text-secondary;
    opacity: 1;
}

.base-select :deep(.q-field__native),
.base-select :deep(.q-field__input) {
    font-size: $font-size-md;
    color: $color-text-primary;
    line-height: 30px;
}

.base-select.q-field--readonly :deep(.q-field__native),
.base-select.q-field--readonly :deep(.q-field__input),
.base-select.q-field--readonly :deep(input) {
    color: $color-text-primary !important;
    opacity: 0.65 !important;
}

.base-select :deep(.q-field__prepend) {
    color: $color-text-secondary;
    opacity: 0.65;
    padding-left: 2px;
    padding-top: 6px;
    padding-right: 10px;
}

.base-select :deep(.q-field__prepend .q-icon) {
    font-size: 21px;
}

.base-select__popup {
    max-height: 250px !important;
    overflow-y: auto;
}

.base-select--placeholder :deep(.q-field__native) {
    color: $color-text-secondary;
}

.base-select :deep(.q-field__native) {
    font-size: $font-size-md;
    color: $color-text-primary;
}

.base-select--filter {
    width: 160px;
    max-width: 100%;
}

.base-select--filter :deep(.q-field__control) {
    min-height: 37px;
    height: 37px;
    border-radius: 4px;
    background-color: $color-surface;
}

.base-select--filter :deep(.q-field__control:before) {
    border: 1px solid #D1D5DB;
}

.base-select--filter :deep(.q-field__control:hover:before) {
    border: 1px solid #B8BEC6;
}

.base-select--filter :deep(.q-field__control:after) {
    display: none;
}

.base-select--filter.q-field--focused :deep(.q-field__label),
.base-select--filter.q-field--float :deep(.q-field__label) {
    color: $color-primary;
    font-size: $font-size-xs;
    font-weight: 400;
    letter-spacing: 0;
    padding: 0;
}

.base-select--filter :deep(.q-field__native),
.base-select--filter :deep(.q-field__input) {
    font-size: $font-size-xs;
    line-height: 20px;
    color: $color-text-primary;
}

.base-select--filter :deep(.q-field__native) {
    padding-top: 0;
    padding-bottom: 0;
    padding-left: 5px;
}

.base-select--filter :deep(.q-field__prepend) {
    padding-top: 0;
    padding-right: 3px;
    padding-left: 2px;
    opacity: 0.75;
}

.base-select--filter :deep(.q-field__prepend .q-icon) {
    font-size: 14px;
}

.base-select--filter :deep(.q-field__append) {
    padding-left: 0;
    padding-right: 3px;
}

.base-select--filter :deep(.q-field__append .q-icon) {
    font-size: 16px;
}
</style>