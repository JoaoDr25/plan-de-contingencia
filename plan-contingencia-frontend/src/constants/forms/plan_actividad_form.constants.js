import BaseInput from 'src/components/forms/BaseInput.vue'
import BaseTimePicker from 'src/components/forms/BaseTimePicker.vue'

import { required, maxLength } from 'src/validators/form.validator'

export const PLAN_ACTIVITY_FORM_FIELDS = [

    {
        component: BaseInput,
        model: 'actividad',
        label: 'Actividad',
        // placeholder: 'Nombre de la actividad',
        icon: 'event',
        required: true,
        rules: [
            required
        ]
    },
    {
        component: BaseInput,
        model: 'lugar',
        label: 'Lugar',
        // placeholder: 'Lugar donde se realizará',
        icon: 'place',
        required: true,
        rules: [
            required
        ]
    },
    {
        component: BaseTimePicker,
        model: 'horaInicio',
        label: 'Hora de inicio',
        size: 'form',
        width: '100%',
        required: true,
        rules: [
            required
        ]
    },
    {
        component: BaseTimePicker,
        model: 'horaFin',
        label: 'Hora de fin',
        size: 'form',
        width: '100%',
        required: true,
        rules: [
            required
        ]
    }
]

export const PLAN_ACTIVITY_DESCRIPTION_FIELD = {
    component: BaseInput,
    model: 'descripcion',
    label: 'Descripción',
    // placeholder: 'Describa la actividad...',
    icon: 'description',
    type: 'textarea',
    maxlength: 500,
    required: true,
    rules: [
        required,
        maxLength(500)
    ]
}
