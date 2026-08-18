# Sistema de Gestión de Planes de Contingencia

## Arquitectura del Frontend

### Proyecto

Sistema de Gestión de Planes de Contingencia para el SENA.

Frontend desarrollado utilizando Vue 3 y Quasar Framework, siguiendo una arquitectura modular, reutilizable y escalable para integrarse con la API REST desarrollada en Node.js y MongoDB.

---

# Objetivos

El frontend busca cumplir los siguientes principios:

- Modularidad.
- Reutilización.
- Escalabilidad.
- Separación de responsabilidades.
- Componentes desacoplados.
- Integración con backend mediante API REST.
- Código mantenible.
- Preparación para producción.

---

# Stack Tecnológico

| Tecnología | Uso |
|------------|-----|
| Vue 3 | Framework Frontend |
| Quasar Framework | Framework UI |
| Vite | Bundler |
| Vue Router | Navegación |
| Pinia | Gestión del estado |
| Axios | Cliente HTTP |
| Sass | Preprocesador CSS |
| ESLint | Calidad del código |
| Prettier | Formateo |
| Vitest | Pruebas Unitarias |
| Vue Test Utils | Testing de Componentes |

---

## Configuración Base del Proyecto

El proyecto fue inicializado utilizando Quasar Framework sobre Vue 3 y Vite.

La estructura inicial generada por Quasar fue auditada antes de iniciar el desarrollo del sistema con el objetivo de comprender la función de cada archivo, mantener únicamente los elementos necesarios y adaptar progresivamente la plantilla a la arquitectura del Sistema de Gestión de Planes de Contingencia.

La auditoría contempla los siguientes aspectos:

- Configuración general.
- Dependencias.
- Configuración de Quasar.
- Router.
- Layouts.
- Componentes.
- Gestión del estado.
- Boot Files.
- Sistema de estilos.
- Herramientas de calidad.

Durante la auditoría inicial se revisó el archivo `package.json`, verificando la configuración general del proyecto, los scripts disponibles y las dependencias instaladas por defecto.

Se decidió mantener la configuración base generada por Quasar debido a su compatibilidad con la arquitectura definida para el Sistema de Gestión de Planes de Contingencia.

Las dependencias adicionales (Axios, Vitest, Vue Test Utils, Husky, lint-staged, Day.js y VueUse) serán incorporadas en las fases correspondientes del desarrollo para evitar agregar herramientas que aún no se utilicen.

---

## Configuración de Quasar

El proyecto utiliza el archivo `quasar.config.js` como punto central de configuración del framework.

Durante la auditoría inicial se identificó que únicamente se utilizarán las siguientes secciones como parte de la arquitectura del sistema:

- Boot Files.
- Configuración de estilos globales.
- Build.
- Framework.
- DevServer.

Las demás configuraciones (SSR, PWA, Cordova, Electron y Browser Extensions) permanecerán con la configuración por defecto mientras el proyecto se mantenga como una aplicación SPA.

---

## Arquitectura General

El frontend utiliza la arquitectura de navegación propuesta por Vue Router y Quasar Framework.

El componente `App.vue` actúa únicamente como punto de entrada de la aplicación, delegando completamente la navegación al sistema de rutas mediante `<router-view />`.

La estructura general es la siguiente:

App.vue

↓

Vue Router

↓

Layout

↓

Página

↓

Componentes

Esta separación permite desacoplar la navegación de la presentación, facilitando la reutilización de layouts y el crecimiento modular de la aplicación.

---

## Arquitectura de Layouts

El frontend utiliza el sistema de layouts de Quasar para desacoplar la estructura visual de las páginas.

El componente `MainLayout.vue` será el layout principal del sistema y tendrá como responsabilidad exclusiva ensamblar los componentes estructurales de la interfaz, tales como el encabezado institucional, el menú lateral, el pie de página y el contenedor principal de navegación.

Los layouts no contendrán lógica de negocio. La gestión del estado y la comunicación con el backend se delegarán a Stores, Composables y Services, manteniendo una clara separación de responsabilidades.

---

## Arquitectura de Páginas

Las páginas del sistema representan el nivel más alto de la interfaz de usuario y serán organizadas por módulos funcionales.

No se utilizarán páginas genéricas generadas por la plantilla de Quasar.

Cada módulo del sistema tendrá su propio directorio de páginas, favoreciendo la cohesión y facilitando el mantenimiento del proyecto.

Ejemplo:

src/

modules/

dashboard/

pages/

DashboardPage.vue

modules/

planes/

pages/

PlanListPage.vue

PlanCreatePage.vue

PlanDetailPage.vue

---

## Arquitectura de Componentes

El frontend adopta una arquitectura basada en componentes reutilizables siguiendo los principios de separación de responsabilidades y composición de Vue 3.

Los componentes se clasifican en tres niveles:

