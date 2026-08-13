import BaseInput from 'src/components/forms/BaseInput.vue'
import BaseSelect from 'src/components/forms/BaseSelect.vue'

import { required } from 'src/validators/form.validator'

export const PROTOCOL_FORM_FIELDS = [

    {
        component: BaseInput,
        model: 'tipo',
        label: 'Tipo de Emergencia',
        placeholder: 'Ingrese el tipo de emergencia',
        icon: 'warning',
        maxlength: 120,
        required: true,
        rules: [
            required
        ]
    },
    {
        component: BaseInput,
        model: 'accion',
        label: 'Acción Inmediata',
        placeholder: 'Ingrese la acción inmediata',
        icon: 'flash_on',
        maxlength: 250,
        required: true,
        rules: [
            required
        ]
    },
    {
        component: BaseInput,
        model: 'responsable',
        label: 'Responsable',
        placeholder: 'Ingrese el responsable',
        icon: 'person',
        maxlength: 120,
        required: true,
        rules: [
            required
        ]
    },
    {
        component: BaseInput,
        model: 'medio',
        label: 'Medio de Comunicación',
        placeholder: 'Ingrese el medio de comunicación',
        icon: 'phone',
        maxlength: 120,
        required: true,
        rules: [
            required
        ]
    },
    {
        component: BaseSelect,
        model: 'estado',
        label: 'Estado',
        placeholder: 'Seleccione el estado',
        icon: 'toggle_on',
        options: [
            {
                label: 'Activo',
                value: 'Activo'
            },
            {
                label: 'Inactivo',
                value: 'Inactivo'
            }
        ],
        required: true,
        rules: [
            required
        ]
    }
]