<template>

    <section class="crud-header">

        <div class="crud-header__content">

            <h1 class="crud-header__title">

                {{ title }}

            </h1>

            <div class="crud-header__divider"></div>

            <div v-if="$slots.actions" class="crud-header__actions">

                <slot name="actions" />

            </div>

        </div>

    </section>

</template>

<script setup>

const {
    title,
} = defineProps({
    title: {
        type: String,
        required: true
    }
})

</script>

<style scoped lang="scss">
@use 'src/css/variables.scss' as *;
@use 'src/css/typography.scss' as *;

.crud-header {
    display: flex;
    gap: 2rem;
    width: 100%;
}

.crud-header__content {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.crud-header__title {
    margin: 0;
    text-align: center;
    font-size: 1.7rem;
    letter-spacing: 0.5px;
    color: $color-text-primary;
    font-size: $font-family-base;
}

.crud-header__divider {
    width: 90%;
    height: 2px;
    margin-top: 0.5rem;
    background: $color-primary;
    border-radius: 999px;
}

.crud-header__actions {
    width: 90%;
    display: flex;
    justify-content: flex-start;
    margin-top: 8px;
}
</style>