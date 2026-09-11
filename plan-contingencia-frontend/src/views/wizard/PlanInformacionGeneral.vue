<template>

    <section class="plan-information">

        <h2 class="plan-information__title">
            Información General
        </h2>

        <div class="plan-information__grid">

            <div class="plan-information__field plan-information__field--half">

                <label class="plan-information__label" for="programa-formacion">
                    Programa de formación <span>*</span>
                </label>

                <BaseSelect id="programa-formacion" v-model="form.programaFormacionId" label="Programa de formación"
                    placeholder="Seleccione un programa de formación" :options="programaOptions" option-label="label"
                    option-value="value" required external-label size="wizard" :rules="[requiredRule]"
                    @update:model-value="handleProgramaChange" />

            </div>

            <div class="plan-information__field plan-information__field--half">

                <label class="plan-information__label" for="actividad">
                    Actividad <span>*</span>
                </label>

                <BaseSelect id="actividad" v-model="form.actividadId" label="Actividad"
                    placeholder="Seleccione una actividad" :options="actividadOptions" option-label="label"
                    option-value="value" required external-label size="wizard" :rules="[requiredRule]" />

            </div>

            <div class="plan-information__field plan-information__field--full">

                <label class="plan-information__label" for="descripcion-actividad">
                    Descripción de la actividad <span>*</span>

                </label>

                <BaseTextarea id="descripcion-actividad" v-model="form.descripcionActividad"
                    label="Descripción de la actividad" placeholder="Describa brevemente la actividad a realizar"
                    :maxlength="500" counter required external-label size="wizard" :rules="[requiredRule]" />
            </div>

            <div class="plan-information__field plan-information__field--third">

                <label class="plan-information__label" for="fecha-salida">
                    Fecha de salida <span>*</span>
                </label>

                <BaseDatePicker id="fecha-salida" v-model="form.fecha" label="Fecha de salida" required external-label
                    icon-position="append" :rules="[requiredRule]" size="wizard" />

            </div>

            <div class="plan-information__field plan-information__field--third">

                <label class="plan-information__label" for="hora-salida">
                    Hora de salida <span>*</span>
                </label>

                <BaseTimePicker id="hora-salida" v-model="form.horaSalida" label="Hora de salida"
                    placeholder="00:00 a. m." required external-label icon-position="append" size="wizard"
                    :rules="[requiredRule]" width="100%" />

            </div>

            <div class="plan-information__field plan-information__field--third">

                <label class="plan-information__label" for="hora-regreso">
                    Hora de regreso prevista <span>*</span>
                </label>

                <BaseTimePicker id="hora-regreso" v-model="form.horaRegreso" label="Hora de regreso prevista"
                    placeholder="00:00 p. m." required external-label icon-position="append" size="wizard"
                    :rules="[requiredRule, returnTimeRule]" width="100%" />

            </div>

            <div class="plan-information__field plan-information__field--half">

                <label class="plan-information__label" for="lugar-salida">
                    Lugar de salida <span>*</span>
                </label>

                <BaseInput id="lugar-salida" v-model="form.lugarSalida" label="Lugar de salida"
                    placeholder="Escriba el lugar de salida" icon="location_on" icon-position="append" required
                    external-label :rules="[requiredRule]" size="wizard" />

            </div>

            <div class="plan-information__field plan-information__field--half">

                <label class="plan-information__label" for="lugar-destino">
                    Lugar de destino <span>*</span>
                </label>

                <BaseInput id="lugar-destino" v-model="form.lugarDestino" label="Lugar de destino"
                    placeholder="Escriba el lugar de destino" icon="location_on" icon-position="append" required
                    external-label :rules="[requiredRule]" size="wizard" />

            </div>

            <div class="plan-information__field plan-information__field--half">

                <label class="plan-information__label" for="tipo-transporte">
                    Tipo de transporte <span>*</span>
                </label>

                <BaseSelect id="tipo-transporte" v-model="form.tipoTransporte" label="Tipo de transporte"
                    placeholder="Seleccione el tipo de transporte" :options="TIPO_TRANSPORTE_OPTIONS"
                    option-label="label" option-value="value" required external-label size="wizard"
                    :rules="[requiredRule]" />

            </div>

            <div class="plan-information__field plan-information__field--half">

                <label class="plan-information__label" for="clasificacion-informacion">
                    Clasificación de la información <span>*</span>
                </label>

                <BaseSelect id="clasificacion-informacion" v-model="form.clasificacionInformacion"
                    label="Clasificación de la información" placeholder="Seleccione la clasificación"
                    :options="CLASIFICACION_INFORMACION_OPTIONS" option-label="label" option-value="value" required
                    external-label size="wizard" :rules="[requiredRule]" />
            </div>

        </div>

        <div class="plan-information__notice">

            <q-icon name="info_outline" size="24px" />

            <div>

                <strong>Campos obligatorios</strong>

                <p>
                    Los campos marcados con <span>*</span> son obligatorios
                    para continuar con la creación del plan.
                </p>

            </div>

        </div>

    </section>

