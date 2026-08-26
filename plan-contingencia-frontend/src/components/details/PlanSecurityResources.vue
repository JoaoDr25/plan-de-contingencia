<template>
    <section class="plan-section">

        <div class="security-grid">

            <div class="security-column">
                <h3>ELEMENTOS DE PROTECCIÓN PERSONAL (EPP)</h3>

                <div class="security-subtitle">
                    EPP SELECCIONADO
                </div>

                <ul class="security-list">
                    <li
                        v-for="item in eppSeleccionado"
                        :key="item._id"
                    >
                        {{ item.nombre }}
                    </li>
                </ul>
            </div>

            <div class="security-column">
                <h3>SEGURIDAD VIAL (TRANSPORTE SENA)</h3>

                <div class="security-subtitle">
                    ELEMENTOS DE SEGURIDAD VIAL
                </div>

                <ul class="security-list security-list-links">
                    <li
                        v-for="item in seguridadVialItems"
                        :key="item.itemId"
                    >
                        <span>{{ item.nombre }}</span>

                        <a
                            v-if="item.soporte"
                            :href="item.soporte"
                            target="_blank"
                            rel="noopener noreferrer"
                            class="support-link"
                            title="Abrir soporte"
                        >
                            <q-icon name="open_in_new" />
                        </a>
                    </li>
                </ul>
            </div>

            <div class="security-column">
                <h3>CONTACTOS DE EMERGENCIA</h3>

                <div
                    v-for="contacto in contactosEmergencia"
                    :key="contacto._id"
                    class="emergency-contact"
                >
                    <div class="contact-icon">
                        <q-icon :name="contacto.icono" />
                    </div>

                    <div class="contact-info">
                        <strong>{{ contacto.nombre }}</strong>

                        <span v-if="contacto.entidad">
                            {{ contacto.entidad }}
                        </span>

                        <span>
                            Tel: {{ contacto.telefono }}
                        </span>
                    </div>
                </div>

                <div
                    v-if="contactoAdicional"
                    class="additional-contact"
                >
                    <h3>CONTACTO ADICIONAL (OTRO)</h3>

                    <div class="additional-contact-info">
                        <strong>
                            {{ contactoAdicional.nombreEntidad }}
                        </strong>

                        <span>
                            Tel: {{ contactoAdicional.telefono }}
                        </span>
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

    return ids
        .map(id => contactosCatalogo.find(contacto => contacto._id === id))
        .filter(Boolean)
})

const contactoAdicional = computed(() => {
    const otro = props.plan.contactosEmergencia?.otro

    if (!otro?.nombreEntidad) {
        return null
    }

    return otro
})
</script>

<style scoped lang="scss">

.plan-section {
    width: 100%;
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
    background-color: #eaf5eb;
    color: #2e7d32;
    font-size: 22px;
}

.section-header h2 {
    margin: 0;
    color: #18732b;
    font-size: 20px;
    font-weight: 700;
}

.security-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 0;
}

.security-column {
    padding: 0 28px;
    min-height: 220px;
}

.security-column:first-child {
    padding-left: 0;
}

.security-column:last-child {
    padding-right: 0;
}

.security-column + .security-column {
    border-left: 1px solid #cfcfcf;
}


.security-column h3,
.security-observations h3 {
    margin: 0 0 20px;

    color: #18732b;
    font-size: 15px;
    font-weight: 700;
    line-height: 1.3;
}

.security-subtitle {
    margin-bottom: 18px;
    color: #18732b;
    font-size: 14px;
    font-weight: 700;
}

.security-list {
    margin: 0;
    padding-left: 20px;
}

.security-list li {
    margin-bottom: 10px;

    color: #333;
    font-size: 14px;
    line-height: 1.4;
}

.security-list-links {
    padding-left: 0;
    list-style: none;
}

.security-list-links li {
    display: flex;
    align-items: center;
    gap: 8px;
}

.support-link {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    color: #2e7d32;
    text-decoration: none;
    font-size: 17px;
}

.support-link:hover {
    color: #1b5e20;
}

.emergency-contact {
    display: flex;
    align-items: flex-start;
    gap: 12px;
    margin-bottom: 18px;
}

.contact-icon {
    width: 32px;
    height: 32px;
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 8px;
    background-color: #eaf5eb;
    color: #2e7d32;
}

.contact-info {
    display: flex;
    flex-direction: column;
    gap: 2px;
    font-size: 13px;
    line-height: 1.35;
}

.contact-info strong {
    color: #2e6f38;
    font-weight: 700;
}

.contact-info span {
    color: #333;
}

.additional-contact {
    margin-top: 28px;
}

.additional-contact-info {
    display: flex;
    flex-direction: column;
    gap: 4px;
    color: #333;
    font-size: 13px;
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
    color: #333;
    font-size: 14px;
    line-height: 1.5;
}

</style>