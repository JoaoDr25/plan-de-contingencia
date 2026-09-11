<template>

  <section class="plan-contexto-academico">

    <div class="section-header">

      <h2>Contexto Académico</h2>

    </div>

    <div class="contexto-grid">

      <section class="contexto-section">

        <div class="section-title">

          <span class="section-number">1</span>

          <span>JUSTIFICACIÓN ACADÉMICA</span>

        </div>

        <div class="contexto-field">

          <label class="contexto-field__label" for="objetivo">Objetivo <span>*</span></label>

          <p class="contexto-field__help">Explique brevemente la razón académica de la salida y su relación con la
            planeación pedagógica.</p>

          <BaseTextarea id="objetivo" v-model="form.contextoAcademico.objetivo" label="Objetivo"
            placeholder="Escriba el objetivo de la actividad..." :maxlength="1000" counter required external-label
            size="wizard" :rules="[requiredRule]" />

        </div>

        <div class="contexto-field">

          <label class="contexto-field__label" for="competencia">Competencia <span>*</span></label>

          <p class="contexto-field__help">Describa la competencia que se pretende desarrollar con la actividad.</p>

          <BaseTextarea id="competencia" v-model="form.contextoAcademico.competencia" label="Competencia"
            placeholder="Escriba la competencia..." :maxlength="1000" counter required external-label size="wizard"
            :rules="[requiredRule]" />

        </div>

        <div class="contexto-field">

          <label class="contexto-field__label" for="resultado-aprendizaje">Resultados de aprendizaje
            <span>*</span></label>

          <p class="contexto-field__help">Describa los resultados de aprendizaje esperados.</p>

          <BaseTextarea id="resultado-aprendizaje" v-model="form.contextoAcademico.resultadoAprendizaje"
            label="Resultados de aprendizaje" placeholder="Escriba los resultados de aprendizaje..." :maxlength="1000"
            counter required external-label size="wizard" :rules="[requiredRule]" />

        </div>

      </section>

      <section class="contexto-section contexto-section--soportes">

        <div class="section-title">

          <span class="section-number">2</span>

          <span>SOPORTES ACADÉMICOS</span>

        </div>

        <div class="contexto-field">

          <label class="contexto-field__label" for="planeacion-pedagogica">Planeación pedagógica <span>*</span></label>

          <p class="contexto-field__help">Enlace a la planeación pedagógica de la actividad.</p>

          <BaseInput id="planeacion-pedagogica" v-model="form.contextoAcademico.planeacionPedagogicaLink"
            label="Planeación pedagógica" placeholder="https://ejemplo.edu.co/planeacion.pdf" type="url" icon="link"
            required external-label size="wizard" :rules="[requiredRule, urlRule]" />

        </div>

        <div class="contexto-field">

          <label class="contexto-field__label" for="guia-aprendizaje">Guía de aprendizaje <span>*</span></label>

          <p class="contexto-field__help">Enlace a la guía de aprendizaje correspondiente.</p>

          <BaseInput id="guia-aprendizaje" v-model="form.contextoAcademico.guiaAprendizajeLink"
            label="Guía de aprendizaje" placeholder="https://ejemplo.edu.co/guia-aprendizaje.pdf" type="url" icon="link"
            required external-label size="wizard" :rules="[requiredRule, urlRule]" />

        </div>

        <div class="contexto-field">

          <label class="contexto-field__label" for="otros-soportes">Otros soportes</label>

          <p class="contexto-field__help">Enlace a otros documentos o recursos de apoyo.</p>

          <BaseInput id="otros-soportes" v-model="form.contextoAcademico.otrosSoportesLink" label="Otros soportes"
            placeholder="https://ejemplo.edu.co/soportes.pdf" type="url" icon="link" external-label size="wizard"
            :rules="[optionalUrlRule]" />

        </div>

        <div class="contexto-field">

          <label class="contexto-field__label" for="acta-comportamiento">Acta de comportamiento</label>

          <p class="contexto-field__help">Enlace al acta de comportamiento acordada para la actividad.</p>

          <BaseInput id="acta-comportamiento" v-model="form.contextoAcademico.actasComportamientoLink"
            label="Acta de comportamiento" placeholder="https://ejemplo.edu.co/acta.pdf" type="url" icon="link"
            external-label size="wizard" :rules="[optionalUrlRule]" />

        </div>

      </section>

      <section class="contexto-section">

        <div class="section-title">

          <span class="section-number">3</span>
          <span>CONDICIONES ESPECIALES</span>

        </div>

        <div class="field-block">

          <label class="field-label">
            ¿Hay menores de edad?
          </label>

          <div class="checkbox-group">

            <q-checkbox v-model="form.contextoAcademico.consentimientoMenores" :true-value="true" :false-value="false"
              label="Sí" size="sm" @update:model-value="handleMenoresChange" />

            <q-checkbox :model-value="!form.contextoAcademico.consentimientoMenores" :true-value="true"
              :false-value="false" label="No" size="sm" @update:model-value="handleNoMenores" />

          </div>

        </div>

        <div v-if="form.contextoAcademico.consentimientoMenores" class="conditional-field">

          <label class="contexto-field__label" for="consentimiento-informado">Consentimiento informado
            <span>*</span></label>

            <p class="contexto-field__help">Enlace al consentimiento informado firmado por padres o acudientes.</p>

          <BaseInput id="consentimiento-informado" v-model="form.contextoAcademico.consentimientoLink"
            label="Consentimiento informado" placeholder="https://ejemplo.edu.co/consentimiento.pdf" type="url"
            icon="link" required external-label size="wizard" :rules="[requiredRule, urlRule]" />

        </div>

        <div class="section-title section-title--articulacion">

          <span class="section-number">4</span>

          <span>ARTICULACIÓN FORMATIVA</span>

        </div>

        <p class="section-description">
          Seleccione la(s) forma(s) en que esta actividad se articula al
          proceso formativo.
        </p>

        <div class="checkbox-list">
          <q-checkbox v-model="form.articulacionFormativa.proyectoFormativo" label="Proyecto formativo" size="sm"
            dense />

          <q-checkbox v-model="form.articulacionFormativa.visitaEmpresa" label="Visita a empresa" size="sm" dense />

          <q-checkbox v-model="form.articulacionFormativa.investigacion" label="Investigación" size="sm" dense />

          <q-checkbox v-model="form.articulacionFormativa.otroSeleccionado" label="Otro" size="sm" dense />

        </div>

        <div v-if="form.articulacionFormativa.otroSeleccionado" class="contexto-field">

          <label class="contexto-field__label" for="otra-articulacion">Especificación <span>*</span></label>

          <BaseInput id="otra-articulacion" v-model="form.articulacionFormativa.otro" label="Especificación"
            placeholder="Especifique..." :maxlength="50" required external-label size="wizard"
            :rules="[requiredRule]" />

        </div>

      </section>

    </div>

  </section>

