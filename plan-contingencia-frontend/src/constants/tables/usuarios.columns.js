export const USUARIOS_COLUMNS = [
     {
        name: 'index',
        label: 'N',
        field: 'codigo',
        align: 'center'
    },
    {
        name: 'documento',
        label: 'Documento',
        field: 'documento',
        align: 'left',
        sortable: true
    },
    {
        name: 'nombreCompleto',
        label: 'Nombre Completo',
        field: (row) => `${row.nombre} ${row.apellido}`,
        align: 'left',
        sortable: true,
        maxWidth: '180px',
        ellipsis: true
    },
    {
        name: 'correo',
        label: 'Correo Institucional',
        field: 'correo',
        align: 'left',
        maxWidth: '180px',
        ellipsis: true
    },
    {
        name: 'correoPersonal',
        label: 'Correo Personal',
        field: 'correoPersonal',
        align: 'left',
        maxWidth: '200px',
        ellipsis: true
    },
    {
        name: 'rol',
        label: 'Rol Asignado',
        field: 'rol',
        maxWidth: '140px',
        align: 'left'
    },
    {
        name: 'acceso',
        label: 'Último Acceso',
        maxWidth: '140px',
        field: 'acceso',
        align: 'center'
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