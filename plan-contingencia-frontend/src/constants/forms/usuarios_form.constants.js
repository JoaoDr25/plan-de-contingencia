import BaseInput from 'src/components/forms/BaseInput.vue'
import BaseSelect from 'src/components/forms/BaseSelect.vue'

import { required } from 'src/validators/form.validator'

export const USER_FORM_FIELDS = [
    
    {
        component: BaseInput,
        model: 'nombre',
        label: 'Nombre del Usuario',
        // placeholder: 'Ingrese el nombre del usuario',
        icon: 'person',
        maxlength: 80,
        required: true,
        rules: [
            required
        ]
    },
    {
        component: BaseInput,
        model: 'correo',
        label: 'Correo Institucional',
        // placeholder: 'Ingrese el correo institucional',
        icon: 'mail',
        maxlength: 120,
        required: true,
        rules: [
            required
        ]
    },
    {
        component: BaseInput,
        model: 'apellido',
        label: 'Apellido del Usuario',
        // placeholder: 'Ingrese el apellido del usuario',
        icon: 'person_outline',
        maxlength: 80,
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
        maxlength: 120,
        required: true,
        rules: [
            required
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
                label: 'Cédula de ciudadanía',
                value: 'Cédula de ciudadanía'
            },
            {
                label: 'Tarjeta de identidad',
                value: 'Tarjeta de identidad'
            },
            {
                label: 'Pasaporte',
                value: 'Pasaporte'
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
        label: 'N.º Documento',
        // placeholder: 'Ingrese el número de documento',
        icon: 'badge',
        maxlength: 20,
        required: true,
        rules: [
            required
        ]
    },
    {
        component: BaseSelect,
        model: 'rol',
        label: 'Rol',
        // placeholder: 'Seleccione el rol',
        icon: 'admin_panel_settings',
        options: [
            {
                label: 'Usuario',
                value: 'Usuario'
            },
            {
                label: 'Administrador',
                value: 'Administrador'
            }
        ],
        required: true,
        rules: [
            required
        ]
    }
]