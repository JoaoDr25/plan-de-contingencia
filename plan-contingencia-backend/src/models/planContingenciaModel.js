import mongoose from "mongoose";
import { generarNumero } from "../utils/generarNumero.js";

const urlValidator = {
    validator: function (v) {
        if (!v) return true;
        return /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i.test(v);
    },
    message: props => `${props.value} no es una URL válida!`
};

const planContingenciaSchema = new mongoose.Schema({
    numero: {
        type: Number,
        unique: true,
        index: true
    },
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
        ref: 'Usuario',
        index: true
    },
    usuarioNombre: {
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
    riesgosId: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Riesgo"
        }
    ],
    aprendicesId: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Aprendiz"
        }
    ],
    contactosEmergencia:
    {
        contactosBase: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'ContactosEmergencia',
            }
        ],

        otro: {
            nombreEntidad: {
                type: String,
                trim: true
            },
            telefono: {
                type: String,
                trim: true
            },
            descripcion: {
                type: String,
                trim: true
            },
            ciudad: {
                type: String,
                trim: true
            }
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
            numero: {
                type: Number,
            },
            horaInicio: {
                type: String,
            },
            horaFin: {
                type: String,
            },
            duracion: {
                type: String,
            },
            actividad: {
                type: String,
                trim: true
            },
            descripcion: {
                type: String,
                trim: true
            },
            lugar: {
                type: String,
                trim: true
            }
        }],
    epp: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'ElementosProteccionPersonal'
        }
    ],
    seguridadVial: {
        aplica: {
            type: Boolean,
            default: false
        },
        items: [
            {
                itemId: {
                    type: String,
                    required: true
                },
                nombre: {
                    type: String,
                    required: true,
                    trim: true
                },
                cumple: {
                    type: Boolean,
                    default: false
                },
                soporte: {
                    type: String,
                    trim: true,
                    validate: urlValidator
                },
                observacion: {
                    type: String,
                    trim: true
                },
                _id: false
            }]
    },
    estado: {
        type: String,
        enum: ["borrador", "en revision", "aprobado", "cancelado", "ejecutado"],
        default: "borrador"
    },
    observaciones: {
        type: String,
        trim: true
    }
}, {
    timestamps: true
});

planContingenciaSchema.pre("save", async function (next) {

    if (!this.numero) {
        this.numero =
            await generarNumero("PlanContingencia")
    }
});

export default mongoose.model('PlanContingencia', planContingenciaSchema);
