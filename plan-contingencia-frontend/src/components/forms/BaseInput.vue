<template>

    <q-input
        class="base-input"
        :model-value="modelValue"
        :label="label"
        :placeholder="placeholder"
        :type="type"
        :readonly="readonly"
        :disable="disable"
        :maxlength="maxlength"
        :autofocus="autofocus"
        outlined
        dense
        hide-bottom-space
        @update:model-value="emit('update:modelValue', $event)"
    >

        <template
            v-if="resolvedIcon"
            #prepend
        >

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
    icon
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
    min-height: 42px;
    border-radius: 5px;
}

.base-input :deep(.q-field__label) {
    font-size: $font-size-xs;
    color: $color-text-secondary;
}

.base-input :deep(.q-field__native) {
    font-size: $font-size-sm;
    color: $color-text-primary;
}

.base-input :deep(.q-field__prepend) {
    color: $color-text-secondary;
}

</style>