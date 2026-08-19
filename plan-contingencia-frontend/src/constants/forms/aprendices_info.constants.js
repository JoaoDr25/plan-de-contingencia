import BaseInput from 'src/components/forms/BaseInput.vue'
import BaseSelect from 'src/components/forms/BaseSelect.vue'

export const APPRENTICE_INFO_FORM_FIELDS = [
    {
        component: BaseInput,
        model: 'eps',
        label: 'EPS',
        icon: 'health_and_safety',
        required: true
    },
    {
        component: BaseSelect,
        model: 'tipoSangre',
        label: 'Tipo de Sangre',
        icon: 'bloodtype',
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
        model: 'condicionesMedicas',
        label: 'Condiciones Médicas',
        type: 'textarea',
        icon: 'medical_information'
    },
    {
        component: BaseInput,
        model: 'nombreContacto',
        label: 'Nombre Completo del Contacto',
        icon: 'person'
    },
    {
        component: BaseInput,
        model: 'telefonoContacto',
        label: 'Teléfono de Contacto',
        type: 'tel',
        icon: 'phone'
    },
    {
        component: BaseSelect,
        model: 'parentesco',
        label: 'Parentesco',
        icon: 'family_restroom',
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
        icon: 'location_on'
    }
]