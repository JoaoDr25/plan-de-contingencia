export function createPlanContingenciaModel() {
    return {
        _id: null,

        numero: null,

        clasificacionInformacion: null,

        programaFormacionId: null,
        programaFormacionNombre: null,
        programaFormacionNivel: null,
        ficha: '',

        actividadId: null,
        descripcionActividad: '',

        usuarioId: null,
        usuarioNombre: '',

        fecha: null,
        horaSalida: null,
        horaRegreso: null,

        tipoTransporte: null,

        lugarSalida: '',
        lugarDestino: '',
        contactoLugar: '',

        riesgosId: [],

        aprendicesId: [],

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
            proyectoFormativo: false,
            visitaEmpresa: false,
            investigacion: false,
            otro: ''
        },

        contextoAcademico: {
            objetivo: '',
            competencia: '',
            resultadoAprendizaje: '',

            planeacionPedagogicaLink: '',
            guiaAprendizajeLink: '',
            otrosSoportesLink: '',
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

        revision: {
            validacionInformacion: false,

            instructor: {
                usuarioId: null,
                nombre: '',
                firma: null
            },

            pedagogia: {
                usuarioId: null,
                nombre: '',
                firma: null,
                estado: 'pendiente'
            },

            sst: {
                usuarioId: null,
                nombre: '',
                firma: null,
                estado: 'pendiente'
            },

            coordinacion: {
                usuarioId: null,
                nombre: '',
                firma: null,
                estado: 'pendiente'
            }
        },

        createdAt: null,
        updatedAt: null
    }
}