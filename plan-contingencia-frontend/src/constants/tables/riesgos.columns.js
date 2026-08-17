export const RIESGOS_COLUMNS = [
     {
        name: 'index',
        label: 'N',
        field: 'codigo',
        align: 'center'
    },
    {
        name: 'riesgo',
        label: 'Riesgo',
        field: 'riesgo',
        align: 'left',
        sortable: true,
        maxWidth: '220px',
        ellipsis: true
    },
    {
        name: 'nivel',
        label: 'Nivel Riesgo',
        field: 'nivel',
        align: 'center'
    },
    {
        name: 'consecuencia',
        label: 'Consecuencia',
        field: 'consecuencia',
        align: 'left',
        sortable: true,
        maxWidth: '220px',
        ellipsis: true
    },
    {
        name: 'descripcion',
        label: 'Descripción',
        field: 'descripcion',
        align: 'left',
        maxWidth: '360px',
        ellipsis: true
    },
    {
        name: 'protocolos',
        label: 'Protocolos Asociados',
        field: 'protocolos',
        align: 'center'
    },
    {
        name: 'opciones',
        label: 'Opciones',
        field: 'opciones',
        align: 'center'
    }
]