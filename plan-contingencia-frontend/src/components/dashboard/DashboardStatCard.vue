<template>

    <q-card class="dashboard-stat-card">

        <q-cardSection class="dashborad-stat-card__content">

            <div class="dashboard-stat-card__icon">

            </div>

            <q-icon :name="icon" size="32px"/>

            <div class="dashboard-stat-card__info">

                <div class="dashboard-stat-card__value">

                        {{ value }}

                </div>

                <div class="dashboard-stat-card__title">

                    {{ title }}
                    
                </div>

                <div class="dashboard-stat-card__description">

                    {{ description }}

                </div>

            </div>

        </q-cardSection>

    </q-card>

</template>

<script setup>

defineProps({
    icon: {
        type: String,
        required: true
    },
    value: {
        type: Number,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    }
})

</script>

<style scoped lang="scss">

@use 'src/css/variables.scss' as *;
@use 'src/css/mixins.scss' as *;
@use 'src/css/typography.scss' as *;

.dashboard-stat-card {

}

.dashboard-stat-card__content {

}

.dashboard-stat-card__icon {

}

.dashboard-stat-card__info {

}

.dashboard-stat-card__value {

}

.dashboard-stat-card__title {

}

.dashboard-stat-card__description {

}

</style>