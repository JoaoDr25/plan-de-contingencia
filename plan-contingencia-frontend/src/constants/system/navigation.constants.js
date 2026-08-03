import { ROLES } from './roles.constants.js'

export const navigation = {
    
     [ROLES.ADMINISTRADOR]: [
        {
            title: "Crear Plan",
            icon: "add",
            routeName: "planes.create"
        },
        {
            title: "Ver Planes",
            icon: "visibility",
            routeName: "planes.list"
        },
        {
            title: "Programas de Formación",
            icon: "school",
            routeName: "programas.list"
        },
        {
            title: "Actividades",
            icon: "event",
            routeName: "actividades.list"
        },
        {
            title: "Peligros",
            icon: "warning",
            routeName: "peligros.list"
        },
        {
            title: "Riesgos",
            icon: "report_problem",
            routeName: "riesgos.list"
        },
        {
            title: "Protocolos",
            icon: "assignment",
            routeName: "protocolos.list"
        },
        {
            title: "Usuarios",
            icon: "group",
            routeName: "usuarios.list"
        },
        {
            title: "Aprendices",
            icon: "badge",
            routeName: "aprendices.list"
        },
        {
            title: "Contactos de Emergencia",
            icon: "call",
            routeName: "contactos.list"
        },
        {
            title: "EPP",
            icon: "health_and_safety",
            routeName: "epp.list"
        },
        {
            title: "Parámetros del Sistema",
            icon: "settings",
            routeName: "parametros.list"
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