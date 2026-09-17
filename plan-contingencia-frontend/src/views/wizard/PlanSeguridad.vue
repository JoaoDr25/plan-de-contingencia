<template>

    <section class="plan-security">

        <div class="plan-security__grid">

            <section class="security-section">

                <div class="section-title">

                    <span>
                        elementos de protección personal
                    </span>

                </div>

                <div class="epp-list">

                    <div
                        v-for="epp in eppOptions"
                        :key="epp._id"
                        class="epp-item"
                    >

                        <q-checkbox
                            :model-value="isEppSelected(epp._id)"
                            size="sm"
                            dense
                            @update:model-value="
                                value => handleEppSelection(epp._id, value)
                            "
                        />

                        <span class="epp-item__name">
                            {{ epp.nombre.toUpperCase() }}
                        </span>

                    </div>

                </div>

                <div class="security-notice">

                    <q-icon
                        name="info_outline"
                        size="24px"
                    />

                    <span>
                        Asegúrese de que los aprendices lleven los EPP
                        seleccionados y se encuentren en buen estado.
                    </span>

                </div>

            </section>

            <section class="security-section">

                <div class="section-title">

                    <span>
                        contactos de emergencia
                    </span>

                </div>

                <div class="emergency-contacts-card">

                    <div class="emergency-contacts-scroll">

                        <div class="emergency-contacts-content">

                            <BaseSelect
                                v-model="plan.contactosEmergencia.contactosBase"
                                label="Seleccionar contactos de emergencia"
                                placeholder="Seleccionar contactos de emergencia"
                                :options="contactOptions"
                                option-label="label"
                                option-value="value"
                                :selected-text="'Seleccionar Contactos de Emergencia'"
                                multiple
                                size="wizard"
                                external-label
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

                                        <strong>
                                            {{ contact.nombre }}
                                        </strong>

                                        <span>
                                            {{ contact.tipo }} · {{ contact.telefono }}
                                        </span>

                                    </div>

                                    <q-btn
                                        class="contact-remove-button"
                                        flat
                                        dense
                                        icon="close"
                                        aria-label="Eliminar contacto"
                                        title="Eliminar contacto"
                                        @click="onDeleteContact(contact._id)"
                                    />

                                </div>

                            </div>

                        </div>

                    </div>

                </div>

                <div class="other-contact">

                    <PrimaryActionButton
                        label="Agregar Contacto"
                        icon="add_circle_outline"
                        size="sm"
                        @click="openAddContactDialog"
                    />

                </div>

                <ContactosDialog
                    v-model="showAddContactDialog"
                    mode="create"
                    :show-status="false"
                    :show-type="false"
                    :single-column="true"
                    :width="400"
                    custom-title="AGREGAR CONTACTO DE EMERGENCIA"
                    @save="handleAdditionalContactSave"
                />

            </section>

            <section class="security-section security-section--vial">

                <div class="section-title">

                    <span>
                        seguridad vial
                    </span>

                </div>

                <BaseDataCard
                    class="security-vial-card"
                    title="Verificación de seguridad vial"
                    :columns="securityVialColumns"
                    :rows="plan.seguridadVial.items"
                    row-key="itemId"
                    column-template="1.3fr 1.25fr 2fr 2fr"
                    :max-body-height="'none'"
                    empty-text="No existen elementos de seguridad vial para verificar."
                >

                    <template #body="{ rows, gridStyle }">

                        <div
                            v-for="row in rows"
                            :key="row.itemId"
                            class="security-vial-row"
                            :style="gridStyle"
                        >

                            <div class="security-vial-item">
                                {{ row.nombre.toUpperCase() }}
                            </div>


                            <div class="security-vial-status">

                                <q-radio
                                    :model-value="row.cumple"
                                    :val="true"
                                    label="Cumple"
                                    dense
                                    @update:model-value="
                                        value => handleSecurityStatusChange(
                                            row.itemId,
                                            value
                                        )
                                    "
                                />

                                <q-radio
                                    :model-value="row.cumple"
                                    :val="false"
                                    label="No cumple"
                                    dense
                                    @update:model-value="
                                        value => handleSecurityStatusChange(
                                            row.itemId,
                                            value
                                        )
                                    "
                                />

                            </div>

                            <div class="security-vial-field">

                                <BaseInput
                                    v-model="row.observacion"
                                    label="Observación"
                                    placeholder="Especifique..."
                                    size="wizard"
                                    external-label
                                    @update:model-value="emitPlanUpdate"
                                />

                            </div>

                            <div class="security-vial-field">

                                <BaseInput
                                    v-model="row.soporte"
                                    label="Soporte"
                                    placeholder="https://ejemplo.com/documento.pdf"
                                    icon="link"
                                    icon-position="prepend"
                                    size="wizard"
                                    external-label
                                    @update:model-value="emitPlanUpdate"
                                />

                            </div>

                        </div>

                    </template>

                </BaseDataCard>

            </section>

        </div>

    </section>

