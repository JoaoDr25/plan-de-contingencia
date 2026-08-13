<template>

    <q-select class="base-select" :class="{ 'base-select--placeholder': isEmpty }" :model-value="modelValue"
        :display-value="displayValue" :options="options" :option-label="optionLabel" :option-value="optionValue"
        :multiple="multiple" :disable="disable" :readonly="readonly" :rules="rules" :required="required" outlined dense
        emit-value map-options hide-bottom-space popup-content-class="base-select__popup"
        @update:model-value="emit('update:modelValue', $event)">

        <template v-if="resolvedIcon" #prepend>

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
    rules,
    required
} = defineProps({

    modelValue: {
        type: [String, Number],
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
        return label
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
    min-height: 44px;
    height: 44px;
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
    font-size: $font-size-xs;
    color: $color-text-secondary;
}

.base-select :deep(.q-field__native) {
    padding-top: 5px;
    line-height: 30px;
    padding-left: 7px;
}

.base-select :deep(.q-field__native::placeholder) {
    font-size: $font-size-sm;
    line-height: 30px;
    color: $color-text-secondary;
    opacity: 1;
}

.base-select :deep(.q-field__native),
.base-select :deep(.q-field__input) {
    font-size: $font-size-sm;
    color: $color-text-primary;
    line-height: 30px;
}

.base-select :deep(.q-field__prepend) {
    color: $color-text-secondary;
    opacity: 0.65;
    padding-left: 2px;
    padding-top: 2px;
}

.base-select :deep(.q-field__prepend .q-icon) {
    font-size: 20px;
}

.base-select__popup {
    max-height: 250px !important;
    overflow-y: auto;
}

.base-select--placeholder :deep(.q-field__native) {
    color: $color-text-secondary;
}

.base-select :deep(.q-field__native) {
    font-size: $font-size-sm;
    color: $color-text-primary;
}
</style>