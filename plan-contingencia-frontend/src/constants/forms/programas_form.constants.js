import BaseInput from 'src/components/base/BaseInput.vue'
import BaseSelect from 'src/components/base/BaseSelect.vue'

export const PROGRAM_FORM_FIELDS = [

    {
        component: BaseInput,
        model: 'ficha',
        label: 'Ficha',
        placeholder: 'Ingrese la ficha',
        icon: 'badge',
        maxlength: 10
    },
    {
        component: BaseInput,
        model: 'nombre',
        label: 'Nombre del Programa',
        placeholder: 'Ingrese el nombre del programa',
        icon: 'school',
        maxlength: 120
    },
    {
        component: BaseSelect,
        model: 'nivel',
        label: 'Nivel de Formación',
        placeholder: 'Seleccione el nivel',
        icon: 'workspace_premium',
        options: []
    },
    {
        component: BaseInput,
        model: 'centro',
        label: 'Centro de Formación',
        placeholder: 'Ingrese el centro de formación',
        icon: 'business',
        maxlength: 120
    },
    {
        component: BaseSelect,
        model: 'estado',
        label: 'Estado',
        placeholder: 'Seleccione el estado',
        icon: 'toggle_on',
        options: []
    }
]