<template>

    <q-input class="base-time-picker" :style="{ width, maxWidth: '100%' }" :model-value="displayValue"
        :label="label" :placeholder="placeholder" :readonly="readonly" :disable="disable" :rules="rules"
        :required="required" outlined dense hide-bottom-space @mousedow="openPicker" @click="openPicker">

        <template #prepend>

            <q-icon name="schedule" class="cursor-pointer" @mousedown.stop="openPicker" @click.stop="openPicker" />

        </template>

        <q-popup-proxy ref="popupRef" cover transition-show="scale" transition-hide="scale"
            @before-show="syncPickerValue">

            <q-time v-model="pickerValue" mask="HH:mm" format24h now-btn @update:model-value="handleTimeChange" />

        </q-popup-proxy>

    </q-input>

</template>

<script setup>

import { computed, ref } from 'vue'

const props = defineProps({
    modelValue: {
        type: String,
        default: ''
    },

    label: {
        type: String,
        default: ''
    },

    placeholder: {
        type: String,
        default: '00:00'
    },

    readonly: {
        type: Boolean,
        default: false
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

    width: {
        type: String,
        default: '260px'
    }
})

const emit = defineEmits(['update:modelValue'])

const popupRef = ref(null)
const pickerValue = ref('')

const displayValue = computed({
    get() {
        return formatDisplayTime(props.modelValue)
    },

    set() {
        
    }
})

function syncPickerValue() {
    pickerValue.value = props.modelValue || ''
}

function handleTimeChange(value) {
    emit('update:modelValue', value)
}

function openPicker() {
    if (props.disable) return

    syncPickerValue()
    popupRef.value?.show()
}

function formatDisplayTime(value) {
    if (!value || !/^\d{2}:\d{2}$/.test(value)) {
        return ''
    }

    const [hoursString, minutes] = value.split(':')
    const hours = Number(hoursString)

    if (hours < 0 || hours > 23) {
        return ''
    }

    const period = hours >= 12 ? 'p. m.' : 'a. m.'
    const displayHours = hours % 12 || 12

    return `${String(displayHours).padStart(2, '0')}:${minutes} ${period}`
}

</script>

<style scoped lang="scss">

@use 'src/css/variables.scss' as *;
@use 'src/css/typography.scss' as *;

.base-time-picker {
    max-width: 100%;
}

.base-time-picker :deep(.q-field__control) {
    min-height: 40px;
    height: 40px;
    border-radius: 4px;
    background-color: transparent;
    cursor: pointer;
}

.base-time-picker :deep(.q-field__control:before) {
    border: 1px solid #d1d5db;
}

.base-time-picker :deep(.q-field__control:hover:before) {
    border-color: $color-primary;
}

.base-time-picker :deep(.q-field__control:after) {
    display: none;
}

.base-time-picker :deep(.q-field__native),
.base-time-picker :deep(.q-field__label),
.base-time-picker :deep(.q-field__prepend) {
    cursor: pointer;
}
</style>