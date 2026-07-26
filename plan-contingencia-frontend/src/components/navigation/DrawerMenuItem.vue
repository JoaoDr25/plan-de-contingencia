<template>
    <q-item clickable :to="{ name: routeName }" @click="handleClick"
    class="drawer-menu-item">

        <q-item-section avatar class="drawer-menu-item__icon">

            <q-icon :name="icon" size="20px" />

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

    routeName: {
        type: String,
        required: true
    }
})

const emit = defineEmits([
  'closeDrawer'
])

function handleClick() {
    emit('closeDrawer')
}

</script>

<style scoped lang="scss">
@use 'src/css/variables.scss' as *;
@use 'src/css/mixins.scss' as *;
@use 'src/css/typography.scss' as *;

.drawer-menu-item {
    background-color: $color-primary;
    color: $color-background;
    border-radius: 8px;
    margin-bottom: 0.7rem;
    padding: 0 0.5rem;
    cursor: pointer;
    transition: background-color 0.2s ease-in-out;
    min-height: 42px;
    width: 100%;
}

.drawer-menu-item:hover {
    background-color: $color-primary-dark;
}

.drawer-menu-item__icon {
    color: inherit;
    flex: 0 0 auto;
    min-width: 0%;
}

.drawer-menu-item__label {
    font-size: 0.95rem;
    font-weight: 400;
    padding-right: 0;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    flex: 1;
}
</style>