**Componentes Base:

Ubicados en:

src/components/base/

Son componentes completamente reutilizables e independientes de la lógica del negocio.

Ejemplos:

- BaseButton
- BaseInput
- BaseSelect
- BaseTable
- BaseDialog

Estos componentes implementan únicamente comportamiento visual y funcional genérico.

**Componentes Compartidos:

Ubicados en:

src/components/

Se organizan por categorías funcionales:

- layout
- cards
- dashboard
- forms
- navigation
- tables
- wizard

Estos componentes representan elementos reutilizables propios del Sistema de Gestión de Planes de Contingencia.

**Componentes de Módulo:

Cada módulo del sistema podrá contener componentes propios cuando su reutilización esté limitada al contexto funcional correspondiente.

Ejemplo:

modules/planes/components/

modules/dashboard/components/

Esta estrategia evita el acoplamiento entre módulos y facilita la escalabilidad del sistema.

---

## Arquitectura Modular

El frontend se organiza mediante una arquitectura modular.

Cada módulo representa un dominio funcional del sistema y encapsula sus páginas, componentes, servicios y lógica de negocio.

La estructura general será:

modules/

dashboard/

planes/

programas/

actividades/

peligros/

riesgos/

protocolos/

aprendices/

usuarios/

configuracion/

Cada módulo podrá contener internamente:

- pages
- components
- services
- stores
- composables

Estas carpetas serán creadas únicamente cuando el desarrollo del módulo inicie, evitando mantener estructuras vacías y permitiendo que la arquitectura evolucione de forma incremental.

---

## Arquitectura del Layout

La interfaz principal del sistema se construirá mediante un único Layout institucional.

MainLayout.vue tendrá como responsabilidad ensamblar los componentes estructurales de la aplicación, sin contener lógica de negocio.

Su composición será:

MainLayout

↓

AppHeader

↓

AppDrawer

↓

router-view

↓

AppFooter

Los componentes AppHeader, AppDrawer y AppFooter se ubican dentro de:

src/components/layout/

Esta separación mantiene el Layout como un orquestador visual y delega la implementación de cada sección en componentes especializados.

---

## Flujo de Comunicación entre Componentes

Los componentes utilizarán comunicación unidireccional mediante Props y Emits.

Los componentes hijos no modificarán directamente el estado del Layout.

Ejemplo:

Usuario

↓

AppHeader

↓

emit('toggleDrawer')

↓

MainLayout

↓

AppDrawer

Esta estrategia mantiene un bajo acoplamiento entre componentes y facilita las pruebas unitarias.

---

## Estándar de Componentes Vue

Todos los componentes del proyecto seguirán una estructura uniforme.

<template>

Estructura visual del componente.

<script setup>

Imports.

Props.

Emits.

Stores.

Estado reactivo.

Computed.

Watch.

Métodos.

Lifecycle Hooks.

<style scoped lang="scss">

Estilos exclusivos del componente.

Los estilos reutilizables y las variables visuales provendrán del Design System.

Este estándar busca mejorar la legibilidad del código y mantener consistencia durante todo el desarrollo.

---

## Estrategia de Desarrollo

Cada componente seguirá el siguiente ciclo de desarrollo:

1. Análisis del mockup.
2. Diseño técnico.
3. Implementación.
4. Pruebas.
5. Documentación.
6. Commit.

Esta metodología garantiza trazabilidad entre el diseño, la implementación y la documentación del sistema.

---

## Componentes Reutilizables

El frontend implementa componentes reutilizables que representan elementos independientes de la interfaz.

Actualmente se encuentra implementado:

### AppLogo.vue

Componente encargado de representar el logotipo institucional del SENA.

Características:

- Permite modificar su tamaño mediante Props.
- Mantiene automáticamente la proporción del logotipo.
- Puede reutilizarse en cualquier componente del sistema.

Este enfoque evita la duplicación de código y centraliza la identidad visual institucional.

---

## Flujo del Estado Reactivo

El frontend utiliza el sistema de reactividad de Vue para mantener sincronizados los componentes de la interfaz.

El estado compartido se administra desde el componente padre y se transmite hacia los componentes hijos mediante Props.

Cuando un componente hijo requiere modificar dicho estado, solicita el cambio utilizando eventos (`emit`), evitando modificar directamente los datos del componente padre.

Este patrón permite mantener una arquitectura desacoplada y facilita las pruebas y el mantenimiento del sistema.

---

## Uso de v-model

El proyecto utiliza `v-model` como mecanismo estándar para sincronizar estados entre componentes.

`v-model` implementa un enlace bidireccional (Two-Way Data Binding), permitiendo mantener sincronizado el estado compartido entre un componente padre y un componente hijo.

Ejemplo:

```vue
<AppDrawer
    v-model="leftDrawerOpen"
/>
```

En este caso:

