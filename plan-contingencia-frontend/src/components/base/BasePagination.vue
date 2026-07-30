<template>

<div class="base-pagination">

    <q-btn  flat dense icon="chevron_left" class="base-pagination__button" :disable="props.currentPage === 1" @click="previousPage"
    />

  <div class="base-pagination__page">

            {{ props.currentPage }}

        </div>

        <q-btn
            flat
            dense
            icon="chevron_right"
            class="base-pagination__button"
            :disable="props.currentPage === totalPages"
            @click="nextPage"
        />

</div>

</template>

<script setup>

const props = defineProps({

    currentPage: {
        type: Number,
        default: 1
    },

    totalPages: {
        type: Number,
        default: 1
    }

})

const emit = defineEmits([
    'change'
])

function previousPage() {

    if (currentPage > 1) {

        emit('change', props.currentPage - 1)

    }

}

function nextPage() {

    if (currentPage < totalPages) {

        emit('change', props.currentPage + 1)

    }

}

</script>

<style scoped lang="scss">

@use 'src/css/variables.scss' as *;
@use 'src/css/typography.scss' as *;

.base-pagination{
    display:flex;
    align-items:center;
    justify-content:flex-end;
    gap:6px;
}

.base-pagination__button{

    color:$color-text-secondary;
    min-width:22px;

}

.base-pagination__page{

    width:20px;
    height:20px;

    display:flex;
    align-items:center;
    justify-content:center;

    background:$color-primary;

    color:white;

    border-radius:4px;

    font-size:$font-size-xs;
    font-weight:600;

}

</style>