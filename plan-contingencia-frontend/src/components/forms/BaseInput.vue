<template>

    <q-input class="base-input" :model-value="modelValue" :placeholder="placeholder || label" :type="type"
        :readonly="readonly" :disable="disable" :maxlength="maxlength" :autofocus="autofocus" :rules="rules"
        :required="required" outlined dense hide-bottom-space @update:model-value="emit('update:modelValue', $event)">

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
    min-height: 44px;
    height: 44px;
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
    font-size: $font-size-xs;
    color: $color-text-secondary;
}

.base-input :deep(.q-field__native) {
    font-size: $font-size-sm;
    color: $color-text-primary;
    line-height: 30px;
    padding-left: 7px;
}

.base-input :deep(.q-field__native::placeholder) {
    font-size: $font-size-sm;
    line-height: 30px;
    color: $color-text-secondary;
    opacity: 1;
}

.base-input :deep(.q-field__prepend) {
    color: $color-text-secondary;
    opacity: 0.65;
    padding-left: 2px;
    padding-top: 2px;
}

.base-input :deep(.q-field__prepend .q-icon) {
    font-size: 20px;
}
</style>