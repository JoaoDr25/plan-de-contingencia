<template>

    <div class="crud-toolbar">

        <div class="crud-toolbar__bottom">

            <div class="crud-toolbar__center">

                <slot name="center" />

            </div>

            <div class="crud-toolbar__left">

                <slot name="left" />

            </div>

        </div>

    </div>

</template>

<script setup>


</script>

<style scoped lang="scss">

.crud-toolbar {
    display: flex;
    flex-direction: column;
    width: 100%;
    margin: 0 auto;
}


.crud-toolbar__bottom {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    gap: 8px;
    flex-wrap: wrap;
    padding-top: 10px;
}

.crud-toolbar__center {
    flex: 1;
    display: flex;
    justify-content: flex-end;
    flex-wrap: wrap;
}

.crud-toolbar__left {
    display: flex;
    align-items: center;
    flex-shrink: 0;
}
</style>