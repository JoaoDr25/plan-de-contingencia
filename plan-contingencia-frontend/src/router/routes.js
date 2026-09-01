const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
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
          backToPrevious: true
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
          backToPrevious: true
        },
        component: () =>
          import('src/views/plans/PlanCreate.vue')
      },
      {
        path: 'planes/historico',
        name: 'planes.history',
        meta: {
          title: 'Histórico de Planes',
          icon: 'history'
        },
        component: () =>
          import('src/views/plans/PlanesHistoric.vue')
      },
      {
        path: 'planes/consulta',
        name: 'planes.consultation',
        meta: {
          title: 'Consulta de Planes',
          icon: 'search'
        },
        component: () =>
          import('src/views/plans/PlanesConsultation.vue')
      },
      {
        path: 'planes/:id',
        name: 'planes.detail',
        meta: {
          title: 'Planes de Contingencia',
          icon: 'description',
          backToPrevious: true
        },
        component: () =>
          import('src/views/plans/PlanesDetails.vue')
      },
      {
        path: 'planes/etapa/:id',
        name: 'planes.stage',
        meta: {
          title: 'Detalles del Plan de Contingencia',
          icon: 'description',
          backToPrevious: true
        },
        component: () =>
          import('src/views/plans/PlanReview.vue')
      },
      {
        path: 'programas',
        name: 'programas.list',
        meta: {
          title: 'Programas de Formación',
          icon: 'school'
        },
        component: () =>
          import('src/views/modules/ProgramasPage.vue')
      },
      {
        path: 'actividades',
        name: 'actividades.list',
        meta: {
          title: 'Actividades',
          icon: 'event'
        },
        component: () =>
          import('src/views/modules/ActividadesPage.vue')
      },
      {
        path: 'peligros',
        name: 'peligros.list',
        meta: {
          title: 'Peligros',
          icon: 'warning'
        },
        component: () =>
          import('src/views/modules/PeligrosPage.vue')
      },
      {
        path: 'riesgos',
        name: 'riesgos.list',
        meta: {
          title: 'Riesgos',
          icon: 'report_problem'
        },
        component: () =>
          import('src/views/modules/RiesgosPage.vue')
      },
      {
        path: 'protocolos',
        name: 'protocolos.list',
        meta: {
          title: 'Protocolos',
          icon: 'assignment'
        },
        component: () =>
          import('src/views/modules/ProtocolosPage.vue')
      },
      {
        path: 'usuarios',
        name: 'usuarios.list',
        meta: {
          title: 'Usuarios',
          icon: 'group'
        },
        component: () =>
          import('src/views/modules/UsuariosPage.vue')
      },
      {
        path: 'aprendices',
        name: 'aprendices.list',
        meta: {
          title: 'Aprendices',
          icon: 'badge'
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
          backToPrevious: true
        },
        component: () =>
          import('src/views/details/AprendicesDetails.vue')
      },
      {
        path: 'contactos',
        name: 'contactos.list',
        meta: {
          title: 'Contactos de Emergencia',
          icon: 'call'
        },
        component: () =>
          import('src/views/modules/ContactosPage.vue')
      },
      {
        path: 'epp',
        name: 'epp.list',
        meta: {
          title: 'Elementos de Protección Personal',
          icon: 'healt_and_safety'
        },
        component: () =>
          import('src/views/modules/EppPage.vue')
      },
      {
        path: 'parametros',
        name: 'parametros.list',
        meta: {
          title: 'Parámetros del sistema',
          icon: 'settings'
        },
        component: () =>
          import('src/views/modules/ParametrosPage.vue')
      }
    ]
  },
]

export default routes