</template>


<script setup>

import { computed, ref } from 'vue'

import BaseInput from 'src/components/forms/BaseInput.vue'
import BaseSelect from 'src/components/forms/BaseSelect.vue'
import BaseDataCard from 'src/components/base/BaseDataCard.vue'
import PrimaryActionButton from 'src/components/actions/PrimaryActionButton.vue'

import ContactosDialog from 'src/views/dialogs/ContactosDialog.vue'

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

if (!Array.isArray(plan.epp)) {
    plan.epp = []
}

if (!plan.contactosEmergencia) {
    plan.contactosEmergencia = {
        contactosBase: [],
        otro: {
            nombreEntidad: '',
            telefono: '',
            ciudad: '',
            descripcion: '',
        },
    }
}

if (!Array.isArray(plan.contactosEmergencia.contactosBase)) {
    plan.contactosEmergencia.contactosBase = []
}

function initializeSecurityVialItems() {

    if (!plan.seguridadVial) {
        plan.seguridadVial = {
            items: [],
        }
    }

    if (!Array.isArray(plan.seguridadVial.items)) {
        plan.seguridadVial.items = []
    }

    const existingItems = plan.seguridadVial.items

    const initializedItems = SECURITY_VIAL_ITEMS.map(item => {

        const existingItem = existingItems.find(
            securityItem => securityItem.itemId === item.id
        )

        if (existingItem) {
            return {
                itemId: item.id,
                nombre: item.label,
                cumple: existingItem.cumple ?? null,
                observacion: existingItem.observacion ?? '',
                soporte: existingItem.soporte ?? '',
            }
        }

        return {
            itemId: item.id,
            nombre: item.label,
            cumple: null,
            observacion: '',
            soporte: '',
        }
    })

    plan.seguridadVial.items = initializedItems
}

initializeSecurityVialItems()

const securityVialColumns = [
    {
        key: 'nombre',
        label: 'ÍTEM DE VERIFICACIÓN',
    },
    {
        key: 'cumple',
        label: 'ESTADO',
    },
    {
        key: 'observacion',
        label: 'OBSERVACIÓN',
    },
    {
        key: 'soporte',
        label: 'SOPORTE (URL)',
    },
]

function handleSecurityStatusChange(itemId, value) {

    const item = plan.seguridadVial.items.find(
        securityItem => securityItem.itemId === itemId
    )

    if (!item) {
        return
    }

    item.cumple = value

    emitPlanUpdate()
}

function emitPlanUpdate() {
    emit('update:modelValue', plan)
}

