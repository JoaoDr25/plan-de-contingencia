<template>

  <section class="plan-participantes">

    <div class="section-header">
      
        <h2>Participantes del Plan</h2>
    
    </div>

    <div class="program-info">
      
        <div class="program-info__item program-info__item--programa">
        
        <span>Programa de formación</span>

        <strong>{{ programaNombre }}</strong>

      </div>

      <div class="program-info__item">

        <span>Ficha</span>

        <strong>{{ ficha }}</strong>
    
      </div>

      <div class="program-info__item">

        <span>Total Aprendices de la Ficha</span>

        <strong>{{ filteredAprendices.length }}</strong>
      
    </div>

    </div>

    <div class="participants-toolbar">

      <BaseInput
        v-model="search"
        placeholder="Buscar aprendiz por nombre o documento..."
        icon="search"
        size="filter"
        clearable
      />

      <div class="participants-toolbar__actions">

        <q-btn
          flat
          no-caps
          icon="check_box"
          label="Seleccionar todos"
          @click="selectAll"
        />

        <q-btn
          flat
          no-caps
          icon="remove_done"
          label="Limpiar selección"
          @click="clearSelection"
        />

      </div>

    </div>

    <BaseTable
      :rows="filteredAprendices"
      :columns="columns"
      row-key="_id"
    >

      <template #body-cell-nombre="props">

        <q-td :props="props">
          {{ props.row.nombre }} {{ props.row.apellido }}
        </q-td>

      </template>

      <template #body-cell-documento="props">

        <q-td :props="props">
          {{ props.row.tipo }}
          {{ props.row.documento }}
        </q-td>

      </template>

      <template #body-cell-eps="props">

        <q-td :props="props">
          {{ props.row.eps }}
        </q-td>

      </template>

      <template #body-cell-telefono="props">

        <q-td :props="props">
          {{ props.row.telefono }}
        </q-td>

      </template>

      <template #body-cell-estado="props">

        <q-td :props="props">

          <q-badge
            :color="props.row.estado === 'Activo' ? 'positive' : 'negative'"
            :label="props.row.estado"
          />

        </q-td>

      </template>

      <template #body-cell-marcar="props">

        <q-td :props="props">

          <q-checkbox
            :model-value="isSelected(props.row._id)"
            :disable="props.row.estado !== 'Activo'"
            @update:model-value="
              (value) => handleSelection(props.row._id, value)
            "
          />

        </q-td>

      </template>

      <template #no-data>

        <div class="empty-state">
          No se encontraron aprendices.
        </div>

      </template>

    </BaseTable>

    <div class="selection-summary">

      <strong>
        N.º de Aprendices Seleccionados:
        {{ selectedCount }}
      </strong>

      <span
        v-if="selectedCount === 0"
        class="selection-summary__message"
      >
        Debes seleccionar al menos un aprendiz para continuar.
      </span>

    </div>
    
  </section>

</template>

<script setup>

import { computed, ref } from 'vue'

import BaseInput from 'src/components/forms/BaseInput.vue'
import BaseTable from 'src/components/tables/BaseTable.vue'

import { APRENDICES_MOCK } from 'src/mocks/modules/aprendices.mock'
import { PROGRAMAS_MOCK } from 'src/mocks/modules/programas.mock'

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

const search = ref('')

const columns = [
  {
    name: 'nombre',
    label: 'Nombre completo',
    field: (row) => `${row.nombre} ${row.apellido}`,
    align: 'left',
    sortable: true,
  },
  {
    name: 'documento',
    label: 'Tipo y número de documento',
    field: 'documento',
    align: 'left',
    sortable: true,
  },
  {
    name: 'eps',
    label: 'EPS',
    field: 'eps',
    align: 'left',
  },
  {
    name: 'telefono',
    label: 'Teléfono',
    field: 'telefono',
    align: 'left',
  },
  {
    name: 'estado',
    label: 'Estado',
    field: 'estado',
    align: 'center',
  },
  {
    name: 'marcar',
    label: 'Marcar',
    field: 'marcar',
    align: 'center',
  },
]

const programa = computed(() => {
  return PROGRAMAS_MOCK.find(
    (item) => item._id === plan.programaFormacionId,
  )
})

const programaNombre = computed(() => {
  return (
    plan.programaFormacionNombre ||
    programa.value?.nombre ||
    '—'
  )
})

const ficha = computed(() => {
  return programa.value?.ficha || '—'
})

const aprendices = computed(() => {
  return APRENDICES_MOCK
})

const filteredAprendices = computed(() => {
  const value = search.value
    .trim()
    .toLowerCase()

  if (!value) {
    return aprendices.value
  }

  return aprendices.value.filter((aprendiz) => {
    const nombre = `${aprendiz.nombre ?? ''} ${aprendiz.apellido ?? ''}`
      .toLowerCase()

    const tipoDocumento = String(aprendiz.tipo ?? '').toLowerCase()

    const numeroDocumento = String(aprendiz.documento ?? '').toLowerCase()

    return (
      nombre.includes(value) ||
      tipoDocumento.includes(value) ||
      numeroDocumento.includes(value)
    )
  })
})

const selectedCount = computed(() => {
  return plan.aprendicesId.length
})

function isSelected(id) {
  return plan.aprendicesId.includes(id)
}

function handleSelection(id, selected) {
  if (selected) {
    if (!plan.aprendicesId.includes(id)) {
      plan.aprendicesId.push(id)
    }
  } else {
    const index = plan.aprendicesId.indexOf(id)

    if (index !== -1) {
      plan.aprendicesId.splice(index, 1)
    }
  }

  emit('update:modelValue', plan)
}

function selectAll() {
  const activeIds = filteredAprendices.value
    .filter((aprendiz) => aprendiz.estado === 'Activo')
    .map((aprendiz) => aprendiz._id)

  const selectedIds = new Set(plan.aprendicesId)

  activeIds.forEach((id) => {
    selectedIds.add(id)
  })

  plan.aprendicesId = Array.from(selectedIds)

  emit('update:modelValue', plan)
}

function clearSelection() {
  plan.aprendicesId = []

  emit('update:modelValue', plan)
}

function validate() {
  return plan.aprendicesId.length > 0
}

defineExpose({
  validate,
})
</script>

<style scoped lang="scss">
.plan-participantes {
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

.program-info {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr;
  gap: 18px;
  margin-bottom: 16px;
}

.program-info__item {
  display: flex;
  flex-direction: column;
  gap: 5px;

  span {
    font-size: 11px;
    color: #555;
  }

  strong {
    min-height: 25px;
    font-size: 12px;
    font-weight: 500;
  }
}

.participants-toolbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 10px;
}

.participants-toolbar__actions {
  display: flex;
  align-items: center;
  gap: 6px;
}

.selection-summary {
  display: flex;
  align-items: center;
  gap: 20px;

  margin-top: 10px;
  padding: 8px 12px;

  font-size: 11px;
}

.selection-summary__message {
  color: #555;
}

.empty-state {
  padding: 25px;
  text-align: center;
  color: #777;
  font-size: 12px;
}

@media (max-width: 900px) {
  .program-info {
    grid-template-columns: 1fr;
  }

  .participants-toolbar {
    align-items: stretch;
    flex-direction: column;
  }

  .participants-toolbar__actions {
    justify-content: flex-end;
  }
}

</style>