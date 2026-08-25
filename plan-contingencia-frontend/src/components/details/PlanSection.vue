<template>

    <section class="plan-section">

        <div class="plan-section__icon">
            <q-icon :name="icon" />
        </div>

        <div class="plan-section__content">

            <h2 class="plan-section__title">
                {{ number }}. {{ title }}
            </h2>

            <div class="plan-section__body">
                <slot />
            </div>

        </div>

    </section>

</template>

<script setup>

defineProps({

    number: {
        type: [String, Number],
        required: true
    },
    title: {
        type: String,
        required: true
    },
    icon: {
        type: String,
        default: 'description'
    }

})

</script>

<style scoped lang="scss">

.plan-section {
    display: flex;
    gap: 18px;
    padding: 20px;
    background: #FFFFFF;
    border: 1px solid #E0E0E0;
    border-radius: 6px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.12);
}

.plan-section__icon {
    width: 42px;
    height: 42px;
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #EAF5EC;
    color: #287C2D;
    border-radius: 8px;
}

.plan-section__icon .q-icon {
    font-size: 25px;
}

.plan-section__content {
    flex: 1;
    min-width: 0;
}

.plan-section__title {
    margin: 0 0 18px;

    font-size: 17px;
    font-weight: 700;
    line-height: 1.2;

    text-transform: uppercase;

    color: #287C2D;
}

.plan-section__body {
    width: 100%;
}

@media (max-width: 768px) {

    .plan-section {
        gap: 12px;
        padding: 16px;
    }

    .plan-section__icon {
        width: 36px;
        height: 36px;
    }

    .plan-section__icon .q-icon {
        font-size: 21px;
    }

    .plan-section__title {
        font-size: 15px;
        margin-bottom: 14px;
    }
}

</style>