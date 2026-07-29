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
          import('src/modules/dashboard/DashboardPage.vue')
      },
      {
        path: 'planes',
        name: 'planes.list',
        meta: {
          title: 'Planes de Contingencia',
          icon: 'description'
        },
        component: () =>
          import('src/modules/planes/PlanListPage.vue')
      },
      {
        path: 'planes/crear',
        name: 'planes.create',
        meta: {
          title: 'Planes de Contingencia',
          icon: 'description'
        },
        component: () =>
          import('src/modules/planes/PlanCreatePage.vue')
      },
      {
        path: 'planes/:id',
        name: 'planes.detail',
        meta: {
          title: 'Planes de Contingencia',
          icon: 'description'
        },
        component: () =>
          import('src/modules/planes/PlanDetailPage.vue')
      },
      {
        path: 'programas',
        name: 'programas.list',
        meta: {
          title: 'Programas de Formación',
          icon: 'school'
        },
        component: () =>
          import('src/modules/programas/ProgramasPage.vue')
      },
      {
        path: 'actividades',
        name: 'actividades.list',
        meta: {
          title: 'Actividades',
          icon: 'event'
        },
        component: () =>
          import('src/modules/actividades/ActividadesPage.vue')
      },
      {
        path: 'peligros',
        name: 'peligros.list',
        meta: {
          title: 'Peligros',
          icon: 'warning'
        },
        component: () =>
          import('src/modules/peligros/PeligrosPage.vue')
      },
      {
        path: 'riesgos',
        name: 'riesgos.list',
        meta: {
          title: 'Riesgos',
          icon: 'report_problem'
        },
        component: () =>
          import('src/modules/riesgos/RiesgosPage.vue')
      },
      {
        path: 'protocolos',
        name: 'protocolos.list',
        meta: {
          title: 'Protocolos',
          icon: 'assignment'
        },
        component: () =>
          import('src/modules/protocolos/ProtocolosPage.vue')
      },
      {
        path: 'usuarios',
        name: 'usuarios.list',
        meta: {
          title: 'Usuarios',
          icon: 'group'
        },
        component: () =>
          import('src/modules/usuarios/UsuariosPage.vue')
      },
      {
        path: 'aprendices',
        name: 'aprendices.list',
        meta: {
          title: 'Aprendices',
          icon: 'badge'
        },
        component: () =>
          import('src/modules/aprendices/AprendicesPage.vue')
      },
      {
        path: 'contactos',
        name: 'contactos.list',
        meta: {
          title: 'Contactos de Emergencia',
          icon: 'call'
        },
        component: () =>
          import('src/modules/contactos/ContactosPage.vue')
      },
      {
        path: 'epp',
        name: 'epp.list',
        meta: {
          title: 'Elementos de Protección Personal',
          icon: 'healt_and_safety'
        },
        component: () =>
          import('src/modules/epp/EppPage.vue')
      },
      {
        path: 'parametros',
        name: 'parametros.list',
        meta: {
          title: 'Parámetros del sistema',
          icon: 'settings'
        },
        component: () =>
          import('src/modules/parametros/ParametrosPage.vue')
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
