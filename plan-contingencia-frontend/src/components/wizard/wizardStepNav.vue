<template>

    <nav class="wizard-step-nav" aria-label="Pasos del plan de contingencia">

        <button v-for="step in steps" :key="step.number" type="button" class="wizard-step-nav__step" :class="{
            'wizard-step-nav__step--active': isCurrentStep(step.number),
            'wizard-step-nav__step--completed': isCompletedStep(step.number),
            'wizard-step-nav__step--locked': isLockedStep(step.number)
        }" :disabled="isLockedStep(step.number)" :aria-current="isCurrentStep(step.number) ? 'step' : undefined"
            @click="handleStepClick(step.number)">

            <span class="wizard-step-nav__indicator" :class="{
                'wizard-step-nav__indicator--active': isCurrentStep(step.number),
                'wizard-step-nav__indicator--completed': isCompletedStep(step.number)
            }">

                <q-icon v-if="isCompletedStep(step.number) && !isCurrentStep(step.number)" name="check" size="13px" />

                <span v-else>
                    {{ step.number }}
                </span>

            </span>

            <span class="wizard-step-nav__label">
                {{ step.label }}
            </span>

        </button>

    </nav>

</template>

<script setup>

const props = defineProps({

    currentStep: {
        type: Number,
        required: true
    },

    completedSteps: {
        type: Array,
        default: () => []
    }
})

const emit = defineEmits(['update:currentStep'])

const steps = [
    {
        number: 1,
        label: 'Información general'
    },
    {
        number: 2,
        label: 'Contexto académico'
    },
    {
        number: 3,
        label: 'Plan de trabajo'
    },
    {
        number: 4,
        label: 'Participantes'
    },
    {
        number: 5,
        label: 'Riesgos'
    },
    {
        number: 6,
        label: 'Seguridad'
    },
    {
        number: 7,
        label: 'Revisión'
    }
]

function isCurrentStep(stepNumber) {
    return props.currentStep === stepNumber
}

function isCompletedStep(stepNumber) {
    return props.completedSteps.includes(stepNumber)
}

function isLockedStep(stepNumber) {
    return (
        stepNumber !== props.currentStep &&
        !isCompletedStep(stepNumber)
    )
}

function handleStepClick(stepNumber) {
    if (isLockedStep(stepNumber)) return

    emit('update:currentStep', stepNumber)
}
</script>

<style scoped lang="scss">

@use 'src/css/variables.scss' as *;
@use 'src/css/typography.scss' as *;

.wizard-step-nav {
    display: grid;
    grid-template-columns: repeat(7, minmax(0, 1fr));
    width: 100%;
    margin: 20px auto;
}

.wizard-step-nav__step {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    min-height: 44px;
    padding: 8px 0;
    border: none;
    border-bottom: 2px solid transparent;
    background: transparent;
    font-family: inherit;
    cursor: pointer;
    transition:
        background-color 0.2s ease,
        color 0.2s ease,
        border-color 0.2s ease;
}

.wizard-step-nav__step:hover:not(:disabled) {
    color: $color-primary;
}

.wizard-step-nav__step--active {
    border-bottom-color: $color-primary;
    color: $color-primary;
    font-weight: 600;
}

.wizard-step-nav__step--completed {
    color: $color-primary;
    font-weight: 500;
}

.wizard-step-nav__step--locked {
    color: $color-text-secondary;
    cursor: not-allowed;
}

.wizard-step-nav__indicator {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    flex: 0 0 auto;
    width: 18px;
    height: 18px;
    border: 1px solid $color-border;
    border-radius: 50%;
    background-color: $color-background-field;
    font-size: 10px;
    font-weight: 600;
    transition:
        background-color 0.2s ease,
        border-color 0.2s ease,
        color 0.2s ease;
}

.wizard-step-nav__indicator--active {
    border-color: $color-primary;
    background-color: $color-primary;
    color: $color-background-field;
}

.wizard-step-nav__indicator--completed {
    border-color: $color-primary;
    background-color: $color-background-field;
    color: $color-primary;
}

.wizard-step-nav__label {
    white-space: nowrap;
    text-align: left;
    text-transform: uppercase;
    font-size: $font-size-sm;
}

@media (max-width: 1450px) and (min-width: 901px) {
    .wizard-step-nav__step {
        padding: 6px 3px;
    }

    .wizard-step-nav__label {
        white-space: normal;
        line-height: 1.2;
        
    }
}

@media (max-width: 900px) {
    .wizard-step-nav {
        grid-template-columns: repeat(4, minmax(0, 1fr));
        row-gap: 4px;
    }

    .wizard-step-nav__step {
        min-height: 40px;
        justify-content: flex-start;
    }

    .wizard-step-nav__label {
        white-space: normal;
    }
}

@media (max-width: 600px) {
    .wizard-step-nav {
        grid-template-columns: repeat(2, minmax(0, 1fr));
        justify-items: stretch;
        padding: 4px 0 0 0;
        margin: 0 auto;
        column-gap: 10px;
    }

    .wizard-step-nav__step {
        padding: 8px;
        gap: 4px;
    }

    .wizard-step-nav__label {
        white-space: nowrap;
        font-size: 0.71rem;
    }
}
</style>