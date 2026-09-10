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

        <BaseTextarea
          v-model="form.contextoAcademico.objetivo"
          label="Objetivo"
          placeholder="Escriba brevemente la razón académica de la salida..."
          maxlength="1000"
          required
          size="wizard"
          :rules="[requiredRule]"
        />

        <BaseTextarea
          v-model="form.contextoAcademico.competencia"
          label="Competencia"
          placeholder="Escriba la competencia que se pretende desarrollar..."
          maxlength="1000"
          required
          size="wizard"
          :rules="[requiredRule]"
        />

        <BaseTextarea
          v-model="form.contextoAcademico.resultadoAprendizaje"
          label="Resultados de aprendizaje"
          placeholder="Escriba los resultados de aprendizaje esperados..."
          maxlength="1000"
          required
          size="wizard"
          :rules="[requiredRule]"
        />

      </section>

      <section class="contexto-section">

        <div class="section-title">

          <span class="section-number">2</span>

          <span>SOPORTES ACADÉMICOS</span>

        </div>

        <BaseInput
          v-model="form.contextoAcademico.planeacionPedagogicaLink"
          label="Planeación pedagógica"
          placeholder="https://ejemplo.edu.co/planeacion.pdf"
          type="url"
          icon="link"
          required
          size="wizard"
          :rules="[requiredRule, urlRule]"
        />

        <BaseInput
          v-model="form.contextoAcademico.guiaAprendizajeLink"
          label="Guía de aprendizaje"
          placeholder="https://ejemplo.edu.co/guia-aprendizaje.pdf"
          type="url"
          icon="link"
          required
          size="wizard"
          :rules="[requiredRule, urlRule]"
        />

        <BaseInput
          v-model="form.contextoAcademico.otrosSoportesLink"
          label="Otros soportes"
          placeholder="https://ejemplo.edu.co/soportes.pdf"
          type="url"
          icon="link"
          size="wizard"
          :rules="[optionalUrlRule]"
        />

        <BaseInput
          v-model="form.contextoAcademico.actasComportamientoLink"
          label="Acta de comportamiento"
          placeholder="https://ejemplo.edu.co/acta.pdf"
          type="url"
          icon="link"
          size="wizard"
          :rules="[optionalUrlRule]"
        />

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

            <q-checkbox
              v-model="form.contextoAcademico.consentimientoMenores"
              :true-value="true"
              :false-value="false"
              label="Sí"
              @update:model-value="handleMenoresChange"
            />

            <q-checkbox
              :model-value="!form.contextoAcademico.consentimientoMenores"
              :true-value="true"
              :false-value="false"
              label="No"
              @update:model-value="handleNoMenores"
            />

          </div>

        </div>

        <div
          v-if="form.contextoAcademico.consentimientoMenores"
          class="conditional-field"
        >

          <BaseInput
            v-model="form.contextoAcademico.consentimientoLink"
            label="Consentimiento informado"
            placeholder="https://ejemplo.edu.co/consentimiento.pdf"
            type="url"
            icon="link"
            required
            size="wizard"
            :rules="[requiredRule, urlRule]"
          />

          <small class="field-help">
            Ingrese una URL válida (http o https).
          </small>

        </div>

      </section>

      <section class="contexto-section">

        <div class="section-title">

          <span class="section-number">4</span>

          <span>ARTICULACIÓN FORMATIVA</span>

        </div>

        <p class="section-description">
          Seleccione la(s) forma(s) en que esta actividad se articula al
          proceso formativo.
        </p>

        <div class="checkbox-list">
          <q-checkbox
            v-model="form.articulacionFormativa.proyectoFormativo"
            label="Proyecto formativo"
          />

          <q-checkbox
            v-model="form.articulacionFormativa.visitaEmpresa"
            label="Visita a empresa"
          />

          <q-checkbox
            v-model="form.articulacionFormativa.investigacion"
            label="Investigación"
          />

          <q-checkbox
            v-model="form.articulacionFormativa.otroSeleccionado"
            label="Otro"
          />

        </div>

        <BaseInput
          v-if="form.articulacionFormativa.otroSeleccionado"
          v-model="form.articulacionFormativa.otro"
          label="Especificación"
          placeholder="Especifique..."
          maxlength="50"
          required
          size="wizard"
          :rules="[requiredRule]"
        />

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

.plan-contexto-academico {
  width: 100%;
}

.section-header {
  margin-bottom: 16px;

  h2 {
    margin: 0;
    font-size: 18px;
    font-weight: 700;
  }
}

.contexto-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 28px;
  align-items: start;
}

.contexto-section {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.section-title {
  display: flex;
  align-items: center;
  gap: 8px;

  font-size: 13px;
  font-weight: 700;
  color: $primary;
}

.section-number {
  width: 20px;
  height: 20px;

  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: 50%;
  background-color: $primary;
  color: white;

  font-size: 11px;
  font-weight: 700;
}

.section-description {
  margin: -4px 0 2px;

  font-size: 11px;
  line-height: 1.4;
  color: #666;
}

.field-block {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.field-label {
  font-size: 12px;
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
  gap: 2px;
}

.conditional-field {
  margin-top: 2px;
}

.field-help {
  display: block;
  margin-top: -4px;

  font-size: 10px;
  color: #666;
}

@media (max-width: 900px) {
  .contexto-grid {
    grid-template-columns: 1fr;
  }
}
</style>