</template>

<script setup>

import { computed, reactive } from 'vue'

import BaseInput from 'src/components/forms/BaseInput.vue'
import BaseSelect from 'src/components/forms/BaseSelect.vue'
import BaseTextarea from 'src/components/forms/BaseTextarea.vue'
import BaseDatePicker from 'src/components/forms/BaseDatePicker.vue'
import BaseTimePicker from 'src/components/forms/BaseTimePicker.vue'

import { PROGRAMAS_MOCK } from 'src/mocks/modules/programas.mock'
import { ACTIVIDADES_MOCK } from 'src/mocks/modules/actividades.mock'

import { TIPO_TRANSPORTE_OPTIONS, CLASIFICACION_INFORMACION_OPTIONS } from 'src/constants/system/plan.constant'

const props = defineProps({
    modelValue: {
        type: Object,
        required: true
    }
})

const emit = defineEmits([
    'update:modelValue'
])

const form = reactive(props.modelValue)

const programaOptions = computed(() => {
    return PROGRAMAS_MOCK
        .filter(programa => programa.estado === 'Activo')
        .map(programa => ({
            label: programa.nombre,
            value: programa._id
        }))
})

const actividadOptions = computed(() => {
    return ACTIVIDADES_MOCK.map(actividad => ({
        label: actividad.nombre,
        value: actividad._id
    }))
})

function handleProgramaChange(programaId) {
    const programa = PROGRAMAS_MOCK.find(
        item => item._id === programaId
    )

    form.programaFormacionNombre = programa?.nombre ?? ''

    emit('update:modelValue', form)
}

function requiredRule(value) {
    return Boolean(String(value ?? '').trim()) || 'Este campo es obligatorio'
}

function returnTimeRule(value) {
    if (!value) {
        return true
    }

    if (!form.horaSalida) {
        return true
    }

    const salida = timeToMinutes(form.horaSalida)
    const regreso = timeToMinutes(value)

    if (salida === null || regreso === null) {
        return true
    }

    return regreso > salida ||
        'La hora de regreso debe ser posterior a la hora de salida'
}

function timeToMinutes(value) {
    if (!/^\d{2}:\d{2}$/.test(value)) {
        return null
    }

    const [hours, minutes] = value.split(':').map(Number)

    if (
        hours < 0 ||
        hours > 23 ||
        minutes < 0 ||
        minutes > 59
    ) {
        return null
    }

    return hours * 60 + minutes
}
</script>

<style scoped lang="scss">

@use 'src/css/variables.scss' as *;
@use 'src/css/typography.scss' as *;

.plan-information {
    width: 100%;
}

.plan-information__title {
    margin: 0 0 16px;
    color: $color-text-primary;
    font-size: $font-size-2xl;
    font-weight: 700;
}

.plan-information__grid {
    display: grid;
    grid-template-columns: repeat(6, minmax(0, 1fr));
    gap: 12px 10px;
}

.plan-information__field--half {
    grid-column: span 3;
}

.plan-information__field--third {
    grid-column: span 2;
}

.plan-information__field--full {
    grid-column: 1 / -1;
}

.plan-information__label {
    display: block;
    margin: 2px 0 4px;
    color: $color-text-primary;
    font-size: $font-size-xs;
    font-weight: 700;
    line-height: 1.2;
    text-transform: uppercase;
}

.plan-information__label span {
    color: $color-error;
}

.plan-information__notice {
    display: flex;
    align-items: flex-start;
    gap: 12px;
    margin-top: 15px;
    padding: 10px 14px;
    border-radius: 5px;
    background-color: $color-background-field;
    color: $color-text-primary;
}

.plan-information__notice .q-icon {
    color: $color-primary;
    padding-top: 7px;
}

.plan-information__notice strong {
    display: block;
    color: $color-primary;
    font-size: $font-size-xs;
}

.plan-information__notice p {
    margin: 0;
    font-size: $font-size-sm;
    color: $color-text-secondary;
}

.plan-information__notice span {
    color: $color-error;
}

@media (max-width: 800px) {
    .plan-information__grid {
        grid-template-columns: 1fr;
    }

    .plan-information__field--half,
    .plan-information__field--third,
    .plan-information__field--full {
        grid-column: auto;
    }
}
</style>