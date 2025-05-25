# SATLOG.NET - Plan de Negocios Interactivo

## Descripción General

SATLOG.NET es una Single Page Application (SPA) diseñada para presentar de manera interactiva y moderna el plan de negocios de la empresa SATLOG.NET. La aplicación permite una navegación fluida a través de las diferentes secciones del plan, utilizando un diseño "futurista" y visualizaciones de datos para facilitar la comprensión de la estrategia, oferta, mercado y proyecciones financieras de la empresa.

## Características Principales

-   **Navegación SPA:** Experiencia de usuario fluida sin recargas de página al navegar entre secciones.
-   **Diseño Responsivo:** Adaptable a diferentes tamaños de pantalla para una correcta visualización en dispositivos móviles y de escritorio.
-   **Estilo Moderno y Futurista:** Interfaz de usuario con una paleta de colores y tipografía contemporánea, utilizando variables CSS para una fácil personalización del tema.
-   **Secciones Detalladas del Plan de Negocios:**
    -   Inicio: Bienvenida, oportunidad de negocio, oferta, ventaja competitiva, metas clave e inversión inicial.
    -   La Empresa: Descripción, misión y visión.
    -   Servicios: Detalle de desarrollo de aplicaciones, ciberseguridad y análisis de datos.
    -   Mercado: Análisis del mercado meta, tamaño, competencia y plan de mercadeo.
    -   Operaciones: Estructura administrativa, talento humano, procesos y tecnología.
    -   Finanzas: Inversión, proyecciones clave, ingresos proyectados y análisis de riesgo.
    -   Impacto: Impacto económico, social y ambiental.
-   **Visualización de Datos con Chart.js:**
    -   Gráfico de Dona para el desglose de la Inversión Inicial.
    -   Gráfico de Barras para el Tamaño del Mercado y Crecimiento Proyectado.
    -   Gráfico de Línea para los Ingresos Proyectados.
-   **Componentes Interactivos:**
    -   Acordeones para mostrar detalles de los servicios ofrecidos.
    -   Lista de Riesgos desplegable con sus respectivas estrategias de mitigación.
-   **Actualización Dinámica:** El año en el pie de página se actualiza automáticamente.

## Tecnologías Utilizadas

-   **HTML5:** Para la estructura semántica del contenido.
-   **CSS3:** Para el diseño y la presentación.
    -   **Tailwind CSS (utility classes):** Utilizado para la maquetación rápida y responsiva (inferido por el uso de clases como `grid`, `flex`, `p-6`, `rounded-lg`, etc., en el HTML).
    -   **Custom CSS & Variables CSS:** Para la tematización personalizada (colores, fuentes) y estilos específicos, definidos en la etiqueta `<style>` del `index.html`.
-   **JavaScript (Vanilla JS):** Para la interactividad de la SPA, manejo de la navegación, acordeones, lista de riesgos y la inicialización de los gráficos.
-   **Chart.js:** Biblioteca para la creación de gráficos dinámicos y visualizaciones de datos.
-   **Google Fonts:** Uso de la fuente "Inter" para la tipografía general del sitio.

## Estructura del Proyecto

El proyecto actualmente consiste en un único archivo principal:

-   `index.html`: Contiene toda la estructura HTML, los estilos CSS (internos) y el código JavaScript (interno) que conforman la SPA.

## Cómo Ejecutar el Proyecto

Dado que es una aplicación web basada en HTML, CSS y JavaScript del lado del cliente, no requiere un servidor complejo para su ejecución local:

1.  Clona o descarga el repositorio (si estuviera en uno) o asegúrate de tener el archivo `index.html`.
2.  Abre el archivo `index.html` directamente en tu navegador web preferido (Google Chrome, Firefox, Edge, Safari, etc.).

¡Eso es todo! La aplicación se cargará y podrás navegar por las diferentes secciones del plan de negocios.

## Resumen del Contenido del Plan de Negocios

La SPA está organizada en las siguientes secciones principales, cada una detallando un aspecto crucial del plan de negocios de SATLOG.NET:

-   **Inicio:** Presentación general, propuesta de valor y visión rápida de la inversión.
-   **La Empresa:** Fundamentos, misión y visión de SATLOG.NET.
-   **Servicios:** Descripción detallada de la oferta de servicios integrados (Desarrollo, Ciberseguridad, Análisis de Datos).
-   **Mercado:** Análisis del público objetivo, potencial del mercado, competencia y estrategias de marketing.
-   **Operaciones:** Estructura organizativa, gestión del talento y procesos operativos.
-   **Finanzas:** Detalles sobre la inversión inicial, proyecciones financieras clave, fuentes de ingresos y análisis de riesgos con sus mitigaciones.
-   **Impacto:** Contribuciones de SATLOG.NET a nivel económico, social y ambiental.

## Personalización y Futuras Mejoras

-   **Actualizar Contenido:** El texto de cada sección se puede modificar directamente en el archivo `index.html`.
-   **Modificar Datos de Gráficos:** Los datos para los gráficos de Chart.js se encuentran en el código JavaScript dentro del `index.html` y pueden ser actualizados según sea necesario.
    -   `inversionChart`: Datos en `new Chart(inversionCtx, { data: { datasets: [{ data: [...] }] } });`
    -   `mercadoChart`: Datos en `new Chart(mercadoCtx, { data: { datasets: [{ data: [...] }] } });`
    -   `ingresosChart`: Datos en `new Chart(ingresosCtx, { data: { datasets: [{ data: [...] }] } });`
-   **Cambiar Estilos:** Los colores y fuentes principales se gestionan mediante variables CSS (ej. `--futuristic-primary`, `--futuristic-secondary`) en la sección `<style>`, facilitando cambios globales en el tema.
-   **Expandir Funcionalidad:** Se podrían añadir nuevas secciones, más interactividad o integrar herramientas adicionales.
-   **Separación de Archivos:** Para proyectos más grandes, se podría considerar separar CSS y JavaScript en archivos `.css` y `.js` externos para una mejor organización.

---

Generado por Cascade - Asistente de Codificación IA.