- `MainLayout.vue` administra el estado principal.
- `AppDrawer.vue` refleja dicho estado.
- Cualquier cambio realizado desde cualquiera de los componentes permanece sincronizado automáticamente.

Este mecanismo será utilizado también en componentes como:

- QDrawer
- QDialog
- QInput
- QSelect
- QCheckbox
- Wizard
- Formularios del sistema

El uso consistente de `v-model` simplifica la comunicación entre componentes y reduce la cantidad de código necesaria para sincronizar la interfaz.

---

## Arquitectura de Navegación

El sistema de navegación sigue una arquitectura basada en separación de responsabilidades, donde los datos, la lógica y la representación visual se encuentran desacoplados.

La navegación no se construye directamente dentro del componente `AppDrawer`. En su lugar, cada responsabilidad se distribuye entre distintos elementos del sistema.

El flujo general es el siguiente:

navigation.constants.js

↓

AppDrawer.vue

↓

DrawerMenuItem.vue

↓

Interfaz de Usuario

Cada elemento cumple una función específica.

### navigation.constants.js

Contiene únicamente la definición de las opciones disponibles para cada rol del sistema.

Cada opción del menú se representa mediante un objeto con la información necesaria para construir un elemento de navegación.

Ejemplo conceptual:

- Título.
- Icono.
- Ruta.

Este archivo no contiene lógica de presentación ni componentes visuales.


### AppDrawer.vue

Es el componente responsable de construir el menú lateral.

Su función consiste en:

- Obtener las opciones de navegación correspondientes al rol del usuario.
- Recorrer la colección de elementos de navegación.
- Crear un componente `DrawerMenuItem` para cada opción disponible.

El componente no conoce cómo se dibuja un botón del menú; únicamente organiza la información que recibe.


### DrawerMenuItem.vue

Representa una única opción del menú lateral.

Recibe la información mediante Props y únicamente se encarga de representar visualmente un botón de navegación.

Su responsabilidad incluye:

- Mostrar el icono.
- Mostrar el texto.
- Aplicar el estilo institucional.
- Gestionar el comportamiento visual del elemento.

No contiene información sobre roles, permisos ni estructura del menú.


## Beneficios de esta arquitectura

Esta separación proporciona múltiples ventajas durante el desarrollo:

- Evita duplicación de código.
- Facilita la reutilización de componentes.
- Simplifica el mantenimiento del sistema.
- Permite agregar nuevas opciones de navegación modificando únicamente los datos.
- Reduce el acoplamiento entre la lógica y la interfaz.
- Favorece la escalabilidad del proyecto.

Gracias a esta arquitectura, agregar una nueva opción de menú únicamente requiere incorporar un nuevo objeto dentro de `navigation.constants.js`, sin necesidad de modificar los componentes visuales existentes.

---

## Flujo de construcción del menú

El proceso de construcción del menú ocurre en el siguiente orden:

1. Se identifica el rol del usuario.

2. Se obtiene el arreglo de navegación correspondiente desde `navigation.constants.js`.

3. `AppDrawer.vue` recorre la colección de opciones.

4. Por cada elemento encontrado se crea un componente `DrawerMenuItem`.

5. Cada componente recibe la información mediante Props.

6. Finalmente, Vue renderiza el menú completo en la interfaz.

Este patrón convierte el menú en una interfaz completamente dinámica y desacoplada de los datos que la generan.

---

## Directiva `v-for`

El sistema utiliza la directiva `v-for` de Vue para construir interfaces dinámicas a partir de colecciones de datos.

En lugar de declarar manualmente cada componente dentro del template, Vue recorre una colección y genera automáticamente una instancia del componente por cada elemento existente.

Esta estrategia reduce la duplicación de código y permite que la interfaz dependa de los datos, en lugar de depender de la estructura HTML.

Ejemplo conceptual:

Colección de datos

↓

`v-for`

↓

Componente reutilizable

↓

Interfaz de Usuario

En el módulo de Planes de Contingencia, `v-for` se utiliza inicialmente para construir el menú lateral (`Drawer`) a partir de la configuración definida en `navigation.constants.js`.

Cada objeto del arreglo representa una opción del menú y se transforma automáticamente en un componente `DrawerMenuItem`.

---

### Flujo de ejecución

1. Vue obtiene la colección de datos.

2. `v-for` recorre cada elemento del arreglo.

3. Durante cada iteración se crea una variable temporal (por ejemplo, `item`).

4. Las propiedades del objeto (`title`, `icon`, `to`, etc.) se envían mediante Props al componente hijo.

5. El componente reutilizable representa visualmente una única instancia.

Este patrón permite que agregar o eliminar elementos del menú únicamente requiera modificar la colección de datos, sin alterar la estructura del componente.

---

## Patrón Data → Component

