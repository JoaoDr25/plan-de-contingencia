import BaseInput from 'src/components/forms/BaseInput.vue'
import BaseSelect from 'src/components/forms/BaseSelect.vue'

import {
    required,
    minLength,
    maxLength,
    onlyLetters,
    phone
} from 'src/validators/form.validator'

export const APPRENTICE_FORM_FIELDS = [

    {
        component: BaseInput,
        model: 'ficha',
        label: 'Ficha',
        // placeholder: 'Ingrese la ficha',
        icon: 'badge',
        required: true,
        rules: [
            required,
            minLength(3),
            maxLength(10),
        ]
    },
    {
        component: BaseSelect,
        model: 'programa',
        label: 'Programa de Formación',
        // placeholder: 'Seleccione el programa',
        icon: 'school',
        options: [],
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
        model: 'nombre',
        label: 'Nombre del Aprendiz',
        // placeholder: 'Ingrese el nombre del aprendiz',
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
        model: 'apellido',
        label: 'Apellido del Aprendiz',
        // placeholder: 'Ingrese el apellido del aprendiz',
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
        model: 'eps',
        label: 'Nombre de EPS',
        // placeholder: 'Ingrese el nombre de la EPS',
        icon: 'health_and_safety',
        required: true,
        rules: [
            required,
            minLength(3),
            maxLength(120),
        ]
    },
    {
        component: BaseInput,
        model: 'telefono',
        label: 'Contacto de Emergencia',
        // placeholder: 'Ingrese el número de contacto',
        icon: 'contact_phone',
        maxlength: 15,
        required: true,
        rules: [
            required,
            phone,
            maxLength(10),
        ]
    },
    {
        component: BaseSelect,
        model: 'tipo',
        label: 'Tipo de Documento',
        // placeholder: 'Seleccione el tipo de documento',
        icon: 'badge',
        options: [
            {
                label: 'Cédula de Ciudadanía',
                value: 'CC'
            },
            {
                label: 'Tarjeta de Identidad',
                value: 'TI'
            },
            {
                label: 'Cédula de Extranjería',
                value: 'CE'
            }
        ],
        required: true,
        rules: [
            required
        ]
    },
    {
        component: BaseInput,
        model: 'documento',
        label: 'N° Documento Aprendiz',
        // placeholder: 'Ingrese el número de documento',
        icon: 'badge',
        maxlength: 15,
        required: true,
        rules: [
            required,
            minLength(3),
            maxLength(10),

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