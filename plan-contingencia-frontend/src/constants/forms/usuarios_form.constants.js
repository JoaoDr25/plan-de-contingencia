import BaseInput from 'src/components/forms/BaseInput.vue'
import BaseSelect from 'src/components/forms/BaseSelect.vue'

import {
    required,
    maxLength
} from 'src/validators/form.validator'

export const USER_FORM_FIELDS = [
    
    {
        component: BaseInput,
        model: 'nombre',
        label: 'Nombre del Usuario',
        // placeholder: 'Ingrese el nombre del usuario',
        icon: 'person',
        required: true,
        rules: [
            required,
            maxLength(120)
        ]
    },
        {
        component: BaseInput,
        model: 'apellido',
        label: 'Apellido del Usuario',
        // placeholder: 'Ingrese el apellido del usuario',
        icon: 'person_outline',
        required: true,
        rules: [
            required,
            maxLength(120)
        ]
    },
    {
        component: BaseInput,
        model: 'correo',
        label: 'Correo Institucional',
        // placeholder: 'Ingrese el correo institucional',
        icon: 'mail',
        required: true,
        rules: [
            required,
            maxLength(120)
        ]
    },
      {
        component: BaseInput,
        model: 'correoPersonal',
        label: 'Correo Personal',
        icon: 'alternate_email',
        required: false,
        rules: [
            maxLength(120)
        ]
    },

    // {
    //     component: BaseInput,
    //     model: 'centro',
    //     label: 'Centro de Formación',
    //     // placeholder: 'Ingrese el centro de formación',
    //     icon: 'business',
    //     required: true,
    //     rules: [
    //         required,
    //         maxLength(120)
    //     ]
    // },
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
        required: true,
        rules: [
            required,
            maxLength(20)
        ]
    },
    

  
    {
        component: BaseInput,
        model: 'telefono',
        label: 'Teléfono',
        icon: 'phone',
        required: false,
        rules: [
            maxLength(20)
        ]
    },
     {
        component: BaseSelect,
        model: 'tipoVinculacion',
        label: 'Tipo de Vinculación',
        icon: 'work_outline',
        options: [
            {
                label: 'Planta',
                value: 'Planta'
            },
            {
                label: 'Contratista',
                value: 'Contratista'
            },
            {
                label: 'Planta Temporal',
                value: 'Planta Temporal'
            }
        ],
        required: false,
        rules: []
    },
    {
        component: BaseInput,
        model: 'areaTematica',
        label: 'Área Temática',
        icon: 'category',
        required: false,
        rules: [
            maxLength(120)
        ]
    },
       {
        component: BaseInput,
        model: 'redConocimiento',
        label: 'Red de Conocimiento',
        icon: 'hub',
        required: false,
        rules: [
            maxLength(120)
        ]
    },
    {
        component: BaseInput,
        model: 'maximoHoras',
        label: 'Máximo de Horas',
        type: 'number',
        icon: 'schedule',
        required: false,
        rules: []
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
                value: 'usuario'
            },
            {
                label: 'Coordinación',
                value: 'coordinacion'
            },
            {
                label: 'SST',
                value: 'sst'
            },
            {
                label: 'Pedagogía',
                value: 'pedagogia'
            }
        ],
        required: true,
        rules: [
            required
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