El frontend del sistema adopta un patrón basado en datos, donde la información que representa la interfaz permanece separada de los componentes visuales.

Este patrón divide claramente las responsabilidades entre los datos, la lógica de construcción y la representación gráfica.

Su flujo general es el siguiente:

Datos

↓

Componente Contenedor

↓

Componente Reutilizable

↓

Interfaz

Aplicado al Drawer del sistema:

navigation.constants.js

↓

AppDrawer.vue

↓

DrawerMenuItem.vue

↓

Usuario

### Responsabilidades

#### navigation.constants.js

Contiene exclusivamente la definición de las opciones disponibles para cada rol.

Su responsabilidad consiste únicamente en almacenar información.

No contiene lógica de presentación ni componentes Vue.


#### AppDrawer.vue

Obtiene la colección correspondiente al rol actual.

Utiliza `v-for` para recorrer los datos y construir dinámicamente el menú.

No conoce el diseño interno de cada botón.


#### DrawerMenuItem.vue

Representa visualmente una única opción del menú.

Recibe la información mediante Props.

No conoce:

- Los roles.
- La estructura del menú.
- El origen de los datos.
- La cantidad de opciones existentes.

Su única responsabilidad consiste en representar una opción de navegación.


## Beneficios del patrón

La separación entre datos y componentes proporciona múltiples ventajas durante el desarrollo.

- Reduce el acoplamiento entre la lógica y la interfaz.
- Facilita la reutilización de componentes.
- Simplifica el mantenimiento.
- Permite construir interfaces completamente dinámicas.
- Evita la duplicación de código.
- Facilita la escalabilidad del sistema.

Este patrón será reutilizado en múltiples módulos del proyecto, incluyendo:

- Dashboard.
- Tarjetas estadísticas.
- Wizard de creación de planes.
- Tablas CRUD.
- Listados de aprendices.
- Gestión de riesgos.
- Protocolos.
- Contactos de emergencia.

La construcción dinámica de interfaces mediante datos constituye uno de los principios arquitectónicos principales del frontend del proyecto.

## Patrón Sticky Footer

El sistema utiliza un Footer estructural implementado como parte del `QLayout`.

El Footer no pertenece a ninguna vista específica, sino que forma parte de la infraestructura global de la aplicación.

Su comportamiento sigue el patrón conocido como **Sticky Footer Layout**, cuyo objetivo es mantener el Footer al final de la ventana cuando el contenido es reducido y desplazarlo naturalmente al final del documento cuando el contenido supera la altura disponible.

Características:

- El Footer nunca utiliza `position: fixed`.
- El Footer nunca utiliza `position: sticky`.
- El Footer forma parte del flujo normal del Layout.
- El `QPageContainer` ocupa el espacio restante mediante Flex Layout.
- Cuando una vista requiere desplazamiento vertical, el Footer aparece únicamente al finalizar el contenido.

Este comportamiento garantiza una experiencia consistente en todas las vistas del sistema y evita duplicar el Footer en cada módulo.

---
## Organización de Constantes

La aplicación centraliza la información reutilizable en el directorio `src/constants`.

Cada archivo agrupa constantes relacionadas con una única responsabilidad del sistema.

Ejemplos:

- `app.constants.js`: información institucional y configuración general de la aplicación.
- `roles.constants.js`: definición de roles del sistema.
- `navigation.constants.js`: estructura del menú de navegación.
- Otros archivos de constantes podrán incorporarse conforme crezca el proyecto, manteniendo siempre el principio de responsabilidad única.

Esta organización evita la duplicación de valores, facilita el mantenimiento y permite reutilizar información en cualquier componente del sistema.

---

## Arquitectura del Dashboard

El Dashboard constituye el punto de entrada principal al módulo de Planes de Contingencia y representa una vista completamente desacoplada construida mediante componentes reutilizables.

Su arquitectura se basa en la separación entre componentes contenedores y componentes de presentación, permitiendo reutilizar la lógica de construcción de la interfaz y facilitar el mantenimiento del sistema.

La composición general del Dashboard es la siguiente:

DashboardPage

↓

BasePage

↓

DashboardHeader

↓

DashboardSummary

↓

DashboardModules

Cada componente posee una responsabilidad específica y se comunica mediante Props, manteniendo un bajo nivel de acoplamiento.

Esta arquitectura permite modificar cualquier sección del Dashboard sin afectar el resto de la interfaz.

---
## Componentes del Dashboard

El Dashboard se construye utilizando componentes especializados con responsabilidades claramente definidas.

### DashboardHeader

Responsable de representar la cabecera funcional del Dashboard.

Incluye:

- Botón de navegación.
- Acción principal del módulo.

No contiene lógica relacionada con estadísticas ni módulos.

---

### DashboardSummary

Componente contenedor encargado de construir dinámicamente las tarjetas estadísticas del Dashboard.

