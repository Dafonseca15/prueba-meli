
module.exports = {
    transform: {
      '^.+\\.(ts|tsx|js|jsx)$': 'ts-jest',
    },
    testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.(ts|tsx|js|jsx)$',
    testPathIgnorePatterns: ['/node_modules/', '/dist/'],
    testEnvironment: 'jsdom',
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
    moduleNameMapper: {
      '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
      "^\\.\\.\\/\\.\\.\\/\\.\\.\\/\\.\\.\\/\\.\\.\\/\\.\\.\\/utils\\/utils$": "<rootDir>/src/utils/utils.ts",
    },
    setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
    collectCoverage: true,
    collectCoverageFrom: [
      'src/**/*.{ts,tsx,js,jsx}',
      '!src/**/*.d.ts', 
      '!src/api/**',    
      '!src/main.tsx',  
      '!src/App.tsx',   
      '!src/index.css'  
    ],
    coverageDirectory: 'coverage',
    coverageReporters: ['lcov', 'text', 'html'],
  };