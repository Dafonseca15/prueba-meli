## Prueba Tecni Meli - Frontend - Página de Detalle de Producto

Esta es una aplicación frontend desarrollada con **React + Vite + TypeScript**, inspirada en la experiencia de usuario de una página de producto de **MercadoLibre**. Incluye estructura modular, pruebas unitarias con **Jest**.

---

## 📁 Estructura del proyecto
La arquitectura del proyecto sigue una estructura modular y escalable, facilitando la organización y el mantenimiento del código.
```
aplicacion-front/
├── .vscode/               # Configuraciones de VS Code
├── coverage/              # Reportes de cobertura de pruebas
├── node_modules/          # Dependencias del proyecto
├── public/                # Archivos estáticos (index.html, favicon, etc.)
├── src/                   # Código fuente de la aplicación
│   ├── app/               # Configuración principal de la aplicación (router, etc.)
│   │   ├── routes/        # Definición de rutas de la aplicación (ej. AppRouter.tsx)
│   │   └── __tests__/     # Pruebas para la configuración principal
│   ├── assets/            # Archivos estáticos como imágenes, fuentes, iconos
│   │   └── images/        # Imágenes específicas
│   ├── components/        # Componentes UI reutilizables (CustomButton, CustomLink, etc.)
│   ├── config/            # Configuraciones globales (ej. API_BASE_URL)
│   ├── data/              # Datos de mock o datos estáticos
│   ├── features/          # Módulos de características/funcionalidades de la aplicación
│   │   └── product-detail/ # Ejemplo: Característica de detalle de producto
│   │       ├── api/       # Lógica de llamadas a la API para esta característica
│   │       ├── components/ # Componentes específicos de esta característica
│   │       ├── hooks/     # Custom hooks específicos de esta característica
│   │       ├── pages/     # Páginas de la aplicación (ej. ProductDetailPage)
│   │       └── types/     # Definiciones de tipos para esta característica
│   ├── hooks/             # Custom hooks globales y reutilizables
│   ├── lib/               # Librerías o utilidades de terceros envueltas
│   ├── stores/            # Gestión de estado global (si aplica: Redux, Zustand, Context)
│   ├── testing/           # Utilidades o configuraciones específicas para testing
│   ├── types/             # Definiciones de tipos globales
│   ├── utils/             # Funciones de utilidad generales (formateo, helpers)
│   └── vite-env.d.ts      # Definiciones de tipos para Vite
├── .gitignore             # Archivos y carpetas a ignorar por Git
├── .prettierignore        # Archivos a ignorar por Prettier
├── .prettierrc.js         # Configuración de Prettier
├── eslint.config.js       # Configuración de ESLint
├── index.html             # Punto de entrada HTML de la aplicación
├── jest.config.cjs        # Configuración de Jest
├── jest.setup.js          # Archivo de configuración de Jest para el entorno de pruebas
├── package-lock.json      # Bloqueo de dependencias
├── package.json           # Metadatos del proyecto y scripts
├── README.md              # Este archivo
├── tsconfig.app.json      # Configuración de TypeScript para la aplicación
├── tsconfig.jest.json     # Configuración de TypeScript para Jest
├── tsconfig.json          # Configuración base de TypeScript
├── tsconfig.node.json     # Configuración de TypeScript para Node.js
└── vite.config.ts         # Configuración de Vite

```

## 🚀 Inicio Rápido

Sigue estos pasos para poner en marcha el proyecto en tu entorno local.

### **Prerrequisitos**

Antes de comenzar, asegúrate de tener instalado lo siguiente:

* **Node.js**: Versión 18.x o superior (se recomienda la última versión LTS).
    * Verifica tu versión: `node -v`
* **npm** (Node Package Manager): Se instala automáticamente con Node.js.
    * Verifica tu versión: `npm -v`

### **Configuración del Proyecto**

1.  **Clonar el repositorio** (si aún no lo has hecho):
    ```bash
    git clone  https://github.com/Dafonseca15/prueba-meli.git
    cd prueba-meli/
    ```
2.  **Instalar dependencias**:
    Navega al directorio `aplicacion-front` (donde se encuentra `package.json`) e instala todas las dependencias del proyecto.
    ```bash
    cd aplicacion-front/
    npm install
    npm run dev
    ```
---

## 🧪 Estrategi de Pruebas
La estrategia de testing está orientada a asegurar el correcto comportamiento de los componentes de forma aislada, siguiendo el enfoque **TDD/BDD (Test-Driven/Behavior-Driven Development)** en los casos clave.

### 🧩 Pruebas Unitarias
* Se utilizan Jest como test runner y React Testing Library para testear componentes React.
* Los tests se enfocan en:
   * Renderizado condicional y props requeridos.
   * Comportamiento de componentes ante distintos escenarios.
   * Validación de estructuras semánticas (accesibilidad).
   * Mocks de funciones y componentes secundarios.

## 🏃‍♀️ Ejecución de Pruebas

Para ejecutar las pruebas Unitarias y de componentes, utiliza el siguiente comando desde el directorio `aplicacion-front/`:

```bash
npm run test
```

## 📦 Cobertura
* La cobertura se evalúa ejecutando:
```bash
npm run test:coverage
```
* El reporte se genera en la carpeta /coverage y se puede abrir en el navegador:
```bash
coverage/lcov-report/index.html
```
