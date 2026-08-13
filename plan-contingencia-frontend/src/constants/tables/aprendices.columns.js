export const APRENDICES_COLUMNS = [
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
        maxWidth: '260px',
        ellipsis: true
    },
    {
        name: 'programa',
        label: 'Programa de Formación',
        field: 'programa',
        align: 'left',
        sortable: true,
        maxWidth: '260px',
        ellipsis: true
    },
    {
        name: 'ficha',
        label: 'Ficha',
        field: 'ficha',
        align: 'left',
        sortable: true
    },
    {
        name: 'eps',
        label: 'Nombre EPS',
        field: 'eps',
        align: 'left',
        sortable: true
    },
    {
        name: 'contacto',
        label: 'Contacto de Emergencia',
        field: 'contacto',
        align: 'left',
        sortable: false,
        maxWidth: '200px',
        ellipsis: true
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