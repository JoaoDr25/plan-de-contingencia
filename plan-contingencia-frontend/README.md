# Sistema de Gestión de Planes de Contingencia

Frontend desarrollado para el módulo **Planes de Contingencia** orientado a la gestión preventiva de riesgos, planificación de actividades académicas y generación de documentación institucional.

---

# Estado del proyecto

En desarrollo

Versión actual

v0.1.0

---

# Arquitectura

El proyecto sigue una arquitectura modular basada en:

- Vue 3
- Quasar Framework
- Vite
- Pinia
- Vue Router
- Axios
- Composition API

---

# Estructura del repositorio

plan-de-contingencia/

├── plan-contingencia-backend/

├── plan-contingencia-frontend/

└── docs/

---

# Requisitos

- Node.js 24+
- npm 11+

---

# Instalación

```bash
npm install
```

---

# Desarrollo

```bash
npm run dev
```

---

# Build

```bash
npm run build
```

---

# Calidad del código

```bash
npm run lint
```

---

# Pruebas del sistema

Ejecutar los comandos desde `plan-contingencia-frontend`. Los ejemplos de Quasar en
`test/vitest/__tests__`, sus componentes `demo` y `setup-file.js` se conservan intactos.

```text
test/vitest/
├── setup-file.js
├── __tests__/                 # Ejemplos originales de infraestructura
├── helpers/                  # Contratos HTTP y renderizado de slots para pruebas
├── unit/
│   ├── composables/           # Los cuatro composables de tablas
│   ├── services/              # Planes, autenticación y los nueve catálogos
│   ├── stores/                # Autenticación y persistencia de Pinia
│   ├── utils/                 # Estados, acciones, fechas, contactos, PDF y sincronización
│   └── validators/            # Reglas de formularios
├── components/
│   ├── plans/                 # Acciones de detalle y seguridad
│   ├── forms/
│   ├── tables/
│   ├── dialogs/
│   └── wizard/                # Información, contexto, trabajo, participantes, riesgos y revisión
└── integration/
    ├── plans/                 # Listado, consulta, histórico y orquestación del wizard
    └── router/                # Guard real y metadatos de las rutas
```

Los nombres de los archivos de prueba corresponden a los archivos reales de origen. Por ejemplo,
`useConsultaTable.test.js` prueba `usePlanesConsultaTable`, exportado por
`src/composables/useConsultaTable.js`.

## Ejecutar por baterías

| Comando                    | Alcance                                                    |
| -------------------------- | ---------------------------------------------------------- |
| `npm run test:examples`    | Ejemplos originales de Quasar                              |
| `npm run test:composables` | Filtros, normalización, fechas y paginación                |
| `npm run test:services`    | Métodos HTTP, endpoints, payloads, respuestas y errores    |
| `npm run test:stores`      | Autenticación, hidratación, persistencia y logout          |
| `npm run test:utils`       | Reglas de negocio, utilidades y validadores                |
| `npm run test:components`  | Componentes seleccionados y los pasos reales del wizard    |
| `npm run test:plans`       | Vistas de planes y guardado/navegación del wizard          |
| `npm run test:wizard`      | Los siete pasos y su orquestación, como batería específica |
| `npm run test:router`      | Autenticación, roles, redirecciones y navegación           |

`test:wizard` es un subconjunto de `test:components` y `test:plans`; sus resultados no deben
sumarse nuevamente al contar pruebas únicas.

También se puede ejecutar un archivo o un caso concreto:

```bash
npm run test:unit:ci -- test/vitest/unit/composables/useConsultaTable.test.js
npm run test:unit:ci -- test/vitest/unit/services/planContingenciaService.test.js
npm run test:unit:ci -- test/vitest/integration/plans/PlanCreate.test.js -t "seguridad persiste"
```

Para modo interactivo usar `npm run test:unit`; para la interfaz usar `npm run test:unit:ui`.
`npm run test:unit:ci` sin selectores sigue ejecutando todas las pruebas detectadas; no es
necesario usarlo para validar una batería.

---

# Tecnologías

| Tecnología | Uso                |
| ---------- | ------------------ |
| Vue 3      | Framework Frontend |
| Quasar     | UI Framework       |
| Pinia      | Estado Global      |
| Vue Router | Navegación         |
| Axios      | Cliente HTTP       |
| Sass       | Estilos            |
| Vitest     | Pruebas            |

---

# Documentación

La documentación técnica del proyecto se encuentra en:

docs/

---

# Autor

Juan Camilo Dávila Rangel
