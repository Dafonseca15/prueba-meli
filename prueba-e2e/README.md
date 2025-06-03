prueba E2E# Automatización de Pruebas E2E para Mercado Libre

Este proyecto contiene un conjunto de pruebas End-to-End (E2E) automatizadas utilizando **WebdriverIO** con **Cucumber** para verificar la funcionalidad de búsqueda, filtrado y validación de precios en el sitio de Mercado Libre.

Las pruebas están diseñadas para simular el flujo de un usuario real, comenzando desde una búsqueda en Google, navegando a Mercado Libre, aplicando filtros y validando los detalles del producto.

## Estructura
```
prueba-e2e/
├── features/                   # Contiene los archivos .feature que describen los escenarios de prueba.
│   └── search_product.feature  # Define los escenarios de prueba en lenguaje Gherkin.
├── page-objects/               # Almacena los Page Objects, que modelan las páginas web.
│   ├── base.page.ts            # Clase base con métodos y propiedades comunes para todos los Page Objects.
│   ├── Google Search.page.ts   # Page Object específico para la página de búsqueda de Google y sus resultados.
│   ├── mercadolibre_product_detail.page.ts # Page Object para la página de detalle de un producto en Mercado Libre.
│   └── mercadolibre_search.page.ts # Page Object para la página de resultados de búsqueda y filtros de Mercado Libre.
├── step-definitions/           # Contiene los archivos .ts que implementan los pasos Gherkin.
│   └── search_product_steps.ts # Define las funciones JavaScript/TypeScript que corresponden a cada paso Gherkin.
├── node_modules/               # Directorio generado por npm que contiene las dependencias del proyecto.
├── .gitignore                  # Archivo de configuración de Git para ignorar archivos y directorios no deseados.
├── package.json                # Archivo de configuración principal de Node.js, lista dependencias y scripts.
├── package-lock.json           # Registra las versiones exactas de las dependencias para asegurar instalaciones consistentes.
├── README.md                   # Este archivo, con la descripción del proyecto y las instrucciones.
├── tsconfig.json               # Configuración del compilador TypeScript para el proyecto.
└── wdio.conf.ts                # Archivo de configuración principal de WebdriverIO, define cómo y dónde se ejecutan las pruebas.
```

## NOTA IMPORTANTE
Durante la ejecución de las pruebas, especialmente en el paso inicial de búsqueda en Google (Given I search for "Creatina mercado libre"), es muy probable que Google detecte la automatización y presente un desafío reCAPTCHA.

Este reCAPTCHA REQUIERE INTERVENCIÓN HUMANA para ser resuelto. El framework de automatización no puede resolverlo automáticamente ni bypassarlo completamente debido a las robustas medidas anti-bot de Google.

Qué hacer si aparece el reCAPTCHA:

El navegador Chrome que se ha abierto por la prueba se pausará en la pantalla del reCAPTCHA.
Completa manualmente el desafío reCAPTCHA (marcando "No soy un robot" y/o resolviendo las imágenes solicitadas).
Una vez resuelto con éxito, el navegador continuará automáticamente con la ejecución normal de la prueba desde donde se detuvo.
Sin la intervención humana, la prueba no podrá continuar con los pasos subsiguientes en Mercado Libre.

---

## 🚀 Inicio Rápido

Sigue estos pasos para configurar y ejecutar las pruebas en tu entorno local.

### **Prerrequisitos**

Antes de comenzar, asegúrate de tener instalado lo siguiente:

* **Node.js**: Versión 22.x o superior (se recomienda la última versión LTS).
    * Verifica tu versión: `node -v`
* **npm** (Node Package Manager): Se instala automáticamente con Node.js.
    * Verifica tu versión: `npm -v`
* **Google Chrome**: Un navegador Chrome instalado en tu sistema, ya que las pruebas están configuradas para ejecutarse en él.

### **Configuración del Proyecto**

1.  **Clonar el repositorio** (si aún no lo has hecho):
    ```bash
    git clone https://github.com/Dafonseca15/prueba-meli.git
    cd tu-nombre-del-proyecto/
    ```
2.  **Instalar dependencias**:
    Navega al directorio `prueba-e2e` (donde se encuentra `package.json`) e instala todas las dependencias del proyecto.
    ```bash
    cd prueba-e2e/
    npm install
    ```
    Esto instalará WebdriverIO, Cucumber, ChromeDriver y otras librerías necesarias.

---

## 🧪 Estrategia de Pruebas
* Las pruebas end-to-end (E2E) están implementadas usando WebdriverIO + Cucumber.
* Se encuentran en la carpeta raíz /prueba-e2e/ y automatizan flujos reales de búsqueda en Google y navegación por MercadoLibre.
* Las pruebas se ejecutan en Chrome y validan elementos críticos como:
   * Aplicación de filtros.
   * Comparación de precios entre resultados y página de detalle.
   * Flujo completo de navegación simulado por el usuario.

## 🏃‍♀️ Ejecución de Pruebas

Para ejecutar las pruebas End-to-End, utiliza el siguiente comando desde el directorio `prueba-e2e/`:

```bash
npx wdio run ./wdio.conf.ts 
```

Al final deberia verse algo asi:
![Screenshot 2025-06-03 at 12 54 05 AM](https://github.com/user-attachments/assets/6303898c-badf-45fa-be97-890d9efc6562)
