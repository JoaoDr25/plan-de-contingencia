<template>

    <BasePage>

        <CrudHeader
            title="Planes de Contingencia"
            :uppercase-title="true"
        />

        <PlanSectionNav />

        <CrudToolbar>

            <template #center>

                <BaseFilterBar class="historico-filter-bar">

                    <BaseSelect
                        v-model="selectedStatus"
                        label="Estado"
                        :options="HISTORICO_STATUS_OPTIONS"
                        size="filter"
                        :show-icon="false"
                    />

                    <BaseDatePicker
                        v-model="dateFrom"
                        label="Fecha desde"
                    />

                    <BaseDatePicker
                        v-model="dateTo"
                        label="Fecha hasta"
                        :min="dateFrom || undefined"
                    />

                    <BaseSearch
                        v-model="searchText"
                        placeholder="Buscar por código, nombre o programa..."
                    />

                    <button
                        type="button"
                        class="clear-filters-button"
                        @click="clearFilters"
                    >
                        Limpiar filtros
                    </button>

                </BaseFilterBar>

            </template>

        </CrudToolbar>

    </BasePage>

</template>

<script setup>

import { ref, watch } from 'vue'

import BasePage from 'src/components/base/BasePage.vue'
import CrudHeader from 'src/components/cruds/CrudHeader.vue'
import CrudToolbar from 'src/components/cruds/CrudToolbar.vue'
import BaseFilterBar from 'src/components/base/BaseFilterBar.vue'
import BaseSelect from 'src/components/forms/BaseSelect.vue'
import BaseDatePicker from 'src/components/forms/BaseDatePicker.vue'
import BaseSearch from 'src/components/forms/BaseSearch.vue'
import PlanSectionNav from 'src/components/plans/PlanSectionNav.vue'

import { HISTORICO_STATUS_OPTIONS } from 'src/constants/filters/historico.constants'

const selectedStatus = ref('todos')
const dateFrom = ref('')
const dateTo = ref('')
const searchText = ref('')

watch(dateFrom, (newDateFrom) => {
    if (
        newDateFrom &&
        dateTo.value &&
        dateTo.value < newDateFrom
    ) {
        dateTo.value = ''
    }
})

function clearFilters() {

    selectedStatus.value = 'todos'
    dateFrom.value = ''
    dateTo.value = ''
    searchText.value = ''
}

</script>

<style scoped lang="scss">

.historico-filter-bar {
    justify-content: flex-start;
    align-items: center;
}

.clear-filters-button {
    border: none;
    background: transparent;
    padding: 0;
    cursor: pointer;
    text-transform: uppercase;
    font-size: 0.72rem;
    font-weight: 600;
    white-space: nowrap;
}

</style>