<template>

  <section class="plan-seguridad">

    <div class="section-header">
      <h2>Seguridad</h2>
    </div>

    <div class="security-grid">

      <section class="security-section">

        <div class="section-title">

          <span class="section-number">1</span>
          
          <span>ELEMENTOS DE PROTECCIÓN PERSONAL</span>
        
        </div>

        <p class="section-description">
          Seleccione los elementos de protección personal requeridos
          para la actividad.
        </p>

        <div class="epp-list">

          <div
            v-for="epp in eppOptions"
            :key="epp._id"
            class="epp-item"
          >

            <q-checkbox
              :model-value="isEppSelected(epp._id)"
              @update:model-value="
                (value) => handleEppSelection(epp._id, value)
              "
            />

            <div class="epp-item__content">

              <span class="epp-item__name">
                {{ epp.nombre }}
              </span>

              <span class="epp-item__category">
                {{ epp.categoria }}
              </span>

            </div>

          </div>

        </div>

        <div class="selection-counter">
          {{ plan.epp.length }} elemento{{ plan.epp.length === 1 ? '' : 's' }}
          seleccionado{{ plan.epp.length === 1 ? '' : 's' }}
        </div>

      </section>

      <section class="security-section">

        <div class="section-title">

          <span class="section-number">2</span>

          <span>SEGURIDAD VIAL</span>

        </div>

        <p class="section-description">
          Indique si aplican las condiciones de seguridad vial para
          la actividad.
        </p>

        <div class="field-block">

          <label class="field-label">
            ¿Aplica seguridad vial?
          </label>

          <div class="radio-group">

            <q-radio
              v-model="plan.seguridadVial.aplica"
              :val="true"
              label="Sí"
              @update:model-value="handleRoadSafetyChange"
            />

            <q-radio
              v-model="plan.seguridadVial.aplica"
              :val="false"
              label="No"
              @update:model-value="handleRoadSafetyChange"
            />
          </div>

        </div>

        <div
          v-if="plan.seguridadVial.aplica"
          class="security-vial-list"
        >

          <div
            v-for="item in securityVialItems"
            :key="item.id"
            class="security-vial-item"
          >

            <q-checkbox
              :model-value="isSecurityItemSelected(item.id)"
              :label="item.label"
              @update:model-value="
                (value) => handleSecurityItemSelection(item.id, value)
              "
            />

          </div>

        </div>

      </section>

      <section class="security-section security-section--contacts">

        <div class="section-title">

          <span class="section-number">3</span>

          <span>CONTACTOS DE EMERGENCIA</span>

        </div>

        <p class="section-description">
          Seleccione los contactos de emergencia disponibles para
          la actividad.
        </p>

        <BaseSelect
          v-model="plan.contactosEmergencia.contactosBase"
          label="Contactos de emergencia"
          placeholder="Seleccione uno o varios contactos"
          :options="contactOptions"
          option-label="label"
          option-value="value"
          multiple
          size="wizard"
        />

        <div
          v-if="selectedContacts.length"
          class="selected-contacts"
        >

          <div
            v-for="contact in selectedContacts"
            :key="contact._id"
            class="selected-contact"
          >

            <div class="selected-contact__info">

              <strong>{{ contact.nombre }}</strong>

              <span>
                {{ contact.tipo }} · {{ contact.telefono }}
              </span>

            </div>

            <q-btn
              flat
              round
              dense
              icon="close"
              @click="removeContact(contact._id)"
            />

          </div>

        </div>

        <div class="other-contact-header">

          <q-checkbox
            v-model="showOtherContact"
            label="Agregar otro contacto"
            @update:model-value="handleOtherContactChange"
          />
        </div>

        <div
          v-if="showOtherContact"
          class="other-contact-form"
        >

          <BaseInput
            v-model="plan.contactosEmergencia.otro.nombreEntidad"
            label="Nombre de la entidad"
            placeholder="Nombre de la entidad"
            required
            size="wizard"
            :rules="[requiredRule]"
          />

          <BaseInput
            v-model="plan.contactosEmergencia.otro.telefono"
            label="Teléfono"
            placeholder="Número de contacto"
            required
            size="wizard"
            :rules="[requiredRule]"
          />

          <BaseInput
            v-model="plan.contactosEmergencia.otro.ciudad"
            label="Ciudad"
            placeholder="Ciudad"
            required
            size="wizard"
            :rules="[requiredRule]"
          />

          <BaseTextarea
            v-model="plan.contactosEmergencia.otro.descripcion"
            label="Descripción"
            placeholder="Información adicional del contacto..."
            maxlength="300"
            required
            size="wizard"
            :rules="[requiredRule]"
          />

        </div>

      </section>

    </div>

  </section>

</template>

<script setup>

import { computed, ref } from 'vue'

import BaseInput from 'src/components/forms/BaseInput.vue'
import BaseSelect from 'src/components/forms/BaseSelect.vue'
import BaseTextarea from 'src/components/forms/BaseTextarea.vue'

import { EPP_MOCK } from 'src/mocks/modules/epp.mock'
import { CONTACTOS_MOCK } from 'src/mocks/modules/contactos.mock'
import { SECURITY_VIAL_ITEMS } from 'src/constants/system/security.constants'

