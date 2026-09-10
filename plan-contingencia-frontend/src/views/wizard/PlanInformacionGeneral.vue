<template>
    
    <section class="plan-information">

        <h2 class="plan-information__title">
            Información General
        </h2>

        <div class="plan-information__grid">
            <BaseSelect v-model="form.programaFormacionId" label="Programa de formación"
                placeholder="Seleccione un programa de formación" :options="programaOptions" option-label="label"
                option-value="value" required size="wizard" :rules="[requiredRule]"
                @update:model-value="handleProgramaChange" />

            <BaseSelect v-model="form.actividadId" label="Actividad" placeholder="Seleccione una actividad"
                :options="actividadOptions" option-label="label" option-value="value" required size="wizard"
                :rules="[requiredRule]" />

            <div class="plan-information__full">
                <BaseTextarea v-model="form.descripcionActividad" label="Descripción de la actividad"
                    placeholder="Describa brevemente la actividad..." :maxlength="500" required size="wizard"
                    :rules="[requiredRule]" />
            </div>

            <BaseDatePicker v-model="form.fecha" label="Fecha de salida" required :rules="[requiredRule]"
                size="wizard" />

            <BaseTimePicker v-model="form.horaSalida" label="Hora de salida" placeholder="00:00 a. m." required
                :rules="[requiredRule]" width="100%" />

            <BaseTimePicker v-model="form.horaRegreso" label="Hora de regreso prevista" placeholder="00:00 p. m."
                required :rules="[requiredRule, returnTimeRule]" width="100%" />

            <BaseInput v-model="form.lugarSalida" label="Lugar de salida" placeholder="Escriba el lugar de salida"
                required :rules="[requiredRule]" size="wizard" />

            <BaseInput v-model="form.lugarDestino" label="Lugar de destino" placeholder="Escriba el lugar de destino"
                required :rules="[requiredRule]" size="wizard" />

            <BaseSelect v-model="form.tipoTransporte" label="Tipo de transporte"
                placeholder="Seleccione el tipo de transporte" :options="TIPO_TRANSPORTE_OPTIONS" option-label="label"
                option-value="value" required size="wizard" :rules="[requiredRule]" />

            <BaseSelect v-model="form.clasificacionInformacion" label="Clasificación de la información"
                placeholder="Seleccione la clasificación" :options="CLASIFICACION_INFORMACION_OPTIONS"
                option-label="label" option-value="value" required size="wizard" :rules="[requiredRule]" />
        </div>

        <div class="plan-information__notice">

            <q-icon name="info_outline" size="20px" />

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

// function handleActividadChange(actividadId) {
//     const actividad = ACTIVIDADES_MOCK.find(
//         item => item._id === actividadId
//     )

//     emit('update:modelValue', {
//         ...form,
//         actividadId,
//         descripcionActividad: form.descripcionActividad
//     })
// }

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
    font-size: 20px;
    font-weight: 700;
}

.plan-information__grid {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 12px 10px;
}

.plan-information__full {
    grid-column: 1 / -1;
}

.plan-information__notice {
    display: flex;
    align-items: flex-start;
    gap: 12px;

    margin-top: 12px;
    padding: 10px 14px;

    border-radius: 5px;

    background-color: #edf4ef;
    color: $color-text-primary;

    font-size: 11px;
}

.plan-information__notice .q-icon {
    color: $color-primary;
    flex-shrink: 0;
}

.plan-information__notice strong {
    display: block;

    margin-bottom: 2px;

    color: $color-primary;
    font-size: 12px;
}

.plan-information__notice p {
    margin: 0;

    color: $color-text-secondary;
}

.plan-information__notice span {
    color: #c62828;
}

@media (max-width: 800px) {
    .plan-information__grid {
        grid-template-columns: 1fr;
    }

    .plan-information__full {
        grid-column: auto;
    }
}
</style>