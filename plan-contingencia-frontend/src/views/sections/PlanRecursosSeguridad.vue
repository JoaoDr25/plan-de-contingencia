<template>
  <section class="plan-section">
    <div class="security-grid">
      <div class="security-column">
        <h3>ELEMENTOS DE PROTECCIÓN PERSONAL (EPP)</h3>

        <div class="security-subtitle">EPP SELECCIONADO</div>

        <div class="security-column__content">
          <ul class="security-list">
            <li v-for="item in eppSeleccionado" :key="item._id">
              {{ item.nombre }}
            </li>
          </ul>
        </div>
      </div>

      <div class="security-column">
        <h3>SEGURIDAD VIAL</h3>

        <div class="security-subtitle">ELEMENTOS DE SEGURIDAD VIAL</div>

        <div class="security-column__content">
          <ul class="security-list security-list-links">
            <li v-for="item in seguridadVialItems" :key="item.itemId">
              <a v-if="item.soporte" :href="item.soporte" target="_blank" rel="noopener noreferrer" class="support-link"
                title="Abrir soporte">
                <q-icon name="open_in_new" />
              </a>

              <span>{{ item.nombre }}</span>
            </li>
          </ul>
        </div>
      </div>

      <div class="security-column">
        <h3>CONTACTOS DE EMERGENCIA</h3>

        <div class="security-column__content">
          <div class="emergency-contact-list">
            <div v-for="contacto in contactosEmergencia" :key="contacto._id" class="emergency-contact">
              <div class="contact-info">
                <strong>{{ contacto.nombre }}</strong>

                <span v-if="contacto.entidad">
                  {{ contacto.entidad }}
                </span>

                <p>Tel: {{ contacto.telefono }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="security-observations">
      <h3>OBSERVACIONES</h3>

      <div v-if="observaciones.length" class="observation-list">
        <div v-for="(observacion, index) in observaciones" :key="observacion._id || index">
          <p class="observation-list__text">
            <span class="observation-list__metadata">
              {{ observacion.rol || 'ROL NO REGISTRADO' }} -
              {{ formatObservationDate(observacion.fecha) }}:
            </span>
            <span class="observation-list__content">{{ observacion.texto }}</span>
          </p>
        </div>
      </div>
      <p v-else>Sin observaciones registradas.</p>
    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue'
import { normalizeAdditionalContacts } from 'src/utils/contacts.utils'

const props = defineProps({
  plan: {
    type: Object,
    required: true,
  },
})

const toObjects = (items) =>
  (Array.isArray(items) ? items : []).filter((item) => item && typeof item === 'object')

const eppSeleccionado = computed(() => toObjects(props.plan.epp))

const seguridadVialItems = computed(() => {
  if (!props.plan.seguridadVial?.aplica) {
    return []
  }

  return (props.plan.seguridadVial.items || []).filter((item) => item?.cumple === true)
})

const contactosEmergencia = computed(() => {
  const contactos = toObjects(props.plan.contactosEmergencia?.contactosBase).map((contacto) => ({
    _id: contacto._id,
    nombre: contacto.nombre,
    entidad: contacto.tipo,
    telefono: contacto.telefono,
  }))

  normalizeAdditionalContacts(props.plan.contactosEmergencia?.otro).forEach((otro, index) => {
    contactos.push({
      _id: `contacto-adicional-${index}`,
      nombre: 'Otro',
      entidad: otro.nombreEntidad,
      telefono: otro.telefono,
      icono: 'contact_phone',
    })
  })

  return contactos
})

const observaciones = computed(() => {
  const history = toObjects(props.plan.historialObservaciones)

  if (history.length) {
    return history
  }

  const legacyObservation = String(props.plan.observaciones ?? '').trim()

  return legacyObservation
    ? [{
      texto: legacyObservation,
      rol: 'ROL NO REGISTRADO',
      fecha: null,
    }]
    : []
})

function formatObservationDate(value) {
  if (!value) {
    return 'Fecha no registrada'
  }

  const date = new Date(value)

  if (Number.isNaN(date.getTime())) {
    return 'Fecha no registrada'
  }

  return new Intl.DateTimeFormat('es-CO', {
    dateStyle: 'short',
    timeStyle: 'short',
    timeZone: 'America/Bogota',
  }).format(date)
}
</script>

<style scoped lang="scss">
@use 'src/css/variables.scss' as *;
@use 'src/css/typography.scss' as *;

.plan-section {
  width: 100%;
  padding-bottom: 8px;
}

.section-header {
  display: flex;
  align-items: center;
  gap: 14px;
  margin-bottom: 20px;
}

.section-icon {
  width: 38px;
  height: 38px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: $color-surface;
  color: $color-primary;
}

.section-header h2 {
  margin: 0;
  color: $color-primary;
  font-weight: 700;
}

.security-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 0;
}

.security-column {
  min-width: 0;
  padding: 0 28px;
  min-height: 220px;
  display: flex;
  flex-direction: column;
}

