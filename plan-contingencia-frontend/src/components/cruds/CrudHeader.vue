<template>

    <section class="crud-header">

        <div class="crud-header__content">

            <h1 class="crud-header__title" :class="{
                'crud-header__title--uppercase': uppercaseTitle
            }">
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
    uppercaseTitle
} = defineProps({
    title: {
        type: String,
        required: true
    },
    uppercaseTitle: {
        type: Boolean,
        default: false
    }

})

</script>

<style scoped lang="scss">
@use 'src/css/variables.scss' as *;
@use 'src/css/typography.scss' as *;

.crud-header {
    display: flex;
    width: 100%;
    padding-top: 6px;
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
    font-size: $font-size-4xl;
    letter-spacing: 0.05px;
    color: $color-text-primary;
    padding-top: 25px;
}

.crud-header__title--uppercase {
    text-transform: uppercase;
    font-size: $font-size-3xl;
}

.crud-header__divider {
    width: 90%;
    height: 3px;
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