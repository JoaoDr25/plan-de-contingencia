<template>
    <q-item clickable class="drawer-menu-item">

        <q-item-section avatar class="drawer-menu-item__icon">

            <q-icon :name="icon" size="18px"/>

        </q-item-section>

        <q-item-section class="drawer-menu-item__label">

            {{ title }}

        </q-item-section>
    </q-item>

</template>

<script setup>

defineProps({
    title: {
        type: String,
        required: true
    },

    icon: {
        type: String,
        required: true
    },

    to: {
        type: String,
        required: true
    }
})

</script>

<style scoped lang="scss">

@use 'src/css/variables.scss' as *;
@use 'src/css/mixins.scss' as *;
@use 'src/css/typography.scss' as *;

.drawer-menu-item {
    background-color: $color-primary;
    color: $color-white;
    border-radius: 6px;
    margin-bottom: 0.5rem;
    cursor: pointer;
    transition: background-color 0.2s ease-in-out;
    min-height: 40px;
}

.drawer-menu-item:hover {
    background-color: $color-primary-dark;
}

.drawer-menu-item__icon {
    
}

.drawer-menu-item__label {}

</style>