.security-column__content {
  max-height: 152px;
  overflow-y: auto;
  overflow-x: hidden;
  padding-right: 6px;
}

.security-column:first-child {
  padding-left: 0;
}

.security-column:last-child {
  padding-right: 0;
}

.security-column+.security-column {
  border-left: 1px solid #cfcfcf;
}

.security-column h3,
.security-observations h3 {
  margin: 0 0 20px;
  color: $color-primary;
  font-size: $font-size-md;
  font-weight: 700;
  line-height: 1.3;
}

.security-subtitle {
  margin-bottom: 18px;
  color: $color-primary;
  font-size: $font-size-xs;
  font-weight: 700;
}

.security-list {
  margin: 0;
  padding-left: 20px;
}

.security-list li {
  margin-bottom: 10px;
  font-size: $font-size-xs;
  line-height: 1.4;
  overflow-wrap: break-word;
  text-transform: uppercase;
}

.security-list-links {
  padding-left: 0;
  list-style: none;
}

.security-list-links li {
  display: flex;
  align-items: center;
  gap: 8px;
  min-width: 0;
}

.security-list-links li span {
  min-width: 0;
  overflow-wrap: break-word;
}

.support-link {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  color: $color-primary;
  text-decoration: none;
}

.support-link:hover {
  color: $color-primary;
}

.emergency-contact-list {
  display: grid;
  gap: 30px;
  align-items: flex-start;
}

.emergency-contact {
  display: flex;
  align-items: flex-start;
  flex: 1 1 150px;
  max-width: 100%;
}

.contact-info {
  display: flex;
  flex-direction: column;
  gap: 4px;
  min-width: 0;
  font-size: $font-size-xs;
  line-height: 1.2;
  text-transform: uppercase;
}

.contact-info strong,
.contact-info span {
  overflow-wrap: break-word;
}

.contact-info p {
  font-size: $font-size-xs;
  line-height: 1.4;
}

.contact-info strong {
  color: $color-primary;
  font-weight: 700;
  text-transform: uppercase;
  font-size: $font-size-xs;
      line-height: 1.6;
}

.additional-contact {
  margin-top: 28px;
}

.additional-contact-info {
  display: flex;
  flex-direction: column;
  gap: 4px;
  font-size: $font-size-md;
}

.additional-contact-info strong {
  font-weight: 500;
}

.security-observations {
  margin-top: 24px;
  padding-top: 20px;
  border-top: 1px solid #cfcfcf;
}

.security-observations h3 {
  margin-bottom: 8px;
}

.security-observations p {
  margin: 0;
  font-size: $font-size-xs;
  line-height: 1.6;
  overflow-wrap: break-word;
  white-space: normal;
  text-transform: uppercase;
}

.observation-list {
  display: grid;
  gap: 12px;
  margin: 0;
  padding: 0;
}

.observation-list__text {
  margin: 0;
  font-size: $font-size-xs;
  overflow-wrap: break-word;
  white-space: normal;
  text-transform: uppercase;
}

.observation-list__content {
  text-transform: capitalize;
}

@media (max-width: 1210px) {
  .security-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 24px 0;
  }

  .security-column {
    padding: 0 20px;
    min-height: auto;
  }

  .security-column:first-child {
    padding-left: 0;
  }

  .security-column:nth-child(2) {
    padding-right: 0;
  }

  .security-column:nth-child(3) {
    grid-column: 1 / -1;
    padding-left: 0;
    padding-right: 0;
    padding-top: 20px;
    border-left: none;
    border-top: 1px solid #cfcfcf;
  }
}

@media (max-width: 600px) {
  .security-grid {
    display: flex;
    flex-direction: column;
    gap: 0;
  }

  .security-column {
    width: 100%;
    min-height: auto;
    padding: 18px 0;
    border-left: none !important;
    border-top: 1px solid #cfcfcf;
  }

  .security-column:first-child {
    padding-top: 0;
    border-top: none;
  }

  .security-column:last-child {
    padding-right: 0;
  }

  .security-column h3 {
    margin-bottom: 16px;
  }

  .security-subtitle {
    margin-bottom: 14px;
  }

  .security-list li {
    margin-bottom: 9px;
    font-size: 13px;
  }

  .emergency-contact {
    margin-bottom: 0;
  }

  .contact-info {
    font-size: $font-size-sm;
  }

  .additional-contact-info {
    font-size: $font-size-xs;
  }

  .security-observations {
    margin-top: 18px;
    padding-top: 18px;
  }

  .security-observations p {
    font-size: $font-size-xs;
  }
}

@media (max-width: 450px) {
  .security-column__content {
    max-height: none;
    overflow: visible;
    padding-right: 0;
  }

  .security-column {
    padding: 16px 0;
  }

  .security-column h3 {
    font-size: 13px;
  }

  .security-subtitle {
    font-size: 12px;
  }

  .security-list li,
  .security-observations p {
    font-size: 13px;
  }

  .contact-info {
    font-size: 13px;
  }

  .additional-contact {
    margin-top: 22px;
  }
}
</style>
