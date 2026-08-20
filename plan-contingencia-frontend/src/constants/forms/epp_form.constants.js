import BaseInput from 'src/components/forms/BaseInput.vue'
import BaseSelect from 'src/components/forms/BaseSelect.vue'

import { 
    required, 
    maxLength 
} from 'src/validators/form.validator'

export const EPP_FORM_FIELDS = [

    {
        component: BaseInput,
        model: 'nombre',
        label: 'Nombre de EPP',
        // placeholder: 'Ingrese el nombre del EPP',
        icon: 'shield',
        required: true,
        rules: [
            required,
            maxLength(120)
        ]
    },
    {
        component: BaseSelect,
        model: 'categoria',
        label: 'Categoría',
        // placeholder: 'Seleccione la categoría',
        icon: 'category',
        options: [
            {
                label: 'Protección de cabeza',
                value: 'Protección de cabeza'
            },
            {
                label: 'Protección ocular',
                value: 'Protección ocular'
            },
            {
                label: 'Protección auditiva',
                value: 'Protección auditiva'
            },
            {
                label: 'Protección respiratoria',
                value: 'Protección respiratoria'
            },
            {
                label: 'Protección de manos',
                value: 'Protección de manos'
            },
            {
                label: 'Protección de pies',
                value: 'Protección de pies'
            },
            {
                label: 'Protección corporal',
                value: 'Protección corporal'
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
        label: 'Nivel de Protección',
        // placeholder: 'Seleccione el nivel de protección',
        icon: 'security',
        options: [
            {
                label: 'Bajo',
                value: 'Bajo'
            },
            {
                label: 'Medio',
                value: 'Medio'
            },
            {
                label: 'Alto',
                value: 'Alto'
            }
        ],
        required: true,
        rules: [
            required
        ]
    },
    {
        component: BaseInput,
        model: 'descripcion',
        label: 'Descripción',
        // placeholder: 'Ingrese la descripción del EPP',
        icon: 'description',
        type: 'textarea',
        required: true,
        rules: [
            required,
            maxLength(250)
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