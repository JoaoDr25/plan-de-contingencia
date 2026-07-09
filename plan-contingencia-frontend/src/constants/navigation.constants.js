import { ROLES } from './roles.constants.js'

export const navigation = {
    
     [ROLES.ADMINISTRADOR]: [
        {
            title: "Crear Plan",
            icon: "add"
        },
        {
            title: "Ver Planes",
            icon: "visibility"
        },
        {
            title: "Programas de Formación",
            icon: "school"
        },
        {
            title: "Actividades",
            icon: "event"
        },
        {
            title: "Peligros",
            icon: "warning"
        },
        {
            title: "Riesgos",
            icon: "report_problem"
        },
        {
            title: "Protocolos",
            icon: "assignment"
        },
        {
            title: "Usuarios",
            icon: "group"
        },
        {
            title: "Aprendices",
            icon: "badge"
        },
        {
            title: "Contactos de Emergencia",
            icon: "call"
        },
        {
            title: "EPP",
            icon: "health_and_safety"
        },
        {
            title: "Parámetros del Sistema",
            icon: "settings"
        }
    ],

    [ROLES.USUARIO]: [
{
            title: "Crear Plan",
            icon: "add"
        },
        {
            title: "Ver Planes",
            icon: "visibility"
        }
    ]
}