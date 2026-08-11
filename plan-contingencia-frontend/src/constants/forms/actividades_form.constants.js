import BaseInput from 'src/components/base/BaseInput.vue'
import BaseSelect from 'src/components/forms/BaseSelect.vue'

import { required } from 'src/validators/form.validator'

export const ACTIVITY_FORM_FIELDS = [
    {
        component: BaseInput,
        model: 'nombre',
        label: 'Nombre de la Actividad',
        placeholder: 'Ingrese el nombre de la actividad',
        icon: 'directions_walk',
        maxlength: 120,
        required: true,
        rules: [
            required
        ]
    },
    {
        component: BaseSelect,
        model: 'tipo',
        label: 'Tipo de Salida',
        placeholder: 'Seleccione el tipo de salida',
        icon: 'commute',
        options: [
            {
                label: 'Visita Técnica',
                value: 'Visita Técnica'
            },
            {
                label: 'Recorrido de Campo',
                value: 'Recorrido de Campo'
            },
            {
                label: 'Capacitación Externa',
                value: 'Capacitación Externa'
            },
            {
                label: 'Inspección de Seguridad',
                value: 'Inspección de Seguridad'
            },
            {
                label: 'Encuentro Empresarial',
                value: 'Encuentro Empresarial'
            }
        ],
        required: true,
        rules: [
            required
        ]
    },
    {
        component: BaseSelect,
        model: 'peligros',
        label: 'Peligros Asociados',
        placeholder: 'Seleccione los peligros asociados',
        icon: 'warning',
        options: [ 5 ],
        required: true,
        rules: [
            required
        ]
    },
    {
        component: BaseInput,
        model: 'descripcion',
        label: 'Descripción',
        placeholder: 'Ingrese la descripción de la actividad',
        icon: 'description',
        maxlength: 500,
        required: true,
        rules: [
            required
        ]
    }
]