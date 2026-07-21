<template>

    <q-card class="dashboard-stat-card">

        <q-card-section class="dashboard-stat-card__content">

            <div class="dashboard-stat-card__icon">

                 <q-icon :name="icon" size="32px"/>

            </div>

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

        </q-card-section>

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
    min-height: 92px;
    border-radius: 10px;
    border: 1px solid $color-border;
    box-shadow: $shadow-sm;
    transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.dashboard-stat-card:hover {
    transform: translateY(-1px);
    box-shadow: $shadow-md;
    cursor: pointer;
}

.dashboard-stat-card__content {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 1rem;
}

.dashboard-stat-card__icon {
    width: 64px;
    height: 64px;
    flex: 0 0 64px;
    border-radius: 50%;
    background-color: $color-background;
    @include flex-center;
}

.dashboard-stat-card__icon .q-icon {
    color: $color-primary;
}

.dashboard-stat-card__info {
    display: flex;
    flex-direction: column;
    justify-content: center;
    flex: 1;
}

.dashboard-stat-card__value {
    font-size: 2rem;
    font-weight: 700;
    color: $color-primary;
    line-height: 1;
}

.dashboard-stat-card__title {
    font-size: 0.95rem;
    font-weight: 600;
    margin-top: 0.15rem;
}

.dashboard-stat-card__description {
    font-size: 0.75rem;
    color: $color-text-secondary;
    margin-top: 0.2rem;
}

</style>