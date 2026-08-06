<template>

    <div v-if="hasScroll" class="floating-scroll-buttons">

        <q-btn round unelevated icon="arrow_upward" class="floating-scroll-buttons__button" :class="{
            'floating-scroll-buttons__button--active': canScrollUp,
            'floating-scroll-buttons__button--disabled': !canScrollUp
        }" @click="scrollToTop" />

        <q-btn round unelevated icon="arrow_downward" class="floating-scroll-buttons__button" :class="{
            'floating-scroll-buttons__button--active': canScrollDown,
            'floating-scroll-buttons__button--disabled': !canScrollDown
        }" @click="scrollToBottom" />

    </div>

</template>

<script setup>

import {
    ref,
    computed,
    onUnmounted,
    onMounted
} from "vue";

const isAtTop = ref(true)
const isAtBottom = ref(false)
const pageHasScroll = ref(false)

const canScrollUp = computed(() => !isAtTop.value)
const canScrollDown = computed(() => !isAtBottom.value)
const hasScroll = computed(() => pageHasScroll.value)

function updateScrollButtons() {
    const scrollTop = window.scrollY
    const windowHeight = window.innerHeight
    const documentHeight = document.documentElement.scrollHeight
    pageHasScroll.value = documentHeight > windowHeight + 5
    isAtTop.value = scrollTop <= 10
    isAtBottom.value = scrollTop + windowHeight >= documentHeight - 10
}

function scrollToTop() {
    if (!canScrollUp.value)
        return
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    })
}

function scrollToBottom() {
    if (!canScrollDown.value)
        return
    window.scrollTo({
        top: document.documentElement.scrollHeight - window.innerHeight,
        behavior: 'smooth'
    })
}

onMounted(() => {
    updateScrollButtons()
    requestAnimationFrame(updateScrollButtons)
    window.addEventListener('scroll', updateScrollButtons)
    window.addEventListener('resize', updateScrollButtons)
})

onUnmounted(() => {
    window.removeEventListener('scroll', updateScrollButtons)
    window.removeEventListener('resize', updateScrollButtons)
})

</script>

<style scoped lang="scss">
@use 'src/css/variables.scss' as *;

.floating-scroll-buttons {
    position: fixed;
    right: 38px;
    bottom: 25px;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    z-index: 1100;
}

.floating-scroll-buttons__button {
    width: 30px;
    height: 30px;
    transition: background-color 0.25s ease, transform 0.2s ease, box-shadow 0.25s ease;
}

.floating-scroll-buttons__button--active {
    background-color: $color-primary;
    color: $color-background;
}

.floating-scroll-buttons__button--active:hover {
    transform: translateY(-2px);
}

.floating-scroll-buttons__button--disabled {
    background-color: #BDBDBD;
    color: $color-background;
    cursor: default;
}
</style>