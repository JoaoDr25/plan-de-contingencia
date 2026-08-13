import BaseInput from 'src/components/forms/BaseInput.vue'
import BaseSelect from 'src/components/forms/BaseSelect.vue'

import { required } from 'src/validators/form.validator'

export const CONTACTS_FORM_FIELDS = [

    {
        component: BaseSelect,
        model: 'tipo',
        label: 'Tipo de Contacto',
        placeholder: 'Seleccione el tipo de contacto',
        icon: 'contact_phone',
        options: [
            {
                label: 'Hospital',
                value: 'Hospital'
            },
            {
                label: 'Clínica',
                value: 'Clínica'
            },
            {
                label: 'Policía',
                value: 'Policía'
            },
            {
                label: 'Bomberos',
                value: 'Bomberos'
            },
            {
                label: 'Defensa Civil',
                value: 'Defensa Civil'
            },
            {
                label: 'Cruz Roja',
                value: 'Cruz Roja'
            },
            {
                label: 'Otro',
                value: 'Otro'
            }
        ],
        required: true,
        rules: [
            required
        ]
    },
    {
        component: BaseInput,
        model: 'nombre',
        label: 'Nombre de la Entidad',
        placeholder: 'Ingrese el nombre de la entidad',
        icon: 'business',
        maxlength: 120,
        required: true,
        rules: [
            required
        ]
    },
    {
        component: BaseInput,
        model: 'telefono',
        label: 'Teléfono Principal',
        placeholder: 'Ingrese el teléfono principal',
        icon: 'phone',
        maxlength: 20,
        required: true,
        rules: [
            required
        ]
    },
    {
        component: BaseInput,
        model: 'ciudad',
        label: 'Ciudad',
        placeholder: 'Ingrese la ciudad',
        icon: 'location_city',
        maxlength: 100,
        required: true,
        rules: [
            required
        ]
    },
    {
        component: BaseInput,
        model: 'direccion',
        label: 'Dirección',
        placeholder: 'Ingrese la dirección',
        icon: 'location_on',
        maxlength: 100,
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