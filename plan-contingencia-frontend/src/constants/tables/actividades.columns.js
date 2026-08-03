export const ACTIVIDADES_COLUMNS = [
     {
        name: 'index',
        label: 'N',
        field: 'id',
        align: 'center'
    },
    {
        name: 'nombre',
        label: 'Nombre de la Actividad',
        field: 'nombre',
        align: 'left',
        sortable: true,
        maxWidth: '250px',
        ellipsis: true
    },
    {
        name: 'tipo',
        label: 'Tipo de Salida',
        field: 'tipo',
        align: 'left',
        sortable: true
    },
    {
        name: 'descripcion',
        label: 'Descripción',
        field: 'descripcion',
        align: 'left',
        sortable: false,
        maxWidth: '320px',
        ellipsis: true
    },
    {
        name: 'peligros',
        label: 'Peligros Asociados',
        field: 'peligros',
        align: 'center'
    },
    {
        name: 'opciones',
        label: 'Opciones',
        field: 'opciones',
        align: 'center'
    }
]