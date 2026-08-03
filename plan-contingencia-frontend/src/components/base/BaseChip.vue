<template>

    <q-chip dense :outline="outlined" class="base-chip" :style="{
        backgroundColor: color,
        color: textColor
    }">
        {{ label }}

    </q-chip>

</template>

<script setup>

const {
    label,
    color,
    textColor,
    outlined
} = defineProps({

    label: {
        type: String,
        required: true
    },

    color: {
        type: String,
        default: null
    },

    textColor: {
        type: String,
        default: '#FFFFFF'
    },

    outlined: {
        type: Boolean,
        default: false
    }

})

</script>

<style scoped lang="scss">
@use 'src/css/variables.scss' as *;
@use 'src/css/typography.scss' as *;

.base-chip {
    min-width: 90px;
    height: 18px;
    padding: 0 8px;
    margin: 0;
    border-radius: 6px;
    font-size: $font-size-chip;
    font-weight: $font-weight-chip;
    line-height: 1;
    white-space: nowrap;
}

.base-chip :deep(.q-chip__content) {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    padding: 0;
    color: inherit !important;
}
</style>