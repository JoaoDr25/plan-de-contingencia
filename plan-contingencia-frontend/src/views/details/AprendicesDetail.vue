<template>

    <BasePage class="apprentice-detail-page">

        <div class="apprentice-detail detail-grid">

            <section class="detail-card detail-card--apprentice">

                <div class="detail-card__header">

                    <div class="detail-card__title">
                        <q-icon name="person" />
                        <span>Datos del Aprendiz</span>
                    </div>

                    <div class="detail-card__status">
                        <StatusChip v-if="apprentice" :status="apprentice.estado" />
                    </div>

                </div>

                <div v-if="apprentice" class="detail-card__body detail-card__body--apprentice">

                    <div class="detail-card__logo">
                        <img :src="logoSena" alt="Logo SENA">
                    </div>

                    <div class="detail-card__fields detail-card__fields--apprentice">

                        <BaseDetailItem label="Nombre del Aprendiz" :value="fullName" />

                        <div class="detail-card__empty-slot" aria-hidden="true"></div>

                        <BaseDetailItem label="Tipo de Documento" :value="apprentice.tipo" />

                        <BaseDetailItem label="N.º Documento" :value="apprentice.documento" />

                        <BaseDetailItem label="Programa de Formación" :value="apprentice.programa" />

                        <BaseDetailItem label="Ficha" :value="apprentice.ficha" />

                    </div>

                </div>

                <div v-else class="detail-card__empty">
                    No se encontró información del aprendiz.
                </div>

            </section>

            <section class="detail-card detail-card--medical">

                <div class="detail-card__header">

                    <div class="detail-card__title">
                        <q-icon name="medical_information" />
                        <span>Información Médica y de Salud</span>
                    </div>

                </div>

                <div class="detail-card__fields detail-card__fields--medical">

                    <BaseDetailItem label="EPS" :value="apprentice?.eps || 'No registrada'" />

                    <BaseDetailItem label="Tipo de Sangre" :value="additionalInfo?.tipoSangre || 'No registrado'" />

                    <BaseDetailItem label="Condiciones Médicas"
                        :value="additionalInfo?.condicionesMedicas || 'No registradas'" />

                </div>

            </section>

            <section class="detail-card detail-card--emergency">

                <div class="detail-card__header">

                    <div class="detail-card__title">
                        <q-icon name="contact_phone" />
                        <span>Contacto de Emergencia</span>
                    </div>

                </div>

                <div class="detail-card__fields detail-card__fields--emergency">

                    <BaseDetailItem label="Nombre Completo del Contacto"
                        :value="emergencyContact.name || 'No registrado'" />

                    <BaseDetailItem label="Teléfono de Contacto" :value="emergencyContact.phone || 'No registrado'" />

                    <BaseDetailItem label="Dirección" :value="emergencyContact.address || 'No registrada'" />


                    <BaseDetailItem label="Parentesco" :value="emergencyContact.relationship || 'No registrado'" />

                </div>

            </section>

            <div class="apprentice-detail__actions">

                <PrimaryActionButton label="Completar Información" class="update_actions" icon="edit" size="sm"
                    @click="openInfoDialog" />

                <SecondaryActionButton label="Volver" icon="arrow_back" size="sm" @click="goBack" />

            </div>

        </div>

    </BasePage>

</template>

<script setup>

import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import { APRENDICES_MOCK } from 'src/mocks/aprendices.mock'

import BasePage from 'src/components/base/BasePage.vue'
import BaseDetailItem from 'src/components/forms/BaseDetailItem.vue'
import PrimaryActionButton from 'src/components/actions/PrimaryActionButton.vue'
import SecondaryActionButton from 'src/components/actions/SecondaryActionButton.vue'
import StatusChip from 'src/components/states/StatusChip.vue'

import logoSena from 'src/assets/logos/logo-sena.png'

const route = useRoute()
const router = useRouter()

const apprentice = computed(() => {
    return APRENDICES_MOCK.find(
        item => String(item.codigo) === String(route.params.codigo)
    ) ?? null
})

const fullName = computed(() => {

    if (!apprentice.value) {
        return 'No registrado'
    }
    return `${apprentice.value.nombre} ${apprentice.value.apellido}`
})

const additionalInfo = computed(() => {
    return null
})

const emergencyContact = computed(() => {

    if (!apprentice.value) {
        return {
            name: '',
            phone: '',
            relationship: '',
            address: ''
        }
    }

    const contact = apprentice.value.contacto ?? ''

    const separatorIndex = contact.indexOf(' - ')

    if (separatorIndex === -1) {
        return {
            name: '',
            phone: contact,
            relationship: '',
            address: ''
        }
    }

    return {
        name: contact.substring(0, separatorIndex),
        phone: contact.substring(separatorIndex + 3),
        relationship: '',
        address: ''
    }
})

function openInfoDialog() {
    console.log('Completar información del aprendiz:', apprentice.value)

}

function goBack() {
    router.push({
        name: 'aprendices.list'
    })
}

</script>

<style scoped lang="scss">
@use 'src/css/variables.scss' as *;
@use 'src/css/typography.scss' as *;

.apprentice-detail {
    width: 100%;
    max-width: 1100px;
    margin: 0 auto;
    padding: 18px 0 0;
}

.detail-grid {
    display: grid;
    grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
    gap: 20px;
}

