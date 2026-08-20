import BaseInput from 'src/components/forms/BaseInput.vue'
import BaseSelect from 'src/components/forms/BaseSelect.vue'

import { 
    required, 
    maxLength 
} from 'src/validators/form.validator'

export const DANGER_FORM_FIELDS = [

    {
        component: BaseInput,
        model: 'nombre',
        label: 'Nombre del Peligro',
        // placeholder: 'Ingrese el nombre del peligro',
        icon: 'warning',
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
                label: 'Locativo',
                value: 'Locativo'
            },
            {
                label: 'Químico',
                value: 'Químico'
            },
            {
                label: 'Físico',
                value: 'Físico'
            },
            {
                label: 'Mecánico',
                value: 'Mecánico'
            },
            {
                label: 'Biológico',
                value: 'Biológico'
            },
            {
                label: 'Ergonómico',
                value: 'Ergonómico'
            },
            {
                label: 'Seguridad',
                value: 'Seguridad'
            },
            {
                label: 'Natural',
                value: 'Natural'
            }
        ],
        required: true,
        rules: [
            required
        ]
    },
    {
        component: BaseSelect,
        model: 'riesgos',
        label: 'Riesgos Asociados',
        // placeholder: 'Seleccione los riesgos',
        icon: 'dangerous',
        options: [2],
        required: true,
        multiple: true,
        hideSelectedValue: true,
        rules: [
            required
        ]
    },
    {
        component: BaseInput,
        model: 'descripcion',
        label: 'Descripción',
        // placeholder: 'Ingrese la descripción del peligro',
        icon: 'description',
        type: 'textarea',
        required: true,
        rules: [
            required,
            maxLength(250)
        ]
    }
]