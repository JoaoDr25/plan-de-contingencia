export const CONTACTOS_COLUMNS = [
     {
        name: 'index',
        label: 'N',
        field: 'codigo',
        align: 'center'
    },
    {
        name: 'tipo',
        label: 'Tipo de Contacto',
        field: 'tipo',
        align: 'left',
        sortable: true
    },
    {
        name: 'nombre',
        label: 'Nombre de la Entidad',
        field: 'nombre',
        align: 'left',
        sortable: true,
        maxWidth: '320px',
        ellipsis: true
    },
    {
        name: 'telefono',
        label: 'Teléfono Principal',
        field: 'telefono',
        align: 'left'
    },
    {
        name: 'direccion',
        label: 'Dirección',
        field: 'direccion',
        align: 'left'
    },
    {
        name: 'ciudad',
        label: 'Ciudad',
        field: 'ciudad',
        align: 'left',
        sortable: false
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