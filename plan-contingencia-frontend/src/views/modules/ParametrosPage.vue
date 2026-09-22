<template>
  <BasePage class="">
    <CrudHeader title="Parámetros del Sistema"> </CrudHeader>

    <div class="parameters-grid">
      <BaseDataCard
        title="Clasificación de la Información"
        :columns="classificationColumns"
        :rows="classificationRows"
        row-key="id"
        column-template="12% 30% 58%"
        max-body-height="150px"
        class="parameter-card"
      >
        <template #header-icon>
          <q-icon name="expand_more" size="20px" />
        </template>
      </BaseDataCard>

      <BaseDataCard
        title="Tipos de Transporte"
        :columns="transportColumns"
        :rows="transportRows"
        row-key="id"
        column-template="12% 34% 54%"
        max-body-height="150px"
        class="parameter-card"
      >
        <template #header-icon>
          <q-icon name="expand_more" size="20px" />
        </template>
      </BaseDataCard>

      <BaseDataCard
        title="Estados del Plan"
        :columns="statusColumns"
        :rows="statusRows"
        row-key="id"
        column-template="12% 30% 58%"
        max-body-height="150px"
        class="parameter-card"
      >
        <template #header-icon>
          <q-icon name="expand_more" size="20px" />
        </template>
      </BaseDataCard>

      <BaseDataCard
        title="Niveles de Riesgo"
        :columns="riskLevelColumns"
        :rows="riskLevelRows"
        row-key="id"
        column-template="12% 30% 58%"
        max-body-height="150px"
        class="parameter-card"
      >
        <template #header-icon>
          <q-icon name="expand_more" size="20px" />
        </template>
      </BaseDataCard>

      <BaseDataCard
        title="Ítems de Seguridad Vial"
        :columns="securityColumns"
        :rows="securityRows"
        row-key="id"
        column-template="7% 24% 34% 25% 10%"
        max-body-height="150px"
        class="parameter-card parameter-card--wide"
      >
        <template #header-icon>
          <q-icon name="expand_more" size="20px" />
        </template>
      </BaseDataCard>
    </div>
  </BasePage>
</template>

<script setup>
import BasePage from 'src/components/base/BasePage.vue'
import CrudHeader from 'src/components/cruds/CrudHeader.vue'
import BaseDataCard from 'src/components/base/BaseDataCard.vue'

import { SECURITY_VIAL_ITEMS } from 'src/constants/system/security.constants'

const classificationColumns = [
  {
    key: 'order',
    label: 'ORDEN',
  },
  {
    key: 'name',
    label: 'CLASIFICACIÓN',
  },
  {
    key: 'description',
    label: 'Descripción',
  },
]

const classificationRows = [
  {
    id: 1,
    order: 1,
    name: 'Pública',
    description: 'Información de acceso público sin restricciones',
  },
  {
    id: 2,
    order: 2,
    name: 'Pública Clasificada',
    description: 'Información de acceso restringido por autorización',
  },
  {
    id: 3,
    order: 3,
    name: 'Pública Reservada',
    description: 'Información de acceso restringido por nivel institucional',
  },
]

const transportColumns = [
  { key: 'order', label: 'ORDEN' },
  { key: 'name', label: 'TIPO DE TRANSPORTE' },
  { key: 'description', label: 'DESCRIPCIÓN' },
]

const transportRows = [
  {
    id: 1,
    order: 1,
    name: 'Transporte SENA',
    description: 'Transporte gestionado por la institución',
  },
  { id: 2, order: 2, name: 'Transporte Externo', description: 'Transporte contratado a terceros' },
  {
    id: 3,
    order: 3,
    name: 'Transporte Aprendiz',
    description: 'Transporte proporcionado por los aprendices',
  },
]

const statusColumns = [
  { key: 'order', label: 'ORDEN' },
  { key: 'name', label: 'ESTADO' },
  { key: 'description', label: 'DESCRIPCIÓN' },
]

const statusRows = [
  { id: 1, order: 1, name: 'BORRADOR', description: 'Plan en elaboración, pendiente de revisión' },
  {
    id: 2,
    order: 2,
    name: 'EN REVISIÓN',
    description: 'Plan en revisión en las distintas dependencias',
  },
  { id: 3, order: 3, name: 'APROBADO', description: 'Plan aprobado y listo para su ejecución' },
  { id: 4, order: 4, name: 'EJECUTADO', description: 'Plan ejecutado y finalizado' },
  { id: 5, order: 5, name: 'CANCELADO', description: 'Plan cancelado y no fue ejecutado' },
]

const riskLevelColumns = [
  { key: 'order', label: 'ORDEN' },
  { key: 'name', label: 'NIVEL' },
  { key: 'description', label: 'DESCRIPCIÓN' },
]

const riskLevelRows = [
  { id: 1, order: 1, name: 'Bajo', description: 'Riesgo con afectación menor y controlable' },
  { id: 2, order: 2, name: 'Medio', description: 'Riesgo moderado que requiere control' },
  {
    id: 3,
    order: 3,
    name: 'Alto',
    description: 'Riesgo significativo que requiere acción inmediata',
  },
]

const securityColumns = [
  { key: 'order', label: 'ORDEN' },
  { key: 'name', label: 'ÍTEM DE VERIFICACIÓN' },
  { key: 'description', label: 'DESCRIPCIÓN' },
  { key: 'appliesTo', label: 'APLICA PARA' },
  { key: 'required', label: 'OBLIGATORIO' },
]

const securityRows = SECURITY_VIAL_ITEMS.map((item, index) => ({
  id: item.id,
  order: index + 1,
  name: item.label,
  description: `Verificación del ${item.label.toLowerCase()} vigente`,
  appliesTo: 'Transporte SENA, Transporte Externo',
  required: 'Sí',
}))
</script>

<style scoped lang="scss">
@use 'src/css/variables.scss' as *;
@use 'src/css/typography.scss' as *;

.parameters-grid {
  width: 100%;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 18px;
  padding: 40px 30px 40px;
}

.parameter-card {
  min-width: 0;
  height: 242px;
}

.parameter-card :deep(.base-data-card__title) {
  position: relative;
  flex: 1;
  justify-content: center;
}

.parameter-card :deep(.base-data-card__title .q-icon) {
  position: absolute;
  left: 0;
  padding-left: 15px;
}

.parameter-card :deep(.base-data-card__title span) {
  display: flex;
  align-items: center;
  font-size: clamp(0.85rem, 0.7vw, 1.125rem);
  font-weight: 400;
  text-align: center;
  text-transform: uppercase;
}

.parameter-card--wide {
  grid-column: 1 / -1;
}

.parameter-card__footer-label {
  flex: 1;
  min-width: 0;
  overflow: hidden;
  font-size: $font-size-xs;
  font-weight: 700;
  text-transform: uppercase;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.parameter-card__select {
  width: 135px;
  flex-shrink: 0;
  margin-left: 12px;
}

@media (max-width: 900px) {
  .parameters-grid {
    grid-template-columns: 1fr;
    padding: 20px 16px 24px;
  }

  .parameter-card--wide {
    grid-column: auto;
  }

  .parameter-card__select {
    width: 125px;
  }

  .parameter-card :deep(.base-data-card__title span) {
    font-size: clamp(0.8rem, 2.4vw, 1rem);
  }
}
</style>
