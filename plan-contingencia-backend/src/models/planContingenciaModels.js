import mongoose from "mongoose";

const urlValidator = {
    validator: function (v) {
        if (!v) return true;
        return /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i.test(v);
    },
    message: props => `${props.value} no es una URL válida!`
};

const planContingenciaSchema = new mongoose.Schema({
    clasificacionInformacion: {
        type: String,
        required: true,
        enum: ["publica", "clasificada", "reservada"]
    },
    programaFormacionId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "ProgramaFormacion",
        required: true
    },
    actividadId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Actividad",
        required: true
    },
    descripcionActividad: { 
        type: String,
        trim: true
    },
    usuarioId: {
        type: mongoose.Schema.Types.ObjectId,
        // ref: "Usuario" si se usa localmente
        index: true
    },
    usuarioNombre: {
        type: String,
        trim: true
    },
    instructorId: {
        type: mongoose.Schema.Types.ObjectId,
        // ref: "Usuario" si se usa localmente
        index: true
    },
    instructorNombre: {
        type: String,
        trim: true
    },
    fecha: {
        type: Date,
        required: true,
        validate: {
            validator: v => v instanceof Date && !isNaN(v),
            message: "Fecha inválida"
        }
    },
    horaSalida: {
        type: String,
        match: [/^\d{2}:\d{2}$/, "Formato HH:mm inválido"],
        required: true
    },
    tipoTransporte: {
        type: String,
        required: true,
        enum: ["SENA", "EXTERNO", "APRENDIZ"]
    },
    lugar: {
        type: String,
        required: true,
        trim: true
    },
    contactoLugar: {
        type: String,
        required: true,
        trim: true
    },
    contactosEmergencia: {
        centroSalud: {
            type: String,
            trim: true
        },
        policia: {
            type: String,
            trim: true
        },
        poliza: {
            type: String,
            trim: true
        },
        otro: {
            type: String,
            trim: true
        }
    },
    articulacionFormativa: {
        proyectoFormativo: {
            type: Boolean,
        },
        visitaEmpresa: {
            type: Boolean,
        },
        investigacion: {
            type: Boolean,
        },
        otro: {
            type: String,
            trim: true
        }
    },
    contextoAcademico: {
        objetivo: {
            type: String,
            trim: true
        },
        objetivoSoporteLink: {
            type: String,
            trim: true,
            validate: urlValidator
        },
        competencia: {
            type: String,
            trim: true
        },
        resultadoAprendizaje: {
            type: String,
            trim: true
        },
        actasComportamientoLink: {
            type: String,
            trim: true,
            validate: urlValidator
        },
        consentimientoMenores: {
            type: Boolean,
        },
        consentimientoLink: {
            type: String,
            trim: true,
            validate: urlValidator
        }
    },
    planTrabajo: [
        {
            hora: {
                type: String,
            },
            actividad: {
                type: String,
                trim: true
            },
            _id: false
        }],
    epp: [
        {
            nombre: {
                type: String,
                trim: true
            },
            seleccionado: {
                type: Boolean,
                default: false
            },
            _id: false
        }],
    botiquin: {
        type: Boolean,
        default: false
    },
    seguridadVial: {
        aplica: {
            type: Boolean,
            default: false
        },
        items: [
            {
                nombre: {
                    type: String,
                    trim: true
                },
                aplica: {
                    type: Boolean,
                    default: false
                },
                soporteLink: {
                    type: String,
                    trim: true,
                    validate: urlValidator
                },
                observaciones: {
                    type: String,
                    trim: true
                },
                _id: false
            }]
    },
    estado: {
        type: String,
        enum: ["borrador", "aprobado", "ejecutado"],
        default: "borrador"
    },
    observaciones: {
        type: String,
        trim: true
    }
}, {
    timestamps: true
});


export default mongoose.model('PlanContingencia', planContingenciaSchema);
