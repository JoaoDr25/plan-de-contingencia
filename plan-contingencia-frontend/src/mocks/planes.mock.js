export const PLANES_MOCK = [

    {
        _id: '66a100000000000000000001',
        numero: 1,

        clasificacionInformacion: 'publica',

        programaFormacionId: '66b200000000000000000001',
        programaFormacionNombre: 'Producción Agropecuaria',
        programaFormacionNivel: 'Tecnólogo',
        ficha: '3174863',

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
            '66e500000000000000000002',
            '66e500000000000000000003',
            '66e500000000000000000004',
            '66e500000000000000000005'
        ],
        riesgos: [
            {
                _id: '66e500000000000000000001',
                peligroId: '66d500000000000000000001',
                peligroNombre: 'Caídas al mismo nivel',
                riesgo: 'Resbalón en superficies húmedas',
                categoria: 'Físico',
                nivel: 'ALTO',
                consecuencia: 'Contusiones, esguinces o fracturas.',
                prevencion: 'Mantener superficies secas y utilizar calzado adecuado.'
            },
            {
                _id: '66e500000000000000000002',
                peligroId: '66d500000000000000000001',
                peligroNombre: 'Caídas al mismo nivel',
                riesgo: 'Tropiezo por obstáculos',
                categoria: 'Físico',
                nivel: 'MEDIO',
                consecuencia: 'Caídas y lesiones musculares.',
                prevencion: 'Mantener rutas despejadas y señalizadas.'
            },
            {
                _id: '66e500000000000000000003',
                peligroId: '66d500000000000000000002',
                peligroNombre: 'Exposición a ruido',
                riesgo: 'Fatiga auditiva',
                categoria: 'Físico',
                nivel: 'MEDIO',
                consecuencia: 'Disminución temporal de la capacidad auditiva.',
                prevencion: 'Uso de protección auditiva.'
            },
            {
                _id: '66e500000000000000000004',
                peligroId: '66d500000000000000000003',
                peligroNombre: 'Manipulación de herramientas',
                riesgo: 'Cortes por herramientas manuales',
                categoria: 'Mecánico',
                nivel: 'MEDIO',
                consecuencia: 'Heridas y laceraciones.',
                prevencion: 'Capacitación y uso correcto de herramientas.'
            },
            {
                _id: '66e500000000000000000005',
                peligroId: '66d500000000000000000004',
                peligroNombre: 'Contacto eléctrico',
                riesgo: 'Descarga eléctrica',
                categoria: 'Físico',
                nivel: 'ALTO',
                consecuencia: 'Quemaduras, lesiones graves o muerte.',
                prevencion: 'Verificar aislamiento y aplicar procedimientos seguros.'
            }
        ],

        aprendicesId: [
            '66f600000000000000000001',
            '66f600000000000000000002',
            '66f600000000000000000003',
            '66f600000000000000000004',
            '66f600000000000000000005',
            '66f600000000000000000006',
            '66f600000000000000000007',
            '66f600000000000000000008',
            '66f600000000000000000009',
            '66f600000000000000000010'
        ],

        contactosEmergencia: {
            contactosBase: [
                '670700000000000000000001',
                '670700000000000000000002',
                '670700000000000000000003'
            ],

            otro: {
                nombreEntidad: 'Bomberos Voluntarios',
                telefono: '607 765 4321',
                descripcion: '',
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
            objetivo: 'Fortalecer los conocimientos adquiridos sobre producción agropecuaria.',
            competencia: 'Implementar procesos productivos agropecuarios.',
            resultadoAprendizaje: 'Reconocer las condiciones necesarias para el desarrollo de procesos productivos.',
            planeacionPedagogicaLink: 'https://www.sena.edu.co/es-co/Documents/ejemplo-planeacion-pedagogica.pdf',
            guiaAprendizajeLink: 'https://www.sena.edu.co/es-co/Documents/ejemplo-guia-aprendizaje.pdf',
            otrosSoportesLink: 'https://www.sena.edu.co/es-co/Documents/ejemplo-otro-soporte.pdf',
            actasComportamientoLink: 'https://www.sena.edu.co/es-co/Documents/ejemplo-acta-comportamiento.pdf',
            consentimientoMenores: false,
            consentimientoLink: ''
        },

        planTrabajo: [

            {
                horaInicio: '07:00',
                actividad: 'Visita técnica a la unidad productiva',
                duracion: '02:00 h',
                lugar: 'Finca Experimental El Porvenir'
            },

            {
                horaInicio: '09:00',
                actividad: 'Reconocimiento de las áreas productivas',
                duracion: '01:30 h',
                lugar: 'Área de producción'
            },

            {
                horaInicio: '11:00',
                actividad: 'Actividad práctica relacionada con el proceso formativo',
                duracion: '02:00 h',
                lugar: 'Unidad productiva'
            },

            {
                horaInicio: '14:00',
                actividad: 'Socialización de resultados de la visita',
                duracion: '01:00 h',
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
                    nombre: 'Licencia del conductor',
                    cumple: true,
                    soporte: 'https://ejemplo.com/licencia-conductor.pdf',
                    observacion: ''
                },
                {
                    itemId: '2',
                    nombre: 'SOAT',
                    cumple: true,
                    soporte: 'https://ejemplo.com/soat.pdf',
                    observacion: ''
                },
                {
                    itemId: '3',
                    nombre: 'Revisión Tecno-mecánica',
                    cumple: true,
                    soporte: 'https://ejemplo.com/revision-tecnomecanica.pdf',
                    observacion: ''
                },
                {
                    itemId: '4',
                    nombre: 'Botiquín',
                    cumple: true,
                    soporte: 'https://ejemplo.com/botiquin.pdf',
                    observacion: ''
                },
                {
                    itemId: '5',
                    nombre: 'Extintor',
                    cumple: true,
                    soporte: 'https://ejemplo.com/extintor.pdf',
                    observacion: ''
                }
            ]
        },
        aprobaciones: {
            pedagogia: 'aprobado',
            sst: 'aprobado',
            coordinacion: 'pendiente'
        },

        estado: 'en revision',

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
        programaFormacionNivel: 'Tecnólogo',
        ficha: '2876549',

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
            competencia: 'Gestionar procesos ambientales.',
            resultadoAprendizaje: 'Identificar factores ambientales presentes en el territorio.',
            planeacionPedagogicaLink: 'https://www.sena.edu.co/es-co/Documents/ejemplo-planeacion-pedagogica.pdf',
            guiaAprendizajeLink: 'https://www.sena.edu.co/es-co/Documents/ejemplo-guia-aprendizaje.pdf',
            otrosSoportesLink: 'https://www.sena.edu.co/es-co/Documents/ejemplo-otro-soporte.pdf',
            actasComportamientoLink: 'https://www.sena.edu.co/es-co/Documents/ejemplo-acta-comportamiento.pdf',
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
        programaFormacionNivel: 'Tecnólogo',
        ficha: '3174863',

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
            competencia: 'Manejar sistemas productivos agropecuarios.',
            resultadoAprendizaje: 'Aplicar procedimientos básicos de manejo de cultivos.',
            planeacionPedagogicaLink: 'https://www.sena.edu.co/es-co/Documents/ejemplo-planeacion-pedagogica.pdf',
            guiaAprendizajeLink: 'https://www.sena.edu.co/es-co/Documents/ejemplo-guia-aprendizaje.pdf',
            otrosSoportesLink: 'https://www.sena.edu.co/es-co/Documents/ejemplo-otro-soporte.pdf',
            actasComportamientoLink: 'https://www.sena.edu.co/es-co/Documents/ejemplo-acta-comportamiento.pdf',
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
        programaFormacionNivel: 'Tecnólogo',
        ficha: '3174863',

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
            competencia: 'Supervisar procesos productivos.',
            resultadoAprendizaje: 'Evaluar condiciones del proceso productivo.',
            planeacionPedagogicaLink: 'https://www.sena.edu.co/es-co/Documents/ejemplo-planeacion-pedagogica.pdf',
            guiaAprendizajeLink: 'https://www.sena.edu.co/es-co/Documents/ejemplo-guia-aprendizaje.pdf',
            otrosSoportesLink: 'https://www.sena.edu.co/es-co/Documents/ejemplo-otro-soporte.pdf',
            actasComportamientoLink: 'https://www.sena.edu.co/es-co/Documents/ejemplo-acta-comportamiento.pdf',
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
        programaFormacionNivel: 'Técnico',
        ficha: '2876543',

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
            competencia: 'Gestionar sistemas productivos.',
            resultadoAprendizaje: 'Comparar diferentes alternativas de producción.',
            planeacionPedagogicaLink: 'https://www.sena.edu.co/es-co/Documents/ejemplo-planeacion-pedagogica.pdf',
            guiaAprendizajeLink: 'https://www.sena.edu.co/es-co/Documents/ejemplo-guia-aprendizaje.pdf',
            otrosSoportesLink: 'https://www.sena.edu.co/es-co/Documents/ejemplo-otro-soporte.pdf',
            actasComportamientoLink: 'https://www.sena.edu.co/es-co/Documents/ejemplo-acta-comportamiento.pdf',
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
        programaFormacionNivel: 'Tecnólogo',
        ficha: '2876549',

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
            competencia: 'Evaluar condiciones ambientales.',
            resultadoAprendizaje: 'Reconocer factores ambientales relevantes.',
            planeacionPedagogicaLink: 'https://www.sena.edu.co/es-co/Documents/ejemplo-planeacion-pedagogica.pdf',
            guiaAprendizajeLink: 'https://www.sena.edu.co/es-co/Documents/ejemplo-guia-aprendizaje.pdf',
            otrosSoportesLink: 'https://www.sena.edu.co/es-co/Documents/ejemplo-otro-soporte.pdf',
            actasComportamientoLink: 'https://www.sena.edu.co/es-co/Documents/ejemplo-acta-comportamiento.pdf',
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
        programaFormacionNivel: 'Tecnólogo',
        ficha: '3174863',

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
            competencia: 'Manejar sistemas productivos agropecuarios.',
            resultadoAprendizaje: 'Aplicar procedimientos de manejo productivo.',
            planeacionPedagogicaLink: 'https://www.sena.edu.co/es-co/Documents/ejemplo-planeacion-pedagogica.pdf',
            guiaAprendizajeLink: 'https://www.sena.edu.co/es-co/Documents/ejemplo-guia-aprendizaje.pdf',
            otrosSoportesLink: 'https://www.sena.edu.co/es-co/Documents/ejemplo-otro-soporte.pdf',
            actasComportamientoLink: 'https://www.sena.edu.co/es-co/Documents/ejemplo-acta-comportamiento.pdf',
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
        programaFormacionNivel: 'Tecnólogo',
        ficha: '2876549',

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
            competencia: 'Gestionar procesos ambientales.',
            resultadoAprendizaje: 'Identificar prácticas de conservación.',
            planeacionPedagogicaLink: 'https://www.sena.edu.co/es-co/Documents/ejemplo-planeacion-pedagogica.pdf',
            guiaAprendizajeLink: 'https://www.sena.edu.co/es-co/Documents/ejemplo-guia-aprendizaje.pdf',
            otrosSoportesLink: 'https://www.sena.edu.co/es-co/Documents/ejemplo-otro-soporte.pdf',
            actasComportamientoLink: 'https://www.sena.edu.co/es-co/Documents/ejemplo-acta-comportamiento.pdf',
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
        programaFormacionNivel: 'Técnico',
        ficha: '2876543',

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
            competencia: 'Gestionar proyectos productivos.',
            resultadoAprendizaje: 'Evaluar el desarrollo de actividades productivas.',
            planeacionPedagogicaLink: 'https://www.sena.edu.co/es-co/Documents/ejemplo-planeacion-pedagogica.pdf',
            guiaAprendizajeLink: 'https://www.sena.edu.co/es-co/Documents/ejemplo-guia-aprendizaje.pdf',
            otrosSoportesLink: 'https://www.sena.edu.co/es-co/Documents/ejemplo-otro-soporte.pdf',
            actasComportamientoLink: 'https://www.sena.edu.co/es-co/Documents/ejemplo-acta-comportamiento.pdf',
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
        programaFormacionNivel: 'Tecnólogo',
        ficha: '3174863',

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
            competencia: 'Implementar procesos productivos.',
            resultadoAprendizaje: 'Ejecutar actividades propias del proceso productivo.',
            planeacionPedagogicaLink: 'https://www.sena.edu.co/es-co/Documents/ejemplo-planeacion-pedagogica.pdf',
            guiaAprendizajeLink: 'https://www.sena.edu.co/es-co/Documents/ejemplo-guia-aprendizaje.pdf',
            otrosSoportesLink: 'https://www.sena.edu.co/es-co/Documents/ejemplo-otro-soporte.pdf',
            actasComportamientoLink: 'https://www.sena.edu.co/es-co/Documents/ejemplo-acta-comportamiento.pdf',
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
        programaFormacionNivel: 'Tecnólogo',
        ficha: '2876549',

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
            competencia: 'Evaluar condiciones ambientales.',
            resultadoAprendizaje: 'Analizar factores ambientales.',
            planeacionPedagogicaLink: 'https://www.sena.edu.co/es-co/Documents/ejemplo-planeacion-pedagogica.pdf',
            guiaAprendizajeLink: 'https://www.sena.edu.co/es-co/Documents/ejemplo-guia-aprendizaje.pdf',
            otrosSoportesLink: 'https://www.sena.edu.co/es-co/Documents/ejemplo-otro-soporte.pdf',
            actasComportamientoLink: 'https://www.sena.edu.co/es-co/Documents/ejemplo-acta-comportamiento.pdf',
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
        programaFormacionNivel: 'Técnico',
        ficha: '2876543',

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
            competencia: 'Implementar procesos productivos.',
            resultadoAprendizaje: 'Aplicar procedimientos técnicos.',
            planeacionPedagogicaLink: 'https://www.sena.edu.co/es-co/Documents/ejemplo-planeacion-pedagogica.pdf',
            guiaAprendizajeLink: 'https://www.sena.edu.co/es-co/Documents/ejemplo-guia-aprendizaje.pdf',
            otrosSoportesLink: 'https://www.sena.edu.co/es-co/Documents/ejemplo-otro-soporte.pdf',
            actasComportamientoLink: 'https://www.sena.edu.co/es-co/Documents/ejemplo-acta-comportamiento.pdf',
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
        programaFormacionNivel: 'Tecnólogo',
        ficha: '3174863',

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
            competencia: 'Manejar procesos productivos.',
            resultadoAprendizaje: 'Aplicar técnicas de producción.',
            planeacionPedagogicaLink: 'https://www.sena.edu.co/es-co/Documents/ejemplo-planeacion-pedagogica.pdf',
            guiaAprendizajeLink: 'https://www.sena.edu.co/es-co/Documents/ejemplo-guia-aprendizaje.pdf',
            otrosSoportesLink: 'https://www.sena.edu.co/es-co/Documents/ejemplo-otro-soporte.pdf',
            actasComportamientoLink: 'https://www.sena.edu.co/es-co/Documents/ejemplo-acta-comportamiento.pdf',
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

export const MOCK_APRENDICES = [
    {
        _id: '66f600000000000000000001',
        tipo: 'Cédula de Ciudadanía',
        numeroDocumento: '1098765432',
        nombreCompleto: 'Juan Sebastián Rodríguez',
        estado: 'activo',
        ficha: '3174863',
        programaFormacionId: '66b200000000000000000001'
    },
    {
        _id: '66f600000000000000000002',
        tipo: 'Tarjeta de Identidad',
        numeroDocumento: '1023456789',
        nombreCompleto: 'María Fernanda López',
        estado: 'activo',
        ficha: '3174863',
        programaFormacionId: '66b200000000000000000001'
    },
    {
        _id: '66f600000000000000000003',
        tipo: 'Cédula de Ciudadanía',
        numeroDocumento: '1001234567',
        nombreCompleto: 'Carlos Andrés Martínez',
        estado: 'activo',
        ficha: '3174863',
        programaFormacionId: '66b200000000000000000001'
    },
    {
        _id: '66f600000000000000000004',
        tipo: 'Cédula de Ciudadanía',
        numeroDocumento: '1095847362',
        nombreCompleto: 'Laura Daniela Torres',
        estado: 'activo',
        ficha: '3174863',
        programaFormacionId: '66b200000000000000000001'
    },
    {
        _id: '66f600000000000000000005',
        tipo: 'Tarjeta de Identidad',
        numeroDocumento: '1032456712',
        nombreCompleto: 'Andrés Felipe Morales',
        estado: 'activo',
        ficha: '3174863',
        programaFormacionId: '66b200000000000000000001'
    },
    {
        _id: '66f600000000000000000006',
        tipo: 'Cédula de Ciudadanía',
        numeroDocumento: '1098234561',
        nombreCompleto: 'Valentina Castro Silva',
        estado: 'activo',
        ficha: '3174863',
        programaFormacionId: '66b200000000000000000001'
    },
    {
        _id: '66f600000000000000000007',
        tipo: 'Cédula de Ciudadanía',
        numeroDocumento: '1002345890',
        nombreCompleto: 'Camilo Eduardo Vargas',
        estado: 'activo',
        ficha: '3174863',
        programaFormacionId: '66b200000000000000000001'
    },
    {
        _id: '66f600000000000000000008',
        tipo: 'Tarjeta de Identidad',
        numeroDocumento: '1035678901',
        nombreCompleto: 'Sofia Alejandra Ruiz',
        estado: 'activo',
        ficha: '3174863',
        programaFormacionId: '66b200000000000000000001'
    },
    {
        _id: '66f600000000000000000009',
        tipo: 'Cédula de Ciudadanía',
        numeroDocumento: '1098123456',
        nombreCompleto: 'Mateo Alexander Gómez',
        estado: 'activo',
        ficha: '3174863',
        programaFormacionId: '66b200000000000000000001'
    },
    {
        _id: '66f600000000000000000010',
        tipo: 'Cédula de Ciudadanía',
        numeroDocumento: '1003456789',
        nombreCompleto: 'Isabella Natalia Mendoza',
        estado: 'activo',
        ficha: '3174863',
        programaFormacionId: '66b200000000000000000001'
    }
]