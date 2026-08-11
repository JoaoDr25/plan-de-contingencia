import BaseInput from 'src/components/base/BaseInput.vue'
import BaseSelect from 'src/components/forms/BaseSelect.vue'

import { required } from 'src/validators/form.validator'

export const RISK_FORM_FIELDS = [

    {
        component: BaseInput,
        model: 'riesgo',
        label: 'Nombre del Riesgo',
        placeholder: 'Ingrese el nombre del riesgo',
        icon: 'warning',
        maxlength: 120,
        required: true,
        rules: [
            required
        ]
    },
    {
        component: BaseSelect,
        model: 'nivel',
        label: 'Nivel',
        placeholder: 'Seleccione el nivel',
        icon: 'signal_cellular_alt',
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
        component: BaseSelect,
        model: 'protocolos',
        label: 'Protocolos Asociados',
        placeholder: 'Seleccione los protocolos',
        icon: 'rule',
        options: [ 8 ],
        required: true,
        rules: [
            required
        ]
    },
    {
        component: BaseInput,
        model: 'descripcion',
        label: 'Descripción',
        placeholder: 'Ingrese la descripción del riesgo',
        icon: 'description',
        maxlength: 250,
        required: true,
        rules: [
            required
        ]
    },
    {
        component: BaseInput,
        model: 'consecuencia',
        label: 'Consecuencias',
        placeholder: 'Ingrese las consecuencias',
        icon: 'error_outline',
        maxlength: 250,
        required: true,
        rules: [
            required
        ]
    }
]