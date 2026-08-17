<template>

    <div class="base-table-info">

        {{ start }}-{{ end }} de {{ total }}

    </div>

</template>


<script setup>

const {
    start,
    end,
    total
} = defineProps({

    start: {
        type: Number,
        default: 0
    },
    end: {
        type: Number,
        default: 0
    },
    total: {
        type: Number,
        default: 0
    }
})

</script>


<style scoped lang="scss">

@use 'src/css/variables.scss' as *;
@use 'src/css/typography.scss' as *;

.base-table-info {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    width: 100%;
    font-family: $font-family-base;
    font-size: $font-size-xs;
    color: $color-text-primary;
    user-select: none;
    letter-spacing: 0.8px;
}


</style>