<template>

    <q-input
        class="base-textarea"
        :model-value="modelValue"
        :label="label"
        :placeholder="placeholder"
        :readonly="readonly"
        :disable="disable"
        :maxlength="maxlength"
        :autofocus="autofocus"
        outlined
        dense
        autogrow
        type="textarea"
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

import { INPUT_ICONS } from 'src/constants/actions/icon_inputs.constants'

const {
    modelValue,
    label,
    placeholder,
    readonly,
    disable,
    maxlength,
    autofocus,
    icon
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
        default: ''
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
        INPUT_ICONS.textarea ||
        ''
    )

})

</script>

<style scoped lang="scss">

@use 'src/css/variables.scss' as *;
@use 'src/css/typography.scss' as *;

.base-textarea {
    width: 100%;
}

.base-textarea :deep(.q-field__control) {
    border-radius: 5px;
}

.base-textarea :deep(.q-field__native) {
    font-size: $font-size-sm;
    color: $color-text-primary;
    min-height: 90px;
    resize: none;
}

.base-textarea :deep(.q-field__label) {
    font-size: $font-size-xs;
    color: $color-text-secondary;
}

.base-textarea :deep(.q-field__prepend) {
    color: $color-text-secondary;
}

</style>