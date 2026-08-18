<template>

    <BaseDialog v-model="dialog" title="Actualizar Usuario" width="700px">

        <BaseFormGrid :columns="2">

            <BaseFormField v-for="field in formFields" :key="field.model" :field="field" v-model="form[field.model]" />

            <div class="firma-field">

                <q-file v-model="firmaFile" label="Firma del Usuario" :clearable="!!firmaFile"
                    accept="image/png,image/jpeg,image/webp" :display-value="firmaFile?.name || form.firmaNombre || ''"
                    max-file-size="1048576" :disable="!canEditUserConfiguration" @rejected="handleFirmaRejected">

                    <template #prepend>
                        <q-icon name="draw" />
                    </template>

                    <template #append>

                        <q-icon v-if="form.firma && !firmaFile" name="cancel" class="firma-clear"
                            @click.stop="clearFirma" />

                    </template>

                </q-file>

                <div v-if="firmaError" class="firma-error">
                    {{ firmaError }}
                </div>

            </div>
            
        </BaseFormGrid>

        <template #actions>

            <BaseDialogActions v-if="canEditUserConfiguration" save-label="Actualizar" @save="handleSave"
                @cancel="closeDialog" />

            <SecondaryActionButton v-else label="Cerrar" icon="close" size="sm" @click="closeDialog" />


        </template>

    </BaseDialog>

</template>

<script setup>

import { reactive, computed, watch, ref } from 'vue'

import { USER_FORM_FIELDS } from 'src/constants/forms/usuarios_form.constants'

import BaseDialog from 'src/components/forms/BaseDialog.vue'
import BaseFormGrid from 'src/components/forms/BaseFormGrid.vue'
import BaseFormField from 'src/components/forms/BaseFormField.vue'
import BaseDialogActions from 'src/components/forms/BaseDialogActions.vue'
import SecondaryActionButton from 'src/components/actions/SecondaryActionButton.vue'

const {
    modelValue,
    user,
    canEditUserConfiguration
} = defineProps({

    modelValue: {
        type: Boolean,
        required: true
    },
    user: {
        type: Object,
        default: null
    },
    canEditUserConfiguration: {
        type: Boolean,
        default: true
    }
})

const emit = defineEmits([
    'update:modelValue',
    'save'
])

const dialog = computed({
    get() {
        return modelValue
    },
    set(value) {
        emit('update:modelValue', value)
    }
})

const form = reactive({
    nombre: '',
    correo: '',
    apellido: '',
    centro: '',
    tipo: '',
    documento: '',
    rol: null,
    estado: 'Activo',
    firma: null,
    firmaNombre: null,
})

const firmaFile = ref(null)
const firmaModificada = ref(false)
const firmaError = ref('')

function clearFirma() {

    firmaFile.value = null
    form.firma = null
    form.firmaNombre = null
    firmaModificada.value = true
    firmaError.value = ''
}

const formFields = computed(() => {

    return USER_FORM_FIELDS.map(field => {
        const isConfigurableField =
            field.model === 'rol' ||
            field.model === 'estado'
        return {
            ...field,
            readonly: !isConfigurableField || !canEditUserConfiguration
        }
    })
})

function validateForm() {

    const fieldsToValidate =
        USER_FORM_FIELDS.filter(field =>
            ['rol', 'estado'].includes(field.model)
        )

    for (const field of fieldsToValidate) {

        const rules = field.rules ?? []
        const value = form[field.model]

        for (const rule of rules) {

            const result = rule(value)
            if (result !== true) {
                return false
            }
        }
    }
    return true
}

function handleFirmaSelected(file) {
    if (!file) {
        return
    }
    const reader = new FileReader()
    reader.onload = () => {
        form.firma = reader.result
        form.firmaNombre = file.name
        firmaModificada.value = true
        firmaError.value = ''
    }
    reader.readAsDataURL(file)
}

function handleFirmaRejected(rejectedEntries) {
    console.warn('Archivo de firma rechazado:', rejectedEntries)
    firmaError.value =
        'La imagen debe ser PNG, JPG o WEBP y no superar 1 MB.'
}

function handleSave() {
    if (!validateForm()) {
        return
    }

    const payload = {
        rol: form.rol,
        estado: form.estado
    }

    if (firmaModificada.value) {
        payload.firma = form.firma
        payload.firmaNombre = form.firmaNombre
    }
    emit('save', payload)
}

function resetForm(data = {}) {
    form.nombre = data.nombre ?? ''
    form.correo = data.correo ?? ''
    form.apellido = data.apellido ?? ''
    form.centro = data.centro ?? ''
    form.tipo = data.tipo ?? null
    form.documento = data.documento ?? ''
    form.rol = data.rol ?? null
    form.estado = data.estado ?? 'Activo'

    form.firma = data.firma ?? null
    form.firmaNombre = data.firmaNombre ?? null

    firmaFile.value = null
    firmaModificada.value = false
    firmaError.value = ''
}

function initializeForm() {
    if (user) {
        resetForm(user)
        return
    }
    resetForm()
}

watch(
    () => modelValue,
    (isOpen) => {
        if (isOpen) {
            initializeForm()
        }
    }
)

watch(
    firmaFile,
    (file) => {
        if (file) {
            handleFirmaSelected(file)
        }
    }
)

function closeDialog() {
    resetForm()
    dialog.value = false
}

</script>

<style scoped lang="scss">
@use 'src/css/variables.scss' as *;
@use 'src/css/typography.scss' as *;

.firma-field {
    width: 100%;
}

.firma-field :deep(.q-field__control) {
    min-height: 50px;
    height: 50px;
    border-radius: 4px;
    background-color: $color-background-field;
}

.firma-field :deep(.q-field__control:before) {
    border: none;
}

.firma-field :deep(.q-field__control:hover:before) {
    border: none;
}

.firma-field :deep(.q-field__control:after) {
    display: none;
}

.firma-field :deep(.q-field__label) {
    font-size: $font-size-md;
    color: $color-text-secondary;
}

.firma-field :deep(.q-field--focused .q-field__label),
.firma-field :deep(.q-field--float .q-field__label) {
    color: $color-primary;
    font-size: $font-size-md;
    font-weight: 400;
    letter-spacing: 1px;
    padding-left: 0;
    padding-bottom: 10px;
}

.firma-field :deep(.q-field__native) {
    padding-left: 3px;
    font-size: $font-size-md;
    color: $color-text-primary;
}

.firma-field :deep(.q-field__prepend) {
    color: $color-text-secondary;
    opacity: 0.65;
    padding-left: 15px;
    padding-bottom: 8px;
}

.firma-field :deep(.q-field__append) {
    padding-right: 12px;
}

.firma-field :deep(.q-field__prepend .q-icon) {
    font-size: 21px;
}

.firma-clear {
    color: $color-text-secondary;
    opacity: 0.65;
    font-size: 21px;
    cursor: pointer;
}

.firma-clear:hover {
    opacity: 1;
}

.firma-error {
    margin-top: 4px;
    padding-left: 5px;
    font-size: 12px;
    line-height: 16px;
    color: $color-error;
}
</style>