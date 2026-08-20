import BaseInput from 'src/components/forms/BaseInput.vue'
import BaseSelect from 'src/components/forms/BaseSelect.vue'

import { 
    required, 
    maxLength 
} from 'src/validators/form.validator'

export const PROTOCOL_FORM_FIELDS = [

    {
        component: BaseInput,
        model: 'tipo',
        label: 'Tipo de Emergencia',
        // placeholder: 'Ingrese el tipo de emergencia',
        icon: 'warning',
        required: true,
        rules: [
            required,
            maxLength(120)
        ]
    },
    {
        component: BaseInput,
        model: 'accion',
        label: 'Acción Inmediata',
        // placeholder: 'Ingrese la acción inmediata',
        icon: 'flash_on',
        type: 'textarea',
        required: true,
        rules: [
            required,
            maxLength(250)
        ]
    },
    {
        component: BaseInput,
        model: 'responsable',
        label: 'Responsable',
        // placeholder: 'Ingrese el responsable',
        icon: 'person',
        required: true,
        rules: [
            required,
            maxLength(120)
        ]
    },
    {
        component: BaseInput,
        model: 'medio',
        label: 'Medio de Comunicación',
        // placeholder: 'Ingrese el medio de comunicación',
        icon: 'phone',
        required: true,
        rules: [
            required,
            maxLength(120)
        ]
    },
    {
        component: BaseSelect,
        model: 'estado',
        label: 'Estado',
        // placeholder: 'Seleccione el estado',
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