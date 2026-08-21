export const PLANES_COLUMNS = [

    {
        name: 'index',
        label: 'N',
        field: 'numero',
        align: 'center',
        sortable: false
    },

    {
        name: 'programa',
        label: 'Programa de Formación',
        field: 'programaFormacionNombre',
        align: 'left',
        sortable: true,
        maxWidth: '250px',
        ellipsis: true
    },

    {
        name: 'actividad',
        label: 'Actividad',
        field: 'descripcionActividad',
        align: 'left',
        sortable: true,
        maxWidth: '250px',
        ellipsis: true
    },

    {
        name: 'fecha',
        label: 'Fecha de Creación',
        field: 'createdAt',
        align: 'left',
        sortable: true
    },

    {
        name: 'estado',
        label: 'Estado',
        field: 'estado',
        align: 'center'
    },

    {
        name: 'opciones',
        label: 'Opciones',
        field: 'opciones',
        align: 'center'
    }

]