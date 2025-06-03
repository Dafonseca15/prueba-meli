// jest.config.js
module.exports = {
    // Qué archivos debe procesar Jest (normalmente .ts, .tsx, .js, .jsx)
    transform: {
      '^.+\\.(ts|tsx|js|jsx)$': 'ts-jest',
      // Si tienes archivos SVG que se importan como componentes, podrías necesitar un transformador para ellos
      // o simplemente mockearlos. Con el enfoque de la API mock que usamos, esto es menos crítico.
    },
    // Patrones de archivos de prueba
    testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.(ts|tsx|js|jsx)$',
    // Patrones de archivos a ignorar en las pruebas
    testPathIgnorePatterns: ['/node_modules/', '/dist/'],
    // Entorno de pruebas
    testEnvironment: 'jsdom',
    // Extensiones de archivos a resolver
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
    // Mapeo de módulos para alias (si los usas en tu proyecto, ej. src/utils -> @utils)
    moduleNameMapper: {
      '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
      "^\\.\\.\\/\\.\\.\\/\\.\\.\\/\\.\\.\\/\\.\\.\\/\\.\\.\\/utils\\/utils$": "<rootDir>/src/utils/utils.ts",

    },
    // Archivos de configuración a ejecutar antes de cada prueba (para @testing-library/jest-dom)
    setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
    // Cobertura de código (opcional pero muy recomendado)
    collectCoverage: true,
    collectCoverageFrom: [
      'src/**/*.{ts,tsx,js,jsx}',
      '!src/**/*.d.ts', // Ignora archivos de declaración de tipos
      '!src/api/**',    // Ignora archivos de API si solo mockeas las llamadas
      '!src/main.tsx',  // Ignora el punto de entrada principal
      '!src/App.tsx',   // Ignora el componente App si es muy simple
      '!src/index.css'  // Ignora archivos CSS
    ],
    coverageDirectory: 'coverage',
    coverageReporters: ['lcov', 'text', 'html'],
  };