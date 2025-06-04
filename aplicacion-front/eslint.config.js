// eslint.config.js
import js from '@eslint/js';
import globals from 'globals';
import react from 'eslint-plugin-react'; // Importa el plugin de React
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';
import prettierConfig from 'eslint-config-prettier'; // Importa la config de Prettier
import prettierPlugin from 'eslint-plugin-prettier'; // Importa el plugin de Prettier

export default tseslint.config(
  {
    ignores: ['dist', 'node_modules', '*.js'], // Añade node_modules a ignora
  },
  {
    // Configuración general para todos los archivos TS/TSX
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended, // Reglas JS recomendadas
      ...tseslint.configs.recommended, // Reglas TS recomendadas
      // NOTA: 'prettier' como string en 'extends' YA NO SE USA con flat config.
      // Ahora se maneja con 'prettierConfig' y 'prettierPlugin' directamente.
    ],
    languageOptions: {
      ecmaVersion: 2020,
      sourceType: 'module', // Añade esto para JSX/TSX
      globals: {
        ...globals.browser,
        // Si usas Vitest/Jest u otros globales, añádelos aquí. Ej:
        // ...globals.jest,
      },
      parser: tseslint.parser, // Asegúrate de que el parser sea el de tseslint
      parserOptions: {
        ecmaFeatures: { jsx: true }, // Habilita JSX
        project: './tsconfig.json', // Muy importante para reglas basadas en tipos
      },
    },
    plugins: {
      react, // Habilita el plugin de React
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      prettier: prettierPlugin, // Habilita el plugin de Prettier
    },
    rules: {
      // Reglas de React
      ...react.configs.recommended.rules, // Reglas recomendadas de React
      ...reactHooks.configs.recommended.rules, // Reglas de React Hooks
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
      'react/react-in-jsx-scope': 'off', // No es necesario con React 17+ y nuevos bundlers
      'react/jsx-uses-react': 'off', // No es necesario con React 17+ y nuevos bundlers

      // Reglas de Prettier
      ...prettierConfig.rules, // Aplica las reglas de Prettier que apagan conflictos
      'prettier/prettier': 'error', // Ejecuta Prettier como una regla de ESLint
      // Puedes añadir tus reglas personalizadas o anular aquí
      // 'no-console': 'warn',
      // '@typescript-eslint/no-unused-vars': 'warn',
    },
    settings: {
      react: {
        version: 'detect', // Detecta automáticamente la versión de React
      },
    },
  },
  // Opcional: Configuración específica para archivos JS si los tienes
  {
    files: ['**/*.js'],
    extends: [
      js.configs.recommended,
      prettierConfig, // Asegúrate de que Prettier también formatee JS
      prettierPlugin, // Prettier como plugin
    ],
    languageOptions: {
      ecmaVersion: 2020,
      sourceType: 'module',
      globals: globals.browser,
    },
    rules: {
      'prettier/prettier': 'error',
    },
  }
);