Obtiene la información desde `dashboard.constants.js` y utiliza `v-for` para crear un componente `DashboardStatCard` por cada indicador disponible.

No implementa lógica visual propia.

---

### DashboardStatCard

Representa visualmente una única tarjeta estadística.

Recibe la información mediante Props:

- icon
- value
- title
- description

Su responsabilidad consiste únicamente en representar la información recibida.

---

### DashboardModules

Componente contenedor encargado de construir la sección de accesos rápidos del sistema.

Obtiene la colección de módulos desde `dashboard.constants.js` y genera dinámicamente una tarjeta por cada módulo disponible.

---

### DashboardModuleCard

Representa visualmente un único módulo del sistema.

Recibe mediante Props:

- title
- image
- routeName

Cada tarjeta encapsula la navegación hacia un módulo específico del sistema sin conocer la implementación interna de las rutas.

---
## Patrón Container → Presentational Component

El frontend adopta el patrón arquitectónico conocido como **Container → Presentational Component**.

Este patrón separa la obtención de datos de su representación visual.

Su flujo general es el siguiente:

Datos

↓

Componente Contenedor

↓

Componente Visual

↓

Usuario

Ejemplos implementados en el proyecto:

dashboard.constants.js

↓

DashboardSummary.vue

↓

DashboardStatCard.vue

y

dashboard.constants.js

↓

DashboardModules.vue

↓

DashboardModuleCard.vue

Los componentes contenedores conocen el origen de los datos y construyen la interfaz mediante `v-for`.

Los componentes visuales únicamente reciben Props y representan la información correspondiente.

Este patrón reduce el acoplamiento entre la lógica y la interfaz, facilitando la reutilización y escalabilidad del sistema.

---
## Arquitectura basada en Datos

La construcción dinámica de la interfaz se fundamenta en colecciones de datos centralizadas mediante archivos de constantes.

Cada componente obtiene la información necesaria desde un archivo de configuración, evitando declarar manualmente elementos repetitivos dentro del template.

El flujo utilizado por el Dashboard es el siguiente:

dashboard.constants.js

↓

DashboardSummary.vue

↓

DashboardStatCard.vue

y

dashboard.constants.js

↓

DashboardModules.vue

↓

DashboardModuleCard.vue

Este enfoque permite modificar el contenido de la interfaz actualizando únicamente la información almacenada en las constantes, sin alterar los componentes visuales.

---
## Biblioteca de Componentes Base

El sistema implementa una biblioteca de componentes reutilizables ubicada en:

src/components/base/

Estos componentes representan la infraestructura visual común del sistema y pueden utilizarse en cualquier módulo sin depender de la lógica del negocio.

Actualmente la biblioteca incluye:

- BasePage
- BackButton
- PrimaryActionButton
- FloatingScrollButtons
- BaseSearch
- BaseSelect
- BaseTable
- BaseToolbar

Cada componente posee una única responsabilidad y puede reutilizarse en cualquier vista del sistema.

La utilización de esta biblioteca permite mantener consistencia visual y reducir la duplicación de código durante el desarrollo.

---
## Filosofía de Navegación

La navegación del frontend se encuentra desacoplada de las URLs físicas del sistema.

Los componentes no realizan navegación utilizando rutas literales (`path`), sino mediante nombres de ruta (`routeName`).

El flujo general es el siguiente:

Componente

↓

routeName

↓

Vue Router

↓

routes.js

↓

Ruta correspondiente

Este enfoque permite modificar las URLs del sistema sin afectar los componentes reutilizables.

La navegación responde a la jerarquía funcional de la aplicación y no al historial del navegador.

Esta estrategia se implementa en componentes como:

- BackButton
- PrimaryActionButton
- DrawerMenuItem
- DashboardModuleCard

Con ello se garantiza una navegación consistente y desacoplada durante todo el proyecto.

---
## Componentes de Infraestructura

Además de los componentes específicos de cada módulo, el sistema implementa componentes cuya responsabilidad pertenece a la infraestructura global de la aplicación.

Estos componentes no contienen lógica de negocio y pueden utilizarse en cualquier vista.

Actualmente se encuentran implementados:

### BackButton

Gestiona la navegación hacia la vista padre lógica del sistema.

### PrimaryActionButton

Representa la acción principal de cada vista.

### FloatingScrollButtons

Gestiona el desplazamiento vertical del documento mediante botones flotantes.

Su comportamiento varía dinámicamente según la posición actual del usuario en la página.

### BasePage

Representa el contenedor principal utilizado por todas las vistas del sistema.

Centraliza el espaciado, alineación y ancho máximo de las páginas.

Esta separación permite mantener una infraestructura visual homogénea durante todo el desarrollo.

---
## Arquitectura de Componentes Reutilizables

El desarrollo del frontend sigue una estrategia incremental basada en la construcción de componentes reutilizables.

