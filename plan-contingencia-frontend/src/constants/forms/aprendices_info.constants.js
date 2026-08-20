import BaseInput from 'src/components/forms/BaseInput.vue'
import BaseSelect from 'src/components/forms/BaseSelect.vue'

import {
    required,
    minLength,
    maxLength,
    onlyLetters,
    phone
} from 'src/validators/form.validator'

export const APPRENTICE_INFO_FORM_FIELDS = [
    {
        component: BaseInput,
        model: 'eps',
        label: 'EPS',
        icon: 'health_and_safety',
        required: true,
        rules: [
            required,
            minLength(3),
            maxLength(120)
        ]
    },
    {
        component: BaseSelect,
        model: 'tipoSangre',
        label: 'Tipo de Sangre',
        icon: 'bloodtype',
        required: true,
        rules: [
            required
        ],
        options: [
            { label: 'A+', value: 'A+' },
            { label: 'A-', value: 'A-' },
            { label: 'B+', value: 'B+' },
            { label: 'B-', value: 'B-' },
            { label: 'AB+', value: 'AB+' },
            { label: 'AB-', value: 'AB-' },
            { label: 'O+', value: 'O+' },
            { label: 'O-', value: 'O-' }
        ]
    },
    {
        component: BaseInput,
        model: 'contacto',
        label: 'Nombre Completo del Contacto',
        icon: 'person',
        required: true,
        rules: [
            required,
            minLength(3),
            maxLength(120),
            onlyLetters
        ]
    },
    {
        component: BaseInput,
        model: 'telefono',
        label: 'Teléfono de Contacto',
        type: 'tel',
        icon: 'phone',
        required: true,
        rules: [
            required,
            phone
        ]
    },
    {
        component: BaseSelect,
        model: 'parentesco',
        label: 'Parentesco',
        icon: 'family_restroom',
        required: true,
        rules: [
            required
        ],
        options: [
            { label: 'Padre', value: 'Padre' },
            { label: 'Madre', value: 'Madre' },
            { label: 'Hermano(a)', value: 'Hermano(a)' },
            { label: 'Cónyuge', value: 'Cónyuge' },
            { label: 'Hijo(a)', value: 'Hijo(a)' },
            { label: 'Otro', value: 'Otro' }
        ]
    },
    {
        component: BaseInput,
        model: 'direccion',
        label: 'Dirección',
        icon: 'location_on',
        required: true,
        rules: [
            required,
            minLength(5),
            maxLength(120)
        ]
    },
    {
        component: BaseInput,
        model: 'condicionesMedicas',
        label: 'Condiciones Médicas',
        type: 'textarea',
        icon: 'medical_information',
        rules: [
            maxLength(250)
        ]
    }
]