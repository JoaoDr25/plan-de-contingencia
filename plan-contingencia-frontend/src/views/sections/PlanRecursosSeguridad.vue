<template>

    <section class="plan-section">

        <div class="security-grid">

            <div class="security-column">
                <h3>ELEMENTOS DE PROTECCIÓN PERSONAL (EPP)</h3>

                <div class="security-subtitle">
                    EPP SELECCIONADO
                </div>

                <div class="security-column__content">
                    <ul class="security-list">
                        <li v-for="item in eppSeleccionado" :key="item._id">
                            {{ item.nombre }}
                        </li>
                    </ul>
                </div>
            </div>

            <div class="security-column">
                <h3>SEGURIDAD VIAL (TRANSPORTE SENA)</h3>

                <div class="security-subtitle">
                    ELEMENTOS DE SEGURIDAD VIAL
                </div>

                <div class="security-column__content">
                    <ul class="security-list security-list-links">
                        <li v-for="item in seguridadVialItems" :key="item.itemId">
                            <a v-if="item.soporte" :href="item.soporte" target="_blank" rel="noopener noreferrer"
                                class="support-link" title="Abrir soporte">
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

                                <p>
                                    Tel: {{ contacto.telefono }}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="security-observations">
            <h3>OBSERVACIONES</h3>

            <p>
                {{ plan.observaciones || 'Sin observaciones registradas.' }}
            </p>
        </div>
    </section>
</template>


<script setup>
import { computed } from 'vue'

const props = defineProps({
    plan: {
        type: Object,
        required: true
    }
})

const eppCatalogo = [
    {
        _id: '671800000000000000000001',
        nombre: 'Casco de seguridad'
    },
    {
        _id: '671800000000000000000002',
        nombre: 'Guantes'
    },
    {
        _id: '671800000000000000000003',
        nombre: 'Botas de seguridad'
    },
    {
        _id: '671800000000000000000004',
        nombre: 'Chaleco reflectivo'
    },
    {
        _id: '671800000000000000000005',
        nombre: 'Respirador'
    }
]

const eppSeleccionado = computed(() => {
    return eppCatalogo.filter(item =>
        props.plan.epp?.includes(item._id)
    )
})


const seguridadVialItems = computed(() => {
    if (!props.plan.seguridadVial?.aplica) {
        return []
    }

    return props.plan.seguridadVial.items || []
})

const contactosCatalogo = [
    {
        _id: '670700000000000000000001',
        nombre: 'Centro de salud',
        entidad: 'Hospital Regional',
        telefono: '607 123 4567',
        icono: 'local_hospital'
    },
    {
        _id: '670700000000000000000002',
        nombre: 'Policía Nacional',
        entidad: 'Estación Socorro',
        telefono: '123',
        icono: 'local_police'
    },
    {
        _id: '670700000000000000000003',
        nombre: 'Póliza',
        entidad: 'Seguros del Estado',
        telefono: '018000 123456',
        icono: 'health_and_safety'
    }
]

const contactosEmergencia = computed(() => {
    const ids = props.plan.contactosEmergencia?.contactosBase || []
    const contactos = ids
        .map(id => contactosCatalogo.find(contacto => contacto._id === id))
        .filter(Boolean)

    const otro = props.plan.contactosEmergencia?.otro

    if (otro?.nombreEntidad) {
        contactos.push({
            _id: 'contacto-adicional',
            nombre: 'Otro',
            entidad: otro.nombreEntidad,
            telefono: otro.telefono,
            icono: 'contact_phone'
        })
    }

    return contactos
})
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
    max-height: 180px;
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
    font-size: $font-size-md;
    line-height: 1.4;
    overflow-wrap: break-word;
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
    display: flex;
    flex-wrap: wrap;
    gap: 15px;
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
    gap: 2px;
    min-width: 0;
    font-size: $font-size-md;
    line-height: 1.45;
}

.contact-info strong,
.contact-info span {
    overflow-wrap: break-word;
}

.contact-info p {
font-size: $font-size-sm;
}

.contact-info strong {
    color: $color-primary;
    font-weight: 700;
    text-transform: uppercase;
    font-size: $font-size-xs;
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
    font-size: $font-size-md;
    line-height: 1.5;
    overflow-wrap: break-word;
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
        margin-bottom: 15px;
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