const eppOptions = computed(() => {
    return EPP_MOCK.filter(
        item => item.estado === 'Activo'
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
    emitPlanUpdate()
}

const showAddContactDialog = ref(false)

function openAddContactDialog() {
    showAddContactDialog.value = true
}

function handleAdditionalContactSave(formData) {
    const nombreEntidad = formData.nombre ?? formData.nombreEntidad ?? ''
    const descripcion = formData.direccion ?? formData.descripcion ?? ''

    plan.contactosEmergencia.otro = {
        nombreEntidad: nombreEntidad.trim(),
        telefono: formData.telefono ?? '',
        ciudad: formData.ciudad ?? '',
        descripcion: descripcion.trim(),
    }

    showAddContactDialog.value = false
    emitPlanUpdate()
}

const contactOptions = computed(() => {

    return CONTACTOS_MOCK
        .filter(
            contacto => contacto.estado === 'Activo'
        )
        .map(contacto => ({
            label: `${contacto.tipo} - ${contacto.nombre}`,
            value: contacto._id,
        }))
})

const selectedContacts = computed(() => {
    const baseContacts = CONTACTOS_MOCK.filter(contacto =>
        plan.contactosEmergencia.contactosBase.includes(
            contacto._id
        )
    )

    const otro = plan.contactosEmergencia?.otro

    if (!otro?.nombreEntidad) {
        return baseContacts
    }

    return [
        ...baseContacts,
        {
            _id: 'plan-contacto-adicional',
            nombre: otro.nombreEntidad,
            tipo: 'Otro',
            telefono: otro.telefono,
            descripcion: otro.descripcion,
            ciudad: otro.ciudad,
        },
    ]
})

function removeContact(id) {

    if (id === 'plan-contacto-adicional') {
        plan.contactosEmergencia.otro = {
            nombreEntidad: '',
            telefono: '',
            descripcion: '',
            ciudad: '',
        }
        emitPlanUpdate()
        return
    }

    const index =
        plan.contactosEmergencia.contactosBase.indexOf(id)

    if (index !== -1) {
        plan.contactosEmergencia.contactosBase.splice(index, 1)
    }
    emitPlanUpdate()
}

function onDeleteContact(id) {
    removeContact(id)
}

function validate() {

    const securityStatusValid =
        plan.seguridadVial.items.every(
            item => item.cumple !== null
        )

    if (!securityStatusValid) {
        return false
    }

    const otro = plan.contactosEmergencia?.otro

    if (otro && (
        otro.nombreEntidad?.trim() ||
        otro.telefono?.trim() ||
        otro.ciudad?.trim() ||
        otro.descripcion?.trim()
    )) {
        return Boolean(
            otro.nombreEntidad?.trim() &&
            otro.telefono?.trim() &&
            otro.ciudad?.trim() &&
            otro.descripcion?.trim()
        )
    }

    return true
}

defineExpose({
    validate,
})

</script>

<style scoped lang="scss">

@use 'src/css/variables.scss' as *;
@use 'src/css/typography.scss' as *;

.plan-security {
    width: 100%;
}

.plan-security__grid {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 22px 20px;
    row-gap: 45px;
}

.security-section {
    min-width: 0;
    max-height: 420px;
    overflow: hidden;
}

.security-section--vial {
    grid-column: 1 / -1;
}

.section-title {
    display: flex;
    align-items: center;
    gap: 10px;
    margin: 0 0 22px;
    color: $color-text-primary;
    font-size: $font-size-2xl;
    font-weight:700;
    line-height: 1.2;
    text-transform: capitalize;
}

.epp-list {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 10px 16px;
    max-height: 260px;
    overflow-y: auto;
    scrollbar-gutter: stable;
    scrollbar-width: auto;
    padding-right: 6px;
    padding-bottom: 10px;
}

.epp-list::-webkit-scrollbar {
    width: 10px;
}

.epp-list::-webkit-scrollbar-track {
    border-radius: 5px;
    background-color: $color-background-field;
}

.epp-list::-webkit-scrollbar-thumb {
    border: 2px solid $color-background-field;
    border-radius: 5px;
    background-color: #5f6368;
}

.epp-list::-webkit-scrollbar-thumb:hover {
    background-color: #3f4448;
}

.epp-item {
    display: flex;
    align-items: center;
    gap: 10px;
    min-height: 42px;
    padding: 2px 12px;
    border: 1px solid $color-border-table;
    border-radius: 6px;
    background-color: $color-surface;
    box-sizing: border-box;
}

.epp-item :deep(.q-checkbox) {
    --q-size: 16px;
}

.epp-item :deep(.q-checkbox__inner) {
    font-size: 16px;
}

.epp-item :deep(.q-checkbox__svg) {
    width: 10px;
    height: 10px;
}

.epp-item__name {
    color: $color-text-primary;
    font-size: $font-size-xs;
    font-weight: 400;
    line-height: 1.2;
}

.security-notice {
    display: flex;
    align-items: center;
    gap: 8px;
    width: 100%;
    min-height: 52px;
    margin-top: 7px;
    padding: 10px 14px;
    border-radius: 6px;
    background-color: $color-background-field;
    color: $color-text-secondary;
    font-size: $font-size-sm;
    line-height: 1.4;
    box-sizing: border-box;
}

.security-notice .q-icon {
    flex-shrink: 0;
    color: $color-primary;
}

.emergency-contacts-card {
    padding: 14px 12px 10px;
    border: 1px solid $color-border-table;
    border-radius: 6px;
    background-color: $color-surface;
    box-sizing: border-box;
}

.emergency-contacts-scroll {
    width: 100%;
    min-width: 0;
    overflow-x: auto;
}

.emergency-contacts-content {
    width: 100%;
    min-width: 0;
}

.selected-contacts {
    display: flex;
    flex-direction: column;
    gap: 5px;
    margin-top: 5px;
    max-height: 196px;
    overflow-y: auto;
    padding-right: 6px;
}

.selected-contact {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 6px;
    min-height: 64px;
    padding: 4px 8px 4px 8px;
    border-bottom: 1px solid $color-border-table;
    line-height: 1.3;
}

.contact-remove-button {
    margin-right: 0;
    padding-right: 10px;
    color: $color-text-secondary;
}

.contact-remove-button :deep(.q-icon) {
    font-size: 20px;
}

.selected-contact__info {
    display: flex;
    flex-direction: column;
    gap: 2px;
    min-width: 0;
}

.selected-contact__info strong {
    color: $color-text-primary;
    font-size: $font-size-sm;
    font-weight: 400;
    text-transform: uppercase;
}

.selected-contact__info span {
    color: $color-text-secondary;
    font-size: $font-size-xs;
    font-weight: 400;
}

.other-contact {
    margin-top: 13px;
}

.other-contact-form {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 12px 16px;
    margin-top: 5px;
}

@media (max-width: 900px) {

    .emergency-contacts-scroll {
        scrollbar-width: thin;
    }

    .emergency-contacts-content {
        min-width: 620px;
    }
}

.security-vial-card :deep(.base-data-card__header) {
    display: none;
}

.security-vial-row {
    display: grid;
    align-items: center;
    min-height: 50px;
    border-bottom: 1px solid $color-border-table;
}

.security-vial-row:last-child {
    border-bottom: none;
}

.security-vial-item {
    min-width: 0;
    padding: 6px 8px;
    color: $color-text-primary;
    font-size: $font-size-xs;
    font-weight: 500;
}

.security-vial-status {
    display: flex;
    align-items: center;
    gap: 16px;
    min-width: 0;
    padding: 4px 8px;
    font-weight: 400;
}

.security-vial-status :deep(.q-radio) {
    margin-right: 2px;
    min-width: 0;
}

.security-vial-status :deep(.q-radio__inner) {
    font-size: 16px;
    width: 0.9em;
    min-width: 0.9em;
    height: 0.9em;
}

.security-vial-status :deep(.q-radio__bg) {
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
}

.security-vial-status :deep(.q-radio__label) {
    font-size: $font-size-xs;
    white-space: nowrap;
}

.security-vial-field {
    min-width: 0;
    padding: 0 8px;
}

@media (max-width: 1200px) {

    .plan-security__grid {
        grid-template-columns: 1fr;
    }

    .security-section--vial {
        grid-column: auto;
    }

    .epp-list {
        grid-template-columns: repeat(2, minmax(0, 1fr));
    }
}

@media (max-width: 800px) {

    .security-vial-status {
        display: flex;
        gap: 20px;
        align-items: center;
        min-width: 0;
    }

    .security-vial-status :deep(.q-radio) {
        min-width: 0;
    }

    .security-vial-item,
    .security-vial-status,
    .security-vial-field {
        padding-left: 0;
        padding-right: 0;
    }
}

@media (max-width: 900px) {

    .security-section {
        max-height: none;
        overflow: visible;
    }

    .epp-list,
    .other-contact-form {
        grid-template-columns: 1fr;
    }

    .security-vial-row {
        min-width: 620px;
        grid-template-columns: 1.3fr 1.25fr 2fr 2fr;
        gap: 0;
        padding: 0;
    }

    .security-vial-status {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        gap: 8px;
    }

    .security-vial-item,
    .security-vial-status,
    .security-vial-field {
        padding-left: 0;
        padding-right: 0;
    }
}

</style>