Antes de desarrollar un módulo funcional, se implementan los componentes comunes que posteriormente serán utilizados por múltiples vistas del sistema.

El flujo de desarrollo adoptado es el siguiente:

Componente Base

↓

Componente Contenedor

↓

Vista

↓

Módulo

Esta metodología reduce considerablemente la duplicación de código y favorece la mantenibilidad del proyecto.

La misma estrategia será aplicada durante la construcción de los módulos CRUD, donde la infraestructura desarrollada será reutilizada por Programas de Formación, Actividades, Peligros, Riesgos, Protocolos, Usuarios y los demás módulos administrativos.

---

---

# Arquitectura de Componentes CRUD

Los módulos administrativos del Sistema de Gestión de Planes de Contingencia siguen una arquitectura uniforme basada en componentes reutilizables.

Esta arquitectura busca estandarizar la construcción de todas las vistas CRUD del sistema, garantizando consistencia visual, reutilización de código y facilidad de mantenimiento.

Cada módulo reutiliza exactamente la misma estructura de componentes, variando únicamente la configuración de columnas, filtros, datos y acciones propias del dominio funcional.

La composición general de un módulo CRUD es la siguiente:

```
BasePage

↓

CrudHeader

↓

CrudToolbar

↓

BaseTable

↓

BaseTableInfo

↓

BasePagination
```

Cada componente posee una responsabilidad claramente definida y se comunica mediante Props, Slots y Emits, evitando el acoplamiento entre la infraestructura visual y la lógica del negocio.

Actualmente esta arquitectura es utilizada por los siguientes módulos del sistema:

- Programas de Formación
- Actividades
- Peligros
- Riesgos
- Protocolos
- Usuarios
- Aprendices
- Contactos de Emergencia
- Elementos de Protección Personal (EPP)

Gracias a esta estructura, la incorporación de un nuevo módulo administrativo requiere únicamente definir:

- Las columnas de la tabla.
- Los filtros disponibles.
- Los datos del módulo.
- Las acciones específicas.

La infraestructura visual permanece completamente reutilizable.

---

## Responsabilidades de los Componentes CRUD

### BasePage

Representa el contenedor principal de todas las vistas administrativas.

Su responsabilidad consiste en proporcionar una estructura uniforme para todas las páginas del sistema, centralizando el ancho máximo, el espaciado y la alineación del contenido.

No contiene lógica de negocio.

---

### CrudHeader

Representa la cabecera funcional del módulo.

Incluye:

- Título del módulo.
- Botón de navegación.
- Separador institucional.

Cada vista define únicamente el título y la ruta de retorno correspondiente.

---

### CrudToolbar

Agrupa las herramientas de interacción del listado.

Su diseño se basa en Slots, permitiendo construir diferentes distribuciones sin modificar el componente.

Actualmente soporta tres regiones independientes:

- Left
- Center
- Right

Esta arquitectura facilita incorporar nuevos controles sin afectar la estructura existente.

---

### CrudFilters

Componente responsable de representar los filtros disponibles para cada módulo.

Las opciones se reciben mediante Props y el estado seleccionado se sincroniza utilizando `v-model`.

Cada módulo define sus propios filtros mediante archivos de constantes.

---

### BaseSearch

Componente reutilizable encargado de realizar búsquedas sobre los registros del módulo.

No implementa lógica de filtrado.

Su responsabilidad consiste únicamente en capturar el texto ingresado por el usuario y sincronizarlo mediante `v-model`.

El filtrado de datos permanece completamente desacoplado dentro de cada página.

---

### BaseTable

Componente responsable de representar los registros del módulo.

La tabla no conoce ninguna entidad del sistema.

Toda la información necesaria se recibe mediante Props.

Entre sus responsabilidades se encuentran:

- Mostrar columnas dinámicas.
- Mostrar registros.
- Gestionar estados de carga.
- Mostrar mensajes cuando no existen registros.
- Integrarse con la paginación externa.
- Aplicar estilos comunes a todas las tablas.

---

### BaseTableInfo

Representa el resumen de registros visibles.

Ejemplo:

```
1-8 de 124
```

La información es completamente calculada desde el componente padre.

---

### BasePagination

Gestiona la navegación entre páginas del listado.

El componente no administra el estado interno de la paginación.

Todas las acciones son comunicadas al componente padre mediante eventos (`emit`), manteniendo una arquitectura unidireccional.

---

## Beneficios de esta Arquitectura

La implementación de esta infraestructura proporciona múltiples ventajas para el proyecto:

- Consistencia visual entre todos los módulos.
- Reducción significativa de código duplicado.
- Separación clara de responsabilidades.
- Mayor facilidad para realizar mantenimiento.
- Escalabilidad para incorporar nuevos módulos.
- Desacoplamiento entre la lógica del negocio y la infraestructura visual.
- Reutilización completa de componentes.

