import programasImage from 'src/assets/images/programas-formacion.png'
import actividadesImage from 'src/assets/images/actividades.png'
import peligrosImage from 'src/assets/images/peligros.png'
import riesgosImage from 'src/assets/images/riesgos.png'
import protocolosImage from 'src/assets/images/protocolos.png'
import usuariosImage from 'src/assets/images/usuarios.png'
import aprendicesImage from 'src/assets/images/aprendices.png'
import contactosImage from 'src/assets/images/contactos-emergencia.png'
import eppImage from 'src/assets/images/epp.png'
import parametrosImage from 'src/assets/images/parametros.png'

export const dashboardSummary = [
    {
        id: "planes-totales",
        title: 'Planes Totales',
        value: 16,
        description: 'Todos los planes registrados',
        icon: 'assignment'
    },
    {
        id: "en-revision",
        title: 'En Revisión',
        value: 8,
        description: 'Planes en Revisión',
        icon: 'edit'
    },
    {
        id: "aprobados",
        title: 'Aprobados',
        value: 16,
        description: 'Planes Aprobados',
        icon: 'task_alt'
    },
    {
        id: "ejecutados",
        title: 'Ejecutados',
        value: 8,
        description: 'Planes Finalizados',
        icon: 'event_available'
    }
]

export const dashboardModules = [
    {
        id:"programas-formacion",
        title: 'Programas de Formación',
        image: programasImage,
        routeName: 'programas.list'
    },
    {
        id: "actividades",
        title: 'Actividades',
        image: actividadesImage,
        routeName: 'actividades.list'
    },
    {
        id: "peligros",
        title: 'Peligros',
        image: peligrosImage,
        routeName: 'peligros.list'
    },
    {
        id: "riesgos",
        title: 'Riesgos',
        image: riesgosImage,
        routeName: 'riesgos.list'
    },
    {
        id: "protocolos",
        title: 'Protocolos',
        image: protocolosImage,
        routeName: 'protocolos.list'
    },
    {
        id: "usuarios",
        title: 'Usuarios',
        image: usuariosImage,
        routeName: 'usuarios.list'
    },
    {
        id: "aprendices",
        title: 'Aprendices',
        image: aprendicesImage,
        routeName: 'aprendices.list'
    },
    {
        id: "contactos-emergencia",
        title: 'Contactos de Emergencia',
        image: contactosImage,
        routeName: 'contactos.list'
    },
    {
        id: "elementos-proteccion-personal",
        title: 'Elementos de Protección Personal',
        image: eppImage,
        routeName: 'epp.list'
    },
    {
        id: "parametros-sistema",
        title: 'Parámetros del Sistema',
        image: parametrosImage,
        routeName: 'parametros.list'
    }
]