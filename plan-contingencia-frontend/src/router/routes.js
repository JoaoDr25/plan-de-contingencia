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
          import('src/modules/dashboard/pages/DashboardPage.vue')
      },
      {
        path: 'planes',
        name: 'planes.list',
        meta: {
          title: 'Planes de Contingencia',
          icon: 'description'
        },
        component: () =>
          import('src/modules/planes/pages/PlanListPage.vue')
      },
      {
        path: 'planes/crear',
        name: 'planes.create',
        meta: {
          title: 'Planes de Contingencia',
          icon: 'description'
        },
        component: () =>
          import('src/modules/planes/pages/PlanCreatePage.vue')
      },
      {
        path: 'planes/:id',
        name: 'planes.detail',
        meta: {
          title: 'Planes de Contingencia',
          icon: 'description'
        },
        component: () =>
          import('src/modules/planes/pages/PlanDetailPage.vue')
      },
      {
        path: 'programas',
        name: 'programas.list',
        meta: {
          title: 'Programas de Formación',
          icon: 'school'
        },
        component: () =>
          import('src/modules/programas/pages/ProgramasPage.vue')
      },
      {
        path: 'actividades',
        name: 'actividades.list',
        meta: {
          title: 'Actividades',
          icon: 'event'
        },
        component: () =>
          import('src/modules/actividades/pages/ActividadesPage.vue')
      },
      {
        path: 'peligros',
        name: 'peligros.list',
        meta: {
          title: 'Peligros',
          icon: 'warning'
        },
        component: () =>
          import('src/modules/peligros/pages/PeligrosPage.vue')
      },
      {
        path: 'riesgos',
        name: 'riesgos.list',
        meta: {
          title: 'Riesgos',
          icon: 'report_problem'
        },
        component: () =>
          import('src/modules/riesgos/pages/RiesgosPage.vue')
      },
      {
        path: 'protocolos',
        name: 'protocolos.list',
        meta: {
          title: 'Protocolos',
          icon: 'assignment'
        },
        component: () =>
          import('src/modules/protocolos/pages/ProtocolosPage.vue')
      },
      {
        path: 'usuarios',
        name: 'usuarios.list',
        meta: {
          title: 'Usuarios',
          icon: 'group'
        },
        component: () =>
          import('src/modules/usuarios/pages/UsuariosPage.vue')
      },
      {
        path: 'aprendices',
        name: 'aprendices.list',
        meta: {
          title: 'Aprendices',
          icon: 'badge'
        },
        component: () =>
          import('src/modules/aprendices/pages/AprendicesPage.vue')
      },
      {
        path: 'contactos',
        name: 'contactos.list',
        meta: {
          title: 'Contactos de Emergencia',
          icon: 'call'
        },
        component: () =>
          import('src/modules/contactos/pages/ContactosPage.vue')
      },
      {
        path: 'epp',
        name: 'epp.list',
        meta: {
          title: 'Elementos de Protección Personal',
          icon: 'healt_and_safety'
        },
        component: () =>
          import('src/modules/epp/pages/EppPage.vue')
      },
      {
        path: 'parametros',
        name: 'parametros.list',
        meta: {
          title: 'Parámetros del sistema',
          icon: 'settings'
        },
        component: () =>
          import('src/modules/parametros/pages/ParametrosPage.vue')
      }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    name: 'not-found',
    meta: {
          title: 'Página no encontrada'
        },
    component: () => import('src/modules/ErrorNotFound.vue'),
  },
]

export default routes
