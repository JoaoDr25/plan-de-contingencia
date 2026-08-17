export const PELIGROS_COLUMNS = [
     {
        name: 'index',
        label: 'N',
        field: 'codigo',
        align: 'center'
    },
    {
        name: 'nombre',
        label: 'Nombre del Peligro',
        field: 'nombre',
        align: 'left',
        sortable: true,
        maxWidth: '220px',
        ellipsis: true
    },
    {
        name: 'categoria',
        label: 'Categoría',
        field: 'categoria',
        align: 'left',
        sortable: true
    },
    {
        name: 'descripcion',
        label: 'Descripción',
        field: 'descripcion',
        align: 'left',
        maxWidth: '320px',
        ellipsis: true
    },
    {
        name: 'riesgos',
        label: 'Riesgos Asociados',
        field: 'riesgos',
        align: 'center'
    },
    {
        name: 'opciones',
        label: 'Opciones',
        field: 'opciones',
        align: 'center'
    }
]