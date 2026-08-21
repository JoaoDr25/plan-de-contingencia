export const PLAN_CONTINGENCIA_MODEL = {
    _id: null,
    numero: null,

    clasificacionInformacion: null,

    programaFormacionId: null,
    programaFormacionNombre: null,

    actividadId: null,
    descripcionActividad: null,

    usuarioId: null,
    usuarioNombre: null,

    fecha: null,
    fechaCierre: null,
    horaSalida: null,
    horaRegreso: null,

    tipoTransporte: null,

    lugarSalida: null,
    lugarDestino: null,
    contactoLugar: null,

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
        objetivoSoporteLink: '',
        competencia: '',
        resultadoAprendizaje: '',
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

    createdAt: null,
    updatedAt: null
}