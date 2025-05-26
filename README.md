# ORJATECH - Soluciones Tecnológicas Inteligentes

## Descripción General

ORJATECH es una plataforma web moderna que presenta los servicios de consultoría y desarrollo tecnológico de la empresa, con un enfoque en soluciones de inteligencia artificial y transformación digital. La plataforma incluye un asistente virtual impulsado por IA para brindar atención personalizada a los visitantes.

## Características Principales

- **Asistente Virtual Inteligente**
  - Chatbot integrado con IA generativa
  - Respuestas contextuales y personalizadas
  - Interfaz de usuario intuitiva y accesible

- **Diseño Moderno y Responsivo**
  - Interfaz adaptativa para todos los dispositivos
  - Paleta de colores corporativa
  - Navegación fluida y accesible

- **Secciones Principales**
  - Inicio: Presentación de servicios y propuesta de valor
  - Servicios: Detalle de soluciones tecnológicas
  - Portafolio: Casos de éxito y proyectos destacados
  - Contacto: Formulario de contacto y canales de comunicación

## Tecnologías Utilizadas

- **Frontend**
  - HTML5, CSS3 y JavaScript (ES6+)
  - Tailwind CSS para estilos y diseño responsivo
  - Chart.js para visualizaciones de datos

- **Backend (Serverless Functions)**
  - Netlify Functions para la API del chatbot
  - Integración con API de Gemini para IA generativa
  - Variables de entorno para gestión segura de credenciales

- **Despliegue**
  - Hospedado en Netlify
  - Despliegue continuo desde el repositorio
  - Certificado SSL incluido

## Estructura del Proyecto

```
├── index.html          # Página principal
├── css/
│   └── styles.css     # Estilos personalizados
├── js/
│   ├── script.js      # Lógica principal
│   └── chatbot.js      # Lógica del asistente virtual
├── netlify/
│   └── functions/     # Funciones serverless
│       └── gemini.js   # Integración con API de IA
├── assets/             # Imágenes y recursos
└── package.json        # Dependencias y scripts
```

## Cómo Ejecutar el Proyecto Localmente

1. Clona el repositorio:
   ```bash
   git clone [url-del-repositorio]
   cd ORJATECH
   ```

2. Instala las dependencias:
   ```bash
   npm install
   ```

3. Crea un archivo `.env` en la raíz con tu API key:
   ```
   GEMINI_API_KEY=tu_api_key_aquí
   ```

4. Inicia el servidor de desarrollo:
   ```bash
   netlify dev
   ```

## Despliegue

El sitio está configurado para despliegue automático en Netlify. Los cambios en la rama `main` se despliegan automáticamente.

Para desplegar manualmente:

```bash
netlify deploy --prod
```

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