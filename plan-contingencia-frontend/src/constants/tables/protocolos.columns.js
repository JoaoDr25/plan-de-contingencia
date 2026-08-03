export const PROTOCOLOS_COLUMNS = [
    {
        name: 'index',
        label: 'N',
        field: 'id',
        align: 'center'
    },
    {
        name: 'tipo',
        label: 'Tipo de Emergencia',
        field: 'tipo',
        align: 'left',
        sortable: true,
        maxWidth: '220px',
        ellipsis: true
    },
    {
        name: 'accion',
        label: 'Acción inmediata',
        field: 'accion',
        align: 'left',
        maxWidth: '360px',
        ellipsis: true
    },
    {
        name: 'responsable',
        label: 'Responsable',
        field: 'responsable',
        align: 'left',
    },
    {
        name: 'medio',
        label: 'Medio de Comunicación',
        field: 'medio',
        align: 'left'
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