Esta arquitectura constituye actualmente la base sobre la cual se desarrollan todos los módulos administrativos del Sistema de Gestión de Planes de Contingencia.

---

# Mock Data

Esta carpeta contiene datos simulados utilizados durante el desarrollo del frontend.

Su propósito es:

- Desarrollo sin backend.
- Demostraciones del sistema.
- Pruebas de componentes.
- Testing.

Estos archivos no deben utilizarse en producción una vez integrados los servicios API.

---

# Arquitectura de Dialogs y Detalles Reutilizables

El sistema centraliza la infraestructura visual de los diálogos para evitar duplicación de código y mantener consistencia entre módulos.

BaseDialog

BaseDialog.vue constituye la infraestructura común de los diálogos. Centraliza título, contenido, área de acciones, ancho configurable, v-model y slots.

Los componentes específicos de cada módulo no deben duplicar esta estructura cuando pueda ser proporcionada por el componente base.

BaseDetailDialog

Para diálogos destinados exclusivamente a consultar información se establece BaseDetailDialog.vue.

Su objetivo es centralizar la estructura visual común de los diálogos de detalles:

BaseDetailDialog
        |
        +-- Logo institucional
        |
        +-- Columna izquierda
        |      +-- BaseDetailItem
        |      +-- BaseDetailItem
        |
        +-- Columna derecha
               +-- BaseDetailItem
               +-- BaseDetailItem

Centraliza distribución, espaciado, logotipo, tipografía, colores, alineación y área de acciones.

Los datos específicos permanecen en cada componente *Details.vue. Por ejemplo, ProgramasDetails.vue define qué información mostrar mediante BaseDetailItem, mientras BaseDetailDialog mantiene la infraestructura visual.

BaseDetailItem

BaseDetailItem.vue representa una unidad individual de información:

Etiqueta
Valor

Es independiente de cualquier entidad concreta y solamente representa una pareja label / value.

Los componentes especializados, como StatusChip, pueden utilizarse cuando un valor requiera una representación visual específica.

Patrón de Details

[Módulo]Details.vue
        |
        v
BaseDetailDialog
        |
        +-- BaseDetailItem
        +-- BaseDetailItem
        +-- Componentes especializados

Esta centralización permite realizar cambios globales de diseño una sola vez, en lugar de repetirlos en cada módulo.

---

# Arquitectura del módulo Usuarios

El módulo de Usuarios posee una consideración especial: los registros no serán creados manualmente dentro del Sistema de Gestión de Planes de Contingencia.

Los usuarios serán obtenidos y sincronizados desde la base de datos institucional de REPFORA.

Usuarios
   |
   +-- Consulta
   |
   +-- Sincronización desde REPFORA
   |
   +-- Administración de rol y estado

Datos provenientes de REPFORA

Se consideran datos institucionales:

Nombre.

Apellido.

Correo institucional.

Centro de formación.

Tipo de documento.

Número de documento.

Estos campos no deben modificarse manualmente desde el diálogo de actualización.

---

# Datos administrados por el sistema

El sistema administrará específicamente:

rol

estado

Estos atributos representan configuración propia del sistema y no deben ser sobrescritos por la sincronización con REPFORA.

REPFORA
   |
   v
Sincronización
   |
   +--> nombre
   +--> apellido
   +--> correo
   +--> centro
   +--> tipoDocumento
   +--> documento

Sistema
   |
   +--> rol
   +--> estado

Esta separación deberá conservarse durante la implementación del backend.

---

# Diálogo de actualización de Usuarios

UsuariosDialog.vue utiliza los componentes de formularios reutilizables y aplica una regla específica en modo edit.

Actualizar Usuario
        |
        +-- Información institucional
        |      +-- Solo lectura
        |
        +-- Rol
        |      +-- Editable según permisos
        |
        +-- Estado
               +-- Editable según permisos

Los campos institucionales permanecen visibles pero bloqueados. Los campos rol y estado pueden modificarse cuando el usuario actual posee la capacidad correspondiente.

Actualmente esta capacidad se representa mediante la Prop:

canEditUserConfiguration

Esta configuración prepara el frontend para la futura integración con autenticación y autorización.

La seguridad definitiva deberá implementarse también en backend; el frontend no constituye un mecanismo de seguridad.

---

# Roles del sistema y Usuarios

La estructura funcional contemplada actualmente incluye:

Usuario.

Coordinación.

SST.

Pedagogía.

Administrador.

El rol Administrador corresponde al responsable de la configuración administrativa del sistema, incluyendo la gestión de usuarios, roles y estados.

Los roles Coordinación, SST y Pedagogía participan en procesos de revisión y aprobación de Planes de Contingencia y podrán disponer de funcionalidades administrativas específicas según los permisos que se definan posteriormente.