.detail-card {
    width: 100%;
    padding: 20px 22px;
    background-color: $color-surface;
    border: 1px solid #fefefe;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.12);
    border-radius: 6px;
    box-sizing: border-box;
}

.detail-card--emergency {
    grid-column: 1 / -1;
}

.detail-card__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    margin-bottom: 20px;
}

.detail-card__title {
    display: flex;
    align-items: center;
    gap: 10px;
    color: $color-primary;
    font-size: $font-size-lg;
    font-weight: 700;
    text-transform: uppercase;
    padding-left: 25px;
}

.detail-card__title :deep(.q-icon) {
    font-size: 22px;
    padding-bottom: 5px;
}

.detail-card__status {
    padding-right: 10px;
}

.detail-card__body--apprentice {
    display: grid;
    grid-template-columns: 95px minmax(0, 1fr);
    gap: 48px;
    align-items: center;
    padding: 10px;
    padding-left: 40px;
}

.detail-card__logo {
    display: flex;
    justify-content: center;
    align-items: center;
}

.detail-card__logo img {
    width: 140px;
    height: auto;
}

.detail-card__fields {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    column-gap: 14px;
    row-gap: 16px;
}

.detail-card__fields--apprentice {
    grid-template-columns: minmax(0, 1.5fr) minmax(0, 0.8fr);
}

.detail-card__empty-slot {
    min-width: 0;
}

.detail-card__fields--medical {
    display: flex;
    flex-direction: column;
    padding: 10px;
    padding-left: 30px;
}

.detail-card__fields--emergency {
    display: flex;
    flex-wrap: wrap;
    gap: 16px 32px;
    padding: 10px;
    padding-left: 30px;
}

.detail-card__fields--emergency>* {
    flex: 0 0 calc((100% - 64px) / 3);
}

.detail-card__empty {
    padding: 12px 0;
    color: $color-text-secondary;
    font-size: $font-size-sm;
}

.apprentice-detail__actions {
    display: flex;
    grid-column: 1 / -1;
    justify-content: flex-end;
    align-items: center;
    flex-wrap: wrap;
    gap: 10px;
    width: 100%;
    box-sizing: border-box;
}

.update_actions {
    width: auto;
    min-width: 114px;
}


@media (max-width: 1254px) {

    .apprentice-detail {
        padding: 16px;
    }

    .detail-grid {
        grid-template-columns: 1fr;
    }

    .detail-card {
        text-align: center;
    }

    .detail-card__header {
        justify-self: center;
        margin-bottom: 0;
    }

    .detail-card__status {
        padding-left: 35px;
    }

    .detail-card__body--apprentice {
        display: flex;
        flex-direction: column;
        gap: 0;
        align-items: stretch;
    }

    .detail-card__logo {
        justify-content: center;
        width: 100%;
    }

    .detail-card__logo img {
        width: 140px;
    }

    .detail-card__fields,
    .detail-card__fields--medical {
        grid-template-columns: 1fr 1fr;
        column-gap: 22px;
        margin-top: 10px;
    }

    .detail-card__fields--apprentice {
        width: 100%;
        box-sizing: border-box;
        grid-template-columns: repeat(2, minmax(0, 1fr));
        column-gap: 22px;
    }

    .detail-card__fields--apprentice> :first-child {
        grid-column: 1 / -1;
    }

    .detail-card__fields--apprentice .detail-card__empty-slot {
        display: none;
    }

    .detail-card__fields--emergency {
        grid-template-columns: 180px minmax(0, 0.7fr);
        gap: 22px;
        justify-content: center;
    }

    .detail-card__fields--emergency>* {
        flex-basis: calc((100% - 44px) / 3);
    }
}

@media (max-width: 720px) {

    .apprentice-detail {
        padding: 14px;
    }

     .apprentice-detail-page {
        max-width: 90%;
        padding: 8px;
    }

    .apprentice-detail__title {
        font-size: 1.1rem;
    }

    .detail-card {
        padding: 16px;
        text-align: center;
    }

    .detail-card__header {
        display: flex;
        flex-direction: column
    }

    .detail-card__title {
        padding-left: 0;
    }

    .detail-card__fields,
    .detail-card__fields--medical {
        grid-template-columns: 1fr;
    }

    .detail-card__fields--apprentice {
        grid-template-columns: 1fr;
    }

    .detail-card__empty-slot {
        display: none;
    }

    .detail-card__fields--emergency {
        flex-direction: column;
    }

    .detail-card__fields--emergency>* {
        flex-basis: 100%;
    }

    .apprentice-detail__actions {
        justify-content: flex-end;
    }
}

@media (max-width: 449px) {

    .apprentice-detail-page {
        max-width: 90%;
        padding: 8px;
    }

    .apprentice-detail {
        padding: 0;
    }

    .detail-card__header {
        display: flex;
        flex-direction: column;
    }

    .detail-card__title {
        gap: 3px;
        display: flex;
        flex-direction: column;
    }

    .detail-card__status {
        padding-left: 0;
    }

    .detail-card__body {
        padding-left: 0;
    }

    .detail-card__fields {
        padding-left: 0;
    }

    .detail-card__title {
        padding-left: 0;
    }

    .detail-card--apprentice {
        display: flex;
        flex-direction: column;
    }

    .apprentice-detail__actions {
        width: 100%;
        justify-content: center;
    }

    .apprentice-detail__actions :deep(.primary-action-button),
    .apprentice-detail__actions :deep(.secondary-action-button) {
        max-width: 100%;
    }

}
</style>