<template>

    <q-select class="base-select" :model-value="modelValue" :label="label" :options="options"
        :option-label="optionLabel" :option-value="optionValue" :disable="disable" :readonly="readonly" :rules="rules"
        :required="required" outlined dense emit-value map-options hide-bottom-space
        popup-content-class="base-select__popup" @update:model-value="emit('update:modelValue', $event)">

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

</script>

<style scoped lang="scss">
@use 'src/css/variables.scss' as *;
@use 'src/css/typography.scss' as *;

.base-select {
    width: 100%;
}

.base-select :deep(.q-field__control) {
    min-height: 42px;
    border-radius: 5px;
}

.base-select :deep(.q-field__label) {
    font-size: $font-size-xs;
    color: $color-text-secondary;
}

.base-select :deep(.q-field__native) {
    font-size: $font-size-sm;
    color: $color-text-primary;
}

.base-select :deep(.q-field__prepend) {
    color: $color-text-secondary;
}

.base-select__popup {
    max-height: 250px !important;
    overflow-y: auto;
}
</style>