import { ROLES } from 'src/constants/system/roles.constants.js'

const USER_ROL = [ROLES.USUARIO]
const ADMIN_ROL = [ROLES.ADMINISTRADOR]
const ALL_ROL = [
  ROLES.SST,
  ROLES.PEDAGOGIA,
  ROLES.COORDINACION,
]

const routes = [
   {
    path: '/login',
    name: 'login',
    meta: {
      title: 'Inicio de sesión'
    },
    component: () => import('src/views/auth/LoginPage.vue')
  },
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    meta: {
      requiresAuth: true
    },
    children: [

      {
        path: '',
        name: 'dashboard',
        meta: {
          title: 'Dashboard',
          icon: 'dashboard'
        },
        component: () =>
          import('src/views/dashboard/DashboardPage.vue')
      },
      {
        path: 'planes',
        name: 'planes.list',
        meta: {
          title: 'Planes de Contingencia',
          icon: 'description',
          roles: [...USER_ROL, ...ADMIN_ROL, ...ALL_ROL]
        },
        component: () =>
          import('src/views/plans/PlanesPage.vue')
      },
      {
        path: 'planes/crear',
        name: 'planes.create',
        meta: {
          title: 'Planes de Contingencia',
          icon: 'description',
          backToPrevious: true,
          roles: [...USER_ROL, ...ADMIN_ROL]
        },
        component: () =>
          import('src/views/plans/PlanCreate.vue')
      },
      {
        path: 'planes/historico',
        name: 'planes.history',
        meta: {
          title: 'Histórico de Planes',
          icon: 'history',
          roles: [...USER_ROL, ...ADMIN_ROL, ...ALL_ROL]
        },
        component: () =>
          import('src/views/plans/PlanesHistoric.vue')
      },
      {
        path: 'planes/consulta',
        name: 'planes.consultation',
        meta: {
          title: 'Consulta de Planes',
          icon: 'search',
          roles: [...USER_ROL, ...ADMIN_ROL, ...ALL_ROL]
        },
        component: () =>
          import('src/views/plans/PlanesConsultation.vue')
      },
      {
        path: 'planes/etapa/:id',
        name: 'planes.stage',
        meta: {
          title: 'Detalles del Plan de Contingencia',
          icon: 'description',
          backToPrevious: true,
          roles: [...USER_ROL, ...ADMIN_ROL, ...ALL_ROL]
        },
        component: () =>
          import('src/views/plans/PlanReview.vue')
      },
      {
        path: 'planes/:id',
        name: 'planes.detail',
        meta: {
          title: 'Planes de Contingencia',
          icon: 'description',
          roles: [...USER_ROL, ...ADMIN_ROL, ...ALL_ROL],
          backToPrevious: true
        },
        component: () =>
          import('src/views/plans/PlanesDetails.vue')
      },
      {
        path: 'programas',
        name: 'programas.list',
        meta: {
          title: 'Programas de Formación',
          icon: 'school',
          roles: [...ADMIN_ROL, ...ALL_ROL]
        },
        component: () =>
          import('src/views/modules/ProgramasPage.vue')
      },
      {
        path: 'actividades',
        name: 'actividades.list',
        meta: {
          title: 'Actividades',
          icon: 'event',
          roles: [...ADMIN_ROL, ...ALL_ROL]
        },
        component: () =>
          import('src/views/modules/ActividadesPage.vue')
      },
      {
        path: 'peligros',
        name: 'peligros.list',
        meta: {
          title: 'Peligros',
          icon: 'warning',
          roles: [...ADMIN_ROL, ...ALL_ROL]
        },
        component: () =>
          import('src/views/modules/PeligrosPage.vue')
      },
      {
        path: 'riesgos',
        name: 'riesgos.list',
        meta: {
          title: 'Riesgos',
          icon: 'report_problem',
          roles: [...ADMIN_ROL, ...ALL_ROL]
        },
        component: () =>
          import('src/views/modules/RiesgosPage.vue')
      },
      {
        path: 'protocolos',
        name: 'protocolos.list',
        meta: {
          title: 'Protocolos',
          icon: 'assignment',
          roles: [...ADMIN_ROL, ...ALL_ROL]
        },
        component: () =>
          import('src/views/modules/ProtocolosPage.vue')
      },
      {
        path: 'usuarios',
        name: 'usuarios.list',
        meta: {
          title: 'Usuarios',
          icon: 'group',
          roles: [...USER_ROL, ...ADMIN_ROL, ...ALL_ROL]
        },
        component: () =>
          import('src/views/modules/UsuariosPage.vue')
      },
      {
        path: 'aprendices',
        name: 'aprendices.list',
        meta: {
          title: 'Aprendices',
          icon: 'badge',
          roles: [...USER_ROL, ...ADMIN_ROL, ...ALL_ROL]
        },
        component: () =>
          import('src/views/modules/AprendicesPage.vue')
      },
      {
        path: 'aprendices/:codigo',
        name: 'aprendices.detail',
        meta: {
          title: 'Información del Aprendiz',
          icon: 'badge',
          backToPrevious: true,
          roles: [...USER_ROL, ...ADMIN_ROL, ...ALL_ROL]
        },
        component: () =>
          import('src/views/details/AprendicesDetails.vue')
      },
      {
        path: 'contactos',
        name: 'contactos.list',
        meta: {
          title: 'Contactos de Emergencia',
          icon: 'call',
          roles: [...ADMIN_ROL, ...ALL_ROL]
        },
        component: () =>
          import('src/views/modules/ContactosPage.vue')
      },
      {
        path: 'epp',
        name: 'epp.list',
        meta: {
          title: 'Elementos de Protección Personal',
          icon: 'healt_and_safety',
          roles: [...ADMIN_ROL, ...ALL_ROL]
        },
        component: () =>
          import('src/views/modules/EppPage.vue')
      },
      {
        path: 'parametros',
        name: 'parametros.list',
        meta: {
          title: 'Parámetros del sistema',
          icon: 'settings',
          roles: [...ADMIN_ROL, ...ALL_ROL]
        },
        component: () =>
          import('src/views/modules/ParametrosPage.vue')
      }
    ]
  }

]

export default routes
