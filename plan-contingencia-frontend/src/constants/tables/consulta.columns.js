import { formatDate } from 'src/utils/date.utils'

export const PLANES_CONSULTA_COLUMNS = [

    {
        name: 'index',
        label: 'N',
        field: 'numero',
        align: 'center',
        sortable: false
    },

    {
        name: 'ficha',
        label: 'Ficha',
        field: 'ficha',
        align: 'left',
        sortable: true,
        ellipsis: true
    },

    {
        name: 'programa',
        label: 'Programa de Formación',
        field: 'programaFormacionNombre',
        align: 'left',
        sortable: true,
        ellipsis: true
    },

    {
        name: 'actividad',
        label: 'Actividad',
        field: 'descripcionActividad',
        align: 'left',
        sortable: true,
        ellipsis: true
    },

    {
        name: 'fechaCreacion',
        label: 'Fecha de Creación',
        field: 'createdAt',
        align: 'center',
        sortable: true,
        format: (value) => formatDate(value)
    },

    {
        name: 'fechaCierre',
        label: 'Fecha de Cierre',
        field: 'fechaCierre',
        align: 'center',
        sortable: true,
        format: (value) => value ? formatDate(value) : '-'
    },

    {
        name: 'instructor',
        label: 'Instructor',
        field: 'instructorNombre',
        align: 'left',
        sortable: true,
        ellipsis: true
    },

    {
        name: 'estado',
        label: 'Estado',
        field: 'estado',
        align: 'center',
        sortable: true
    },

    {
        name: 'opciones',
        label: 'Opciones',
        field: 'opciones',
        align: 'center'
    }

]