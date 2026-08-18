<template>

    <q-input class="base-input" :class="{
        'base-input--textarea': type === 'textarea'
    }" :model-value="modelValue" :label="label" :placeholder="placeholder" :type="type" :readonly="readonly"
        :disable="disable" :maxlength="maxlength" :autofocus="autofocus" :rules="rules" :required="required" outlined
        dense hide-bottom-space @update:model-value="emit('update:modelValue', $event)">

        <template v-if="resolvedIcon" #prepend>

            <q-icon :name="resolvedIcon" />

        </template>

    </q-input>

</template>

<script setup>

import { computed } from 'vue'

import { INPUT_ICONS } from 'src/constants/actions/inputs_icons.constants';

const {
    modelValue,
    label,
    placeholder,
    type,
    readonly,
    disable,
    maxlength,
    autofocus,
    icon,
    rules,
    required
} = defineProps({

    modelValue: {
        type: [String, Number],
        default: ''
    },
    label: {
        type: String,
        required: true
    },
    placeholder: {
        type: String,
        default: ''
    },
    type: {
        type: String,
        default: 'text'
    },
    readonly: {
        type: Boolean,
        default: false
    },
    disable: {
        type: Boolean,
        default: false
    },
    maxlength: {
        type: Number,
        default: undefined
    },
    autofocus: {
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
    },
    inputClass: {
        type: String,
        default: ''
    }
})

const emit = defineEmits([
    'update:modelValue'
])

const resolvedIcon = computed(() => {

    return (
        icon ||
        INPUT_ICONS[type] ||
        ''
    )
})

</script>

<style scoped lang="scss">
@use 'src/css/variables.scss' as *;
@use 'src/css/typography.scss' as *;

.base-input {
    width: 100%;
}

.base-input :deep(.q-field__control) {
    min-height: 50px;
    height: 50px;
    border-radius: 4px;
    background-color: $color-background-field;
}

.base-input :deep(.q-field__control:before) {
    border: none;
}

.base-input :deep(.q-field__control:hover:before) {
    border: none;
}

.base-input :deep(.q-field__control:after) {
    display: none;
}

.base-input :deep(.q-field__label) {
    font-size: $font-size-md;
    color: $color-text-secondary;
}

.base-input.q-field--focused :deep(.q-field__label),
.base-input.q-field--float :deep(.q-field__label) {
    color: $color-primary;
    font-size: $font-size-md;
    font-weight: 400;
    letter-spacing: 1px;
    padding-left: 2px;
}

.base-input:not(.q-field--float) :deep(.q-field__label) {
    top: 50%;
    transform: translateY(-50%);
}

.base-input :deep(.q-field__native) {
    padding-top: 8px;
    padding-bottom: 0;
    padding-left: 5px;
}

.base-input :deep(.q-field__native::placeholder) {
    font-size: $font-size-md;
    line-height: 30px;
    color: $color-text-secondary;
    opacity: 1;
}

.base-input :deep(.q-field__native),
.base-input :deep(.q-field__input) {
    font-size: $font-size-md;
    color: $color-text-primary;
    line-height: 30px;
}

.base-input.q-field--readonly :deep(.q-field__native),
.base-input.q-field--readonly :deep(.q-field__input),
.base-input.q-field--readonly :deep(input) {
    color: $color-text-primary !important;
    opacity: 0.65 !important;
}

.base-input :deep(.q-field__prepend) {
    color: $color-text-secondary;
    opacity: 0.65;
    padding-left: 2px;
    padding-top: 6px;
    padding-right: 10px;
}

.base-input :deep(.q-field__prepend .q-icon) {
    font-size: 21px;
}

.base-input--textarea :deep(.q-field__control) {
    min-height: 90px;
    height: 90px;
}

.base-input--textarea :deep(.q-field__native) {
    min-height: 55px;
    resize: none;
}

.base-input--textarea:not(.q-field--float) :deep(.q-field__label) {
    top: 15px;
    left: 3px;
    transform: none;
}
</style>