<template>

    <q-input class="base-textarea" :class="{
        'base-textarea--wizard': size === 'wizard'
    }" :model-value="modelValue" :label="externalLabel ? undefined : label" :placeholder="placeholder"
        :readonly="readonly" :disable="disable" :maxlength="maxlength" :autofocus="autofocus" :rules="rules"
        :required="required" outlined dense autogrow type="textarea" hide-bottom-space :counter="counter"
        @update:model-value="emit('update:modelValue', $event)">

        <template v-if="resolvedIcon" #prepend>

            <q-icon :name="resolvedIcon" />

        </template>

    </q-input>

</template>

<script setup>

import { computed } from 'vue'

import { INPUT_ICONS } from 'src/constants/actions/inputs_icons.constants'

const {
    modelValue,
    label,
    placeholder,
    readonly,
    disable,
    maxlength,
    autofocus,
    icon,
    rules,
    required,
    counter,
    externalLabel,
    size
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
    },
    rules: {
        type: Array,
        default: () => []
    },
    required: {
        type: Boolean,
        default: false
    },
    counter: {
        type: Boolean,
        default: false
    },
    externalLabel: {
        type: Boolean,
        default: false
    },

    size: {
        type: String,
        default: 'default',
        validator: value => ['default', 'wizard'].includes(value)
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
    min-height: 70px;
    background-color: $color-background-field;
}

.base-textarea :deep(.q-field__control:before) {
    border: none;
}

.base-textarea :deep(.q-field__control:hover:before) {
    border: none;
}

.base-textarea :deep(.q-field__control:after) {
    display: none;
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

.base-textarea :deep(.q-field__native::placeholder) {
    font-size: $font-size-sm;
    color: $color-text-secondary;
    padding-top: 1.7px;
    opacity: 1;
}

.base-textarea :deep(.q-field__prepend) {
    color: $color-text-secondary;
    opacity: 0.65;
    padding-right: 5px;
}

.base-textarea :deep(.q-field__bottom) {
    position: absolute;
    right: 8px;
    bottom: 5px;
    z-index: 1;
    padding: 0;
    pointer-events: none;
}

.base-textarea :deep(.q-field__counter) {
    color: $color-text-secondary;
    font-size: 10px;
}

.base-textarea--wizard :deep(.q-field__control) {
    min-height: 90px;
    background-color: $color-surface;
    border: 1px solid $color-border;
    font-size: $font-size-lg;
}

.base-textarea--wizard :deep(.q-field__native) {
    min-height: 70px;
    padding-top: 10px;
}

.base-textarea--wizard :deep(.q-field__prepend .q-icon) {
    font-size: 20px;
    padding-top: 4px;
}

.base-textarea--wizard :deep(.q-field__native::placeholder) {
    font-size: $font-size-md;
    color: $color-text-secondary;
    opacity: 0.75;
}

@media (max-width: 600px) {
    .base-textarea--wizard :deep(.q-field__native::placeholder) {
        line-height: 18px;
        font-size: $font-size-md;
    }

    .base-textarea :deep(.q-field__prepend) {
        padding-top: 7px;
    }

    .base-textarea--wizard :deep(.q-field__prepend .q-icon) {
        padding-top: 0;
    }
}
</style>