import BaseInput from 'src/components/forms/BaseInput.vue'
import BaseSelect from 'src/components/forms/BaseSelect.vue'

import { 
    required, 
    maxLength 
} from 'src/validators/form.validator'

export const PROGRAM_FORM_FIELDS = [

    {
        component: BaseInput,
        model: 'ficha',
        label: 'Ficha',
        // placeholder: 'Ingrese la ficha',
        icon: 'badge',
        required: true,
        rules: [
            required,
            maxLength(10)
        ]
    },
    {
        component: BaseInput,
        model: 'nombre',
        label: 'Nombre del Programa',
        // placeholder: 'Ingrese el nombre del programa',
        icon: 'school',
        required: true,
        rules: [
            required,
            maxLength(120)
        ]
    },
      {
        component: BaseSelect,
        model: 'jornada',
        label: 'Jornada',
        // placeholder: 'Seleccione la jornada',
        icon: 'workspace_premium',
        options: [
            {
                label: 'Mañana',
                value: 'Mañana'
            },
            {
                label: 'Tarde',
                value: 'Tarde'
            },
            {
                label: 'Noche',
                value: 'Noche'
            }
        ],
        required: true,
        rules: [
            required
        ]
    },
    {
        component: BaseSelect,
        model: 'nivel',
        label: 'Nivel de Formación',
        // placeholder: 'Seleccione el nivel',
        icon: 'workspace_premium',
        options: [
            {
                label: 'Técnico',
                value: 'Técnico'
            },
            {
                label: 'Tecnólogo',
                value: 'Tecnólogo'
            }
        ],
        required: true,
        rules: [
            required
        ]
    },
    {
        component: BaseInput,
        model: 'centro',
        label: 'Centro de Formación',
        // placeholder: 'Ingrese el centro de formación',
        icon: 'business',
        required: true,
        rules: [
            required,
            maxLength(120)
        ],
        readonly: true
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