const props = defineProps({
  modelValue: {
    type: Object,
    required: true,
  },
})

const emit = defineEmits([
  'update:modelValue',
])

const plan = props.modelValue

const showOtherContact = ref(
  hasOtherContactData(),
)

const eppOptions = computed(() => {
  return EPP_MOCK.filter(
    (item) => item.estado === 'Activo',
  )
})

function isEppSelected(id) {
  return plan.epp.includes(id)
}

function handleEppSelection(id, selected) {
  if (selected) {
    if (!plan.epp.includes(id)) {
      plan.epp.push(id)
    }
  } else {
    const index = plan.epp.indexOf(id)

    if (index !== -1) {
      plan.epp.splice(index, 1)
    }
  }

  emit('update:modelValue', plan)
}

const securityVialItems = SECURITY_VIAL_ITEMS

function isSecurityItemSelected(id) {
  return plan.seguridadVial.items.includes(id)
}

function handleSecurityItemSelection(id, selected) {
  if (selected) {
    if (!plan.seguridadVial.items.includes(id)) {
      plan.seguridadVial.items.push(id)
    }
  } else {
    const index = plan.seguridadVial.items.indexOf(id)

    if (index !== -1) {
      plan.seguridadVial.items.splice(index, 1)
    }
  }

  emit('update:modelValue', plan)
}

function handleRoadSafetyChange(value) {
  if (!value) {
    plan.seguridadVial.items = []
  }

  emit('update:modelValue', plan)
}

const contactOptions = computed(() => {
  return CONTACTOS_MOCK
    .filter((contacto) => contacto.estado === 'Activo')
    .map((contacto) => ({
      label: `${contacto.tipo} - ${contacto.nombre}`,
      value: contacto._id,
    }))
})

const selectedContacts = computed(() => {
  return CONTACTOS_MOCK.filter((contacto) =>
    plan.contactosEmergencia.contactosBase.includes(
      contacto._id,
    ),
  )
})

function removeContact(id) {
  const index =
    plan.contactosEmergencia.contactosBase.indexOf(id)

  if (index !== -1) {
    plan.contactosEmergencia.contactosBase.splice(index, 1)
  }

  emit('update:modelValue', plan)
}

function hasOtherContactData() {
  const otro = plan.contactosEmergencia?.otro

  if (!otro) {
    return false
  }

  return Boolean(
    otro.nombreEntidad ||
      otro.telefono ||
      otro.descripcion ||
      otro.ciudad,
  )
}

function handleOtherContactChange(value) {
  if (!value) {
    plan.contactosEmergencia.otro = {
      nombreEntidad: '',
      telefono: '',
      descripcion: '',
      ciudad: '',
    }
  }

  emit('update:modelValue', plan)
}

function requiredRule(value) {
  return (
    Boolean(String(value ?? '').trim()) ||
    'Este campo es obligatorio'
  )
}

function validate() {
  if (!showOtherContact.value) {
    return true
  }

  const otro = plan.contactosEmergencia.otro

  return Boolean(
    otro.nombreEntidad?.trim() &&
      otro.telefono?.trim() &&
      otro.ciudad?.trim() &&
      otro.descripcion?.trim(),
  )
}

defineExpose({
  validate,
})
</script>

<style scoped lang="scss">

.plan-seguridad {
  width: 100%;
}

.section-header {
  margin-bottom: 18px;

  h2 {
    margin: 0;
    font-size: 18px;
    font-weight: 700;
  }
}

.security-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 24px;
}

.security-section {
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 16px;
  border: 1px solid #d8d8d8;
  border-radius: 6px;
  background: #fff;
}

.security-section--contacts {
  grid-column: 1 / -1;
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
  background: $primary;
  color: white;
  font-size: 11px;
  font-weight: 700;
}

.section-description {
  margin: 0;
  font-size: 11px;
  line-height: 1.4;
  color: #666;
}

.epp-list {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 4px 16px;
}

.epp-item {
  display: flex;
  align-items: center;
  min-height: 42px;
}

.epp-item__content {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.epp-item__name {
  font-size: 11px;
  font-weight: 600;
}

.epp-item__category {
  font-size: 9px;
  color: #777;
}

.selection-counter {
  font-size: 10px;
  color: #555;
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

.radio-group {
  display: flex;
  align-items: center;
  gap: 16px;
}

.security-vial-list {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 2px 16px;
  padding-top: 4px;
}

.security-vial-item {
  min-height: 34px;
  display: flex;
  align-items: center;
}

.other-contact-header {
  margin-top: 4px;
}

.selected-contacts {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.selected-contact {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.selected-contact__info {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.selected-contact__info strong {
  font-size: 11px;
}

.selected-contact__info span {
  font-size: 10px;
  color: #666;
}

.other-contact-form {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 14px 18px;

  padding-top: 6px;
}

@media (max-width: 850px) {
  .security-grid {
    grid-template-columns: 1fr;
  }

  .security-section--contacts {
    grid-column: auto;
  }

  .epp-list,
  .security-vial-list,
  .other-contact-form {
    grid-template-columns: 1fr;
  }
}
</style>