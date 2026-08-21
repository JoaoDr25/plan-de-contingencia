<template>

    <div class="plans-section-nav">

        <button
            v-for="section in sections"
            :key="section.name"
            type="button"
            class="plans-section-nav__item"
            :class="{
                'plans-section-nav__item--active': isActive(section.route)
            }"
            @click="navigateTo(section.route)"
        >

            <q-icon
                :name="section.icon"
                class="plans-section-nav__icon"
            />

            <span class="plans-section-nav__label">
                {{ section.label }}
            </span>

        </button>

    </div>

</template>

<script setup>

import { useRoute, useRouter } from 'vue-router'

const router = useRouter()
const route = useRoute()

const sections = [
    {
        name: 'plans',
        label: 'Planes de Contingencia',
        icon: 'description',
        route: '/planes'
    },
    {
        name: 'history',
        label: 'Histórico',
        icon: 'history',
        route: '/planes/historico'
    },
    {
        name: 'consultation',
        label: 'Consulta',
        icon: 'search',
        route: '/planes/consulta'
    }
]

function isActive(sectionRoute) {
    return route.path === sectionRoute
}

function navigateTo(sectionRoute) {

    if (route.path === sectionRoute) {
        return
    }
    router.push(sectionRoute)
}

</script>

<style scoped lang="scss">

.plans-section-nav {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    width: 100%;
    margin-bottom: 18px;
}

.plans-section-nav__item {
    position: relative;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 64px;
    padding: 8px 16px;
    background: transparent;
    border: none;
    color: #2E7D32;
    cursor: pointer;
    transition:
        background-color 0.2s ease,
        color 0.2s ease;
}

.plans-section-nav__item:hover {
    background-color: rgba(46, 125, 50, 0.06);
}

.plans-section-nav__item--active {
    background-color: #2E7D32;
    color: #FFFFFF;
}

.plans-section-nav__icon {
    font-size: 18px;
    margin-bottom: 4px;
}

.plans-section-nav__label {
    font-size: 11px;
    font-weight: 600;
    text-transform: uppercase;
    line-height: 1.2;
}

</style>