import { formatTime } from "src/utils/date.utils"

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
        name: 'fecha',
        label: 'Fecha de Salida',
        field: 'fecha',
        align: 'center',
        sortable: false
    },
    {
        name: 'hora',
        label: 'Hora de Creación',
        field: 'createdAt',
        align: 'center',
        sortable: false,
        format: (value) => formatTime(value)
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