<template>

    <BasePage>

        <CrudHeader title="Planes de Contingencia"  :uppercase-title="true"/>

        <PlanSectionNav />

    </BasePage>

</template>

<script setup>

import BasePage from 'src/components/base/BasePage.vue'
import CrudHeader from 'src/components/cruds/CrudHeader.vue'
import PlanSectionNav from 'src/components/plans/PlanSectionNav.vue'

</script>