# Sistema de Diseño

El Sistema de Diseño del módulo Planes de Contingencia define las reglas visuales utilizadas durante el desarrollo del frontend.

Su objetivo es garantizar consistencia visual, reutilización de componentes y facilidad de mantenimiento.

---

## Principios del Sistema de Diseño

El sistema se construye bajo los siguientes principios:

- Consistencia visual.
- Simplicidad.
- Accesibilidad.
- Reutilización.
- Escalabilidad.
- Diseño modular.
- Identidad institucional.

---

## Organización

El Sistema de Diseño se implementa mediante archivos SCSS ubicados en:

src/css/

Los archivos principales son:

- app.scss
- variables.scss
- typography.scss
- mixins.scss
- utilities.scss
- components.scss
- quasar.variables.scss

---

## Responsabilidad de los archivos

**variables.scss

Define colores, espaciados, radios, sombras y dimensiones globales.


**typography.scss

Define la jerarquía tipográfica utilizada en toda la aplicación.


**mixins.scss

Contiene mixins reutilizables para evitar repetición de estilos.


**utilities.scss

Contiene clases utilitarias utilizadas en múltiples componentes.


**components.scss

Agrupa estilos globales reutilizables para componentes institucionales.


**quasar.variables.scss

Contiene exclusivamente las variables reconocidas por Quasar Framework para personalizar el tema del framework.

No debe utilizarse para definir variables propias del proyecto.

---

## Estrategia de Implementación

El Sistema de Diseño se implementará antes del desarrollo de los componentes funcionales.

El orden definido es:

1. Variables.
2. Tipografía.
3. Mixins.
4. Utilidades.
5. Componentes Base.
6. Componentes Institucionales.

De esta manera todos los componentes reutilizarán la misma base visual.

---

## Convenciones

No se utilizarán valores visuales codificados directamente dentro de los componentes.

**Ejemplo incorrecto:

background: #39A900;

padding: 16px;

**Ejemplo correcto:

background: $color-primary;

padding: $spacing-md;

Todas las propiedades visuales deberán obtenerse desde el Sistema de Diseño.

--- 

## Sistema Tipográfico

El sistema tipográfico define la jerarquía visual utilizada en toda la interfaz del Sistema de Gestión de Planes de Contingencia.

Se establece una única familia tipográfica base (Roboto) y una escala consistente de tamaños, pesos y alturas de línea.

La escala tipográfica utiliza unidades `rem` para favorecer la accesibilidad y permitir que el sistema se adapte a las preferencias de visualización del usuario.

La jerarquía comprende:

- Encabezados (H1-H6)
- Texto de párrafo
- Etiquetas de formularios
- Texto auxiliar (`small`)

Todos los componentes deberán reutilizar esta escala, evitando definir tamaños tipográficos directamente dentro de cada componente.

---

## Mixins

Los Mixins representan patrones de estilos reutilizables implementados mediante SCSS.

Su objetivo es encapsular estructuras CSS que aparecen repetidamente durante el desarrollo del frontend, evitando duplicación de código y facilitando el mantenimiento.

Los Mixins no almacenan valores visuales; esos valores provienen de las variables del Sistema de Diseño.

Actualmente los Mixins se agrupan en las siguientes categorías:

- Flexbox.
- Contenedores.
- Tarjetas.
- Texto.
- Responsive.

Todos los componentes deberán reutilizar estos Mixins antes de crear nuevas implementaciones de estilos equivalentes.

---

## Utilities

El archivo `utilities.scss` contiene clases CSS reutilizables destinadas a resolver necesidades visuales simples y frecuentes.

A diferencia de los Mixins, las Utilities no se incluyen mediante `@include`; se aplican directamente desde el atributo `class` de los componentes.

Las Utilities se organizan por categorías:

- Layout.
- Display.
- Flexbox.
- Espaciados.
- Texto.
- Cursor.
- Sombras.
- Bordes.
- Visibilidad.

Estas clases permiten reducir la duplicación de estilos y agilizar el desarrollo de la interfaz.

Como criterio general, se utilizarán Utilities para estilos sencillos y de propósito único. Cuando un patrón de estilos implique varias propiedades o represente el comportamiento visual de un componente, se implementará mediante un Mixin o mediante estilos propios del componente.

---

## Convención de Clases CSS

Los componentes seguirán una nomenclatura inspirada en la metodología BEM (Block Element Modifier).

Ejemplo:

```text
app-drawer

app-drawer__header

app-drawer__user

app-drawer__role

app-drawer__name

app-drawer__email

app-drawer__content
```

Esta convención mejora la legibilidad del código, reduce conflictos entre estilos y facilita el mantenimiento del proyecto.

Como criterio general:

- Cada componente representa un Block.
- Sus elementos internos representan Elements.
- Los modificadores se utilizarán únicamente cuando un componente posea variantes visuales claramente diferenciadas.

---

## Componentes del Sistema de Diseño

El Sistema de Diseño se implementa mediante componentes reutilizables organizados según su responsabilidad.

Las principales categorías son:

- Base
- Layout
- Navigation
- Cards
- Forms
- Tables
- Dashboard
- Wizard

Cada componente deberá representar una única responsabilidad visual y podrá reutilizarse en diferentes módulos del sistema.

Este enfoque favorece la reutilización de código, reduce la duplicación de estilos y mantiene una experiencia visual consistente.

---

## Organización de Recursos Visuales

Todos los recursos gráficos institucionales deberán mantenerse centralizados dentro del directorio `assets`.

La estructura recomendada es la siguiente:

```text
assets/

├── logos/
├── icons/
├── illustrations/
└── images/
```

Los recursos visuales deberán importarse mediante ES Modules.

Ejemplo:

```javascript
import logoSena from 'src/assets/logos/logo-sena.png'
```

No se recomienda utilizar rutas relativas complejas dentro de los componentes.

La centralización de los recursos gráficos facilita el mantenimiento y permite reemplazar fácilmente elementos institucionales sin modificar múltiples componentes.

---

## Filosofía del Sistema de Diseño

El Sistema de Diseño del proyecto busca separar completamente la estructura, el comportamiento y la apariencia de la interfaz.

Para ello se establecen las siguientes responsabilidades:

- Las Variables almacenan colores, tipografías y dimensiones globales.
- Los Mixins encapsulan patrones de estilos reutilizables.
- Las Utilities proporcionan clases CSS de propósito específico.
- Los Componentes representan elementos visuales reutilizables.
- Cada componente mantiene sus estilos propios utilizando el Sistema de Diseño como base.

Esta organización permite construir una interfaz consistente, escalable y fácil de mantener durante todo el ciclo de vida del proyecto.

---

## Componentes Reutilizables

Todos los componentes reutilizables deberán diseñarse siguiendo los siguientes principios:

- Responsabilidad única.
- Alta reutilización.
- Bajo acoplamiento.
- Configuración mediante Props.
- Comunicación mediante Emits cuando sea necesario.
- Independencia respecto a la lógica de negocio.

Los componentes no deberán contener información específica del sistema; únicamente representarán elementos visuales reutilizables.

Este criterio facilita la construcción de interfaces modulares y permite reutilizar los mismos componentes en diferentes módulos del sistema.