La autorización definitiva será responsabilidad del backend y se implementará durante la fase de autenticación y autorización.

---

# Sincronización de Usuarios con REPFORA

La creación manual de usuarios no forma parte del flujo funcional definitivo.

El botón actualmente denominado Crear deberá transformarse posteriormente en:

Sincronizar

El endpoint previsto conceptualmente es:

POST /api/usuarios/sincronizar

Su responsabilidad será determinar:

Usuarios nuevos.

Usuarios existentes.

Datos institucionales que deben actualizarse.

Usuarios que requieren cambios de estado según las reglas de sincronización.

Configuración administrativa que debe conservarse.

En principio, la sincronización:

Actualiza datos institucionales
        |
        +-- NO sobrescribe rol
        |
        +-- NO sobrescribe configuración administrativa

El comportamiento frente a usuarios que dejen de existir o cambien de estado en REPFORA queda pendiente de definición antes de implementar el endpoint definitivo.

API de Usuarios: cambios pendientes en Backend

Creación manual

El endpoint:

POST /api/usuarios

no representa el flujo funcional definitivo porque los usuarios no serán creados manualmente.

Durante la integración deberá eliminarse, deshabilitarse o sustituirse por el mecanismo de sincronización, dependiendo de las dependencias existentes.

No se deben eliminar los atributos del modelo Usuario por esta razón.

---

# Actualización administrativa

La actualización deberá restringirse a rol y estado.

La operación prevista conceptualmente es:

PATCH /api/usuarios/:id

con:

{
    "rol": "sst",
    "estado": "Activo"
}

Si se conserva el PUT existente, el servicio deberá aplicar la misma restricción.

No deberán modificarse mediante esta operación:

nombre
apellido
correo
centro
tipoDocumento
documento

Estos datos permanecerán bajo responsabilidad de la sincronización con REPFORA.

La modificación de rol y estado deberá estar protegida mediante autenticación y autorización en backend.

---

# Protección del rol Administrador

El rol Administrador tendrá tratamiento especial dentro de las reglas de autorización.

La interfaz no debe permitir asignarlo mediante el selector normal si la política definitiva establece que no puede ser asignado desde esta interfaz.

El backend deberá validar igualmente los valores permitidos y no depender de las restricciones visuales del frontend.

Separación de responsabilidades en Usuarios

                 REPFORA
                    |
                    v
          Sincronización de usuarios
                    |
                    v
             Datos institucionales
                    |
                    v
              Base de datos
                    |
                    v
              Módulo Usuarios
                    |
          +---------+---------+
          |                   |
          v                   v
       Consulta          Configuración
                              |
                         Rol + Estado
                              |
                              v
                        Administrador

Esta separación deberá mantenerse tanto en frontend como en backend.

Estado de implementación de Usuarios

Actualmente se encuentra preparado:

- Listado CRUD de usuarios.

- Consulta mediante diálogo de detalles.

- Diálogo de actualización.

- Campos institucionales en solo lectura durante la actualización.

- Campos rol y estado preparados para modificación.

- Prop canEditUserConfiguration para controlar visualmente la edición.

- Roles preliminares definidos en constantes.

- Estructura visual preparada para futura autenticación y autorización.


Queda pendiente:

- Integración real con REPFORA.

- Endpoint de sincronización.

- Definición final del proceso de sincronización.

- Autenticación.

- Autorización basada en roles y permisos.

- Protección de endpoints.

- Restricción definitiva de modificación de atributos.

- Revisión de los servicios actuales de Usuarios en backend.

- Decisiones pendientes para Backend


Durante la integración deberán revisarse:

- Mecanismo de comunicación con REPFORA.

- Estructura de datos recibida.

- Identificador utilizado para determinar si un usuario ya existe.

- Comportamiento frente a usuarios nuevos.

- Comportamiento frente a usuarios que ya no estén disponibles en REPFORA.

- Tratamiento del estado institucional frente al estado interno.

- Implementación del endpoint de sincronización.

- Restricción de actualización a rol y estado.

- Autenticación.

- Autorización por roles y permisos.

- Protección de endpoints independientemente de las restricciones visuales.

---

# Estado de la Arquitectura de Dialogs

La arquitectura de diálogos seguirá el principio:

Componente Base
       |
       v
Componente Reutilizable
       |
       v
Componente del Módulo

Para consulta:

BaseDialog
    |
    v
BaseDetailDialog
    |
    v
[Módulo]Details.vue

Para formularios:

BaseDialog
    |
    +-- BaseFormGrid
    +-- BaseFormField
    +-- BaseInput / BaseSelect
    +-- BaseDialogActions
    |
    v
[Módulo]Dialog.vue

Esta estructura permite implementar las decisiones visuales comunes una sola vez y reutilizarlas en todos los módulos administrativos.

---