</template>

<script setup>

import { reactive } from 'vue'

import BaseInput from 'src/components/forms/BaseInput.vue'
import BaseTextarea from 'src/components/forms/BaseTextarea.vue'

const props = defineProps({
  modelValue: {
    type: Object,
    required: true,
  },
})

const emit = defineEmits(['update:modelValue'])

const form = reactive(props.modelValue)

function requiredRule(value) {
  return (
    Boolean(String(value ?? '').trim()) ||
    'Este campo es obligatorio'
  )
}

function urlRule(value) {
  if (!value) return true

  try {
    const url = new URL(value)

    return (
      ['http:', 'https:'].includes(url.protocol) ||
      'Ingrese una URL válida (http o https)'
    )
  } catch {
    return 'Ingrese una URL válida (http o https)'
  }
}

function optionalUrlRule(value) {
  if (!value) return true

  return urlRule(value)
}

function handleMenoresChange(value) {
  if (value === true) {
    return
  }

  form.contextoAcademico.consentimientoLink = ''

  emit('update:modelValue', form)
}

function handleNoMenores() {
  form.contextoAcademico.consentimientoMenores = false
  form.contextoAcademico.consentimientoLink = ''

  emit('update:modelValue', form)
}
</script>

<style scoped lang="scss">

@use 'src/css/variables.scss' as *;
@use 'src/css/typography.scss' as *;

.plan-contexto-academico {
  width: 100%;
}

.section-header {
  margin-bottom: 16px;

  h2 {
    margin: 0;
    color: $color-text-primary;
    font-size: $font-size-2xl;
    font-weight: 700;
  }
}

.contexto-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 24px;
  align-items: start;
}

.contexto-section {
  display: flex;
  flex-direction: column;
  gap: 10px;
  min-width: 0;
}

.contexto-section--soportes .contexto-field {
  display: flex;
  flex-direction: column;
  padding-bottom: 18px;
}

.section-title {
  display: flex;
  align-items: center;
  gap: 8px;

  color: $color-primary;
  font-size: $font-size-sm;
  font-weight: 700;
}

.section-title--articulacion {
  margin-top: 8px;
}

.section-number {
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background-color: $color-primary;
  color: $color-surface;
  font-size: 10px;
  font-weight: 600;
}

.section-description {
  margin: -4px 0 2px;
  font-size: $font-size-xs;
  line-height: 1.4;
  color: $color-text-secondary;
}

.contexto-field {
  min-width: 0;
}

.contexto-field__label {
  display: block;
  margin: 2px 0 2px;
  color: $color-text-primary;
  font-size: $font-size-xs;
  font-weight: 700;
  line-height: 1.2;
  text-transform: uppercase;
}

.contexto-field__label span {
  color: $color-error;
}

.contexto-field__help {
  min-height: 24px;
  margin: 0;
  color: $color-text-secondary;
  font-size: $font-size-xs;
  line-height: 1.5;
}

.field-block {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.field-label {
  color: $color-text-primary;
  font-size: $font-size-sm;
  font-weight: 600;
}

.checkbox-group {
  display: flex;
  align-items: center;
  gap: 16px;
}

.checkbox-list {
  display: flex;
  flex-direction: column;
  gap: 11px;
}

.conditional-field {
  margin-top: 2px;
}

.field-help {
  display: block;
  margin-top: -4px;
  font-size: 10px;
  color: $color-text-secondary;
}

@media (max-width: 900px) {
  .contexto-grid {
    grid-template-columns: 1fr;
  }

.contexto-section--soportes .contexto-field {
  padding-bottom: 5px;
}

}
</style>