export const PLANES_MOCK = [

    {
        _id: '66a100000000000000000001',
        numero: 1,

        clasificacionInformacion: 'publica',

        programaFormacionId: '66b200000000000000000001',
        programaFormacionNombre: 'Producción Agropecuaria',

        actividadId: '66c300000000000000000001',
        descripcionActividad: 'Visita técnica a unidad productiva agropecuaria.',

        usuarioId: '66d400000000000000000001',
        usuarioNombre: 'Carlos Andrés Gómez',

        fecha: '2026-09-15',
        horaSalida: '07:00',
        horaRegreso: '16:00',

        tipoTransporte: 'SENA',

        lugarSalida: 'Centro Agroturístico - SENA',
        lugarDestino: 'Finca Experimental El Porvenir',
        contactoLugar: '3105551001',

        riesgosId: [
            '66e500000000000000000001',
            '66e500000000000000000002'
        ],

        aprendicesId: [
            '66f600000000000000000001',
            '66f600000000000000000002',
            '66f600000000000000000003'
        ],

        contactosEmergencia: {
            contactosBase: [
                '670700000000000000000001'
            ],
            otro: {
                nombreEntidad: '',
                telefono: '',
                descripcion: '',
                ciudad: ''
            }
        },

        articulacionFormativa: {
            proyectoFormativo: true,
            visitaEmpresa: false,
            investigacion: false,
            otro: ''
        },

        contextoAcademico: {
            objetivo: 'Fortalecer los conocimientos adquiridos sobre producción agropecuaria.',
            objetivoSoporteLink: '',
            competencia: 'Implementar procesos productivos agropecuarios.',
            resultadoAprendizaje: 'Reconocer las condiciones necesarias para el desarrollo de procesos productivos.',
            actasComportamientoLink: '',
            consentimientoMenores: false,
            consentimientoLink: ''
        },

        planTrabajo: [
            {
                numero: 1,
                horaInicio: '07:00',
                horaFin: '08:00',
                duracion: '1 hora',
                actividad: 'Desplazamiento',
                descripcion: 'Traslado desde el centro de formación hasta el lugar de destino.',
                lugar: 'Centro Agroturístico - SENA'
            },
            {
                numero: 2,
                horaInicio: '08:00',
                horaFin: '12:00',
                duracion: '4 horas',
                actividad: 'Visita técnica',
                descripcion: 'Reconocimiento de procesos productivos.',
                lugar: 'Finca Experimental El Porvenir'
            }
        ],

        epp: [
            '671800000000000000000001',
            '671800000000000000000002'
        ],

        seguridadVial: {
            aplica: true,
            items: [
                {
                    itemId: '1',
                    nombre: 'Revisión de condiciones del vehículo',
                    cumple: true,
                    soporte: '',
                    observacion: ''
                },
                {
                    itemId: '2',
                    nombre: 'Uso de cinturón de seguridad',
                    cumple: true,
                    soporte: '',
                    observacion: ''
                }
            ]
        },

        estado: 'borrador',

        observaciones: '',

        createdAt: '2026-08-20T08:30:00.000Z',
        updatedAt: '2026-08-20T08:30:00.000Z'
    },

    {
        _id: '66a100000000000000000002',
        numero: 2,

        clasificacionInformacion: 'publica',

        programaFormacionId: '66b200000000000000000002',
        programaFormacionNombre: 'Gestión Ambiental',

        actividadId: '66c300000000000000000002',
        descripcionActividad: 'Salida académica para reconocimiento ambiental.',

        usuarioId: '66d400000000000000000002',
        usuarioNombre: 'María Fernanda Rodríguez',

        fecha: '2026-09-18',
        horaSalida: '06:30',
        horaRegreso: '17:00',

        tipoTransporte: 'EXTERNO',

        lugarSalida: 'Centro Agroturístico - SENA',
        lugarDestino: 'Reserva Natural El Refugio',
        contactoLugar: '3115552002',

        riesgosId: [
            '66e500000000000000000003'
        ],

        aprendicesId: [
            '66f600000000000000000004',
            '66f600000000000000000005'
        ],

        contactosEmergencia: {
            contactosBase: [
                '670700000000000000000002'
            ],
            otro: {
                nombreEntidad: '',
                telefono: '',
                descripcion: '',
                ciudad: ''
            }
        },

        articulacionFormativa: {
            proyectoFormativo: false,
            visitaEmpresa: false,
            investigacion: true,
            otro: ''
        },

        contextoAcademico: {
            objetivo: 'Reconocer ecosistemas y prácticas de conservación.',
            objetivoSoporteLink: '',
            competencia: 'Gestionar procesos ambientales.',
            resultadoAprendizaje: 'Identificar factores ambientales presentes en el territorio.',
            actasComportamientoLink: '',
            consentimientoMenores: false,
            consentimientoLink: ''
        },

        planTrabajo: [],

        epp: [
            '671800000000000000000003'
        ],

        seguridadVial: {
            aplica: true,
            items: []
        },

        estado: 'borrador',

        observaciones: '',

        createdAt: '2026-08-21T09:00:00.000Z',
        updatedAt: '2026-08-21T09:00:00.000Z'
    },

    {
        _id: '66a100000000000000000003',
        numero: 3,

        clasificacionInformacion: 'clasificada',

        programaFormacionId: '66b200000000000000000001',
        programaFormacionNombre: 'Producción Agropecuaria',

        actividadId: '66c300000000000000000003',
        descripcionActividad: 'Práctica de reconocimiento de cultivos.',

        usuarioId: '66d400000000000000000003',
        usuarioNombre: 'Jorge Luis Martínez',

        fecha: '2026-09-22',
        horaSalida: '07:30',
        horaRegreso: '15:30',

        tipoTransporte: 'APRENDIZ',

        lugarSalida: 'Centro Agroturístico - SENA',
        lugarDestino: 'Unidad Productiva La Esperanza',
        contactoLugar: '3125553003',

        riesgosId: [
            '66e500000000000000000001'
        ],

        aprendicesId: [
            '66f600000000000000000006'
        ],

        contactosEmergencia: {
            contactosBase: [],
            otro: {
                nombreEntidad: 'Hospital Local',
                telefono: '6075553003',
                descripcion: 'Atención de emergencias',
                ciudad: 'Socorro'
            }
        },

        articulacionFormativa: {
            proyectoFormativo: true,
            visitaEmpresa: false,
            investigacion: false,
            otro: ''
        },

        contextoAcademico: {
            objetivo: 'Aplicar conocimientos relacionados con el establecimiento de cultivos.',
            objetivoSoporteLink: '',
            competencia: 'Manejar sistemas productivos agropecuarios.',
            resultadoAprendizaje: 'Aplicar procedimientos básicos de manejo de cultivos.',
            actasComportamientoLink: '',
            consentimientoMenores: false,
            consentimientoLink: ''
        },

        planTrabajo: [],

        epp: [],

        seguridadVial: {
            aplica: false,
            items: []
        },

        estado: 'borrador',

        observaciones: '',

        createdAt: '2026-08-21T10:00:00.000Z',
        updatedAt: '2026-08-21T10:00:00.000Z'
    },

    {
        _id: '66a100000000000000000004',
        numero: 4,

        clasificacionInformacion: 'publica',

        programaFormacionId: '66b200000000000000000001',
        programaFormacionNombre: 'Producción Agropecuaria',

        actividadId: '66c300000000000000000004',
        descripcionActividad: 'Visita técnica de seguimiento a proceso productivo.',

        usuarioId: '66d400000000000000000001',
        usuarioNombre: 'Carlos Andrés Gómez',

        fecha: '2026-09-25',
        horaSalida: '07:00',
        horaRegreso: '16:00',

        tipoTransporte: 'SENA',

        lugarSalida: 'Centro Agroturístico - SENA',
        lugarDestino: 'Granja Experimental SENA',
        contactoLugar: '3135554004',

        riesgosId: [
            '66e500000000000000000002'
        ],

        aprendicesId: [
            '66f600000000000000000007',
            '66f600000000000000000008'
        ],

        contactosEmergencia: {
            contactosBase: [
                '670700000000000000000001'
            ],
            otro: {
                nombreEntidad: '',
                telefono: '',
                descripcion: '',
                ciudad: ''
            }
        },

        articulacionFormativa: {
            proyectoFormativo: true,
            visitaEmpresa: true,
            investigacion: false,
            otro: ''
        },

        contextoAcademico: {
            objetivo: 'Realizar seguimiento al proceso productivo.',
            objetivoSoporteLink: '',
            competencia: 'Supervisar procesos productivos.',
            resultadoAprendizaje: 'Evaluar condiciones del proceso productivo.',
            actasComportamientoLink: '',
            consentimientoMenores: false,
            consentimientoLink: ''
        },

        planTrabajo: [],

        epp: [
            '671800000000000000000001'
        ],

        seguridadVial: {
            aplica: true,
            items: []
        },

        estado: 'en revision',

        observaciones: '',

        createdAt: '2026-08-21T11:00:00.000Z',
        updatedAt: '2026-08-22T09:00:00.000Z'
    },

    {
        _id: '66a100000000000000000005',
        numero: 5,

        clasificacionInformacion: 'publica',

        programaFormacionId: '66b200000000000000000003',
        programaFormacionNombre: 'Producción Agropecuaria',

        actividadId: '66c300000000000000000005',
        descripcionActividad: 'Salida académica para reconocimiento de sistemas productivos.',

        usuarioId: '66d400000000000000000004',
        usuarioNombre: 'Laura Marcela Pérez',

        fecha: '2026-09-28',
        horaSalida: '06:00',
        horaRegreso: '18:00',

        tipoTransporte: 'EXTERNO',

        lugarSalida: 'Centro Agroturístico - SENA',
        lugarDestino: 'Finca San Miguel',
        contactoLugar: '3145555005',

        riesgosId: [
            '66e500000000000000000001',
            '66e500000000000000000003'
        ],

        aprendicesId: [
            '66f600000000000000000009',
            '66f600000000000000000010'
        ],

        contactosEmergencia: {
            contactosBase: [
                '670700000000000000000002'
            ],
            otro: {
                nombreEntidad: '',
                telefono: '',
                descripcion: '',
                ciudad: ''
            }
        },

        articulacionFormativa: {
            proyectoFormativo: false,
            visitaEmpresa: true,
            investigacion: false,
            otro: ''
        },

        contextoAcademico: {
            objetivo: 'Analizar diferentes sistemas de producción.',
            objetivoSoporteLink: '',
            competencia: 'Gestionar sistemas productivos.',
            resultadoAprendizaje: 'Comparar diferentes alternativas de producción.',
            actasComportamientoLink: '',
            consentimientoMenores: false,
            consentimientoLink: ''
        },

        planTrabajo: [],

        epp: [],

        seguridadVial: {
            aplica: true,
            items: []
        },

        estado: 'en revision',

        observaciones: '',

        createdAt: '2026-08-22T08:00:00.000Z',
        updatedAt: '2026-08-22T10:00:00.000Z'
    },

    {
        _id: '66a100000000000000000006',
        numero: 6,

        clasificacionInformacion: 'clasificada',

        programaFormacionId: '66b200000000000000000002',
        programaFormacionNombre: 'Gestión Ambiental',

        actividadId: '66c300000000000000000006',
        descripcionActividad: 'Actividad de reconocimiento de condiciones ambientales.',

        usuarioId: '66d400000000000000000002',
        usuarioNombre: 'María Fernanda Rodríguez',

        fecha: '2026-10-02',
        horaSalida: '07:00',
        horaRegreso: '16:30',

        tipoTransporte: 'SENA',

        lugarSalida: 'Centro Agroturístico - SENA',
        lugarDestino: 'Zona Rural del Socorro',
        contactoLugar: '3155556006',

        riesgosId: [
            '66e500000000000000000003'
        ],

        aprendicesId: [
            '66f600000000000000000011'
        ],

        contactosEmergencia: {
            contactosBase: [
                '670700000000000000000003'
            ],
            otro: {
                nombreEntidad: '',
                telefono: '',
                descripcion: '',
                ciudad: ''
            }
        },

        articulacionFormativa: {
            proyectoFormativo: false,
            visitaEmpresa: false,
            investigacion: true,
            otro: ''
        },

        contextoAcademico: {
            objetivo: 'Identificar condiciones ambientales del territorio.',
            objetivoSoporteLink: '',
            competencia: 'Evaluar condiciones ambientales.',
            resultadoAprendizaje: 'Reconocer factores ambientales relevantes.',
            actasComportamientoLink: '',
            consentimientoMenores: false,
            consentimientoLink: ''
        },

        planTrabajo: [],

        epp: [
            '671800000000000000000003'
        ],

        seguridadVial: {
            aplica: false,
            items: []
        },

        estado: 'en revision',

        observaciones: '',

        createdAt: '2026-08-22T09:30:00.000Z',
        updatedAt: '2026-08-23T08:30:00.000Z'
    },

    {
        _id: '66a100000000000000000007',
        numero: 7,

        clasificacionInformacion: 'publica',

        programaFormacionId: '66b200000000000000000001',
        programaFormacionNombre: 'Producción Agropecuaria',

        actividadId: '66c300000000000000000007',
        descripcionActividad: 'Visita técnica a unidad productiva.',

        usuarioId: '66d400000000000000000001',
        usuarioNombre: 'Carlos Andrés Gómez',

        fecha: '2026-08-10',
        horaSalida: '07:00',
        horaRegreso: '15:00',

        tipoTransporte: 'SENA',

        lugarSalida: 'Centro Agroturístico - SENA',
        lugarDestino: 'Granja Experimental SENA',
        contactoLugar: '3165557007',

        riesgosId: [
            '66e500000000000000000001'
        ],

        aprendicesId: [
            '66f600000000000000000012'
        ],

        contactosEmergencia: {
            contactosBase: [
                '670700000000000000000001'
            ],
            otro: {
                nombreEntidad: '',
                telefono: '',
                descripcion: '',
                ciudad: ''
            }
        },

        articulacionFormativa: {
            proyectoFormativo: true,
            visitaEmpresa: false,
            investigacion: false,
            otro: ''
        },

        contextoAcademico: {
            objetivo: 'Aplicar conocimientos de producción agropecuaria.',
            objetivoSoporteLink: '',
            competencia: 'Manejar sistemas productivos agropecuarios.',
            resultadoAprendizaje: 'Aplicar procedimientos de manejo productivo.',
            actasComportamientoLink: '',
            consentimientoMenores: false,
            consentimientoLink: ''
        },

        planTrabajo: [],

        epp: [],

        seguridadVial: {
            aplica: true,
            items: []
        },

        estado: 'aprobado',

        observaciones: '',

        createdAt: '2026-08-05T08:00:00.000Z',
        updatedAt: '2026-08-07T14:00:00.000Z'
    },

    {
        _id: '66a100000000000000000008',
        numero: 8,

        clasificacionInformacion: 'publica',

        programaFormacionId: '66b200000000000000000002',
        programaFormacionNombre: 'Gestión Ambiental',

        actividadId: '66c300000000000000000008',
        descripcionActividad: 'Visita de observación ambiental.',

        usuarioId: '66d400000000000000000002',
        usuarioNombre: 'María Fernanda Rodríguez',

        fecha: '2026-08-12',
        horaSalida: '06:30',
        horaRegreso: '17:00',

        tipoTransporte: 'EXTERNO',

        lugarSalida: 'Centro Agroturístico - SENA',
        lugarDestino: 'Reserva Natural El Refugio',
        contactoLugar: '3175558008',

        riesgosId: [
            '66e500000000000000000003'
        ],

        aprendicesId: [
            '66f600000000000000000013'
        ],

        contactosEmergencia: {
            contactosBase: [
                '670700000000000000000002'
            ],
            otro: {
                nombreEntidad: '',
                telefono: '',
                descripcion: '',
                ciudad: ''
            }
        },

        articulacionFormativa: {
            proyectoFormativo: false,
            visitaEmpresa: false,
            investigacion: true,
            otro: ''
        },

        contextoAcademico: {
            objetivo: 'Observar procesos de conservación ambiental.',
            objetivoSoporteLink: '',
            competencia: 'Gestionar procesos ambientales.',
            resultadoAprendizaje: 'Identificar prácticas de conservación.',
            actasComportamientoLink: '',
            consentimientoMenores: false,
            consentimientoLink: ''
        },

        planTrabajo: [],

        epp: [],

        seguridadVial: {
            aplica: true,
            items: []
        },

        estado: 'aprobado',

        observaciones: '',

        createdAt: '2026-08-06T09:00:00.000Z',
        updatedAt: '2026-08-08T11:00:00.000Z'
    },

    {
        _id: '66a100000000000000000009',
        numero: 9,

        clasificacionInformacion: 'clasificada',

        programaFormacionId: '66b200000000000000000003',
        programaFormacionNombre: 'Producción Agropecuaria',

        actividadId: '66c300000000000000000009',
        descripcionActividad: 'Visita de seguimiento a proyecto formativo.',

        usuarioId: '66d400000000000000000004',
        usuarioNombre: 'Laura Marcela Pérez',

        fecha: '2026-08-15',
        horaSalida: '07:30',
        horaRegreso: '16:00',

        tipoTransporte: 'SENA',

        lugarSalida: 'Centro Agroturístico - SENA',
        lugarDestino: 'Unidad Productiva La Esperanza',
        contactoLugar: '3185559009',

        riesgosId: [
            '66e500000000000000000001'
        ],

        aprendicesId: [
            '66f600000000000000000014'
        ],

        contactosEmergencia: {
            contactosBase: [
                '670700000000000000000001'
            ],
            otro: {
                nombreEntidad: '',
                telefono: '',
                descripcion: '',
                ciudad: ''
            }
        },

        articulacionFormativa: {
            proyectoFormativo: true,
            visitaEmpresa: false,
            investigacion: false,
            otro: ''
        },

        contextoAcademico: {
            objetivo: 'Realizar seguimiento al proyecto formativo.',
            objetivoSoporteLink: '',
            competencia: 'Gestionar proyectos productivos.',
            resultadoAprendizaje: 'Evaluar el desarrollo de actividades productivas.',
            actasComportamientoLink: '',
            consentimientoMenores: false,
            consentimientoLink: ''
        },

        planTrabajo: [],

        epp: [],

        seguridadVial: {
            aplica: true,
            items: []
        },

        estado: 'aprobado',

        observaciones: '',

        createdAt: '2026-08-08T08:30:00.000Z',
        updatedAt: '2026-08-10T12:00:00.000Z'
    },

    {
        _id: '66a100000000000000000010',
        numero: 10,

        clasificacionInformacion: 'publica',

        programaFormacionId: '66b200000000000000000001',
        programaFormacionNombre: 'Producción Agropecuaria',

        actividadId: '66c300000000000000000010',
        descripcionActividad: 'Salida técnica de aplicación de conocimientos.',

        usuarioId: '66d400000000000000000001',
        usuarioNombre: 'Carlos Andrés Gómez',

        fecha: '2026-07-20',
        horaSalida: '07:00',
        horaRegreso: '16:00',

        tipoTransporte: 'SENA',

        lugarSalida: 'Centro Agroturístico - SENA',
        lugarDestino: 'Granja Experimental SENA',
        contactoLugar: '3195551010',

        riesgosId: [
            '66e500000000000000000001'
        ],

        aprendicesId: [
            '66f600000000000000000015'
        ],

        contactosEmergencia: {
            contactosBase: [
                '670700000000000000000001'
            ],
            otro: {
                nombreEntidad: '',
                telefono: '',
                descripcion: '',
                ciudad: ''
            }
        },

        articulacionFormativa: {
            proyectoFormativo: true,
            visitaEmpresa: false,
            investigacion: false,
            otro: ''
        },

        contextoAcademico: {
            objetivo: 'Aplicar conocimientos adquiridos durante la formación.',
            objetivoSoporteLink: '',
            competencia: 'Implementar procesos productivos.',
            resultadoAprendizaje: 'Ejecutar actividades propias del proceso productivo.',
            actasComportamientoLink: '',
            consentimientoMenores: false,
            consentimientoLink: ''
        },

        planTrabajo: [],

        epp: [],

        seguridadVial: {
            aplica: true,
            items: []
        },

        estado: 'ejecutado',

        observaciones: 'Plan ejecutado satisfactoriamente.',

        createdAt: '2026-07-10T08:00:00.000Z',
        updatedAt: '2026-07-20T17:00:00.000Z'
    },

    {
        _id: '66a100000000000000000011',
        numero: 11,

        clasificacionInformacion: 'publica',

        programaFormacionId: '66b200000000000000000002',
        programaFormacionNombre: 'Gestión Ambiental',

        actividadId: '66c300000000000000000011',
        descripcionActividad: 'Salida académica de reconocimiento ambiental.',

        usuarioId: '66d400000000000000000002',
        usuarioNombre: 'María Fernanda Rodríguez',

        fecha: '2026-07-25',
        horaSalida: '06:30',
        horaRegreso: '17:00',

        tipoTransporte: 'EXTERNO',

        lugarSalida: 'Centro Agroturístico - SENA',
        lugarDestino: 'Reserva Natural El Refugio',
        contactoLugar: '3105551111',

        riesgosId: [
            '66e500000000000000000003'
        ],

        aprendicesId: [
            '66f600000000000000000016'
        ],

        contactosEmergencia: {
            contactosBase: [
                '670700000000000000000002'
            ],
            otro: {
                nombreEntidad: '',
                telefono: '',
                descripcion: '',
                ciudad: ''
            }
        },

        articulacionFormativa: {
            proyectoFormativo: false,
            visitaEmpresa: false,
            investigacion: true,
            otro: ''
        },

        contextoAcademico: {
            objetivo: 'Analizar condiciones ambientales.',
            objetivoSoporteLink: '',
            competencia: 'Evaluar condiciones ambientales.',
            resultadoAprendizaje: 'Analizar factores ambientales.',
            actasComportamientoLink: '',
            consentimientoMenores: false,
            consentimientoLink: ''
        },

        planTrabajo: [],

        epp: [],

        seguridadVial: {
            aplica: true,
            items: []
        },

        estado: 'ejecutado',

        observaciones: 'Actividad ejecutada sin novedades.',

        createdAt: '2026-07-15T09:00:00.000Z',
        updatedAt: '2026-07-25T18:00:00.000Z'
    },

    {
        _id: '66a100000000000000000012',
        numero: 12,

        clasificacionInformacion: 'publica',

        programaFormacionId: '66b200000000000000000003',
        programaFormacionNombre: 'Producción Agropecuaria',

        actividadId: '66c300000000000000000012',
        descripcionActividad: 'Salida técnica cancelada por condiciones externas.',

        usuarioId: '66d400000000000000000004',
        usuarioNombre: 'Laura Marcela Pérez',

        fecha: '2026-07-28',
        horaSalida: '07:00',
        horaRegreso: '16:00',

        tipoTransporte: 'SENA',

        lugarSalida: 'Centro Agroturístico - SENA',
        lugarDestino: 'Finca San Miguel',
        contactoLugar: '3115551212',

        riesgosId: [
            '66e500000000000000000001'
        ],

        aprendicesId: [
            '66f600000000000000000017'
        ],

        contactosEmergencia: {
            contactosBase: [],
            otro: {
                nombreEntidad: '',
                telefono: '',
                descripcion: '',
                ciudad: ''
            }
        },

        articulacionFormativa: {
            proyectoFormativo: true,
            visitaEmpresa: false,
            investigacion: false,
            otro: ''
        },

        contextoAcademico: {
            objetivo: 'Realizar actividad práctica.',
            objetivoSoporteLink: '',
            competencia: 'Implementar procesos productivos.',
            resultadoAprendizaje: 'Aplicar procedimientos técnicos.',
            actasComportamientoLink: '',
            consentimientoMenores: false,
            consentimientoLink: ''
        },

        planTrabajo: [],

        epp: [],

        seguridadVial: {
            aplica: true,
            items: []
        },

        estado: 'cancelado',

        observaciones: 'Plan cancelado antes de su ejecución.',

        createdAt: '2026-07-18T08:00:00.000Z',
        updatedAt: '2026-07-27T15:30:00.000Z'
    },

    {
        _id: '66a100000000000000000013',
        numero: 13,

        clasificacionInformacion: 'clasificada',

        programaFormacionId: '66b200000000000000000001',
        programaFormacionNombre: 'Producción Agropecuaria',

        actividadId: '66c300000000000000000013',
        descripcionActividad: 'Salida académica cancelada por reprogramación institucional.',

        usuarioId: '66d400000000000000000003',
        usuarioNombre: 'Jorge Luis Martínez',

        fecha: '2026-08-05',
        horaSalida: '07:30',
        horaRegreso: '15:30',

        tipoTransporte: 'APRENDIZ',

        lugarSalida: 'Centro Agroturístico - SENA',
        lugarDestino: 'Unidad Productiva La Esperanza',
        contactoLugar: '3125551313',

        riesgosId: [
            '66e500000000000000000002'
        ],

        aprendicesId: [
            '66f600000000000000000018'
        ],

        contactosEmergencia: {
            contactosBase: [],
            otro: {
                nombreEntidad: '',
                telefono: '',
                descripcion: '',
                ciudad: ''
            }
        },

        articulacionFormativa: {
            proyectoFormativo: true,
            visitaEmpresa: false,
            investigacion: false,
            otro: ''
        },

        contextoAcademico: {
            objetivo: 'Desarrollar actividad práctica.',
            objetivoSoporteLink: '',
            competencia: 'Manejar procesos productivos.',
            resultadoAprendizaje: 'Aplicar técnicas de producción.',
            actasComportamientoLink: '',
            consentimientoMenores: false,
            consentimientoLink: ''
        },

        planTrabajo: [],

        epp: [],

        seguridadVial: {
            aplica: false,
            items: []
        },

        estado: 'cancelado',

        observaciones: 'Plan cancelado debido a reprogramación de la actividad.',

        createdAt: '2026-07-22T10:00:00.000Z',
        updatedAt: '2026-08-01T09:00:00.000Z'
    }

]