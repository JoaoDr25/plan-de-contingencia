const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [

      {
        path: '',
        component: () =>
          import('src/modules/dashboard/pages/DashboardPage.vue')
      },
      {
        path: 'planes',
        component: () =>
          import('src/modules/planes/pages/PlanListPage.vue')
      },
       {
        path: 'planes/crear',
        component: () =>
          import('src/modules/planes/pages/PlanCreatePage.vue')
      },
       {
        path: 'planes/:id',
        component: () =>
          import('src/modules/planes/pages/PlanDetailPage.vue')
      },
       {
        path: 'programas',
        component: () =>
          import('src/modules/programas/pages/ProgramasPage.vue')
      },
      {
        path: 'actividades',
        component: () =>
          import('src/modules/actividades/pages/ActividadesPage.vue')
      },
      {
        path: 'peligros',
        component: () =>
          import('src/modules/peligros/pages/PeligrosPage.vue')
      },
      {
        path: 'riesgos',
        component: () =>
          import('src/modules/riesgos/pages/RiesgosPage.vue')
      },
      {
        path: 'protocolos',
        component: () =>
          import('src/modules/protocolos/pages/ProtocolosPage.vue')
      },
      {
        path: 'usuarios',
        component: () =>
          import('src/modules/usuarios/pages/UsuariosPage.vue')
      },
      {
        path: 'aprendices',
        component: () =>
          import('src/modules/aprendices/pages/AprendicesPage.vue')
      },
      {
        path: 'contactos',
        component: () =>
          import('src/modules/contactos/pages/ContactosPage.vue')
      },
      {
        path: 'epp',
        component: () =>
          import('src/modules/epp/pages/EppPage.vue')
      },
      {
        path: 'parametros',
        component: () =>
          import('src/modules/parametros/pages/ParametrosPage.vue')
      }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('src/modules/ErrorNotFound.vue'),
  },
]

export default routes
